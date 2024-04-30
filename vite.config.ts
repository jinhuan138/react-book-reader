import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),cssInjectedByJsPlugin()],
  build: {
    copyPublicDir: false,
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
    outDir: 'lib',
    lib: {
      entry: 'src/modules/index.ts',
      name: 'react-book-reader',
      fileName: (format) => `react-book-reader.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'React',
        },
      },
    },
  },
})
