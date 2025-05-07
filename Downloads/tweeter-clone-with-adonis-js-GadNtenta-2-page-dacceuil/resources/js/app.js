document.addEventListener('DOMContentLoaded', () => {
  // === Gestion du fichier média ===
  const fileOpener = document.getElementById('fileOpener')
  const fileInput = document.getElementById('fileInput')

  if (fileOpener && fileInput) {
    fileOpener.addEventListener('click', () => fileInput.click())
  }

  // === Fonctions pour Like et Retweet ===
  function setupLikeButton(button) {
    button.addEventListener('click', () => {
      const img = button.querySelector('img')
      const count = button.querySelector('.like-count')

      if (img.src.includes('Like.svg')) {
        // Passage à l'état liké
        img.src =
          "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='red'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E"
        img.classList.add('h-6', 'w-6')
        count.textContent = parseInt(count.textContent) + 1
        count.classList.add('text-red-500')
      } else {
        // Retour à l'état non liké
        img.src = './public/Like.svg'
        img.classList.add('h-6', 'w-6')
        count.textContent = parseInt(count.textContent) - 1
        count.classList.remove('text-red-500')
      }
    })
  }

  function setupRetweetButton(button) {
    button.addEventListener('click', () => {
      const img = button.querySelector('img')
      const count = button.querySelector('.retweet-nbr')

      if (img.src.includes('Retweet.svg')) {
        img.src = './public/Retweeted.svg'
        count.textContent = parseInt(count.textContent) + 1
        count.classList.add('text-green-500')
      } else {
        img.src = './public/Retweet.svg'
        count.textContent = parseInt(count.textContent) - 1
        count.classList.remove('text-green-500')
      }
    })
  }

  // === Gestion du bouton Follow ===
  document.querySelectorAll('.follow-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.textContent.trim() === 'Follow') {
        btn.textContent = 'Followed'
        btn.classList.remove('bg-white', 'text-black', 'hover:bg-gray-200')
        btn.classList.add('bg-transparent', 'text-blue-500')
      } else {
        btn.textContent = 'Follow'
        btn.classList.remove('bg-transparent', 'text-blue-500')
        btn.classList.add('bg-white', 'text-black', 'hover:bg-gray-200')
      }
    })
  })

  // === Prévisualisation de l'image sélectionnée ===
  fileInput?.addEventListener('change', (event) => {
    const file = event.target.files[0]
    const previewContainer = document.getElementById('imagePreviewContainer')
    if (previewContainer) {
      previewContainer.innerHTML = ''
      if (file) {
        const previewImg = document.createElement('div')
        previewImg.classList.add('relative', 'mt-2', 'mb-2')

        const img = document.createElement('img')
        img.src = URL.createObjectURL(file)
        img.classList.add('w-full', 'rounded-lg', 'max-h-80', 'object-contain')
        img.alt = 'Image Preview'

        const removeBtn = document.createElement('button')
        removeBtn.innerHTML = '&times;'
        removeBtn.classList.add(
          'absolute',
          'top-2',
          'right-2',
          'bg-gray-800',
          'text-white',
          'rounded-full',
          'w-8',
          'h-8',
          'flex',
          'items-center',
          'justify-center',
          'opacity-80',
          'hover:opacity-100'
        )
        removeBtn.addEventListener('click', () => {
          previewContainer.innerHTML = ''
          fileInput.value = ''
        })

        previewImg.appendChild(img)
        previewImg.appendChild(removeBtn)
        previewContainer.appendChild(previewImg)
      }
    }
  })

  // === Gestion des timestamps des tweets ===
  function getRelativeTimeString(date) {
    const now = new Date()
    const diff = now - date
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (seconds < 60) return 'Now'
    if (minutes < 60) return `${minutes} minutes ago`
    if (hours < 24) return `${hours} hours ago`
    return `${days} days ago`
  }

  function updateTweetTimestamps() {
    document.querySelectorAll('.tweet-timestamp').forEach((el) => {
      const timestamp = el.getAttribute('data-timestamp')
      if (timestamp) {
        const tweetDate = new Date(timestamp)
        el.textContent = getRelativeTimeString(tweetDate)
      }
    })
  }

  setInterval(updateTweetTimestamps, 60000)

  // Initialiser les interactions sur les tweets existants
  document.querySelectorAll('.like-btn').forEach(setupLikeButton)
  document.querySelectorAll('.retweet-btn').forEach(setupRetweetButton)

  // === Création d'un nouveau tweet ===
  const tweetBtn = document.getElementById('tweetBtn')
  tweetBtn?.addEventListener('click', async () => {
    const tweetContentElem = document.getElementById('tweetContent')
    const tweetContent = tweetContentElem.value
    const tweetMedia = fileInput?.files[0]

    if (tweetContent.trim() === '') {
      alert('Écrivez quelque chose avant de tweeter')
      return
    }

    try {
      // Vérifier si l'utilisateur est authentifié
      const authResponse = await fetch('/debug-auth')
      const authData = await authResponse.json()

      if (!authData.isAuthenticated) {
        alert('Vous devez être connecté pour poster un tweet')
        window.location.href = '/login'
        return
      }

      const formData = new FormData()
      formData.append('content', tweetContent)
      if (tweetMedia) {
        formData.append('mediaUrl', tweetMedia)
      }

      console.log('Envoi du tweet avec les données:', {
        content: tweetContent,
        hasMedia: !!tweetMedia,
      })

      const response = await fetch('/api/tweets', {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRF-TOKEN':
            document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
      })

      const data = await response.json()
      console.log('Réponse du serveur:', data)

      if (data.success) {
        // Rafraîchir la page pour afficher le nouveau tweet
        window.location.reload()
      } else {
        alert(data.message || "Une erreur s'est produite lors de la création du tweet")
        console.error('Erreur détaillée:', data.error)
      }
    } catch (error) {
      console.error('Erreur complète lors de la création du tweet:', error)
      alert(
        "Une erreur s'est produite lors de la création du tweet. Vérifiez la console pour plus de détails."
      )
    }
  })

  // === Gestion du basculement entre Home et Profile ===
  document.addEventListener('click', (event) => {
    const target = event.target.closest('a')
    if (!target) return

    // Si le lien cliqué est le lien Home
    if (target.id === 'homeLink') {
      event.preventDefault()
      document.getElementById('homeSection').classList.remove('hidden')
      document.getElementById('profileSection').classList.add('hidden')
    }

    // Si le lien cliqué est le lien Profile
    if (target.id === 'profileLink') {
      event.preventDefault()
      document.getElementById('homeSection').classList.add('hidden')
      document.getElementById('profileSection').classList.remove('hidden')
    }
  })
})
