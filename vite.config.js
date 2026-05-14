import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const credlyUsername = env.CREDLY_USERNAME || ''

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      proxy: {
        '/api/badges': {
          target: 'https://www.credly.com',
          changeOrigin: true,
          rewrite: () => `/users/${credlyUsername}/badges.json`,
        },
      },
    },
  }
})
