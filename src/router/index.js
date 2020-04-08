import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routesList = [
  {
    label:"Java Script",
    id:"JavaScript",
    children:[
      {
        label:'条件语句补充,初始引用值,typeof,类型转换',
        id:"typeof",
        children:[
          {
            label:'条件语句补充,初始引用值',
            id:'01',
            path:"/01",
            component: () => import(/* webpackChunkName: "function1" */ '../views/javascript/01'),
          },
          {
            label:'typeof,类型转换',
            id:'02',
            path:"/02",
            component: () => import(/* webpackChunkName: "function2" */ '../views/javascript/02'),
          },
        ]
      },
      {
        label:'函数,递归',
        id:"funciton",
        children:[
          {
            label:'函数',
            id:'03',
            path:"/03",
            component: () => import(/* webpackChunkName: "function1" */ '../views/javascript/03'),
          },
          {
            label:'递归',
            id:'04',
            path:"/04",
            component: () => import(/* webpackChunkName: "function2" */ '../views/javascript/04'),
          },
        ]
      },
      {
        label:'预编译',
        id:"build",
        id:'05',
        path:"/05",
        component: () => import(/* webpackChunkName: "function1" */ '../views/javascript/05'),
      },
      {
        label:'作用域、作用域链精解,立即执行函数,闭包',
        id:"nowFunction",
        children:[
          {
            label:'作用域、作用域链精解',
            id:'07',
            path:"/07",
            component: () => import(/* webpackChunkName: "function1" */ '../views/javascript/07'),
          },
          {
            label:'闭包',
            id:'08',
            path:"/08",
            component: () => import(/* webpackChunkName: "function1" */ '../views/javascript/08'),
          },
          {
            label:'立即执行函数',
            id:'09',
            path:"/09",
            component: () => import(/* webpackChunkName: "function2" */ '../views/javascript/09'),
          },
          {
            label:'闭包精细版',
            id:'10',
            path:"/10",
            component: () => import(/* webpackChunkName: "function2" */ '../views/javascript/10'),
          },
        ]
      },
      {
        label:'对象,包装类',
        id:"obj",
        children:[
          {
            label:'对象,包装类（上）',
            id:'11',
            path:"/11",
            component: () => import(/* webpackChunkName: "function1" */ '../views/javascript/11'),
          },
          {
            label:'对象,包装类（下）',
            id:'12',
            path:"/12",
            component: () => import(/* webpackChunkName: "function2" */ '../views/javascript/12'),
          },
        ]
      },
      {
        label:'原型,原型链,call/apply',
        id:"call",
        children:[
          {
            label:'原型,原型链,call/apply（上）',
            id:'13',
            path:"/13",
            component: () => import(/* webpackChunkName: "function1" */ '../views/javascript/13'),
          },
          {
            label:'原型,原型链,call/apply（下）',
            id:'14',
            path:"/14",
            component: () => import(/* webpackChunkName: "function2" */ '../views/javascript/14'),
          },
        ]
      },
      {
        label:'继承模式,命名空间,对象枚举',
        id:"jicheng",
        children:[
          {
            label:'继承模式,命名空间,对象枚举（上）',
            id:'15',
            path:"/15",
            component: () => import(/* webpackChunkName: "function1" */ '../views/javascript/15'),
          },
          {
            label:'继承模式,命名空间,对象枚举（下）',
            id:'16',
            path:"/16",
            component: () => import(/* webpackChunkName: "function2" */ '../views/javascript/16'),
          },
        ]
      },
      {
        label:'this,笔试真题讲解',
        id:"this",
        children:[
          {
            label:'this,笔试真题讲解',
            id:'17',
            path:"/17",
            component: () => import(/* webpackChunkName: "function1" */ '../views/javascript/17'),
          },
        ]
      },
      {
        label:'arguments,克隆,三目运算符,数组,类数组',
        id:"arguments",
        children:[
          {
            label:'arguments,克隆',
            id:'18',
            path:"/18",
            component: () => import(/* webpackChunkName: "function1" */ '../views/javascript/18'),
          },
          {
            label:'三目运算符',
            id:'19',
            path:"/19",
            component: () => import(/* webpackChunkName: "function2" */ '../views/javascript/19'),
          },
          {
            label:'数组,类数组',
            id:'20',
            path:"/20",
            component: () => import(/* webpackChunkName: "function2" */ '../views/javascript/20'),
          },
        ]
      },
      {
        label:'数组去重,习题,答疑复习',
        id:"arr",
        children:[
          {
            label:'数组去重,习题,答疑复习（上）',
            id:'21',
            path:"/21",
            component: () => import(/* webpackChunkName: "function1" */ '../views/javascript/21'),
          },
          {
            label:'数组去重,习题,答疑复习（下）',
            id:'22',
            path:"/22",
            component: () => import(/* webpackChunkName: "function2" */ '../views/javascript/22'),
          },
        ]
      },
      {
        label:'try..catch,es5标准模式,dom操作初探',
        id:"tryCatch",
        children:[
          {
            label:'try..catch,es5标准模式',
            id:'23',
            path:"/23",
            component: () => import(/* webpackChunkName: "function1" */ '../views/javascript/23'),
          },
          {
            label:'dom操作初探',
            id:'24',
            path:"/24",
            component: () => import(/* webpackChunkName: "function2" */ '../views/javascript/24'),
          },
        ]
      },
      {
        label:'dom选择器,节点类型',
        id:"dom",
        children:[
          {
            label:'dom选择器,节点类型',
            path:"/25",
            component: () => import(/* webpackChunkName: "function2" */ '../views/javascript/25'),
          }
        ]
      },
      {
        label:'dom继承树,dom基本操作',
        id:"domTree",
        children:[
          {
            label:'dom继承树,dom基本操作(上)',
            id:'26',
            path:"/26",
            component: () => import(/* webpackChunkName: "function1" */ '../views/javascript/26'),
          },
          {
            label:'dom继承树,dom基本操作(中)',
            id:'27',
            path:"/27",
            component: () => import(/* webpackChunkName: "function2" */ '../views/javascript/27'),
          },
          {
            label:'dom继承树,dom基本操作(下)',
            id:'28',
            path:"/28",
            component: () => import(/* webpackChunkName: "function2" */ '../views/javascript/28'),
          },
        ]
      },
      {
        label:'date对象,定时器',
        id:"date",
        children:[
          {
            label:'date对象,定时器(上)',
            id:'29',
            path:"/29",
            component: () => import(/* webpackChunkName: "function1" */ '../views/javascript/29'),
          },
          {
            label:'date对象,定时器(中)',
            id:'30',
            path:"/30",
            component: () => import(/* webpackChunkName: "function2" */ '../views/javascript/30'),
          },
          {
            label:'date对象,定时器(下)',
            id:'31',
            path:"/31",
            component: () => import(/* webpackChunkName: "function2" */ '../views/javascript/31'),
          },
        ]
      },
      {
        label:'获取窗口属性,获取dom尺寸,脚本化CSS',
        id:"document",
        children:[
          {
            label:'获取窗口属性,获取dom尺寸,脚本化CSS(上)',
            id:'32',
            path:"/32",
            component: () => import(/* webpackChunkName: "function1" */ '../views/javascript/32'),
          },
          {
            label:'获取窗口属性,获取dom尺寸,脚本化CSS(下)',
            id:'33',
            path:"/33",
            component: () => import(/* webpackChunkName: "function2" */ '../views/javascript/33'),
          },
        ]
      },
      {
        label:'事件',
        id:"event",
        children:[
          {
            label:'事件1',
            id:'34',
            path:"/34",
            component: () => import(/* webpackChunkName: "function1" */ '../views/javascript/34'),
          },
          {
            label:'事件2',
            id:'35',
            path:"/35",
            component: () => import(/* webpackChunkName: "function2" */ '../views/javascript/35'),
          },
          {
            label:'事件3',
            id:'36',
            path:"/36",
            component: () => import(/* webpackChunkName: "function2" */ '../views/javascript/36'),
          },
        ]
      },
      {
        label:'json,异步加载,时间线',
        id:"async",
        children:[
          {
            label:'json,异步加载,时间线（上）',
            id:'37',
            path:"/37",
            component: () => import(/* webpackChunkName: "function1" */ '../views/javascript/37'),
          },
          {
            label:'json,异步加载,时间线（下）',
            id:'38',
            path:"/38",
            component: () => import(/* webpackChunkName: "function2" */ '../views/javascript/38'),
          },
        ]
      },
      {
        label:'正则表达式',
        id:"reg",
        children:[
          {
            label:'正则表达式（上）',
            id:'39',
            path:"/39",
            component: () => import(/* webpackChunkName: "function1" */ '../views/javascript/39'),
          },
          {
            label:'正则表达式（下）',
            id:'40',
            path:"/40",
            component: () => import(/* webpackChunkName: "function2" */ '../views/javascript/40'),
          },
        ]
      },
      
    ]
  },
]

const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  // 首页
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home'),
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

const router = new VueRouter({
  mode: 'hash',
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
