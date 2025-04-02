import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // ✅ path 모듈 import

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // ✅ @ => src 폴더
    }
  }
})
