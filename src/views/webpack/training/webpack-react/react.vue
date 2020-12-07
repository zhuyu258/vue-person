<template>
    <div class="react-wrap">
        <h1>webpack4 搭建React多子应用项目</h1>
        <h3>项目初始化及webpack4基础配置</h3>

        <h4>初始化项目</h4>
        <p>1. 创建并进入文件夹</p>
        <pre class="code">
            mkdir webpack-react && cd webpack-react
        </pre>
        <p>2. 初始化配置</p>
        <pre class="code">
            npm init
        </pre>
        <p>说明：此时会在文件中生成一个新的package.json文件,此文件包含了整个项目的配置的基本信息
            项目的名称描述，依赖和执行命令等等
        </p>
        <pre class="code">
            {
                "name": "learn-react-all-project", // 项目名称
                "version": "1.0.0",  // 版本号
                "description": "",  //描述
                "main": "index.js", // 主入口
                "scripts": {  // 脚本命令
                    "test": "echo \"Error: no test specified\" && exit 1"
                },
                "keywords": [], // 关键词
                "author": "",  // 开发者
                "license": "ISC",
                "devDependencies": { // 开发依赖
                },
                "dependencies": {  // 生产依赖
                }
            }
        </pre>
        <p>3. 创建项目整体目录结构</p>
        <pre class="code">
            config   // webpack配置文件目录
                webpack.base.js // 公共基本配置
                webpack.dev.js  // 开发环境配置
                webpack.prod.js // 生产基本配置
            src     
                - components  // 公共组件
                - pages  
                    - modules  // 子应用存放目录
                        - home  // 子应用1
                            app.js
                            index.js // 子应用1的入口文件
                        - sum   // 子应用2
                            app.js
                            index.js // 子应用2的入口文件
            store // redux目录
                - actionTypes // action类型
                - actions     // actions目录
                - reducers    // reducers目录
                index.js    // redux主文件
            router   // 路由
                - modules  // 子应用路由
                    - home  // 子应用1路由
                    - sum   // 子应用2路由
                index.js  // 路由主文件
            app.js 
            index.html 
            index.js // 主程序的入口文件
        </pre>
        <p>4. 初始化index.html</p>
        <pre class="code">
            <img src="@img/react-training1.png" alt="">
        </pre>
        <h4>webpack4基本配置</h4>
        <p>1. 在项目根目录执行以下命令来安装webpack和webpack-cli</p>
        <pre class="code">
            cnpm i -D webpack webpack-cli
        </pre>
        <p>2. 配置入口和出口文件</p>
        <p>在config文件下的webpack.base.js进行配置</p>
        <pre class="code">
            const path = require('path')
            module.exports = {
                mode: 'none', 
                entry: { // 入口文件
                    app: path.resolve(__dirname,'index.js')
                },
                output: { // 输入文件
                    filename: '[name].[hash:6].js',  // 文件名指定hash的前六位
                    path: path.resolve(__dirname,`../dist/sum/`), // 根据执行命令动态的创建输出文件夹
                    publicPath: '/', // 公共路径
                },
            }
        </pre>
        <p>通过执行webpack --config ./config/webpack.base.js得到下面的打包结果</p>
        <pre class="code">
            <img src="@img/react-training3.png" alt="">
        </pre>

        <p>3. 打包处理html文件</p>
        <pre class="code">
            npm i --save-dev html-webpack-plugin clean-webpack-plugin
        </pre>
        <p>说明：</p>
        <p>- html-webpack-plugin</p>
        <p>复制创建指定的html页面，配置多个html-webpack-plugin可以复制创建多个html页面
           并且可以自动引入script、link，每次打包根据内容不同都会生成不同的hash名，防止
           引用缓存
        </p>
        <p>- clean-webpack-plugin</p>
        <p>清除上一次打包的文件</p>
        <p>在config文件下的webpack.base.js进行配置</p>    
        <pre class="code">
            const path = require('path')
            const HtmlWbpackPlugin = require('html-webpack-plugin')
            const { CleanWebpackPlugin } = require('clean-webpack-plugin')
            module.exports = {
                mode: 'none',
                entry: { // 入口文件
                    app: path.resolve(__dirname,'index.js')
                },
                output: { // 输入文件
                    filename: '[name].[hash:6].js',
                    path: path.resolve(__dirname,`../dist/sum`), // 根据执行命令动态的创建输出文件夹
                    publicPath: '/',
                },
                plugins: [
                    new CleanWebpackPlugin(), // 清楚上次打包的结果
                    new HtmlWbpackPlugin({ // 拷贝html到指定的目录并且引入打包之后的js文件
                        template: path.resolve(__dirname, '../src/index.html'), // 要拷贝的文件
                        filename: 'index.html', // 拷贝之后的文件名
                    }),
                ],
            }
        </pre>
        <p>4. 配置开发和生产环境</p>
        <p>生产环境需要压缩代码和去除debugger和注释以及console等无用的代码，尽量减少打包之后的大小，因此生产和开发具有不同的
           配置
        </p>
        <p>安装cross-env</p>
        <p>运行跨平台设置和使用环境变量的脚本，一个配置可以兼容多平台，无需再去根据不同的平台配置不同的环境变量</p>
        <pre class="code">
            npm install --save-dev cross-env
        </pre>
        <p>在packpage.json中配置执行命令</p>
        <pre class="code">
            "scripts": {
                "build-sum:sit": "cross-env NODE_ENV=development MODULE=sum webpack --config ./config/webpack.dev.js",
                "build-sum": "cross-env NODE_ENV=production MODULE=sum webpack --config ./config/webpack.prod.js",
            },
        </pre>
        <p>说明：</p>
        <p>:sit表示测试环境，随便起名，没有:sit表示生产环境</p>
        <p>cross-env NODE_ENV=指定环境</p>
        <p>MODULE=指定子应用名称,便于在打包的时候获取到对应的输出文件名</p>
        <p>安装webpack-merge、webpack-dev-server来配置开发和生产</p>
        <pre class="code">
            npm i --save-dev webpack-merge webpack-dev-server
        </pre>
        <p>说明：</p>
        <p>webpack-merge用来合并webpack配置</p>
        <p>webpack-dev-server用于本地开发启动一个本地服务</p>
        <p>配置webpack.dev.js开发环境</p>
        <pre class="code">
            const {merge} = require('webpack-merge')
            const baseConfig = require('./webpack.common.js')
            module.exports = merge(baseConfig,{
                mode: 'development', // 指定当前为开发模式
                devtool: 'inline-source-map', // 隐射对应的源码
                devServer: { // 启动webpack-dev-server本地服务
                    open: true, // 开启自动打开浏览器
                    hot: true, // 开启热更新
                    historyApiFallback: true, // 找不到路径返回到主页
                    proxy: { // 代理配置
                        '/api': {
                            target: 'http://www.baidu.com',
                            changeOrigin: true,
                        },
                    },
                }
            })
        </pre>
        <p>配置webpack.prod.js生产环境</p>
        <pre class="code">
            const {merge} = require('webpack-merge')
            const baseConfig = require('./webpack.common')

            module.exports = smp.wrap(merge(baseConfig,{
                mode: 'production',
                devtool: 'source-map', // 是否生成单独的source map源码映射文件
                output: {
                    publicPath: '/'
                }
            }))
        </pre>
        <p>修改webpack.base.js基础配置</p>
        <pre class="code">
            const path = require('path')
            const HtmlWbpackPlugin = require('html-webpack-plugin')
            const { CleanWebpackPlugin } = require('clean-webpack-plugin')
            // 判断是开发环境还是生产
            const devMode = process.env.NODE_ENV !== 'production'
            // 入口文件 根据执行的命令获取到MODULE变量动态的配置入口文件
            const entryUrl = `../src/pages/modules/${process.env.MODULE}/index.js`
            module.exports = {
                entry: { // 入口文件
                    app: path.resolve(__dirname,entryUrl)
                },
                output: { // 输入文件
                    filename: devMode ? '[name].js' : '[name].[hash:6].js',
                    path: path.resolve(__dirname,`../dist/${process.env.MODULE}/`), // 根据执行命令获取到MODULE变量动态的创建输出文件夹
                    publicPath: '/',
                },
                plugins: [
                    new CleanWebpackPlugin(), // 清楚上次打包的结果
                    new HtmlWbpackPlugin({ // 拷贝html到指定的目录并且引入打包之后的js文件
                        template: path.resolve(__dirname, '../src/index.html'), // 要拷贝的文件
                        filename: 'index.html', // 拷贝之后的文件名
                    }),
                ],
            }
        </pre>
        <p>- 删除mode: 'none'</p>
        <p>- devMode判断当前执行的是开发环境还是生产环境的命令</p>
        <p>- const entryUrl = `../src/pages/modules/${process.env.MODULE}/index.js`</p>
        <p>process.env.MODULE获取到正在执行命令上的MODULE(在package.json中配置的命令)从而动态的指定入口文件，不同子应用的入口文件不同</p>
        <p>- path: path.resolve(__dirname,`../dist/${process.env.MODULE}/`)</p>
        <p>process.env.MODULE获取到正在执行命令上的MODULE(在package.json中配置的命令)从而动态的指定出口文件，不同子应用的出口文件不同</p>
        <p>指定npm run build-sum:sit命令，获得以下结果，注意这次输出路径是根据子应用名称动态配置的</p>
        <pre class="code">
            <img src="@img/react-training4.png" alt="">
        </pre>
        <h3>配置react</h3>
        <p>1. 安装react和react-dom</p>
        <pre class="code">
            cnpm i --save react react-dom
        </pre>
        <p>2. 初始化index.js,子应用的index.js需要引入子应用下的app.js</p>
        <pre class="code">
            <img src="@img/react-training2.png" alt="">
        </pre>
        <p>3. 安装babel-loader、@babel/core、@babel/preset-react</p>
        <pre class="code">
            cnpm i --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react
        </pre>
        <p>说明</p>
        <p>@babel/preset-react转化JSX语法</p>
        <p>@babel/core babel核心库</p>
        <p>babel-loader将 ECMAScript 2015+ 的标准api转换为当前和旧版浏览器或环境中的向后兼容版本的 JavaScript</p>
        <p>@babel/preset-env各个插件的组合库 根据配置的目标浏览器或者运行环境来自动将ES2015+的代码转换为es5</p>
        <p>4. 根目录创建.babelrc.js文件，文件内容如下</p>
        <pre class="code">
            module.exports = {
                presets: ['@babel/preset-react'],
            };
        </pre>
        <p>说明</p>
        <p>presets预设，是一系列插件的集合，@babel/preset-react包含@babel/plugin-syntax-jsx、@babel/plugin-transform-react-jsx、@babel/plugin-transform-react-display-name</p>
        <p>5. 修改Webpack配置（webpack.base.js）</p>
        <pre class="code">
            const webpack = require('webpack');
            module.exports = { 
                ...
                resolve: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'], // import自动添加这些后缀
                    alias: { // 配置别名
                        '@': path.resolve(__dirname, '../src')
                    }
                },
                module: {
                    rules: [
                        {
                            test: /(\.js(x?))|(\.ts(x?))$/, // 解析js使用babel-loader，并且缓存
                            exclude: /[\\/]node_modules[\\/]/,
                            loader: 'babel-loader?cacheDirectory=true'
                        },
                    ]
                },
                plugins: [
                    ...
                    new webpack.ProvidePlugin({ // 像每个文件中注入react，使用的时候无需手动引入
                        React: 'react',
                    }),
                ],
                optimization: {
                    splitChunks: { // 分包
                        cacheGroups: {
                            commons: {
                            test: /[\\/]node_modules[\\/]/,
                            name: 'vendors',
                            chunks: 'all'
                        },
                    },
                },
            }
        </pre>
        <p>说明</p>
        <p>- 在extensions中定义好文件后缀名后，在import文件的时候，就可以不加文件后缀名了。webpack会按照定义的后缀名的顺序依次处理文件，比如上文配置 extensions: ['.js', '.jsx']</p> 
        <p>- alias中定义了src文件目录的别名是@，这样在文件中引入别的文件的时候，可以直接使用@，而不是去找文件的相对路径。</p>
        <p>- 使用webpack.ProvidePlugin定义自动查找的标志符，上面代码中的React: 'react',指的是当需要变量React的时候，会自动到当前目录或者node_modules中去找react模块。这样就不用在每个组件文件中都使用一次import React from 'react'了。</p>
        <p>- 使用cacheDirectory缓存loader的执行结果。loader: 'babel-loader?cacheDirectory=true',这样设置会使用默认缓存目录node_modules/.cache/babel-loader。</p>
        <p>- splitChunks将通用的模块打包为单独的一个文件，如果不配置splitChunks，那么代码会全部打包到app.hash.js中，导致app.hash.js文件很大，js越大，请求js文件和执行文件的时间越长，页面呈现给用户的耗时就越久</p>
        <p>6. 使用@babel/preset-env</p>
        <pre class="code">
            cnpm i --save-dev @babel/preset-env
        </pre>
        <p>修改.babelrc.js文件</p>
        <pre class="code">
            module.exports = {
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: '> 2% in CN and not ie 《= 8 and not dead',
                        },
                    ],
                    '@babel/preset-react',
                ],
            };
        </pre>
        <p>说明</p>
        <p>targets: '> 2% in CN and not ie 《= 8 and not dead',选择目标环境为：中国区统计数据为2%以上的浏览器，不包括版本号小于8的IE浏览，不包括官方已经不维护的浏览器。</p>
        <p>7. 安装react-router</p>
        <pre class="code">
            cnpm i --save react-router-dom
        </pre>
        <p>8. 安装less和postcss</p>
        <pre class="code">
            cnpm i less less-loader css-loader style-loader postcss-loader postcss-preset-env postcss-import cssnano postcss-safe-parser mini-css-extract-plugin -D
        </pre>
        <p>postcss-preset-env: 是插件的集合，包括了autoprefixer、postcss-cssnext</p>
        <p>mini-css-extract-plugin: 把css单独抽离成一个文件</p>
        <p>cssnano: 压缩css</p>
        <p>postcss-pxtorem: px 单位自动转换 rem</p>
        <p>postcss-assets: 插件用来处理图片和 SVG, 类似 url-load</p>
        <p>postcss-sprites: 自动合成雪碧图，提供了细致的配置方法、插件去自定义控制（看上去略复杂）</p>
        <p>img-loader: 自动压缩图片，参数控制压缩比率</p>
        <p>postcss-font-magician: 使用自定义字体时, 自动搞定@font-face 声明</p>
        <p>以上常用的插件，根据项目使用情况进行安装和使用</p>
        <p>在根目录创建postcss.config.js </p>
        <pre class="code">
            module.exports = {
                plugins: {
                    'postcss-import': {},
                    'postcss-preset-env': {},
                    'cssnano': {},
                    'postcss-flexbugs-fixes': {},
                }
            }
        </pre>
        <p>修改webpack.base.js</p>
        <pre class="code">
            const MiniCssExtractPlugin = require('mini-css-extract-plugin');
            module: {
                rules: [
                    {
                        test: /(\(\.less)|(\.css)$/i, // 处理css和less
                        exclude: /[\\/]node_modules[\\/]/,
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    esModule: true, // 支持ES模块语法
                                    hmr: devMode, // CSS文件的模块热重载
                                },
                            },
                            'css-loader',
                            'postcss-loader',
                            'less-loader',
                        ],
                    },
                ]
            },
            plugins: [
                new MiniCssExtractPlugin({ // 提取Css为单独的文件
                    filename: devMode ? '[name].css' : '[name].[hash].css',
                }),
            ],
        </pre>
        <p>8. 处理图片和字体文件</p>
        <pre class="code">
            cnpm i --save-dev file-loader url-loader
        </pre>
        <p>修改webpack.base.js</p>
        <pre class="code">
            module: {
                rules: [
                    ...
                    {
                        test: /\.(png|jpe?g|gif)$/,
                        exclude: /[\\/]node_modules[\\/]/,
                        use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'assets/[name].[sha512:hash:base64:7].[ext]',
                            },
                        }
                        ],
                    },
                ],
            }
        </pre>
        <p>设置输出文件的name中assets/指的是将文件放到assets目录下</p>
        <p>到目前为止，整个项目的搭建算是基本完成了，但是还是存在一些问题，下面是处理以上存在的问题</p>
        <p>- 启动项目，刷新页面会报找不到路径，需要配置 historyApiFallback: true,找不到时返回到首页</p>
        <p>修改webpack.dev.js</p>
        <pre class="code">
            devServer: { // 启动webpack-dev-server本地服务
                open: true, // 开启自动打开浏览器
                hot: true, // 开启热更新
                historyApiFallback: true,
            }
        </pre>
        <p>如果项目引入了antd，在运行时会报less相关的错误，需要降低less版本到3以下，并且把MiniCssExtractPlugin改成style-loader，
            目前还没有找到更好的解决方法，如果有更好的解决方案，欢迎探讨
        </p>
        <h3>下面是进行优化层面的配置</h3>
        <p>1. 分析打包结果</p>
        <pre class="code">
            cnpm i -D webpack-bundle-analyzer
        </pre>
        <p>修改webpack.config.js</p>
        <pre class="code">
            const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; 
            module.exports = { 
                plugins: [
                    new BundleAnalyzerPlugin(), 
                ], 
            };        
        </pre>
        <p>打包的时候执行</p>
        <pre class="code">
            npm run build --report
        </pre>
        <pre class="code">
            <img src="@img/rt1.png" alt="">
        </pre>
        <p>如图可以看出那些地方的体积比较大，可以进行分包处理或者采用cdn的方式引入，从而减小包的体积</p>
        <p>2. 分包</p>
        <pre class="code">
            optimization: {
                runtimeChunk: 'single', //表示生成一个单独的运行时文件，这个文件会被所有的块（chunks）共享。
                splitChunks: {// 分包
                    cacheGroups: {
                        chunks: 'all', // 所有的chunk都应用分包策略
                        minSize: 30000,  // 最小包为30kb才进行分包
                    }
                }
            }
        </pre>
        <p>3. 压缩代码</p>
        <p>Terser新一代的压缩代码工具，支持es6+,因为被很多构建工具内置使用，webpack安装后就会内置Terser,当启用生产环境 就会自动进行代码压缩</p>
        <p>4. tree shaking</p>
        <p>在写代码的时候尽量按需引入，不要全部引入，因为在打包的时候根据没有引入的代码是不会被打包进去的</p>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>

</style>