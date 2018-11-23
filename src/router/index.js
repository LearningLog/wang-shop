import Vue from 'vue'
import Router from 'vue-router'

// 功能组件
// @ 是 src 路径的别名，webpack 配置的
import Login from '@/views/Login'
import Home from '@/views/Home'
import Main from '@/views/Main'
import User from '@/views/user/User'
import Auth from '@/views/auth/Auth'
import Role from '@/views/auth/Role'
import Phome from '@/views/product/Phome'
import AddProduct from '@/views/product/Add'
import EditProduct from '@/views/product/Edit'
import Plist from '@/views/product/List'
import Pcategory from '@/views/product/Category'
import Pparam from '@/views/product/Param'
import Order from '@/views/order/Order'
import Report from '@/views/report/Report'
import commodityList from '@/views/commodity/commodity-list'
import commodityAdd from '@/views/commodity/commodity-add'
import commodityDetail from '@/views/commodity/commodity-detail'
import publishProductList from '@/views/publishManage/publishProduct-list'
import addPublishProduct from '@/views/publishManage/publishProduct-add'
import publishProductApprove from '@/views/publishManage/publishProduct-approve'

// 这是在为 Vue 扩展实例成员
// 如果你没有这句话，那么你就无法在组件中使用 this.$route 和 this.$router
Vue.use(Router)

// 路由配置
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Hello', // Hello 组件会渲染到 App.vue 根组件的 router-view 中
      redirect: '/main',
      component: Home
      // 通过配置子路由的方式让某个组件渲染到父路由组件
      // 1. 在父路由组件中添加 <router-view></router-view> 出口标记
      // 2. 在父路由中通过 children 来声明自路由
      //    children 是一个数组
      //    children 数组中配置一个一个子路由对象
      // 当你访问 users 组件的时候，则路由会先渲染它的父路由组件
      // 然后将 users 组件渲染到父路由的 router-view 标记中
    },
    {
      path: '/',
      name: '商品管理',
      component: Home,
      children: [
        {path: '/commodityList', component: commodityList, name: 'commodityList'},
        {path: '/commodityAdd', component: commodityAdd, name: 'commodityAdd'},
        {path: '/commodityDetail', component: commodityDetail, name: 'commodityDetail'}
      ]
    },
    {
      path: '/',
      name: '发布管理',
      component: Home,
      children: [
        {path: '/publishProductList', component: publishProductList, name: 'publishProductList'},
        {path: '/addPublishProduct', component: addPublishProduct, name: 'addPublishProduct'},
        {path: '/publishProductApprove', component: publishProductApprove, name: 'publishProductApprove'}
      ]
    },
    {
      path: '/',
      name: '欢迎页面',
      component: Home,
      children: [
        {path: '/main', component: Main, name: 'Main'}
      ]
    },
    {
      path: '/',
      name: '用户管理',
      component: Home,
      children: [
        {path: '/users', component: User, name: 'User'}
      ]
    },
    {
      path: '/',
      name: '权限管理',
      component: Home,
      children: [
        {path: '/rights', component: Auth, name: 'Auth'},
        {path: '/roles', component: Role, name: 'Role'}
      ]
    },
    {
      path: '/',
      name: '商品管理',
      component: Home,
      children: [
        {
          path: '/product',
          component: Phome,
          name: 'Phome',
          redirect: '/goods',
          children: [
            {path: '/goods', component: Plist, name: 'Plist'},
            {path: '/toadd', component: AddProduct, name: 'AddProduct'},
            {path: '/toedit', component: EditProduct, name: 'EditProduct'}
          ]
        },
        {path: '/categories', component: Pcategory, name: 'Pcategory'},
        {path: '/params', component: Pparam, name: 'Pparam'}
      ]
    },
    {
      path: '/',
      name: '订单管理',
      component: Home,
      children: [
        {path: '/orders', component: Order, name: 'Order'}
      ]
    },
    {
      path: '/',
      name: '报告管理',
      component: Home,
      children: [
        {path: '/reports', component: Report, name: 'Report'}
      ]
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/login' }
    }
  ]
})

// 1. 添加路由拦截器（导航钩子、守卫）
//    接下来所有的视图导航都必须经过这道关卡
//    一旦进入这道关卡，你得告诉路由守卫，
//    to 我要去哪里
//    from 我从哪儿来的
//    next 用来放行的
// router.beforeEach((to, from, next) => {
//   let user = localStorage.getItem('mytoken')
//   if (user) {
//     next()
//   } else {
//     if (to.path !== '/login') {
//       next({path: '/login'})
//     } else {
//       next()
//     }
//   }
// })

// 1. 添加路由拦截器（导航钩子、守卫）
//    接下来所有的视图导航都必须经过这道关卡
//    一旦进入这道关卡，你得告诉路由守卫，
//    to 我要去哪里
//    from 我从哪儿来的
//    next 用来放行的
router.beforeEach((to, from, next) => {
  let user = localStorage.getItem('mytoken')
  // 2.
  // 拿到当前请求的视图路径标识
  // 2.1 如果是登陆组件，则直接放行通过
  // 2.2 如果是非登陆组件，则检查 Token 令牌
  //    2.2.1 有令牌就过去
  //    2.2.2 无令牌，则让其登陆去
  if (to.path === '/login') {
    next()
  } else {
    // 检查是否具有当前登陆的用户信息状态
    if (!user) { // 无令牌，则让其登陆去
      next({
        path: '/login'
      })
    } else { // 有令牌就允许通过
      next()
    }
  }
})

export default router
