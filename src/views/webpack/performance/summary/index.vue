<template>
    <div>
       <h1>性能优化</h1>
       <p>性能优化主要从以下几个方面入手：</p>
       <p>1. 构建性能</p>
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
       <h2>2. 传输性能</h2>
       <p>传输性能是指：文件从服务端传输到客户端的过程所需要的时间</p>
       <p>传输性能的提升可以缩短从页面请求到呈现的时间，可以从以下几个方面考虑：</p>
       <p> - 总传输量：将所有的传输文件内容都加起来就是总传输</p>
       <p> - 文件数量：需要传输的所有文件数量 </p>
       <p> - 浏览器缓存： 通过设置可以使得浏览器缓存传输的文件，被缓存的文件再次获取就会从缓存中获取</p>
       <h3>2.1 打包之后包太大可以分包处理</h3>
       <p>解决的问题：</p>
       <p>一个文件包太大，导致网络响应很慢</p>
       <p></p>
       <h4> 2.1.1 手动分包</h4>
       <p>基本思路：</p>
       <p>- 单独的打包公共模块</p>
       <p>- 公共模块会被打包成动态链接库，并生成资源清单</p>
       <p>- 根据入口模块进行正常的打包</p>
       <p>- 在html页面中手动引入单独打包的公共模块</p>
       <p>步骤：</p>
       <p>1. 创建webpack.dll.config.js文件</p>
       <p>用于配置要单独打包的文件，暴露出变量名在全局中</p>
       <pre class="code">
          // 手动单独打包的配置
          module.exports = {
              mode: "production",
              entry: { // 需要单独打包的文件
                  jquery: ["jquery"],
                  lodash: ["lodash"]
              },
              output: {
                  filename: "dll/[name].js",
                  library: "[name]" // 打包之后暴露的变量名
              },
              plugins: [
                  // 生成资源清单
                  new webpack.DllPlugin({
                      path: path.resolve(__dirname,"dll","[name].manifest.json"), // 资源清单保存的位置
                      name: "[name]" // 资源清单中，暴露的变量名
                  })
              ]
          }
       </pre>
       <p>2. html页面手动引入单独的打包文件</p>
       <img src="@img/fb2.png" alt="">
       <p>3. webpack.config.js中设置clean-webpack-plugin插件</p>
       <p>如果使用了clean-webpack-plugin这个插件就需要重新配置，防止每次打包都清空了单独打包的文件</p>
       <pre class="code">
          plugins: [ // 插件
            new CleanWebpackPlugin({ // 打包前清空目录
                // 排除掉dll目录本身和它里面的文件
                cleanOnceBeforeBuildPatterns: ["**/*", '!dll', '!dll/*']
            }),  
          ]
       </pre>
       <p>4. webpack.config.js中使用资源清单</p>
       <p>通过webpack.DllReferencePlugin插件使用生成的资源清单，供正常打包的时候webpack能够根据清单
          不打包清单中的文件
       </p>
       <pre class="code">
          module.exports = {
            plugins:[
              new webpack.DllReferencePlugin({
                manifest: require("./dll/jquery.manifest.json")
              }),
              new webpack.DllReferencePlugin({
                manifest: require("./dll/lodash.manifest.json")
              })
            ]
          }
       </pre>
       <p>5. package.json中配置打包命令</p>
       <p>通过npm run dll执行根据指定配置文件进行打包</p>
       <pre class="code"> 
         "scripts": {
            "dll": "webpack --config webpack.dll.config.js"
          },
       </pre>
       <p>注意：  </p>
       <p>1.资源清单不参与运行，可以不放在dist目录下</p>
       <p>2.在html页面中需要手动引入单独打包的文件</p>
       <p>3.不要对小型的包进行分包处理</p>
       <p>4.如果是第三方库可以通过CDN引入，无需手动分包</p>
       <p>优点：</p>
       <p>1.提高了打包速度</p>
       <p>2.提高了网络响应速度</p>
       <p>3.有利于浏览器缓存</p>
       <p>缺点：</p>
       <p>1.配置繁琐</p>
       <p>2.复杂的依赖关系模块操作比较繁琐</p>
       <p>打包结果</p>
       <p>先运行单独打包的命令npm run dll</p>
       <p>再运行项目打包的命令npm run build</p>
       <img src="@img/fb.png" alt="">
       <h4> 2.1.2 自动分包</h4>
       <p>自动分包不像手动分包那样指定具体的分包文件，只需要配置下分包策略，webpack会自动根据分包策略进行分包</p>
       <p>webpack内部默认具有自动分包的优化配置，实际上内部使用了splitChunksPlugin进行分包，过去使用的是CommonsChunkPlugin插件进行分包，由于
        它不完善所以被splitChunksPlugin取代,我们可以更改配置达到我们自身的要求</p>
        <p>基本流程:</p>
        <p>- 配置分包策略</p>
        <p>- 分局分包策略，webpack开启一个chunk，对分离的模块进行打包</p>
        <p>分别策略基本配置：</p>
        <p>webpack提供了optimization配置项，用于配置一些优化信息</p>
        <p>其中splitChunks是分包策略的配置</p>
        <pre class="code">
          module.exports = {
            optimization: {  // 优化方面的配置项
                splitChunks:{  // 自动分包的配置
                    // 配置项
                }
            }
          }
        </pre>
        <p>配置项</p>
        <p>1.chunks</p>
        <p>配置需要应用分包策略的chunk</p>
        <p>all: 对所有的chunk都要应用分包策略</p>
        <p>async:(默认)对异步的chunk应用分包策略</p>
        <p>inital: 对普通的chunk进行分包策略</p>
        <p>2. maxSize</p>
        <p>控制一个包的最大字节数，如果超过了指定的大小，那么就尽可能的进行分割成多个包，但是webpack的分包基础单位是
          模块。如果一个完整的模块超过了这个指定的大小，webpack是无法再进行分割的，因此即使配置了这个属性，有时候还是
          达不到分包的效果。
        </p>
        <p>使用此项的意义不大，因为分包的目的是提取公共的代码，减少文件大小和传输量，使用此项将大包进行分割成多个包，然后
          体积并没有变化，只是减少了单个包的体积，网络下载的时候可以并行下载
        </p>
        <p>如果想要进一步减少包的体积，只能压缩代码和tree shaking</p>
        <p>3. automaticNameDelimiter</p>
        <p>新chunk的分割符，默认是~</p>
        <p>4. minChunks</p>
        <p>一个模块被多少个chunk使用的时候才进行分包，默认是1</p>
        <p>5. minSize</p>
        <p>当包的大小最少为多少个字节才进行分包，默认30000</p>
        <p>6. maxInitialRequests</p>
        <p>允许入口并行加载得最大请求数量，如果超出了这个数量，即使后面的包满足分包策略也不进行分包了，之所以有这个配置也是为了对拆分数量进行限制，不至于拆分出太多模块导致请求数量过多而得不偿失。</p>
        <p>注意:</p>
        <p>入口文件本身算一个请求</p>
        <p>如果入口里面有动态加载得模块这个不算在内</p>
        <p>通过runtimeChunk拆分出的runtime不算在内</p>
        <p>只算js文件的请求，css不算在内</p>
        <p>如果同时又两个模块满足cacheGroup的规则要进行拆分，但是maxInitialRequests的值只能允许再拆分一个模块，那尺寸更大的模块会被拆分出来</p>
        <p>7. maxAsyncRequests</p>
        <p>maxAsyncRequests和maxInitialRequests有相似之处，它俩都是用来限制拆分数量的，maxInitialRequests是用来限制入口的拆分数量而maxAsyncRequests是用来限制异步模块内部的并行最大请求数的，说白了你可以理解为是每个import()它里面的最大并行请求数量。</p>
        <p>这其中要注意以下几点：</p>
    　　<p>1、import()文件本身算一个请求</p>
    　　<p>2、并不算js以外的公共资源请求比如css</p>
    　　<p>3、如果同时有两个模块满足cacheGroup的规则要进行拆分，但是maxInitialRequests的值只能允许再拆分一个模块，那尺寸更大的模块会被拆分出来</p>
        <p>8. cacheGroups(缓存组)</p>
        <p>其中的每一项缓存组都可以继承/覆盖之前提到的 splitChunks 参数值（如 name、maxSize、minSize、maxInitialRequests、maxAsyncRequests 等），除此之外还额外提供了三个配置，分别为：test, priority 和 reuseExistingChunk。</p>
        <p>test: 表示要过滤 modules，默认为所有的 modules，可匹配模块路径或 chunk 名字，当匹配到某个 chunk 的名字时，这个 chunk 里面引入的所有 module 都会选中；</p> 
        <p>priority：权重，数字越大表示优先级越高。一个 module 可能会满足多个 cacheGroups 的正则匹配，到底将哪个缓存组应用于这个 module，取决于优先级；</p> 
        <p>reuseExistingChunk：表示是否使用已有的 chunk，true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的，即几个 chunk 复用被拆分出去的一个 module；</p>
        <p>除了上面的的属性，缓存组还有两个属性——filename 和 enforce：</p>
        <p>filename: 这个属性会覆盖 output.filename 这个属性，前提是 chunks 设为 initial。同时，这个属性也能全局设置，比如 splitChunks.filename，但是如果 chunks 设为非 initial，webpack 将会报错，所以官方建议这个属性不全局设置。</p>
        <p>enforce: 布尔类型，默认为 false。当设为 true 时，webpack 会忽略 splitChunks.minSize、splitChunks.minChunks、splitChunks.maxAsyncRequests、splitChunks.maxInitialRequests 这几个配置项，并且只要某个缓存组设置了 enforce 为 true，
          匹配的模块就会忽略前面提到的那几个属性，即使有其他的缓存组匹配同样的模块，也没有设置 enforce，同时优先级比设置了 enforce 的高，enforce: true 仍然有效。</p>
        <p>缓存组可以对Css进行分包</p>
        <pre class="code">
          module.exports = {
            mode: "production",
            optimization: {  // 优化方面的配置项
                splitChunks:{  // 自动分包的配置
                    chunks: 'all', // 所有的chunk都应用分包策略
                    minSize: 30000,  // 最小包为30kb才进行分包
                    minChunks: 1,    // 最少被引用过一次
                    maxAsyncRequests: 5,   // 限制异步模块内部的并行最大请求数
                    maxInitialRequests: 3, // 允许入口并行加载的最大请求数 超过了这个数量就不再继续分包了即使满足分包策略
                    automaticNameDelimiter: '~',
                    name: true, 
                    cacheGroups: { // 缓存组 默认有两个vendors和default，继承上面的配置，如果有相同配置会覆盖
                      vendors: { 
                        test: /[\/]node_modules[\/]/, // 从指定的文件中进行匹配
                        priority: -10 // 优先级，值越大优先级越高
                      },
                      default: {
                        minChunks: 2,  // 最少被其他模块引用次数
                        priority: -20, // 优先级
                        reuseExistingChunk: true  // 重用已经被分离出去的chunk
                      },
                      styles: { // 利用缓存组对css进行分包
                        test: /\.css$/, // 匹配样式模块
                        minSize: 0, // 覆盖默认的最小尺寸，这里仅仅是作为测试
                        minChunks: 2 // 覆盖默认的最小chunk引用数
                      } 
                    },
                }
            }
          }
        </pre>
        <p>多页应用自动引入分包后的chunk</p>
        <p>目前版本的htmlWebpackPlugin不能够自动引入分包之后的公共chunk,但是它的下个版本会支持这个功能
          因此可以提前使用它的@next版本
        </p>
        <p>安装:</p>
        <pre class="code">npm i -D html-webpack-plugin@next</pre>
        <p>配置</p>
        <pre class="code">
          new HtmlWebpackPlugin({
            template: "./public/index.html",
            chunks: ["index"]
          })
        </pre>
        <p>它会自动的找到被index分离出去的chunk，并完成引用</p>
        <h5>原理：</h5>
        <p>1. 检查每个chunk编译的结果</p>
        <p>2. 根据分包策略找到满足条件的模块</p>
        <p>3. 新生成的chunk对找出的模块进行打包</p>
        <p>4. 把打包出来的模块从原码中移除</p>
        <h4>3. 压缩代码</h4>
        <p>作用：</p>
        <p>
          减少代码的体积，破坏代码的可读性，提升代码的破解成本
        </p>
        <p>
          代码压缩工具
        </p>
        <p>1. UglifyJs</p>
        <p>UglifyJs不支持es6所以被使用的越来越少</p>
        <p>2. Terser</p>
        <p>新一代的压缩代码工具，支持es6+,因为被很多构建工具内置使用，webpack安装后就会内置Terser,当启用生产环境
          就会自动进行代码压缩
        </p>
        <p>webpack自动集成了Terser,可以通过如下配置进行添加其他压缩工具</p>
        <pre class="code">
          const TerserPlugin = require('terser-webpack-plugin');
          const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
          module.exports = {
            optimization: {
              // 是否要启用压缩，默认情况下，生产环境会自动开启
              minimize: true, 
              minimizer: [ // 压缩时使用的插件，可以有多个
                new TerserPlugin(), 
                new OptimizeCSSAssetsPlugin()
              ],
            },
          };
        </pre>
        <h4>4. tree shaking</h4>
        <p>压缩移除掉模块中无效的代码，没有被使用的代码</p>
        <p></p>
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