<template>
  <div>
      <h1>vue3路由的变化</h1>
      <pre>
        1. 异步路由

          vue2:
            // 不带选项的异步组件或路由
            const asyncPage = ()=> import('./home.vue')

            // 携带选项的异步组件或路由
            const asyncPage = {
              component: () => import('./home.vue'),
              delay: 200,
              timeout: 3000,
              errorComponent: errorComponent,
              loadingComponent: loadingComponent, 
            }

          vue3:
            通过defineAsyncComponent显示的定义异步组件或路由

            defineAsyncComponent(fn/onject)

            eg:
            import { defineAsyncComponent } from 'vue'

            // 不带选项的异步组件或路由
            const asyncPage = defineAsyncComponent(()=>import('./home.vue'))

            // 携带选项的异步组件, loader必须返回一个promise
            const asyncPage = defineAsyncComponent({
                loader:()=>{
                  const home = import('./home.vue')
                  // 做一些异步处理...
                  return home
                },
                delay: 200,
                timeout: 3000,
                errorComponent: errorComponent,
                loadingComponent: loadingComponent, 
            })

        2. $attrs的变化

              inheritAttrs: true/false 是否把$attrs添加到根元素上,默认是true

              v-bind="$attrs" 把$attrs设置到指定的元素上

            vue2：
              $attrs 包含除了class和style所有的 attribute

               eg1:

                  父组件：
                    <Com class="red" style="border:1px solid red" id="my-id"></Com>

                  子组件:
                    <div class="wrap">
                        <p v-bind="$attrs">attrs的变化</p>
                    </div>

                  将生成以下 HTML：
                    <div class="wrap red" style="border:1px solid red">
                        <p id="my-id">attrs的变化</p>
                    </div>   


            vue3:
              $attrs 包含所有的 attribute，包括class和style

              1. 如果只有一个根元素并且子组件没有设置inheritAttrs: false，那么默认会把
                 $attrs添加到根元素上

              2. 如果没有根元素(并列多个元素)并且子组件没设置inheritAttrs: false，那么
                 默认不会把$attrs添加到任何元素上

              eg1: 只有一个根元素

                  父组件：
                    <Com class="red" style="border:1px solid red"></Com>

                  子组件:
                    <div class="wrap">
                        <p>attrs的变化</p>
                    </div>

                  将生成以下 HTML：
                    <div class="wrap red" style="border:1px solid red">
                        <p>attrs的变化</p>
                    </div>  

              eg2: 没有根元素

                  父组件：
                    <Com class="red" style="border:1px solid red"></Com>

                  子组件:
                    <div class="wrap">
                        <p>attrs的变化</p>
                    </div>
                    <div class="wrap2">
                        <p>attrs的变化2</p>
                    </div>

                  将生成以下 HTML：
                    <div class="wrap">
                        <p>attrs的变化</p>
                    </div>
                    <div class="wrap2">
                        <p>attrs的变化2</p>
                    </div> 

              2迁移到3时的注意事项：
                vue3中使用inheritAttrs:false, 会把class和style都不再添加到根元素上

        3. $children
              $children 实例 property 已从 Vue 3.0 中移除，不再支持,可以使用refs

        4. directive
            自定义指令

            Vue 2：
              bind - 指令绑定到元素后发生。只发生一次。
              inserted - 元素插入父 DOM 后发生。
              update - 当元素更新，但子元素尚未更新时，将调用此钩子。
              componentUpdated - 一旦组件和子级被更新，就会调用这个钩子。
              unbind - 一旦指令被移除，就会调用这个钩子。也只调用一次。

            vue3:
              bind → beforeMount
              inserted → mounted
              beforeUpdate：新的！这是在元素本身更新之前调用的，很像组件生命周期钩子。
              update → 移除！有太多的相似之处要更新，所以这是多余的，请改用 updated。
              componentUpdated → updated
              beforeUnmount：新的！与组件生命周期钩子类似，它将在卸载元素之前调用。
              unbind -> unmounted

            <img src="@img/v3dir1.png" />

            const app = Vue.createApp({})

            app.directive('highlight', {
              beforeMount(el, binding, vnode) {
                const vm = binding.instance // vue3获取实例
                // vue2获取实例 const vm = vnode.context
                el.style.background = binding.value
              }
            })

        5. filters过滤器
            已经移除，可以使用计算属性代替

        6. vue3支持多个节点

            <img src="@img/v3tem.png" />

        7. 创建全局的vue实例

          vue3中暴露了一个新的createApp方法，用来创建全局vue实例，这样解决了vue2中，一个项目多个应用不能单独
          分离的问题，vue3中通过createApp可以创建每个应用的自己的实例

            vue2:
              new Vue()

            vue3:
              createApp() 

        8. v-model双向绑定

            vue2:
              <img src="@img/v3mo4.png" alt="">

              子组件默认接收一个value属性，并且在改变的时候$emit一个input事件

            vue3:
              <img src="@img/v3mo3.png" alt="">

              子组件默认接收一个modelValue属性，并且在改变的时候emit一个update:modelValue事件

            .sync的实现

            vue2:
              <img src="@img/v3mo2.png" alt="">

            vue3去掉了.sync,可以传递多个v-model:
              
              <img src="@img/v3mo.png" alt="">

            vue3自定义v-modle修饰符

              v-model:title.修饰符1.修饰符2='title'

              子组件接收一个titleModifiers作为接收到的修饰符对象

              eg: props.titleModifiers.修饰符1   props.titleModifiers.修饰符2

        9. vue3中v-if 比 v-for 的优先级高



            
      </pre>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>