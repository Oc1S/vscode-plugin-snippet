import path from 'node:path'

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

import { watchReloadPlugin } from '../hot-reload/vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), watchReloadPlugin()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    cssCodeSplit: false,
    outDir: '../out/view',
    emptyOutDir: true,
  },
})
