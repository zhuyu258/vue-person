<template>
  <div>
      <h2>对象、包装类（上）</h2>
      <h3>1、对象的创建</h3>
      <pre v-highlightjs>
        <code class="javascript">
          1：对象字面量/对象直接量
              var obj = {};    
          2：构造函数
              1):系统自带的构造函数；工厂模式，生产出一个独立的对象；与1没什么区别；
                  var obj = new Object(); 
              2}:自定义构造函数（最好命名大驼峰规则，区别函数声明；）
                  function Person(){};
                  var p1 = new Person(); //p1: Person {}
                  
        </code>
      </pre>
      <h3>2、属性的增删改查</h3>
      <pre v-highlightjs>
        <code class="javascript">
          var ssq  = {
            health : 100,
            age:18,
            smoke: function(){
              console.log('i am smoking!');
            },
            drink: function(){
              console.log('i am drink');
              this.health ++; 
            }
          }
          增加,改： ssq.type = 'person';
          删除：   delete ssq.age; //没有属性不会报错
          查： ssq.type
        </code>
      </pre>
      <h3>3、对象调用</h3>
      <pre v-highlightjs>
        <code class="javascript">
          eg1:
              var ssq  = {
                health : 100,
                age:18,
                smoke: function(){
                  console.log('i am smoking!');
                  this.health --;  //this相当于第一人称，代表自己
                },
                drink: function(){
                  console.log('i am drink');
                  this.health ++; 
                }
              }
              ssq.smoke();  //ssq.health 99
              ssq.drink();  //ssq.health 100

          eg2:
              function Ssq(){
                health : 100,
                smoke: function(){
                  console.log('i am smoking!');
                  this.health --;  //this相当于第一人称，代表自己
                },
                drink: function(){
                  console.log('i am drink');
                  this.health ++; 
                }
              }
              var s1 = new Ssq();
              var s2 = new Ssq();
              s1.smoke();  // s1.health -- 99 , s2.health --100
          
          eg3: 运行test() 和 new Test()的结果分别是什么？
              var a = 5;
              function test(){
                a = 0;
                console.log(a);
                console.log(this.a);
                var a ;
                console.log(a);
              }

              test();      // 0,5,0
              new test();  // 0,undefined,0

          eg4:
              function Person(name,age){
                var a = 0;
                this.name = name;
                this.age = age;
                function sss(){
                  a++;
                  document.write(a);
                }
                this.say = sss;
              }
              var p1 = new Person();
              p1.say();   //1
              p1.say();   //12
              var p2 = new Person();
              p2.say();   //121
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