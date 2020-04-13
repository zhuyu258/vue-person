<template>
    <div>
        <h1>工程化项目中css存在的问题</h1>
        <h2>一. 类名冲突</h2>
        <pre>
        解决方案:  
        <h3>   1. 命名约定</h3>
        1.1 BEM
            全称：Block Element Modifier
            Block: 整个区域，eg: 导航区域 -> nav
            Element: 区域中的某个小区域 eg: 导航区域中的某项 -> item -> nav__item
            Modifier: 可选，通常表示状态 eg: 导航区域中选中某一项 -> active -> nav__item__active
        1.2 OOCSS
        1.3 AMCSS
        ...
        <h3>   2. css in js</h3>    
        将css样式变成一个个对象，放在js中。通过js绑定到元素的style属性上
        通常有以下封装：
            2.1 公共样式提取到公共模块中返回
            2.2 通过一个函数返回一个样式对象
            2.3 通过js进行混合
            ...
        
        vue,react中就使用了css in js

        特点：
            1. 避免了命名冲突，因为没有用到任何css选择器
            2. 更加灵活
            3. 应用更加广泛， 只要支持js语言的都可以使用
            4. 书写不方便
            5. 页面中增加了大量的冗余代码

        <h3>   3. css module</h3>  
        和构建工具一起使用
        实现：
            webpack中使用css-loader处理css,css-loader中实现了css module,
            需要在配置中设置modules

        实现原理：
            设置modules的css-loader，会通过这个样式的类名和模块名进行转换
            成一个hash值，不同模块中即使类名相同但是转换后的hash也不同，因此
            有效的防止了命名的冲突

        css-loader实现方式如下:
        <img src="@img/css1.png" alt="">

        
        #转换后的hash值应用到页面中
        css-loader还返回了一个对象表示原类名和转换后的hash类名一一对应，可通过style-loader
        直接获取到这个对应关系的对象，然后直接通过原类名可以使用对应的样式

         <img src="@img/css2.png" alt="">

         style-loader获取到的对应关系对象，以及使用

        <img src="@img/css4.png" alt=""> 
        <img src="@img/css3.png" alt="">

        不需要进行css module转换的可以使用:global限制
        eg:
            :global(.类名){}

        <h4 class="error">   注意事项</h4>
        1. css module一般配合构建功能使用
        2. css module仅仅处理顶级类名，不要嵌套
        3. css module仅仅处理类名和id，其他选择器不做处理
        4. css module中类名的定义可以不遵循其他规范

    </pre>
        <h5>二. 类名冲突</h5>
        <h5>三. 类名冲突</h5>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>

</style>