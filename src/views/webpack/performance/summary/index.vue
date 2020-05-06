<template>
    <div>
       <h1>性能优化</h1>
       <p>性能优化主要从以下几个方面入手：</p>
       <h2>1. 构建性能</h2>
       <p>2. 传输性能</p>
       <p>3. 运行性能</p>
       <h2>1. 构建性能</h2>
       <p>构建性能是指:从打包开始到打包完毕或者从修改之后点击保存自动打包到页面的更新过程,整个过程都是在开发阶段进行的</p>
       <p>开发阶段优化了构建性能，可以大大的提高打包速度，从而提升了开发效率</p>
       <p>构建性能主要可以从以下几个方面考虑：</p>
       <h3>1.1 减少模块解析</h3>
       <p>webpack中模块解析包括：抽象语法树分析、依赖分析、模块语法替换</p>
       <h4>不进行解析的模块会怎样？</h4>
       <p>不做解析的模块，在loader处理之后就直接输出</p>
       <p>不做解析的模块，就少了上面的步骤，从而提升了打包速度</p>
       <h4>模块不需要解析的前提条件：</h4>
       <p>模块中无其他依赖，如：jquery</p>
       <h4>配置如下：</h4>
       <pre>
            module.exports = {
                //...
                module: {
                    noParse: /jquery|lodash/,  // 不解析jqery和loadsh
                }
            };
       </pre>
       <h3>1.2 loader方面的优化</h3>
       <h4>1.2.1 让一些文件不使用loader</h4>
       <p>减少loader的使用可以让一些文件不走loader转换，从而提高了打包速度</p>
       <p>有些文件或者第三方库本来就是loader转换之后的内容，所以就不需要loader再次解析</p>
       <p>eg:使用es5或者es3写了一个js文件，或者第三库本来就是使用es5写的代码，所以肯本不再需要
         babel-loader进行转换，所以如下设置去除此文件的解析
       </p>
       <pre class="code">
          module.exports = {
              module: {
                  rules: [
                      {
                          test: /\.js$/,
                          exclude: /node_modules/,  // 不解析node_modules
                          //或
                          // include: /src/,  // 指解析src文件夹下的文件
                          use: "babel-loader"
                      }
                  ]
              }
          }
       </pre>
       <h4>1.2.2 缓存loader</h4>
       <p>如果一些文件或者第三方库的内容在loader转换之后就不再改变，那么就可以在第一次编译之后进行缓存，以后的
         每次打包都直接从缓存中获取
       </p>
       <p>eg: 对于jquery或者其他的第三方库</p>
       <p>使用cache-loader进行缓存</p>
       <p>安装</p>
       <p>npm install --save-dev cache-loader</p>
       <p>配置</p>
       <pre>
        module.exports = {
          module: {
            rules: [
              {
                test: /jquery\.js$/,
                use: [ {
                  loader: 'cache-loader',
                  options:{
                    cacheDirectory: "./cache" // 指定缓存到的目录
                  }
                }, 'babel-loader']
              },
            ],
          },
        };
       </pre>
       <p>原理：</p>
       <p>匹配到文件之后，走loader的pitch方法，如果pitch方法发现有缓存就返回缓存中的代码，否则就走loader进行解析</p>
       <img src="@img/cache.png" alt="">
       <h4>1.2.3 使用thread-loader给loader开启线程池</h4>
       <p>把loader放到线程池中的线程中，以便提高构建速度</p>
       <p>放入线程池中的loader不能使用以下功能</p>
       <p>- 不能够使用webpack api</p>
       <p>- 无法访问webpack options</p>
       <p>- 无法使用自定义的plugin api</p>
       <p>注意，开启和管理线程需要消耗时间，在小型项目中使用thread-loader反而会增加构建时间</p>
       <h4>1.2.4 使用热更新</h4>
       <p>热更新并不能降低构建的时间，可能会增加，但是减少了从更改代码保存到页面呈现的时间</p>
       <p>配置</p>
       <p>webpack.config.js</p>
       <pre class="code">
          const webpack = require('webpack');
          module.exports = {
            devServer:{
              hot:true // 开启热更新
            },
            plugins:[ 
              // 使用热更新插件
              new webpack.HotModuleReplacementPlugin()
            ]
          }
       </pre>
       <p>入口文件中</p>
       <pre class="code">
          if(module.hot){ // 是否开启了热更新
              module.hot.accept() // 接受热更新
          }
       </pre>
       <p>基本流程</p>
       <p>在没有使用热更新的时候，每次编译运行，webpack-dev-server都会执行localtion.reload重新加载页面，当使用了
         热更新之后，webpack-dev-server会通过websocket把变更的代码主动推送到浏览器，然后通过注入的module.hot.accept进行接收，
         然后通过HotModuleReplacementPlugin插件覆盖之前的模块并执行,所以热更新发生在代码运行期
       </p>
       <p>1. 修改一个或者多个文件中的代码</p>
       <p>2. webpack重新编译构建变更的模块,并通知HMR服务器进行更新</p>
       <p>3. HMR服务器通过websocket推送变更的模块到客户端</p>
       <p>4. 客户端通过注入的module.hot.accept接收到变更的内容</p>
       <p>5. HotModuleReplacementPlugin插件替换更新的模块进行执行</p>
       <p>6. 如果这些模块无法执行那么就直接执行localtion.reload重新加载页面</p>
       <p>注意：</p>
       <p>样式也可以进行热更新，但是通过mini-css-extract-plugin插件生成单独文件的样式不能进行热更新，因为
          热更新发生在代码运行时期，而mini-css-extract-plugin插件生成单独css文件发生在构建时期,style-loader
          的样式是可以进行热更新
       </p>
       <p></p>
       <h2>2. 传输性能</h2>
       <p>传输性能是指：文件从服务端传输到客户端的过程所需要的时间</p>
       <p>传输性能的提升可以缩短从页面请求到呈现的时间，可以从以下几个方面考虑：</p>
       <p> 2.1 总传输量：将所有的传输文件内容都加起来就是总传输</p>
       <p> 2.2 文件数量：需要传输的所有文件数量 </p>
       <p> 2.3 浏览器缓存： 通过设置可以使得浏览器缓存传输的文件，被缓存的文件再次获取就会从缓存中获取</p>
       <h2>3. 运行性能</h2>
       <p>编写高效的代码</p>


    </div>     
</template>
<script>
export default {
    metaInfo: {   // 使用vue-meta-info插件
      title: '性能优化', // set a title
      meta: [{                 // set meta
        name: '性能优化',
        content: '性能优化'
      }],
      link: [{                 // set link
        rel: '性能优化',
        href: ''
      }]
    }
}
</script>
<style>

</style>