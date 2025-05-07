import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfileController {
  public async index({ view, auth }: HttpContext) {
    const trends = [
      { location: 'Turkey', hastage: 'SGDUB', nombre_tweet: 2066 },
      { location: 'USA', hastage: 'TrendingUSA', nombre_tweet: 5000 },
      { location: 'France', hastage: 'TrendingFrance', nombre_tweet: 5000 },
      { location: 'Nigeria', hastage: 'TrendingNigeria', nombre_tweet: 5000 },
    ]

    // const authenticatedUser = await auth.authenticate()
    let fullName = 'User'
    if (auth.isAuthenticated) {
      // Ensure we have the latest user data from the database
      const user = await User.find(auth.user!.id)
      if (user) {
        fullName = user.fullName || 'User'
      }
    }

    let tweets = [
      {
        lien_profile: './public/cnn-avatar.png',
        username: 'CNN',
        content_post_text:
          'President Biden touted a new agreement reached with the European Union on steel and aluminum trade as a major breakthrough...',
        replies: 19,
        retweets: 48,
        likes: 482,
      },
      {
        lien_profile: './public/nytimes-avatar.png',
        username: 'The New York Times',
        content_post_text:
          'Gardening boomed during the pandemic. Six Black writers share how it has helped them re-establish, and reimagine, a connection to cultivation and the land.',
        lien_post_media: './public/post.png',
        replies: 9,
        retweets: 98,
        likes: 82,
      },
      {
        lien_profile: './public/Twitter.png',
        username: 'Twitter',
        content_post_text: 'hello literally everyone',
        replies: 9,
        retweets: 4,
        likes: 42,
      },
      {
        lien_profile: './public/gad.jpg',
        username: 'Gad Ntenta',
        content_post_text: 'Salut Je suis Gad, Développeur Web & Mobile',
        replies: 1,
        retweets: 8,
        likes: 48,
      },
    ]

    const user = {
      name: 'Bradley Ortiz',
      username: 'bradley_',
      posts_count: tweets.length,
      cover_photo_url: '/public/cover.png',
      profile_photo_url: './public/gad.jpg',
      join_date: 'March 2025',
      following_count: 4,
      followers_count: 0,
    }

    const tabs = [
      { id: 'post', name: 'Posts' },
      { id: 'replies', name: 'Replies' },
      { id: 'highlights', name: 'Highlights' },
      { id: 'articles', name: 'Articles' },
      { id: 'media', name: 'Media' },
      { id: 'likes', name: 'Likes' },
    ]

    const onboardingsteps = [
      { title: 'Follow 5 accounts', gradient: 'purple-600 to-pink-500', status: '1 left' },
      { title: 'Follow 3 Topics', gradient: 'orange-400 to-yellow-400', status: '1 left' },
      { title: 'Complete your profile', gradient: 'green-500 to-blue-500', status: 'DONE' },
      { title: 'Turn on notifications', gradient: 'indigo-500 to-purple-500', status: 'DONE' },
    ]

    return view.render('pages/profile', {
      user,
      tabs,
      onboardingsteps,
      fullName,
      tweets,
      trends,
    })
  }
}
