import type { HttpContext } from '@adonisjs/core/http'

export default class TrendsController {
  public async index({ view }: HttpContext) {
    // Liste d'objets représentant les tendances
    const trends = [
      { location: 'Turkey', hastage: 'SGDUB', nombre_tweet: 2066 },
      { location: 'USA', hastage: 'TrendingUSA', nombre_tweet: 5000 },
      { location: 'France', hastage: 'TrendingFrance', nombre_tweet: 5000 },
      { location: 'Nigeria', hastage: 'TrendingNigeria', nombre_tweet: 5000 },
    ]

    return view.render('components/layout/index', { trends })
  }
}
