<template>
  <div>
      <h2>对象、包装类（下）</h2>
      <h3>1、构造函数内部原理</h3>
      <pre v-highlightjs>
        <code class="javascript">
          1.在函数体最前面隐式的加上this={}
          2.执行this.xxx = xxx;
          3.隐士的返回this
          
          function Person(name,height){
            <!-- 执行new Person() -->
            // 1.var this = {};
            // 2.执行this.xxx = xxx;
            this.name = name;
            this.height = height;
            this.say - function(){
              console.log(this.say);
            }
            // 3.return this;
            // 倘若自己显示返回123，'123'等不是数组或者对象，则仍返回this
          }
        </code>
      </pre>
      <h3>2、包装类</h3>
      <pre v-highlightjs>
        <code class="javascript">
          eg1:
              var num = 4;
              num.len = 3;             //new Number(4).len = 3;  delete 所以不报错
              console.log(num.len);    //new Number(4).len --> undefined 

          eg2:
              var str = 'abcd';
              str.length = 2;          //new String('abcd').length  delete 销毁的是新建的，所以不报错
              console.log(str);        //'abcd'
              console.log(str.length); //new String('abcd').length  ==> 4

          eg3:
              var str = 'abc';
              str += 1;
              var test = typeof(str); //test = 'string'
              if(str.length == 6){
                test.sign = 'sign';   //new String(test).sign = 'sign';
              }
              console.log(test.sign); //new String(test).sign ==> undefined

          
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