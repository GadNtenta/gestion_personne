import User from '#models/user'
import {
  loginValidator,
  registerValidator,
  resetPasswordValidator,
  updatePasswordValidator,
} from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import logger from '@adonisjs/core/services/logger'
import vine from '@vinejs/vine'
import { DateTime } from 'luxon'
import { randomBytes } from 'node:crypto'

interface ValidationError {
  messages: Record<string, string[]>
  code: string
}

interface DatabaseError {
  message: string
  code: string
}

export default class AuthController {
  private readonly MAX_LOGIN_ATTEMPTS = 5
  private readonly LOCKOUT_DURATION = 15 // minutes

  /**
   * Afficher le formulaire d'inscription
   */
  async registerShow({ view }: HttpContext) {
    logger.info("Affichage du formulaire d'inscription")
    return view.render('auth/register')
  }

  /**
   * Gérer l'inscription d'un utilisateur
   */
  async register({ request, response, session, auth }: HttpContext) {
    try {
      logger.info("Début du processus d'inscription")
      const data = request.only(['fullName', 'email', 'password', 'username'])
      logger.info('Données reçues:', {
        fullName: data.fullName,
        email: data.email,
        username: data.username,
        password: '[REDACTED]',
      })

      // Validation des données requises
      if (!data.fullName || !data.email || !data.password || !data.username) {
        logger.warn("Données manquantes lors de l'inscription", {
          fullName: !!data.fullName,
          email: !!data.email,
          password: !!data.password,
          username: !!data.username,
        })
        session.flash('errors', { general: 'Tous les champs sont requis' })
        return response.redirect().back()
      }

      logger.info('Début de la validation des données')
      try {
        logger.info('Validation avec Vine.js')
        const validatedData = await vine.validate({
          schema: registerValidator,
          data: data,
        })
        logger.info('Validation réussie:', {
          fullName: validatedData.fullName,
          email: validatedData.email,
          username: validatedData.username,
          password: '[REDACTED]',
        })

        // Vérification de l'unicité de l'email et du nom d'utilisateur
        logger.info("Vérification de l'unicité de l'email")
        const existingUserByEmail = await User.findBy('email', validatedData.email)
        if (existingUserByEmail) {
          logger.warn("Tentative d'inscription avec un email déjà utilisé:", validatedData.email)
          session.flash('errors', { email: 'Cet email est déjà utilisé' })
          session.flash('fullName', validatedData.fullName)
          session.flash('username', validatedData.username)
          return response.redirect().back()
        }

        logger.info("Vérification de l'unicité du nom d'utilisateur")
        const existingUserByUsername = await User.findBy('username', validatedData.username)
        if (existingUserByUsername) {
          logger.warn(
            "Tentative d'inscription avec un nom d'utilisateur déjà utilisé:",
            validatedData.username
          )
          session.flash('errors', { username: "Ce nom d'utilisateur est déjà pris" })
          session.flash('fullName', validatedData.fullName)
          session.flash('email', validatedData.email)
          return response.redirect().back()
        }

        logger.info('Création du nouvel utilisateur')
        const user = await User.create({
          fullName: validatedData.fullName,
          email: validatedData.email,
          password: validatedData.password,
          username: validatedData.username,
          emailVerifiedAt: null,
          verificationToken: null,
          loginAttempts: 0,
          lastLoginAttempt: null,
        })
        logger.info('Utilisateur créé avec succès:', { id: user.id, email: user.email })

        logger.info("Tentative de connexion de l'utilisateur")
        await auth.use('web').login(user)
        logger.info('Utilisateur connecté avec succès')

        session.flash('success', 'Inscription réussie ! Bienvenue sur Twitter Clone')
        return response.redirect().toRoute('homepage')
      } catch (validationError: unknown) {
        logger.error('Erreur de validation détaillée:', {
          error: validationError,
          messages: (validationError as ValidationError).messages,
          data: {
            fullName: data.fullName,
            email: data.email,
            username: data.username,
            password: '[REDACTED]',
          },
        })

        // Gestion spécifique des erreurs de validation
        const errorMessages = (validationError as ValidationError).messages
        logger.error("Messages d'erreur de validation:", errorMessages)

        // Vérification des erreurs spécifiques
        if (errorMessages.password) {
          logger.warn('Erreur de validation du mot de passe:', errorMessages.password)
          session.flash('passwordError', errorMessages.password[0])
        }

        // Affichage de toutes les erreurs
        Object.entries(errorMessages).forEach(([field, messages]) => {
          session.flash(`errors.${field}`, messages[0])
        })

        // Conservation des données saisies
        session.flash('fullName', data.fullName)
        session.flash('username', data.username)
        session.flash('email', data.email)

        return response.redirect().back()
      }
    } catch (error: unknown) {
      const err = error as DatabaseError
      logger.error("Erreur lors de l'inscription:", {
        message: err.message,
        stack: (error as Error).stack,
        code: err.code,
        name: (error as Error).name,
      })

      if (err.code === 'E_VALIDATION_ERROR') {
        logger.error('Erreur de validation:', (error as ValidationError).messages)
        session.flash('errors', (error as ValidationError).messages)
        session.flash('fullName', request.input('fullName'))
        session.flash('username', request.input('username'))
        session.flash('email', request.input('email'))
        return response.redirect().back()
      }

      if (err.code === '23505') {
        logger.error('Violation de contrainte unique:', err.message)
        if (err.message.includes('email')) {
          session.flash('errors', { email: 'Cet email est déjà utilisé' })
        } else if (err.message.includes('username')) {
          session.flash('errors', { username: "Ce nom d'utilisateur est déjà pris" })
        }
        session.flash('fullName', request.input('fullName'))
        session.flash('username', request.input('username'))
        session.flash('email', request.input('email'))
        return response.redirect().back()
      }

      logger.error('Erreur inattendue:', {
        message: err.message,
        stack: (error as Error).stack,
        code: err.code,
      })
      session.flash('errors', { general: "Une erreur inattendue s'est produite" })
      return response.redirect().back()
    }
  }

