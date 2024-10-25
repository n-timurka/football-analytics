import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: process.env.UI_LOCAL_PORT ? +process.env.UI_LOCAL_PORT : 5173,
    watch: {
      usePolling: true,
    },
    proxy: {
      // Proxy API requests
      '/api': {
        target: process.env.VITE_API_URL,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
