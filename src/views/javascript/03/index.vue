<template>
  <div>
    <h2 class="div">函数</h2>
    <h3>1、函数声明</h3>
    <pre v-highlightjs>
        <code class="javascript">
          定义一个函数使用function关键字声明

          function test(){
            //函数体
          }
          test是函数名

          函数命名规范： 函数名和变量名如果由多个单词拼接而成，必须符合小驼峰原则
        </code>
      </pre>
    <h3>2、函数表达式</h3>
    <pre v-highlightjs>
        <code class="javascript">
          // 命名函数表达式
          var a = function abc(){ 

          }
          console.log(a.name) //abc
          console.log(abc)    //报错，abc未定义

          // 匿名函数表达式(常用)
          function abc(){

          }
          console.log(abc.name) //abc
          console.log(abc)      //function abc(){}
        </code>
      </pre>
    <h3>3、函数组成</h3>
    <pre v-highlightjs>
        <code class="javascript">
          function test(a,b){
            // a,b为形参，相当于test函数内隐士创建了var a = undefined , b = undefined;
            // console.log(arguments); arguments是代表实参的一个类数组
          }
          console.log(test.length); // 2 ，打印test函数的形参个数 

          test(1,2); //arguments:  [1,2];
          //1，2为实参
          //则a与argumens[0]建立对应映射关系,b与argumens[1]建立对应映射关系
          //一方改变则另一方也改变

          test(1); //arguments:  [1];
          //1为实参
          //则a与argumens[0]建立对应映射关系
          //函数内执行arguments[1] = 1, 此时b仍为undeifined

          test(1,2,3); //arguments:  [1,2,3];
          //1,2,3为实参
          //则a与argumens[0]建立对应映射关系,b与argumens[1]建立对应映射关系

        </code>
      </pre>
    <h3>4、return 返回值</h3>
    <pre v-highlightjs>
        <code class="javascript">
          function test(a,b){
            console.log(a);
            return 3;
            console.log(b)
          }
          
          return两个功能
            1:结束函数
            2:返回值
          test(1,2);           //打印出a,b不会打印出来
          var num = test(1,2); //num = 3
        </code>
      </pre>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>