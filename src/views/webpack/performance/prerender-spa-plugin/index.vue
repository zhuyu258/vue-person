<template>
    <div>
        <h1>单页面首屏加载慢和SEO问题</h1>
        <p>可以使用以下方案</p>
        <h2>1. prerender-span-plugin预渲染插件</h2>
        <p>prerender-span-plugin预渲染插件，就是在打包的时候根据指定的路由，把路由对应的页面渲染为html输出，
           那么指定多少路由打包的时候就输出多少html页面，生成了html页面相当于原生h5，浏览器直接从服务端获取
           相应的html，从而降低了首屏的显示时间
        </p>
        <h3>原理：</h3>
        <p>prerender-span-plugin是利用了Chrome推出的Puppeteer库，进行页面的爬取。Puppeteer是一个Node库，
           默认为headless模式(无头模式)，在无需UI的情况下通过 DevTools 协议控制Chrome;在webpack构建阶段的
           最后，在本地启动Puppeteer服务，然后根据指定的预渲染路由，将相应的页面输出到html文件中，并建立相应的目录
        </p>
        <img src="@img/prerend.png" alt="prerender-span-plugin">
        <h3>使用:</h3>  
        <p>前提条件，vue的路由必须使用history模式</p>
        <p>安装</p>  
        <pre class="code">
            cnpm i -D prerender-span-plugin
        </pre>
        <p>配置webpack.config.js</p>
        <pre>
            const PrerenderSPAPlugin = require('prerender-spa-plugin')
            const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
            plugins: [
                new PrerenderSPAPlugin({
                    staticDir: path.join(__dirname, 'dist'),  // 注意路径不能错
                    // indexPath: path.join(__dirname, '../dist', 'index.html'), 
                    routes: ['/', '/summary','/babel','/performance','/postcss','/prerenderSpaPlugin'],
                    renderer: new Renderer({
                        inject: {
                            foo: 'bar'
                        },
                        headless: true, 
                        renderAfterDocumentEvent: 'render-active' 
                        // renderAfterElementExists: '.container', 
                        // renderAfterTime: 5000 
                    })
                })
            ]
        </pre>
        <p>staticDir：预渲染之后文件输出目录</p>
        <p>indexPath: 静态模板页面</p>
        <p>routes: 预渲染的路由</p>
        <p>renderer: 渲染器</p>
        <p>inject: 像预渲染页面注入数据，默认挂在window.__PRERENDER_INJECTED对象上，可以通过window.__PRERENDER_INJECTED.foo在预渲染页面取值</p>
        <p>headless：是否是无浏览器窗口</p>
        <p>renderAfterDocumentEvent： 等到指定的事件触发之后再去进行预渲染</p>
        <p>renderAfterElementExists: 在指定元素渲染之后再去触发预渲染</p>
        <p>renderAfterTime: 指定时间之后进行预渲染</p>
        <p>配置main.js</p>
        <pre class="code">
            new Vue({
                router,
                store,
                render: h => h(App),
                mounted(){ // vue页面挂载之后进行预渲染 
                    document.dispatchEvent(new Event('render-active'))
                }
            }).$mount('#app')
        </pre>
        <h2>缺点：</h2>
        <p>1. 因为是根据路由生成html,所以对于动态的路由是不起作用</p>
        <p>2. 并且不能有同名路由，否则最终只生成一个对应路由的html</p>

        <h2>优化SEO</h2>
        <p>通过vue-meta-info插件进行SEO优化，一般和prerender-span-plugin预渲染插件配合使用</p>
        <h3>原理：</h3>
        <p>根据配置的metaInfo，会在相应的页面中动态的创建title、meta和link元素</p>
        <h3>使用：</h3>
        <p>安装</p>
        <pre>
            cnpm i -D vue-meta-info
        </pre>
        <p>配置main.js</p>
        <pre>
            import MetaInfo from 'vue-meta-info' 
            Vue.use(MetaInfo)  // 使用meta
        </pre>
        <p>组件中使用</p>
        <pre>
            export default {
                metaInfo: {   // 使用vue-meta-info插件
                    title: '性能优化', // set a title
                    meta: [{                 // set meta
                        name: '性能优化',
                        content: '性能优化'
                    }],
                    link: [{                 // set link
                        rel: '性能优化',
                        href: this.href  // 动态配置
                    }]
                }
            }
        </pre>
        <p>输出结果：</p>
        <img src="@img/rerend2.png" alt="">
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="css" scoped>

</style>