/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import Tweet from '#models/tweet'
import User from '#models/user'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const TweetsController = () => import('#controllers/tweets_controller')
const TrendsController = () => import('#controllers/trends_controller')
const ProfileController = () => import('#controllers/profile_controller')

router.post('/api/likes', [TweetsController, 'toggleLike']).use(middleware.auth())
router.post('/api/tweets', [TweetsController, 'store']).use(middleware.auth())
router.get('/home', [TweetsController, 'index']).as('homepage')
router.get('/index', [TrendsController, 'index'])
router.get('/profile', [ProfileController, 'index'])

router
  .get('/debug-auth', async ({ auth, response }) => {
    if (auth.user) {
      return response.json({
        isAuthenticated: true,
        user: auth.user,
        fullName: auth.user.fullName,
      })
    } else {
      return response.json({
        isAuthenticated: false,
        message: 'No authenticated user',
      })
    }
  })
  .as('debugAuth')

router
  .get('/', async ({ view }) => {
    return view.render('pages/welcome')
  })
  .as('home')

// Auth routes
router
  .group(() => {
    // Registration
    router.get('/register', '#controllers/auth_controller.registerShow').as('registerShow')
    router.post('/register', '#controllers/auth_controller.register').as('register')

    // Login
    router.get('/login', '#controllers/auth_controller.loginShow').as('loginShow')
    router.post('/login', '#controllers/auth_controller.login').as('login')

    // Logout (protected)
    router
      .post('/logout', '#controllers/auth_controller.logout')
      .use(middleware.auth())
      .as('logout')
  })
  .as('auth')

// Protected routes
router
  .group(() => {
    router
      .get('/dashboard', async ({ view }) => {
        return view.render('dashboard')
      })
      .as('dashboard')
  })
  .use(middleware.auth())
  .as('authenticated')

router.group(() => {
  router.get('/api/tweets', [TweetsController, 'index'])
})

router
  .group(() => {
    router.get('/users', async ({ response }) => {
      const users = await User.all()
      return response.json(users)
    })

    router.get('/tweet', async ({ response }) => {
      const tweets = await Tweet.all()
      return response.json(tweets)
    })
    //login
    router.post('/login', async ({ request, response }) => {
      const { email, password } = request.all()
      const user = await User.findBy('email', email)
      if (user) {
        if (await user.verifyPassword(password)) {
          return response.json({
            success: true,
            message: 'connexion reussi',
          })
        } else {
          return response.json({
            success: false,
            message: 'email ou mot de passe incorrect',
          })
        }
      } else {
        return response.json({
          success: false,
          message: "l'utilisateur n'existe pas",
        })
      }
    })
  })
  .prefix('/api')
