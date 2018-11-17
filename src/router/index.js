import Vue from 'vue'
import Router from 'vue-router'

// 功能组件
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

Vue.use(Router)

// 路由配置
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Hello',
      redirect: '/main',
      component: Home
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
