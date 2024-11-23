import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

import { watchReloadPlugin } from '../hot-reload/vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), watchReloadPlugin()],

  build: {
    cssCodeSplit: false,
    outDir: '../out/view',
    emptyOutDir: true,
  },
})
