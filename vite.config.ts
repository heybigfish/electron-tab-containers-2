import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path';
import vue from '@vitejs/plugin-vue'
console.log("process.cwd()",process.cwd());

export default defineConfig({
  base: './render',
  server: {
    port: 9080
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
    })
  ]
})
