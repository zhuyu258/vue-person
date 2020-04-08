<template>
  <div>
    <h2>预编译</h2>
    <h3>1、js运行三部曲</h3>
    <pre v-highlightjs>
      <code class="javascript">
        1、语法分析
            代码执行前通篇扫描下代码,不执行,检查是否有语法错误
        2、预编译
        3、解释执行
      </code>
    </pre>
    <h3>2、举例最简单预编译</h3>
    <pre v-highlightjs>
      <code class="javascript">
        //函数声明整体提升(移到所有代码最前面)
        //变量 声明提升 var a
        //预编译简单两个现象,这么理解不能解释所有现象

        test();  //11 能执行
        function test(){
          console.log(11);
        }

        console.log(a); //undefined
        var a = 1;
      </code>
    </pre>
    <h3>3、全局变量</h3>
    <pre v-highlightjs>
      <code class="javascript">
        (1): imply global 暗示全局变量(即任何变量,如果
        变量未经声明就赋值,此变量就为全局对象所有)
          a = 123;          ==>window.a = 123

          function test(){
            var a = b = 123;
            //123赋值给b,b是未经声明的,归window所有
            //声明a
            //把b赋值给a
          }
              ==>window.a = undefined
              ==>window.b = 123

        (2): 一切声明的全局变量,全是window的属性
          var a = 123;      ==>window.a = 123
      </code>
    </pre>
    <h3>4、函数内预编译四部曲</h3>
    <pre v-highlightjs>
      <code class="javascript">
        //预编译发生在函数执行前的一刻
        (1): 创建AO对象(Activation Object)(执行期上下文)
        (2): 找形参和变量声明,将变量和形参名作为AO属性名,值为undefined
        (3): 将实参值和形参统一
        (4): 在函数体里面找函数声明,值赋予函数体

        eg1:
            function fn(a){
              console.log(a);       // function a() {}
              var a = 123;      
              console.log(a);       // 123
              function a(){}
              console.log(a);       // 123
              var b = function(){}
              console.log(b);       // function b() {}
              function d(){}
            }
            fn(1);
            // 解析过程
            1) AO {}
            2) AO {
              a: undefined,
              b: undefined
            }
            3) AO {
              a: 1, //实参为1
              b: undefined
            }
            4) AO {
              a: function a() {},
              b: undefined,
              d: function d() {}
            }
            // 执行fn(1)后
            AO {
              a: 123,
              b: function b() {},
              d: function d() {}
            }

        eg2:
            function test(a,b){
              console.log(a);   // 1
              c = 0;
              var c;
              a = 3;
              b = 2;
              console.log(b);  // 2
              function b() {}
              function d() {}
              console.log(b);  // 2
            }
            test(1)
            // 解析过程
            1) AO {}
            2) AO {
              a: undefined,
              b: undefined,
              c: undefined
            }
            3) AO {
              a: 1, //实参为1
              b: undefined,
              c: undefined
            }
            4) AO {
              a: 1,
              b: function b() {},
              c: undefined,
              d: function d() {}
            }
            // 执行test(1)后
            AO {
              a: 3,
              b: 2,
              c: 0,
              d: function d() {}
            }

        eg3:
            function test(a,b){
              console.log(a);      // function a() {}
              console.log(b);      // undefined
              var b = 234;
              console.log(b);      // 234
              a = 123;
              console.log(a);      // 123
              function a() {}
              var a;
              b = 234;              
              var b = function () {}
              console.log(a);     // 123
              console.log(b);     // 
              function () {}
            }
            test(1)
            // 解析过程
            1) AO {}
            2) AO {
              a: undefined,
              b: undefined
            }
            3) AO {
              a: 1, //实参为1
              b: undefined,
            }
            4) AO {
              a: function a() {},
              b: undefined,
            }
            // 执行test(1)后
            AO {
              a: 123,
              b: function () {},
            }
      </code>
    </pre>
    <h3>5、全局预编译过程</h3>
    <pre v-highlightjs>
      <code class="javascript">
        eg1:
            console.log(a);  // function a() {}
            function a(){};
            var a = 1;

            // 解析过程
            // 创建 GO对象(Global Object)
            GO {
              a: function a() {}
            }

        eg2: 
            console.log(test);    // function test(){****}
            function test() {
              console.log(test);  // function test(){}
              var test = 24;
              console.log(test);  // 24
              function test() {}
            }
            test(1)
            var test = 123;

            // 解析过程
            // 创建GO {
              test: function test(){ *** }
            }
            // 执行test(1),创建AO {},执行4部曲

        eg3:
            global = 100;
            function fn(){
              console.log(global); // undefined
              global = 200;
              console.log(global); // 200
              var global = 300;
            }

            fn();
            var global;

            // 解析过程
            GO {
              global:100,
              fn : fn() {***}
            }
            fn(); ==> AO {
              global:undefined,
            }

        eg4:
            function test(){
              console.log(b);  // undefined
              if(a) {         
                var b = 100;
              }
              c = 234;
              console.log(c);  // 234
            }
            var a;
            test();
            a = 10;    
            console.log(c);    // 234

            // 解析过程
            GO {
              test: test(){****},
              a : undefined
            }
            test() ==>
            AO {
              b : undefined
            }
            GO {
              test: test(){****},
              a : undefined ,
              c : 234
            }

        eg5:
            a = 100;   // go中a = 100;
            function demo(e) {
              function e(){}      // AO中e为function  
              arguments[0] = 2;   // 映射关系,AO中e = 2
              console.log(e);     // 2
              if(a){              // a为undefiend,代码块便不执行
                var b = 123;
                c = 10;
              }
              var c;
              a = 10;             // AO中 a = 10
              var a;
              console.log(b);     // undefined
              f = 123;            // GO中f = 123
              console.log(c);     // undefined
              console.log(a);     // 10
            }
            var a;
            demo(1);
            console.log(a);       // 100
            console.log(f);       // 123
      </code>
    </pre>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>