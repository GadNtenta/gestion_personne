import Tweet from '#models/tweet'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class TweetsController {
  async index({ view, auth }: HttpContext) {
    // Récupérer les tweets avec les relations et le nombre de likes
    const dbTweets = await Tweet.query()
      .preload('user')
      .withCount('likes')
      .orderBy('created_at', 'desc')

    // Récupérer les tendances depuis la base de données (à implémenter)
    const trends = [
      { location: 'Turkey', hashtag: 'SGDUB', tweetCount: 2066 },
      { location: 'USA', hashtag: 'TrendingUSA', tweetCount: 5000 },
      { location: 'France', hashtag: 'TrendingFrance', tweetCount: 5000 },
      { location: 'Nigeria', hashtag: 'TrendingNigeria', tweetCount: 5000 },
    ]

    // Données utilisateur par défaut
    let userData = {
      name: 'User',
      username: 'bradley_',
      postsCount: 0,
      coverPhotoUrl: '/public/cover.png',
      profilePhotoUrl: './public/gad.jpg',
      joinDate: 'March 2025',
      followingCount: 4,
      followersCount: 0,
    }

    // Si l'utilisateur est connecté, récupérer ses informations
    if (auth.isAuthenticated) {
      const user = await User.query()
        .where('id', auth.user!.id)
        .withCount('tweets', (query) => {
          query.as('tweets_count')
        })
        .first()

      if (user) {
        userData = {
          name: user.fullName || 'User',
          username: user.email.split('@')[0],
          postsCount: Number(user.$extras.tweets_count) || 0,
          coverPhotoUrl: '/public/cover.png',
          profilePhotoUrl: './public/gad.jpg',
          joinDate: user.createdAt.toFormat('MMMM yyyy'),
          followingCount: 4,
          followersCount: 0,
        }
      }
    }

    const tabs = [
      { id: 'post', name: 'Posts' },
      { id: 'replies', name: 'Replies' },
      { id: 'highlights', name: 'Highlights' },
      { id: 'articles', name: 'Articles' },
      { id: 'media', name: 'Media' },
      { id: 'likes', name: 'Likes' },
    ]

    const onboardingSteps = [
      { title: 'Follow 5 accounts', gradient: 'purple-600 to-pink-500', status: '1 left' },
      { title: 'Follow 3 Topics', gradient: 'orange-400 to-yellow-400', status: '1 left' },
      { title: 'Complete your profile', gradient: 'green-500 to-blue-500', status: 'DONE' },
      { title: 'Turn on notifications', gradient: 'indigo-500 to-purple-500', status: 'DONE' },
    ]

    return view.render('pages/home', {
      tweets: dbTweets.map((tweet) => ({
        id: tweet.id,
        content: tweet.content,
        mediaUrl: tweet.mediaUrl,
        createdAt: tweet.createdAt.toFormat('HH:mm • dd MMM yyyy'),
        user: {
          name: tweet.user.fullName,
          username: tweet.user.email.split('@')[0],
          avatar: './public/gad.jpg',
        },
        likesCount: tweet.$extras.likes_count || 0,
        repliesCount: 0,
        retweetsCount: 0,
      })),
      trends,
      user: userData,
      tabs,
      onboardingSteps,
      fullName: userData.name,
    })
  }

  async store({ request, response, auth }: HttpContext) {
    try {
      if (!auth.isAuthenticated) {
        return response.status(401).json({
          success: false,
          message: 'Vous devez être connecté pour poster un tweet',
        })
      }

      const { content, mediaUrl } = request.only(['content', 'mediaUrl'])
      console.log('Données reçues:', { content, mediaUrl })

      if (!content || content.trim() === '') {
        return response.status(400).json({
          success: false,
          message: 'Le contenu du tweet ne peut pas être vide',
        })
      }

      // Vérifier que l'utilisateur existe toujours
      const user = await User.find(auth.user!.id)
      if (!user) {
        return response.status(401).json({
          success: false,
          message: 'Utilisateur non trouvé',
        })
      }

      const tweet = await Tweet.create({
        userId: user.id,
        content: content.trim(),
        mediaUrl: mediaUrl || null,
      })

      // Charger les relations pour la réponse
      await tweet.load('user')
      await tweet.loadCount('likes')

      return response.json({
        success: true,
        message: 'Tweet posté avec succès',
        tweet: {
          id: tweet.id,
          content: tweet.content,
          mediaUrl: tweet.mediaUrl,
          createdAt: tweet.createdAt.toFormat('HH:mm • dd MMM yyyy'),
          user: {
            name: tweet.user.fullName,
            username: tweet.user.email.split('@')[0],
            avatar: './public/gad.jpg',
          },
          likesCount: tweet.$extras.likes_count || 0,
          repliesCount: 0,
          retweetsCount: 0,
        },
      })
    } catch (error: any) {
      console.error('Erreur détaillée lors de la création du tweet:', {
        message: error.message,
        stack: error.stack,
        code: error.code,
      })

      return response.status(500).json({
        success: false,
        message: "Une erreur s'est produite lors de la création du tweet",
        error: error.message,
      })
    }
  }

  async toggleLike({ request, response, auth }: HttpContext) {
    try {
      if (!auth.isAuthenticated) {
        return response.status(401).json({
          success: false,
          message: 'Vous devez être connecté pour liker un tweet',
        })
      }

      const { tweetId, liked } = request.only(['tweetId', 'liked'])
      const tweet = await Tweet.findOrFail(tweetId)

      if (liked) {
        await tweet.related('likes').attach([auth.user!.id])
      } else {
        await tweet.related('likes').detach([auth.user!.id])
      }

      // Recharger le nombre de likes
      await tweet.loadCount('likes')

      return response.json({
        success: true,
        message: liked ? 'Tweet liké avec succès' : 'Like retiré avec succès',
        likesCount: tweet.$extras.likes_count || 0,
      })
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: "Une erreur s'est produite lors de la gestion du like",
        error: error.message,
      })
    }
  }
}
