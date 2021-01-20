<template>
  <div>
      <pre>
          <h2>性能方面</h2>
            vue3性能得到很大提高，提高1.3～2倍,SSR速度提高了2～3倍;将从以下的主要几点分析性能方面提升的原因；

            1. 静态提升
                静态元素提升到render前面; 所以每次更新渲染的时候不再重新创建这些静态元素，从而提升了创建虚拟dom和diff对比的时间

                静态节点：

                <h1>hello world</h1>
                vue2中的静态节点:
                render(){
                    reateVNode('h1',null,'hello world')
                }

                vue3中的静态节点提升：
                const hoisted = createVNode('h1',null,'hello world') // 静态提升了
                function render(){ // 使用hoisted }
                
                <img src="@img/vue32.png" alt="">
                
                静态属性：

                <div>
                    <h1 class="name">{{a}}</h1>
                </div>

                vue2中的静态属性:
                render(){
                    reateVNode('h1', { class: 'name'}, name)
                }

                vue3中的静态属性提升：
                const hoisted = { class: 'name'}

                function render(){
                    reateVNode('h1', hoisted, name)
                }

                <img src="@img/vue33.png" alt="">

            2. 预字符串化
                连续20个以上的静态元素，直接转为字符串节点，不用每个都创建为虚拟dom，大大节省了时间
                <div>
                <h3>{{name}}</h3>
                <ul>
                    <li>1test</li>
                    <li>2test</li>
                    <li>3test</li>
                    <li>4test</li>
                    <li>5test</li>
                    <li>6test</li>
                    <li>7test</li>
                    <li>8test</li>
                    <li>9test</li>
                    <li>10test</li>
                    <li>11test</li>
                    <li>12test</li>
                    <li>13test</li>
                    <li>14test</li>
                    <li>15test</li>
                    <li>16test</li>
                    <li>17test</li>
                    <li>18test</li>
                    <li>19test</li>
                    <li>20test</li>
                    <li>21test</li>
                </ul>
                </div>
                vue2中：
                _createBlock("ul", { class: "name" }, [
                    _createVNode("li", null, "1test"),
                    _createVNode("li", null, "2test"),
                    _createVNode("li", null, "3test"),
                    _createVNode("li", null, "4test"),
                    _createVNode("li", null, "5test"),
                    _createVNode("li", null, "6test"),
                    _createVNode("li", null, "7test"),
                    _createVNode("li", null, "8test"),
                    _createVNode("li", null, "9test"),
                    _createVNode("li", null, "10test"),
                    _createVNode("li", null, "11test"),
                    _createVNode("li", null, "12test"),
                    _createVNode("li", null, "13test"),
                    _createVNode("li", null, "14test"),
                    _createVNode("li", null, "15test"),
                    _createVNode("li", null, "16test"),
                    _createVNode("li", null, "17test"),
                    _createVNode("li", null, "18test"),
                    _createVNode("li", null, "19test"),
                    _createVNode("li", null, "20test"),
                    _createVNode("li", null, "21test")
                ]))
                
                vue3:
                const hoisted = _createStaticVNode('<ul><li></li>......</ul>')
                <img src="@img/vue31.png" alt="">

            3. 缓存事件处理函数
                事件进行缓存，下次更新的时候直接读取缓存中的事件函数

                <button @click="a++">点击</button>

                vue2中处理事件
                render(ctx){
                    return createVNode('button', {
                    onClick: function($event){
                        ctx.a++
                    }
                    })
                }

                vue3中处理事件
                render(ctx,cache){
                    return createVNode("button", {
                    onClick: cache[0] || (cache[0] = ($event)=>{ctx.a++})  // 不存在就进行了缓存
                    })
                }
                <img src="@img/vue34.png" alt="">

            4. Block Tree
                vue2中在对比新旧dom树的时候，不知道哪些是静态节点哪些是动态节点，dom上的所有节点都要进行对比，
                而在vue3中。记录dom树下的所有动态子节点(dom树下有不确定的节点，都会创建为一个新的Block tree)，
                在虚拟dom对比的时候只比较动态的元素是否变化，静态元素不再比较，从而节省了很多时间

            5. PatchFlag(静态标记)
                vue2:
                虚拟dom进行全量比较
                vue3:
                记录父节点下的动态子节点上的动态属性或内容(添加标记PatchFlag)，新旧节点对比的时候静态的属性或内容不进行比较，
                只比较动态节点下的动态属性或内容

                PatchFlag：
                    通过位运算符进行计算
                export const enum PatchFlags {
                    TEXT = 1, // 动态文本节点
                    CLASS = 1 《 2, // 2 // 动态class
                    STYLE = 1 《 2, // 4 // 动态style
                    PROPS = 1 《 3, // 8 // 动态属性，但不包含类名和样式
                    FULL_PROPS = 1 《 4, // 16 具有动态key属性，当key改变的时候，需要进行完整的diff比较
                    HYDRATE_EVENTS = 1 《 5, //32 //带有监听事件的节点
                    STABLE_FRAGMENT = 1 《 6, //64 // 一个不会改变子节点顺序的fragment
                    KEYED_FRAGMENT = 1 《 7, // 128 带有key属性的fragment或部分子节点带有key
                    UNKEYED_FRAGMENT = 1 《 8,  // 256 子节点没有key的fragment
                    NEED_PATCH = 1 《 9, // 512 一个节点只会进行非props比较
                    DYNAMIC_SLOTS = 1 《 10, 1024 动态slot
                    HOISTED = -1, // 静态节点
                    BAIL = -2, // 指示在diff过程应该要退出优化模式
                }
                <img src="@img/vue35.png" alt="">

            6. vue3中去掉了Vue构造函数
                1. 在vue2构造函数的静态方法中挂载的组件或方法都会在vue应用中生效，不利于隔离
                2. vue2的构造函数集成了太多的功能，不利于tree shaking,vue3把这些功能使用普通函数
                    导出，能够充分利用tree shaking优化打包

                3. vue2中没有把组件实例和vue应用两个概念区分开，在vue2中，通过使用new Vue创建
                的对象，既是一个vue应用，同时也是一个特殊的vue组件，vue3中把两个概念进行区分，
                通过createApp创建的对象，是一个vue应用，它内部提供的方法是针对整个应用，而不是一个
                特殊的组件
            
            7. vue3中数据响应式
                vue3不再使用Object.defineProperty的方式完成数据的响应式。而是使用proxy;vue2
                中初始数据的时候，会递归遍历整个data，为它的属性添加get和set方法。
                使用proxy除了proxy本身效率比Object.defineProperty更高之外，由于不必递归遍历所有的数据
                而是直接得到一个proxy，所以在vue3中，对数据的访问是动态的，当访问某个属性的时候
                再动态的获取和设置，这就极大的提升了在组件初始阶段的效率，同时，由于proxy可以监听
                到成员的新增和删除，因此在Vue3中新增成员、删除成员、索引访问等均可触发重新渲染，
                而在vue2中无法做到，必须使用$set或者splice方法来处理新增和删除的响应；

            8. setup函数
                是组合api的入口函数
                setup函数的执行是在beforeCreate之前，因此
                在setup函数中无法使用data和methods，因为此时还没有初始化data和methods.
                setup函数只能是同步的，不能是异步的,如果想要实现异步，只能在setup中定义使用异步函数
      </pre>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>