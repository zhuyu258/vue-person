<template>
  <div>
    <h2 class="div">立即执行函数</h2>
    <h3>1、定义</h3>
    <pre v-highlightjs>
      <code class="javascript">
        此类函数没有声明，在一次执行过后即释放。（其他无任何区别）
        // 声明函数
        function a(){
          var a=123,
              b=234;
          console.log(a+b);
        }
        a();  //357
        console.log(a); // function a(){***}

        // 立即执行函数
        (function a(){
          var a=123,
              b=234;
          console.log(a+b);  // 357
        }())  
        console.log(a);   //1 Uncaught ReferenceError: a is not definedat

        //同样有返回值
        var num = (function(a,b){
          return a+b;
        }(1,2))
        console.log(num);  //3

      </code>
    </pre>
    <h3>2、一般什么时候用</h3>
    <pre v-highlightjs>
      <code class="javascript">
        只执行一次的函数或者执行一次后只要结果；
        针对初始化功能的函数
      </code>
    </pre>
    <h3>3、两种常用写法</h3>
    <pre v-highlightjs>
      <code class="javascript">
        1：(function(){}());   //w3c 建议第一种
        2：(function(){})();

        function test(){}()   //报错，只有表达式才会被执行；
        +function test(){}()       //表达式可以执行
        var test = function(){}(); //表达式可以执行
        123，test()       //都是表达式 
        function test(){} //这个是函数声明
      </code>
    </pre>
    <h3>4、能被执行符号执行的表达式，函数的名字会自动被忽略；</h3>
    <pre v-highlightjs>
      <code class="javascript">
        var test = function(){}; 
        console.log(test); // function(){}

        var test = function(){}();
        console.log(test); // undefiend
      </code>
    </pre>
  </div> 
</template>

<script>
export default {};
</script>

<style>
</style>