  /**
   * Afficher le formulaire de connexion
   */
  async loginShow({ view }: HttpContext) {
    logger.info('Affichage du formulaire de connexion')
    return view.render('auth/login')
  }

  /**
   * Gérer la connexion d'un utilisateur
   */
  async login({ request, response, session, auth }: HttpContext) {
    logger.info('=== DÉBUT DU PROCESSUS DE CONNEXION ===')
    try {
      const rawData = request.all()
      logger.info('Données brutes reçues:', {
        email: rawData.email,
        password: rawData.password ? '[PRÉSENT]' : '[ABSENT]',
        contentType: request.header('content-type'),
        headers: request.headers(),
        body: request.body(),
        all: request.all(),
      })

      if (!rawData.email || !rawData.password) {
        logger.warn('Données manquantes:', rawData)
        session.flash('error', 'Email et mot de passe requis')
        return response.redirect().back()
      }

      logger.info('Validation des données avec Vine.js')
      const data = await vine.validate({
        schema: loginValidator,
        data: {
          email: rawData.email,
          password: rawData.password,
        },
      })
      logger.info('Données validées:', {
        email: data.email,
        password: data.password ? '[PRÉSENT]' : '[ABSENT]',
        passwordLength: data.password ? data.password.length : 0,
      })

      logger.info(`Recherche de l'utilisateur avec l'email: ${data.email}`)
      const user = await User.findBy('email', data.email)
      logger.info(
        'Résultat de la recherche:',
        user
          ? {
              id: user.id,
              email: user.email,
              hasPassword: !!user.password,
              passwordLength: user.password ? user.password.length : 0,
              loginAttempts: user.loginAttempts,
              lastLoginAttempt: user.lastLoginAttempt?.toISO(),
            }
          : 'Utilisateur non trouvé'
      )

      if (!user) {
        logger.warn(`Tentative de connexion avec un email inexistant: ${data.email}`)
        session.flash('error', 'Email ou mot de passe incorrect')
        return response.redirect().back()
      }

      // Vérifier si le compte est verrouillé
      if (user.loginAttempts >= this.MAX_LOGIN_ATTEMPTS && user.lastLoginAttempt) {
        const lockoutEnd = user.lastLoginAttempt.plus({
          minutes: this.LOCKOUT_DURATION,
        })
        if (DateTime.now() < lockoutEnd) {
          logger.warn(`Compte verrouillé pour l'utilisateur ${user.id}`)
          const message = `Compte temporairement verrouillé. Réessayez dans ${Math.ceil(lockoutEnd.diff(DateTime.now(), 'minutes').minutes)} minutes`
          session.flash('error', message)
          return response.redirect().back()
        }
        // Réinitialiser les tentatives si la période de verrouillage est terminée
        user.loginAttempts = 0
        await user.save()
        logger.info(`Réinitialisation des tentatives de connexion pour l'utilisateur ${user.id}`)
      }

      // Vérifier le mot de passe
      logger.info('=== VÉRIFICATION DU MOT DE PASSE ===')
      logger.info('Mot de passe fourni:', data.password ? '[PRÉSENT]' : '[ABSENT]')
      logger.info('Hash stocké:', user.password ? '[PRÉSENT]' : '[ABSENT]')
      logger.info('Longueur du hash:', user.password ? user.password.length : 0)

      const passwordMatches = await user.verifyPassword(data.password)
      logger.info('Résultat de la vérification du mot de passe:', passwordMatches)

      if (!passwordMatches) {
        user.loginAttempts = (user.loginAttempts || 0) + 1
        user.lastLoginAttempt = DateTime.now()
        await user.save()
        logger.warn(
          `Tentative de connexion échouée pour l'utilisateur ${user.id}. Tentative ${user.loginAttempts}/${this.MAX_LOGIN_ATTEMPTS}`
        )

        session.flash('error', 'Email ou mot de passe incorrect')
        return response.redirect().back()
      }

      // Réinitialiser les tentatives de connexion
      user.loginAttempts = 0
      user.lastLoginAttempt = null
      await user.save()
      logger.info(`Réinitialisation des tentatives de connexion pour l'utilisateur ${user.id}`)

      // Connecter l'utilisateur
      logger.info('Tentative de connexion avec auth.use("web").login')
      await auth.use('web').login(user)
      logger.info(`Connexion réussie pour l'utilisateur ${user.id}`)
      logger.info('=== FIN DU PROCESSUS DE CONNEXION ===')

      session.flash('success', `Bienvenue ${user.fullName} !`)
      return response.redirect().toRoute('homepage')
    } catch (error: any) {
      logger.error('Erreur lors de la connexion:', {
        message: error.message,
        stack: error.stack,
        code: error.code,
        messages: error.messages,
      })
      if (error.messages) {
        session.flash('errors', Object.values(error.messages).flat())
        return response.redirect().back()
      }
      session.flash('error', "Une erreur s'est produite lors de la connexion")
      return response.redirect().back()
    }
  }

