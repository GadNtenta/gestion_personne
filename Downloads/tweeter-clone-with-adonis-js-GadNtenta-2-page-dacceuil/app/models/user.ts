import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, beforeSave, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Tweet from './tweet.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column()
  declare username: string

  @column({ columnName: 'name' })
  declare fullName: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare avatar: string | null

  @column()
  declare bio: string | null

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  declare updatedAt: DateTime

  @column.dateTime({ columnName: 'email_verified_at' })
  declare emailVerifiedAt: DateTime | null

  @column({ columnName: 'verification_token' })
  declare verificationToken: string | null

  @column({ columnName: 'reset_password_token' })
  declare resetPasswordToken: string | null

  @column.dateTime({ columnName: 'reset_password_expires' })
  declare resetPasswordExpires: DateTime | null

  @column({ columnName: 'login_attempts' })
  declare loginAttempts: number

  @column.dateTime({ columnName: 'last_login_attempt' })
  declare lastLoginAttempt: DateTime | null

  @hasMany(() => Tweet)
  declare tweets: HasMany<typeof Tweet>

  @beforeSave()
  static async hashPassword<T extends typeof User>(this: T, user: InstanceType<T>) {
    if (user.$dirty.password) {
      console.log("Hachage du mot de passe pour l'utilisateur:", user.email)
      console.log('Mot de passe avant hachage:', user.password)
      if (!user.password.startsWith('$scrypt$')) {
        user.password = await hash.make(user.password)
        console.log('Mot de passe après hachage:', user.password)
      } else {
        console.log('Le mot de passe est déjà haché')
      }
      console.log('Traitement du mot de passe terminé')
    }
  }

  async verifyPassword(plainPassword: string): Promise<boolean> {
    console.log("Vérification du mot de passe pour l'utilisateur:", this.email)
    console.log('Mot de passe fourni:', plainPassword)
    console.log('Hash stocké:', this.password)
    const isValid = await hash.verify(this.password, plainPassword)
    console.log('Résultat de la vérification:', isValid)
    return isValid
  }
}
