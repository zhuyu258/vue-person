<template>
    <div>
        <h1>postcss</h1>
        <h3>postcss是什么?</h3>
    <pre>
        postcss类似一个编译器，将样式代码编译成最终的css代码
    </pre>
        <h3>作用：</h3>
    <pre>
        配合其中的插件，让css书写起来更加简便
    </pre>
        <h3>原理：</h3>
    <pre>
        将样式代码进行分析，然后交给插件进行相应的处理，最后编译成最终的css代码（和webpack有些类似）

        <img src="@img/postcss1.png" alt="">
    </pre>
        <h3>和less、scss的区别</h3>
    <pre>
        1. less和scss是预编译器，是将css作为子集，对css的一种扩展
        2. postcss本身不会对Css做处理，是通过插件进行处理，可以使用未来的css
        3. postcss可以和scss和less混合使用
    </pre>
        <h3>使用：</h3>
        <h4>#安装</h4>
    <pre>
        1. 安装postcss
            npm i -D postcss
        2. 安装执行命令
            npm i -D postcss-cli
            使用方式：
                postcss css源文件 -o 输出文件
    </pre>
        <h4>#配置文件</h4>
    <pre>
        1. 根目录创建postcss.config.js文件
        eg:
            module.exports = {
                map: false 
            }
    </pre>
        <h4>#插件</h4>
    <pre>
        地址: <a href="https://www.postcss.parts/">https://www.postcss.parts/</a>

    </pre>
        <h5>1. postcss-preset-env</h5>
    <pre>
        postcss预设环境，整个了很多常用的插件并且完成了基本的配置，相当于多个插件的集合
        1.1 安装 npm i -D postcss-preset-env
        1.2 postcss配置中设置
            module.exports = {
                plugins: {
                    "postcss-preset-env": {}
                }
            }
    </pre>
        具有的功能：
          <p> - 自动添加厂商前缀</p>  
          <p>默认包含了autoprefixer插件</p>
    <pre class="code">
        eg:
            @keyframes move{
                from {background: red;}
                to {background: yellow;}
            }
    </pre>
       <p> 编译之后：</p> 
    <pre class="code">
            @keyframes myfirst
            {
            from {background: red;}
            to {background: yellow;}
            }

            @-moz-keyframes myfirst /* Firefox */
            {
            from {background: red;}
            to {background: yellow;}
            }

            @-webkit-keyframes myfirst /* Safari 和 Chrome */
            {
            from {background: red;}
            to {background: yellow;}
            }

            @-o-keyframes myfirst /* Opera */
            {
            from {background: red;}
            to {background: yellow;}
            }
    </pre>
        <p> - 设置浏览器的兼容范围</p>
    <pre class="code">
        方法1：

        module.exports = {
            plugins: {
                "postcss-preset-env": {
                    browsers: [
                        last 2 version
                        > 1% in CN
                        not ie <= 8
                    ]
                }
            }
        }    

        方法2：
        添加 .browserslistrc 文件，直接写入配置

            last 2 version
            > 1% in CN
            not ie <= 8
        
        方法3：
        在package.json的配置中加入browserslist

        "browserslist": [
            "last 2 version",
            "> 1% in CN",
            "not ie <= 8"
        ]

        含义：
            last 2 version: 浏览器的兼容最近期的两个版本
            > 1% in CN: 匹配中国大于1%的人使用的浏览器， in CN可省略
            not ie <= 8: 排除掉版本号小于等于8的IE浏览器
    </pre>
        <p> - 使用未来的css</p>
        <p>默认包含了cssnext插件</p>
    <pre class="code">
        "postcss-preset-env": {
            stage: 2
        }
    </pre>
    <pre>
        一共有5个阶段可配置：默认是2
        Stage 0: Aspirational - 只是一个早期草案，极其不稳定
        Stage 1: Experimental - 仍然极其不稳定，但是提议已被W3C公认
        Stage 2: Allowable - 虽然还是不稳定，但已经可以使用了
        Stage 3: Embraced - 比较稳定，可能将来会发生一些小的变化，它即将成为最终的标准
        Stage 4: Standardized - 所有主流浏览器都应该支持的W3C标准
    </pre>
    <p>定义变量</p>
    <pre class="code">
        eg:
            :root{
                --color: #ddd; // 定义变量
            }

            a{
                color: var(--color); // 使用变量
            }
    </pre>
    <h4> css规范 - stylelint</h4>
    <pre>
        作用：
        平时可能不注意或者不规范的书写css代码，需要通过stylelint进行规则检验

        不同公司具有不同的css书写规范，stylelint并没有提供具体的规则验证，需要
        安装第三方或者自行编写规范规则

        通过使用stylelint-config-standard插件来检验
        1.安装
    </pre>    
        <pre class="code">
        npm i -D stylelint-config-standard
        </pre> 
        <p>2. 添加.stylelintrc.js文件，写入一下内容，告知stylelint使用的是哪个插件</p>
        <pre class="code">
            {
                "extends": "stylelint-config-standard"
            }
        </pre>
        <pre>

        只有在编译的时候才会进行校验，如果没有按照规范书写，就会在编译过程中报错
        我们可以配置stylelint-config-standard中的规范，根据文档进行配置<a href="https://stylelint.io/">https://stylelint.io/</a>
        </pre>
        <p>3. 配置规范</p>
        <pre class="code">
        {
            "extends": "stylelint-config-standard",
            "rules": {
                "indentation": null // 不使用缩进这个规则
            }
        }
        </pre>
    <pre>

    4. 忽略stylelint要检验的文件
    创建.stylelintignore文件，直接写入忽略的文件
    eg:
        *.min.css
        
    5. 如果我们希望代码在编写的时候就校验代码的规范，可以在vscode中安装插件stylelint
        一般使用了这个插件就不需要使用postcss中进行配置了
    </pre>
        
    </div>
</template>
<script>

</script>
<style lang="less" scoped>
    h3,h4{
        margin: 12px 0;
    }
    span{
        width: 100px;
        display: inline-block;
        background: rgba(blue, blue, blue, 0.4);
    }
    
</style>