<template>
  <div>
    <h2 class="div">作用域、作用域链精解</h2>
    <h3>1、作用域精解</h3>
    <pre v-highlightjs>
      <code class="javascript">
        运行期上下文：当函数执行时，会创建一个称为执行期上下文的内部对象。
        一个执行期上下文定义了一个函数执行时的环境，函数每次执行时对应的
        执行上下文都是独一无二的，所以多次调用一个函数会导致创建多个执行
        上下文，当函数执行完毕，他所产生的执行上下文被销毁。

        查找变量：从作用域链的顶端依次向下查找。      
      </code>
    </pre>
    <h3>2、作用域链精解</h3>
    <pre v-highlightjs>
      <code class="javascript">
        [[scope]]：每个javascript函数都是一个对象，对象中有些
        属性我们可以访问，但有些不可以，这些属性不可以访问的属
        性仅供javascript引擎存取,[[scope]]就是其中一个。
        [[scope]]指的就是我们所说的作用域，其中存储了运行期上下文的集合。

        作用域链：[[scope]]中所存储的执行期上下文对象的集合，
        这个集合呈链式链接，我们把这种链式链接叫做作用域链
      </code>
    </pre>
    <h3>3、示例解析</h3>
    <pre v-highlightjs>
      <code class="javascript">
        eg1:
            var a = 234;
            function test(){
              var a = 123;
              console.log(a); //123 testAO.a
            }
            test();
            // test  defiend  --> test.[[scope]] =  0 : GO { a , test}
            // test  doing    --> tese.[[scope]] =  0 : testAO { a }
            //                                      1 : GO {}    

        eg2:
            function a(){
              function b(){
                var b = 234;
                a = 0;
              }
              var a = 123;
              b();
              console.log(a);  // 0
            }
            var glob = 100;
            a();
            // a   defiend   --> a.[[scoped]]  = 0 : GO {a:function(){..},glob:100}   
            // a   doing     --> a.[[scoped]]  = 0 : aAO {
            //                                          a : 123,
            //                                          b : function b() {..}
            //                                       } 
            //                                   1 : GO { a:function(){..},glob:100 }
            // b   defiend   --> b.[[scoped]]  = 0 : aAO {
            //                                          a : 123,
            //                                          b : function b() {..}
            //                                       } 
            //                                   1 : GO { a:function(){..},glob:100 }
            // b   doing     --> b.[[scoped]]  = 0 : bAO { b : 234 }
            //                                   1 : aAO {
            //                                          a : 0,
            //                                          b : function b() {..}
            //                                       } 
            //                                   2 : GO { a:function(){..},glob:100 }  

        eg3:
            function a() {
              function b() {
                function c() {

                }
                c();
              }
              b();
            }   

            // a   defiend  --> a.[[scope]] =  0 : GO

            // a   doing    --> a.[[scope]] =  0 : aAO
            //                                 1 : GO

            // b   defiend  --> b.[[scope]] =  0 : aAO
            //                                 1 : GO

            // a   doing    --> a.[[scope]] =  0 : bAO
            //                                 1 : aAO
            //                                 2 : GO   

            // c   defiend  --> c.[[scope]] =  0 : bAO
            //                                 1 : aAO
            //                                 2 : GO

            // a   doing    --> c.[[scope]] =  0 : cAO
            //                                 1 : bAO
            //                                 2 : aAO
            //                                 3 : GO      
            // aAO,bAO引用同一个地址                        
      </code>
    </pre>
  </div> 
</template>

<script>
export default {
};
</script>

<style>
</style>