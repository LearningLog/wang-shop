// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill' // 处理在IE11下直接使用axios会报Promise未定义
import Vue from 'vue'
import App from './App'
import router from './router'
import httpPlugin from '@/api/http'
// require('./mock/app.js')
import 'element-ui/lib/theme-chalk/index.css'
import accounting from 'accounting'
import moment from 'moment'
import ElementUI from 'element-ui'
// import {
//   Dialog,
//   Header,
//   Row,
//   Pagination,
//   Form,
//   FormItem,
//   Button,
//   Select,
//   Option,
//   Container,
//   Switch,
//   Main,
//   Aside,
//   Submenu,
//   Menu,
//   MenuItem,
//   Breadcrumb,
//   BreadcrumbItem,
//   Table,
//   TableColumn,
//   Cascader,
//   Tag,
//   Steps,
//   Step,
//   Tabs,
//   TabPane,
//   Input,
//   InputNumber,
//   Upload,
//   Radio,
//   RadioGroup,
//   Checkbox,
//   Tree,
//   CheckboxGroup,
//   MessageBox,
//   Loading,
//   Col,
//   Message
// } from 'element-ui'
// Vue.use(Pagination)
// Vue.use(Dialog)
// Vue.use(Header)
// Vue.use(Row)
// Vue.use(Select)
// Vue.use(Option)
// Vue.use(Checkbox)
// Vue.use(CheckboxGroup)
// Vue.use(RadioGroup)
// Vue.use(Radio)
// Vue.use(Switch)
// Vue.use(Tree)
// Vue.use(InputNumber)
// Vue.use(Input)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Button)
// Vue.use(Container)
// Vue.use(Upload)
// Vue.use(Main)
// Vue.use(Aside)
// Vue.use(Menu)
// Vue.use(Submenu)
// Vue.use(MenuItem)
// Vue.use(Breadcrumb)
// Vue.use(BreadcrumbItem)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(Cascader)
// Vue.use(Tag)
// Vue.use(Steps)
// Vue.use(Step)
// Vue.use(Tabs)
// Vue.use(TabPane)
// Vue.use(Col)
// Vue.prototype.$message = Message
// Vue.prototype.$msgbox = MessageBox
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.use(Loading.directive)
// import VueEditor from 'vue-quill-editor'
// Vue.use(VueEditor)
Vue.use(accounting)
Vue.use(moment)
Vue.prototype.$accounting = accounting
Vue.prototype.$moment = moment

Vue.config.productionTip = false

Vue.use(ElementUI)

// 加载 httpPlugin 插件（封装自 axios）
// 我们在该插件中为 Vue 原型对象扩展了一个成员 $http
// 然后我们就可以在任何组件通过使用 this.$http 来发起请求了
Vue.use(httpPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
