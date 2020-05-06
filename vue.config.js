const path = require("path");
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const resolve = dir => path.join(__dirname, dir);
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer

module.exports = {
    publicPath: './',
    chainWebpack: config => {
        // 修复HMR
        config.resolve.symlinks(true);
        config.resolve.alias
            .set("vue$", "vue/dist/vue.esm.js")
            .set("@", resolve("src"))
            .set("@cp", resolve("src/components"))
            .set("@img", resolve("src/assets/img"))
            .set("@view", resolve("src/views"))
            .set("@router", resolve("src/router"))
            .set("@service", resolve("src/service"))
    },
    configureWebpack: {
      plugins: [
          new PrerenderSpaPlugin({
              // npm run build的输出目录
              staticDir: path.join(__dirname, 'dist'),
              // 需要进行预渲染的页面
              routes: ['/','/babel'],
              renderer: new Renderer({
                inject: {
                  foo: 'bar'
                },
                headless: false, 
                // renderAfterDocumentEvent: 'render-active' 
                // renderAfterElementExists: '.container', 
                renderAfterTime: 5000 
              })
          })
      ]
    },
    devServer: {
      // overlay: { // 让浏览器 overlay 同时显示警告和错误
      //   warnings: true,
      //   errors: true
      // },
      // open: false, // 是否打开浏览器
      // host: "localhost",
      // port: "8080", // 代理断就
      // https: false,
      // hotOnly: false, // 热更新
      // proxy: {
      //   "/api": {
      //     target:"https://www.easy-mock.com/mock/5bc75b55dc36971c160cad1b/sheets", // 目标代理接口地址
      //     secure: false,
      //     changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
      //     // ws: true, // 是否启用websockets
      //     pathRewrite: {
      //       "^/api": "/"
      //     }
      //   }
      // }
    }
  };