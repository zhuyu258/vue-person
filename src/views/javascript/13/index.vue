<template>
  <div>
      <h2>原型</h2>
      <h3>1、原型介绍</h3>
      <pre v-highlightjs>
        <code class="javascript">
          1) 定义：原型是function对象的一个属性，它定义了构造函数制造出的对象的公共祖先。
                  通过该构造函数产生的对象，可以继承该原型的属性和方法。
                  原型也是对象
          2) 利用原型特点和概念，可以提取共有属性。
          3) 对象查看原型，  --》 隐式属性 __proto__
          4) 对象查看对象的构造函数 --》 constructor
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