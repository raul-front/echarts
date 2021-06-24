import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  base: '/echarts/',
  build: {
    outDir: 'dist/echarts',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      lisa: resolve(__dirname, 'src/lisa'),
      styles: resolve(__dirname, 'src/styles'),
      hooks: resolve(__dirname, 'src/hooks'),
      components: resolve(__dirname, 'src/components'),
      utils: resolve(__dirname, 'src/utils'),
      api: resolve(__dirname, 'src/api'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: (content, loaderContext) => {
          return "@import 'lisa/styles/mixins.scss';" + content
        },
      },
    },
    postcss: {
      plugins: [require('postcss-px2rem')({
        remUnit: 80,
      })],
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:7001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
