const { defineConfig } = require("@vue/cli-service");
const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  publicPath: process.env.NODE_NEV === 'production' ? '': './',
  outputDir: process.env.NODE_ENV === 'production'  ? 'dist' : 'devDist',//打包称那个文件夹
  transpileDependencies: false,
  lintOnSave: false,
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      // sass: {
      //   additionalData: `@use "~@/styles/main.scss"`
      // },
      scss: {
        additionalData: `@import "~@/styles/main.scss";`
      }
    }
    },
  chainWebpack(config) {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/svg'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
      config.plugin('define').tap((definitions) => {
        Object.assign(definitions[0], {
          __VUE_OPTIONS_API__: 'true',
          __VUE_PROD_DEVTOOLS__: 'false',
          __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
        })
        return definitions
      })
  },
 devServer: {
    open:false,
    host:"localhost",//外部访问
    port:process.env.VUE_APP_PORT,
    client: {
      overlay: false
    },
    proxy: {
      [process.env.VUE_APP_FLAG]: {
         target:'https://api.youlai.tech/', // 目标API地址
        // target:process.env.VUE_APP_API_URL, // 目标API地址
        ws:false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务器，然后发送请求的数据，会同时会收到请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          [`^${process.env.VUE_APP_FLAG}`]: '' // 路径重写，移除路径中的/api
        }
      }
    }
  }
//  devServer: {
//     open:false,
//     host:"0.0.0.0",//外部访问
//     port:9000,
//     proxy: {
//      '/api': {
//          target:'https://api.youlai.tech/prod-api/', // 目标API地址
//         // target:process.env.VUE_APP_API_URL, // 目标API地址
//         ws:false,
//         changeOrigin: true, // 开启代理，在本地创建一个虚拟服务器，然后发送请求的数据，会同时会收到请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
//         pathRewrite: {
//           '^/api': '' // 路径重写，移除路径中的/api
//         }
//       }
//     }
//   }
})
;
