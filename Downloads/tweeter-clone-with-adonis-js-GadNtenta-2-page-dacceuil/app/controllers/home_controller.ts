import type { HttpContext } from '@adonisjs/core/http'
// import authService from '@ioc:Adonis/auth/build/services/auth.js'

export default class HomeController {
  public async index({ auth, view }: HttpContext) {
    const user = await auth.authenticate()
    const fullName = user.fullName
    return view.render('homepage', { fullName })
  }
}