  /**
   * Gérer la déconnexion d'un utilisateur
   */
  async logout({ response, auth, session }: HttpContext) {
    const user = auth.user
    logger.info(`Déconnexion de l'utilisateur ${user?.id}`)
    await auth.use('web').logout()
    session.flash('success', `À bientôt ${user?.fullName || ''} !`)
    return response.redirect().toRoute('auth.loginShow')
  }

  /**
   * Afficher le formulaire de réinitialisation de mot de passe
   */
  async forgotPasswordShow({ view }: HttpContext) {
    logger.info('Affichage du formulaire de réinitialisation de mot de passe')
    return view.render('auth/forgot-password')
  }

  /**
   * Gérer la demande de réinitialisation de mot de passe
   */
  async forgotPassword({ request, response, session }: HttpContext) {
    logger.info('Début du processus de réinitialisation de mot de passe')
    try {
      const data = await vine.validate({
        schema: resetPasswordValidator,
        data: request.all(),
      })
      logger.info(`Demande de réinitialisation pour l'email: ${data.email}`)

      const user = await User.findBy('email', data.email)
      if (!user) {
        logger.info(`Aucun utilisateur trouvé pour l'email: ${data.email}`)
        session.flash(
          'success',
          'Si votre email est enregistré, vous recevrez un lien de réinitialisation'
        )
        return response.redirect().back()
      }

      // Générer un token de réinitialisation
      user.resetPasswordToken = randomBytes(32).toString('hex')
      user.resetPasswordExpires = DateTime.now().plus({ hours: 1 })
      await user.save()
      logger.info(`Token de réinitialisation généré pour l'utilisateur ${user.id}`)

      // TODO: Envoyer l'email de réinitialisation
      logger.info(`Email de réinitialisation à envoyer pour l'utilisateur ${user.id}`)

      session.flash(
        'success',
        'Si votre email est enregistré, vous recevrez un lien de réinitialisation'
      )
      return response.redirect().back()
    } catch (error: any) {
      logger.error('Erreur lors de la demande de réinitialisation:', error)
      if (error.messages) {
        session.flash('errors', Object.values(error.messages).flat())
        return response.redirect().back()
      }
      session.flash('error', "Une erreur s'est produite lors de la demande de réinitialisation")
      return response.redirect().back()
    }
  }

