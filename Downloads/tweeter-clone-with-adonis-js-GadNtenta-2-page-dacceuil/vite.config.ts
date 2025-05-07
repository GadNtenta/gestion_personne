import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    adonisjs({
      entrypoints: ['resources/css/app.css', 'resources/js/app.js'],
      reload: ['resources/views/**/*.edge'],
    }),
  ],
  server: {
    host: '0.0.0.0', // 👈 pour que ça marche peu importe localhost ou 127.0.0.1
    port: 3333,
    allowedHosts: ['tweeter-clone-with-adonis-js-gadntenta-1.onrender.com'],
  },
})
