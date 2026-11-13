import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: [path.join(root, 'index.html'), path.join(root, 'atm.html')],
    },
  },
  resolve: {
    alias: {
      '@tokens': path.resolve(root, 'tokens'),
      '@components': path.resolve(root, 'components'),
    },
  },
  server: {
    host: true,
  },
})
