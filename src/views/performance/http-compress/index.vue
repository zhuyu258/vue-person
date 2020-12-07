<template>
    <div class="http-compress">
        <h1>HTTP 压 缩</h1>
        <h3>作用</h3>
        <p>
            通过压缩代码文件来减少 HTTP 响应时间。 
        </p>
        <p>
            Gzip 是目前最流行以及最有效的压缩方法。其它你有可能看到的压缩格式是 deflate,但 是它不是很流行以及很有效。 
            从 HTTP/1.1 开始，web 客户端就开始支持 HTTP 请求的 Accept-Encoding header。 Accept-Encoding: gzip, deflate 
            如果 web 服务器在请求中看到这种 header,它就会用客户端列出来的方法来压缩响应内容。web 服务器通过响应头返回 Content-Encoding header 
            通知 web 客户端，(ContentEncoding: gzip )使用哪种解压方式进行解压
        </p>
        <p>
            Gzip 通常可以把响应内容大小减少 70%。目前浏览器当中接近 90%的网络流量支持 gzip
        </p>
        <p>
            Gzip可以压缩任何文本响应内容，但是实际中，使用Gzip压缩的文件是根据文件的大小和类型进行压缩，一般压缩html,js,css,json等，图片和PDF不建议
            进行压缩，因为它们在上传的时候已经被压缩了，此时再次压缩不仅浪费cpu而且可能使其越压越大。
        </p>
        <h3>gZip </h3>
        <p>
            gzip 是 GNUzip 的缩写，最早用于 UNIX 系统的文件压缩。HTTP 协议上的 gzip 编码是一种 用来改进 web 应用程序性能的技术，web 服务器和客户端（浏览器）必须共同支持 gzip。
            目前主流的浏览器，Chrome,firefox,IE 等都支持该协议。常见的服务器如 Apache， Nginx，IIS 同样支持 gzip;
            gzip 压缩比率在 3 到 10 倍左右，可以大大节省服务器的网络带宽。而在实际应用中，并 不是对所有文件进行压缩，通常只是压缩静态文件
        </p>
        <img src="@img/httpc1.png" alt="">
        <p>
            1.浏览器请求url,并在请求头中设置accpet-encoding:gzip.表明浏览器支持gzip
        </p>
        <p>
            2.服务端接收到浏览器发来的请求，根据请求头判断是否支持gzip，如果支持就向
              浏览器传输content-encoding:gzip和压缩过的内容，不支持则向浏览器发送未
              经压缩的内容；
        </p>
        <p>
            3.浏览器收到服务器响应的内容之后，判断内容是否被压缩，如果被压缩根据content-encoding
              的解压方式进行解压
        </p>  
        <h4>Nginx 中开启 gzip</h4>
        <p>
            如果服务端接口使用 nodejs 和 express，那么开启 nginx 非常简单。启用 compress() 中间件
            即可并在 nginx.conf 中添加 gzip 配置项即可，express.compress() gzip 压缩中 间件，通
            过 filter 函数设置需要压缩的文件类型。压缩算法为 gzip/deflate。这个中间 件应该放置在所
            有的中间件最前面以保证所有的返回都是被压缩的。如果使用 java 开 发，需要配置 filter。 
            下面详细介绍一下如何在 nginx.conf 中配置 gzip。配置的 gzip 参数图所示： 
        </p>
        <pre class="code">
            #gzip  on;
            gzip on;
            gzip_comp_level 9;
            gzip_min_length 100;
            gzip_types text/plain text/css application/xml application/javascript;
        </pre>
        <p>参数说明</p>
        <p>1. gzip on; 开启gzip压缩</p>
        <p>2. gzip_comp_level 9; 压缩级别，1-10，数字越大压缩的越好，也越占用 CPU 时间</p>
        <p>3. gzip_min_length 100; 允许被压缩的最小字节数</p>
        <p>4. gzip_types 匹配 MIME 类型进行压缩，text/html 默认被压缩。 </p>
        <h3>浏览器对压缩的兼容性</h3>
        <p>
           HTTP/1.0 是 1996 年 5 月发布的。好消息是基本不用考虑兼容性的问题，几乎所有浏览 器都支持它。
           ie6 的早起版本中存在一个会破坏 gZip 的错误，后 面 ie6 本身在 WinXP SP2 中修复了这个问题，
           而且用这个版本的用户数量也很少 
        </p>
        <h3>应用构建时压缩文件</h3>
        <p>
            服务端可以压缩文件，但是一般还是在构建打包的时候就压缩了文件，是因为压缩的目的是为了减少从请
            求到响应的时间，如果在打包的时候就进行压缩，这样可以节省出服务端的压缩时间，服务端直接获取到
            压缩之后的文件进行响应
        </p>
        <p>webpack自动集成了Terser,可以进行如下配置</p>
        <pre>
            const TerserPlugin = require('terser-webpack-plugin');
            module.exports = {
                optimization: {
                // 是否要启用压缩，默认情况下，生产环境会自动开启
                minimize: true, 
                minimizer: [ // 压缩时使用的插件，可以有多个
                    new TerserPlugin(), 
                ],
                },
            };
        </pre>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>

</style>