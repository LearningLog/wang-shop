// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// require('./mock/app.js')
import 'element-ui/lib/theme-chalk/index.css'
// import ElementUI from 'element-ui'
import {
  Dialog,
  Header,
  Row,
  Pagination,
  Form,
  FormItem,
  Button,
  Select,
  Option,
  Container,
  Switch,
  Main,
  Aside,
  Submenu,
  Menu,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  TableColumn,
  Cascader,
  Tag,
  Steps,
  Step,
  Tabs,
  TabPane,
  Input,
  InputNumber,
  Upload,
  Radio,
  RadioGroup,
  Checkbox,
  Tree,
  CheckboxGroup,
  MessageBox,
  Loading,
  Col,
  Message
} from 'element-ui'
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Header)
Vue.use(Row)
Vue.use(Select)
Vue.use(Option)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Switch)
Vue.use(Tree)
Vue.use(InputNumber)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Container)
Vue.use(Upload)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Cascader)
Vue.use(Tag)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Col)
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(Loading.directive)
// import VueEditor from 'vue-quill-editor'
// Vue.use(VueEditor)

Vue.config.productionTip = false

// Vue.use(ElementUI)

// 全局导航过滤
router.beforeEach((to, from, next) => {
  let user = localStorage.getItem('mytoken')
  if (user) {
    next()
  } else {
    if (to.path !== '/login') {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
