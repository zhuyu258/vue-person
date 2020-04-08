<template>
  <div>
    <h2 class="div">闭包</h2>
    <h3>1、什么情况出现闭包</h3>
    <pre v-highlightjs>
      <code class="javascript">
         当内部函数被保存到外部时，将会生成闭包。闭包会导致原有作用域链不释放，造成内存泄露。
      </code>
    </pre>
    <h3>2、闭包的危害</h3>
    <pre v-highlightjs>
      <code class="javascript">
        内存泄漏就是内存占用，内存被占用的越多，内存就变得越来越少了，就像内存被泄露了一样。
      </code>
    </pre>
    <h3>3、闭包一些应用</h3>
    <pre v-highlightjs>
      <code class="javascript">
        eg1: 实现共有变量
            function a(){
              var num = 100;
              function b(){
                console.log(++num);
              }
              return b;
            }
            var demo = a();  //demo的作用域链为[ 0 : aAO, 1 : GO]，a执行玩，a的作用域链只有Go,不会保存aAO
            demo();  // 101    demo执行时，作用域链仍aAO不会销毁，修改，取值均来自上
            demo();  // 102    demo执行时，作用域链仍aAO不会销毁，修改，取值均来自上

        eg2：累加器
            function add(){
              var count = 0;
              function demo(){
                count++;
                console.log(count);
              }
              return demo;
            }
            var counter = add();
            counter();     // 1
            counter();     // 2
            counter();     // 3
            counter();     // 4

        eg3: 可以做缓存(存储结构)
            function save(age){
              return {
                eat:function(){
                  console.log(age);
                },
                push:function(e){
                  age = e;
                }
              }
            }

            var demo = save('apple');
            demo.eat();   //apple
            demo.push('bananer');  
            demo.eat();   //bananer

        eg4: 可以实现封装，属性私有化
            Person();

        eg5: 模块化开发，防止全局变量
      </code>
    </pre>
  </div> 
</template>

<script>
export default {};
</script>

<style>
</style>