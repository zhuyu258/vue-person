<template>
  <div>
      
      <h2 class="div">闭包精细版</h2>
      <!-- <h3>1、定义</h3> -->
      <pre v-highlightjs>
        <code class="javascript">
          eg1:
              function test(){
                var arr = [];
                for(var i= 0;i&lt;10;i++){
                  arr[i] = function(){
                    console.log(i);
                  }
                }
                return arr;
              }
              var myArr = test();
              for(var j=0;j&lt;10;j++){
                myArr[j](); //10 执行时使用的i是testAO中的i
              }
              //解决方法
              function test(){
                var arr = [];
                for(var i= 0;i<10;i++){
                  arr[i] = (function(k){
                    return function(){
                      console.log(k)
                    }
                  }(i))
                }
                return arr;
              }
              var myArr = test();
              for(var j=0;j&lt;10;j++){
                myArr[j](); //10 执行时使用的i是testAO中的i
              }

          eg2:
              ul下4个li，给每个i添加点击事件。
              var lis = document.getElementsByTagName('li');
              for(var i=0;i&lt;lis.length;i++){
                (function(j){
                  console.log(j)
                  lis[j].onClick = function(){
                    console.log(j);
                  }
                }(i))
              }
        </code>
      </pre>
  </div>
</template>

<script>
export default {
 
}
</script>

<style>

</style>