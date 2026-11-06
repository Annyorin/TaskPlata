import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@tokens': path.resolve(__dirname, 'tokens'),
      '@components': path.resolve(__dirname, 'components'),
    },
  },
  server: {
    host: true,
  },
})
