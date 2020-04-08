<template>
  <div>
    <h2 class="div">递归</h2>
    <h3>1、写一个函数,实现n的阶乘</h3>
    <pre v-highlightjs>
        <code class="javascript">
          // n的阶乘  = n * n-1的阶乘
          function test(n){
            if(n===1){return 1}
            else{
              return n * test(n-1)
            }
          }
        </code>
      </pre>
    <h3>2、实现斐波那契额数列</h3>
    <pre v-highlightjs>
        <code class="javascript">
          function test(n){
            if(n===1 || n ===2){return n}
            else{
              return test(n-1) * test(n-2)
            }
          }
        </code>
      </pre>
    <h3>3、递归总结</h3>
    <pre v-highlightjs>
        <code class="javascript">
          优点:代码简洁
          缺点:速度慢
          
          递归关键点
            1:找规律
            2:找出口
        </code>
      </pre>
    <div></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>