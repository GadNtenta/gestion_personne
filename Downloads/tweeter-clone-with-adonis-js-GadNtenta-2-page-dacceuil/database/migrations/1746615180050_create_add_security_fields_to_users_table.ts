import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('email_verified_at').nullable()
      table.string('verification_token').nullable()
      table.string('reset_password_token').nullable()
      table.timestamp('reset_password_expires').nullable()
      table.integer('login_attempts').defaultTo(0)
      table.timestamp('last_login_attempt').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('email_verified_at')
      table.dropColumn('verification_token')
      table.dropColumn('reset_password_token')
      table.dropColumn('reset_password_expires')
      table.dropColumn('login_attempts')
      table.dropColumn('last_login_attempt')
    })
  }
}
