import { defineConfig, PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { visualizer } from 'rollup-plugin-visualizer'
import { name, version } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  base: name,
  plugins: [react(), cssInjectedByJsPlugin(), visualizer({
    filename: `stats${version}.html`,
  }) as PluginOption],
  build: {
    copyPublicDir: false,
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
    outDir: 'lib',
    lib: {
      entry: 'src/packages/index.ts',
      name,
      fileName: (format) => `${name}.${format}.js`,
      formats: ['es', 'umd', 'cjs'],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime',],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'ReactJSXRuntime',
          'react/jsx-dev-runtime': 'ReactJSXDevRuntime',
        },
        exports: 'named',
      },
    },
  },
})
