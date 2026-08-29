import { defineConfig } from 'vite'

// Vite dev server proxy: forward /api requests to backend running on localhost:4000
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:4000'
    }
  }
})