  /**
   * Afficher le formulaire de réinitialisation de mot de passe
   */
  async resetPasswordShow({ request, view, session }: HttpContext) {
    const token = request.input('token')
    logger.info(`Vérification du token de réinitialisation: ${token}`)

    const user = await User.findBy('resetPasswordToken', token)

    if (!user || !user.resetPasswordExpires || DateTime.now() > user.resetPasswordExpires) {
      logger.warn(`Token de réinitialisation invalide ou expiré: ${token}`)
      session.flash('error', 'Le lien de réinitialisation est invalide ou a expiré')
      return view.render('auth/login')
    }

    logger.info(`Affichage du formulaire de réinitialisation pour l'utilisateur ${user.id}`)
    return view.render('auth/reset-password', { token })
  }

  /**
   * Gérer la réinitialisation du mot de passe
   */
  async resetPassword({ request, response, session }: HttpContext) {
    logger.info('Début du processus de réinitialisation de mot de passe')
    try {
      const data = await vine.validate({
        schema: updatePasswordValidator,
        data: request.all(),
      })
      const token = request.input('token')
      logger.info(`Tentative de réinitialisation avec le token: ${token}`)

      const user = await User.findBy('resetPasswordToken', token)
      if (!user || !user.resetPasswordExpires || DateTime.now() > user.resetPasswordExpires) {
        logger.warn(`Token de réinitialisation invalide ou expiré: ${token}`)
        session.flash('error', 'Le lien de réinitialisation est invalide ou a expiré')
        return response.redirect().toRoute('auth.loginShow')
      }

      user.password = await hash.make(data.password)
      user.resetPasswordToken = null
      user.resetPasswordExpires = null
      await user.save()
      logger.info(`Mot de passe réinitialisé avec succès pour l'utilisateur ${user.id}`)

      session.flash('success', 'Votre mot de passe a été réinitialisé avec succès')
      return response.redirect().toRoute('auth.loginShow')
    } catch (error: any) {
      logger.error('Erreur lors de la réinitialisation du mot de passe:', error)
      if (error.messages) {
        session.flash('errors', Object.values(error.messages).flat())
        return response.redirect().back()
      }
      session.flash(
        'error',
        "Une erreur s'est produite lors de la réinitialisation du mot de passe"
      )
      return response.redirect().back()
    }
  }
}
