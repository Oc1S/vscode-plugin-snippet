import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: false,
    outDir: '../out/view',
    // rollupOptions: {
    //   // 输出配置
    //   output: {
    //     // 输出的文件自定义命名
    //     chunkFileNames: `js/[name]-[hash].${timeStamp}.js`,
    //     entryFileNames: `js/[name]-[hash].${timeStamp}.js`,
    //     assetFileNames: `[ext]/[name]-[hash].${timeStamp}.[text]`,
    //   },
    // },
  },
})
