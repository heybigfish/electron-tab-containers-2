import { defineConfig } from 'vite'
// import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// import path from 'path';
export default defineConfig({
  base: './render',
  // svg
  assetsInclude: ['**/*.svg'],
  server: {
    port: 9080
  },
  plugins: [
    // createSvgIconsPlugin({
    //   // 指定需要缓存的图标文件夹
    //   iconDirs: [
    //     path.resolve(
    //       process.cwd(),
    //       'render/assets/svg'
    //     )
    //   ],
    //   // 指定symbolId格式
    //   symbolId: 'icon-[name]'
    // })
  ]
})
