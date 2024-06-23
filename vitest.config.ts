/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://yupty.live',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
    exclude: ['contracts', 'node_modules'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
})
