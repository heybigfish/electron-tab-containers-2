import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path';
import { fileURLToPath, URL } from "node:url"
import electron from 'vite-plugin-electron/simple'

import vue from '@vitejs/plugin-vue'
console.log("process.cwd()",process.cwd());

export default defineConfig({
  // base: './',
  server: {
    port: 9080,
    proxy: {
      '/api': {
        target: 'https://www.cfbrain.com.cn/',
        changeOrigin: true, // 是否跨域
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./app", import.meta.url)),
    },
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [
        path.resolve(
          process.cwd(),
          'render/assets/svg'
        )
      ],
      // 指定symbolId格式
      symbolId: 'icon-[name]'
    }),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'src/main.ts',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'src/helpers/preload.js'),
      },
    }),
  ],
  build: {
    rollupOptions: {
      // 静态资源分类打包
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
      },
    },
  },
})
