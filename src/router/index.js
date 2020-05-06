import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routesList = [
  {
    label:"webpack",
    id:"webpack",
    children:[
      {
        label:'js',
        id:'js',
        path:"/js",
        children:[
          {
            label:'babel',
            id:'babel',
            path:"/babel",
            component: () => import(/* webpackChunkName: "function1" */ '../views/webpack/js/summary'),
          },
        ]
      },
      {
        label:'performance',
        id:'performance',
        path:"/performance",
        children:[
          {
            label:'prerenderSpaPlugin',
            id:'prerenderSpaPlugin',
            path:"/prerenderSpaPlugin",
            component: () => import(/* webpackChunkName: "function1" */ '../views/webpack/performance/prerender-spa-plugin'),
          },
          {
            label:'summary',
            id:'performance-summary',
            path:"/performance-summary",
            component: () => import(/* webpackChunkName: "function1" */ '../views/webpack/performance/summary'),
          },
        ]
      },
      {
        label:'css',
        id:'css',
        path:"/css",
        children:[
          {
            label:'css-loader',
            id:'css-loader',
            path:"/css-loader",
            component: () => import(/* webpackChunkName: "function1" */ '../views/webpack/css/css-loader'),
          },
          {
            label:'style-loader',
            id:'style-loader',
            path:"/style-loader",
            component: () => import(/* webpackChunkName: "function2" */ '../views/webpack/css/style-loader'),
          },
          {
            label:'summary',
            id:'summary',
            path:"/summary",
            component: () => import(/* webpackChunkName: "function2" */ '../views/webpack/css/summary'),
          },
          {
            label:'postcss',
            id:'postcss',
            path:"/postcss",
            component: () => import(/* webpackChunkName: "function2" */ '../views/webpack/css/postcss'),
          },
        ]
      },
    ]
  }
]

const routes = [
  {
    path: '*',
    redirect: '/babel'
  },
  // 首页
  {
    path: '/babel',
    name: 'babel',
    component: () => import(/* webpackChunkName: "home" */ '../views/webpack/js/summary'),
  },
  // { 
  //   path: '/brand-detail/:code', 
  //   component: () => import(/* webpackChunkName: "brandDetail" */ '../views/brand/detail'),
  //   props: true,
  //   name: 'brandDetail'    
  // }
]

// 添加路由
function addRoute(arr){
  for(let i=0;i<arr.length;i++){
    if(arr[i].component){
      routes.push({path:arr[i]['path'],component:arr[i]['component']})
    }
    if(arr[i].children){addRoute(arr[i].children)}
  }
}
addRoute(routesList);
console.log(routes)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)  
  next()
});

export  {
  routesList,
  router
} 
