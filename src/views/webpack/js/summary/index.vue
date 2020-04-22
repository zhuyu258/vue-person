<template>
    <div>
        <h1>babel总结</h1>
        <h2>原因：</h2>
        <p>不同浏览器中对最新标准的es支持度不尽相同，相同浏览器的不同版本支持度也不相同，因此为了开发者能够使用最新的标准
           语法去兼容所有主流浏览器，就出现了babel
        </p>
        <h2>原理：</h2>
        <p>babel和webpack、postcss一样，仅仅提供代码的分析，真正的转换是借助于插件完成</p>
        <h3>1.babel的安装</h3>
        <p>安装两个库</p>
        <p>- @babel/core: babel的核心库，提供了编译时需要的所有api</p>
        <p>- @bale/cli: babel命令行工具</p>
        <p>npm i -D @babel/core @babel/cli</p>
        <h3>2. babel的使用</h3>
        <p>- 按文件编译</p>
        <p> babel 要编译的文件 -o 编译结果的文件</p>
        <p>- 按目录编译</p>
        <p> babel 要编译的目录 -o 存放编译结果的目录</p>
        <h3>3. babel的配置</h3>
        <p>babel和postcss一样，既有预设又有插件(预设就是一些常用的插件的集合)</p>
        <p>根目录创建一个.babelrc的文件，配置如下代码</p>
        <pre class="code">
            {
                "presets": [],  // 预设
                "plugins": []   // 插件
            }
        </pre>
        <h2> bale预设</h2>
        <p>常见的预设有@babel/preset-env,可以使用最新标准的es语法，无语安装额外的插件</p>
        <p>配置如下：</p>
        <pre class="code">
            {
                "presets": [
                    "@babel/preset-env"
                ]
            }
        </pre>
        <p>预设的使用需要指明兼容的浏览器</p>
        <p>和postcss一样，需要创建.browserslistrc文件来描述兼容的浏览器范围</p>
        <pre class="code">
            last 3 version
            > 1%
            no ie <= 8
        </pre>
        <p>给预设设置自身的配置</p>
        <p>常见的配置有useBuiltIns,预设仅仅转换新的语法并不会对新的api进行转换,默认是false,
            不能够使用最新的Esapi,可以设置为usage
        </p>
        <pre class="code">
            {
                "presets": [
                    ["@babel/preset-env",{
                        "useBuiltIns": 'usage',
                        "corejs": 3  // 指定corejs的版本
                    }]  
                ]
            }
        </pre>
        <h2>babel插件</h2>
        <p>条件：比预设更加广泛，预设只能转换已经形成标准的es语法，对于提案的和最新的非标准Es语法还是不能够转换</p>
        <p>安装core-js和pregenerator-runtime插件可以使用最新的esapi,比如promise,asncy等</p>
        <p>core-js: 提供转换的api</p>
        <p>pregenerator-runtime: 用于转换generator迭代器</p>
        <p>1. babel-plugin-transform-remove-console</p>
        <p>打包的时候删除js中的所有console</p>
        <pre class="code">
            {
                "plugins": [
                    [
                    "babel-plugin-transform-remove-console"
                    ]
                ]
                }
        </pre>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">

</style>