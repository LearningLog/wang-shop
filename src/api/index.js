import axios from 'axios'
import router from '@/router/index'

// 基准URL
const baseURL = 'http://localhost:8888/api/private/v1'
// const baseURL = 'http://47.96.21.88:8888/api/private/v1'
axios.defaults.baseURL = baseURL

// 添加请求拦截器
// 拦截器的本身就是一个方法
// 该方法什么时候执行？
// 拦截器函数接收一个参数 config
// config 就是你当前请求的配置对象
// 当你使用 axios 发起请求的时候，那么就会先经过这个拦截器然后再发出请求
// 也就是说在请求拦截器内部的请求还没有发出去
// 我们可以在这里定制请求之前的行为
axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem('mytoken')
  // 如果本次请求的不是 /login 接口，则我们就加入请求头
  if (config.url !== '/login') {
    config.headers['Authorization'] = token
  }

  // return config 就好比 next() 允许通过
  // 通过之后才要真正的发起请求
  return config
}, function (error) { // 当请求出错的时候会调用到第二个参数函数
                      // Do something with request error
  return Promise.reject(error)
})

// http 响应拦截器
// 我们可以在这里对一些公共的业务进行处理
// 例如需要对每个接口进行 403 权限认证判断
// 如果本地响应的数据是 403 ，则我们提示用户：你没有权限执行该操作
axios.interceptors.response.use(function (response) {
  const {meta} = response.data
  if (meta.status === 403) {
    this.$message({
      message: '你没有权限执行该操作！',
      type: 'error'
    })
    // return false
  } else if (meta.status === 401) {
    // 如果用户长时间未操作导致 token 失效或者有人恶意伪造 token
    // 我们也不允许他进入我的系统界面
    // 所以我们这里通过对 401 统一拦截跳转到登录页

    // 1. 我们只需要告诉登陆组件，我从哪里跳过来的
    //    通过 url 地址告诉登陆组件
    // 2. 登陆成功之后，看一下 url 中有没有一个叫 redirect 的字段
    //    如果有就往这里跳，如果没有默认往 home 跳
    router.push({
      path: '/login',
      query: {
        redirect: window.location.hash
      }
    })
  }

  // 类似于 next()，放行通过响应拦截器
  return response
}, function (error) {
  return Promise.reject(error)
})

export const uploadInfo = () => {
  return {
    url: baseURL,
    token: localStorage.getItem('mytoken')
  }
}

// 登录验证
export const checkUser = params => {
  return axios.post('login', params).then(res => res.data)
}

// 退出登录
export const logout = params => {
  return axios.get('logout', params).then(res => res.data)
}

// 获取用户模块的列表数据
export const getUsers = params => {
  return axios.get('users', params).then(res => res.data)
}

// 添加用户
export const addUser = params => {
  return axios.post('users', params).then(res => res.data)
}

// 根据id查询用户信息
export const getUserById = params => {
  return axios.get('users/' + params.id).then(res => res.data)
}

// 编辑提交用户
export const editUser = params => {
  return axios.put('users/' + params.id, params).then(res => res.data)
}

// 编辑用户状态
export const editUserState = params => {
  return axios.put('users/' + params.id + '/state/' + params.state).then(res => res.data)
}

// 删除用户
export const deleteUser = params => {
  return axios.delete('users/' + params.id).then(res => res.data)
}

// 给用户分配角色
export const grantUser = (uId, params) => {
  return axios.put('users/' + uId + '/role', params).then(res => res.data)
}

// ------------------------------------------------------
// 获取左侧菜单
export const getMenus = params => {
  return axios.get('menus').then(res => res.data)
}

// 获取所有权限
export const getAuths = params => {
  return axios.get('rights/' + params.type).then(res => res.data)
}

// 获取所有角色
export const getRoles = params => {
  return axios.get('roles', params).then(res => res.data)
}

// 添加角色
export const addRole = params => {
  return axios.post('roles', params).then(res => res.data)
}

// 根据id查询角色
export const getRoleById = params => {
  return axios.get('roles/' + params.id).then(res => res.data)
}

// 编辑角色提交
export const editRole = params => {
  return axios.put('roles/' + params.id, params).then(res => res.data)
}

// 删除角色
export const deleteRole = params => {
  return axios.delete('roles/' + params.id).then(res => res.data)
}

// 获取权限信息
export const getRights = params => {
  return axios.get('rights/' + params.type).then(res => res.data)
}

// 授权提交
export const grantRights = (params, rid) => {
  return axios.post('roles/' + rid + '/rights', params).then(res => res.data)
}

// 删除权限
export const deleteRights = (params) => {
  return axios.delete('roles/' + params.roleId + '/rights/' + params.rightId).then(res => res.data)
}

// --------------------------------------------
// 商品管理模块
// 获取静态属性
export const getDatas = params => {
  return axios.get('categories/' + params.cId + '/attributes?sel=' + params.type).then(res => res.data)
}

// 删除属性
export const deleteData = params => {
  return axios.delete('categories/' + params.cId + '/attributes/' + params.aId).then(res => res.data)
}
// 编辑属性-根据ID查询
export const getDataInfoById = params => {
  return axios.get('categories/' + params.cId + '/attributes/' + params.aId).then(res => res.data)
}
// 编辑提交静态属性
export const editData = (params, cId) => {
  return axios.put('categories/' + cId + '/attributes/' + params.attr_id, params).then(res => res.data)
}

// 添加参数和属性
export const addData = (params, cId) => {
  return axios.post('categories/' + cId + '/attributes', params).then(res => res.data)
}

// 获取父级分类
export const getParentCate = params => {
  return axios.get('categories?type=2').then(res => res.data)
}

// 获取分类列表
export const getCateList = params => {
  return axios.get('categories?type=3', params).then(res => res.data)
}

// 添加分类
export const addCate = params => {
  return axios.post('categories', params).then(res => res.data)
}

// 删除分类
export const deleteCate = params => {
  return axios.delete('categories/' + params.id).then(res => res.data)
}

// 根据分类ID查询分类信息
export const getCateById = params => {
  return axios.get('categories/' + params.id).then(res => res.data)
}

// 编辑提交表单
export const editCate = params => {
  return axios.put('categories/' + params.cat_id, params).then(res => res.data)
}

// ----------------------------------------------------
// 商品管理

// 商品列表
export const getProducts = params => {
  return axios.get('goods', params).then(res => res.data)
}

// 添加商品
export const addProduct = params => {
  return axios.post('goods', params).then(res => res.data)
}

// 删除商品
export const deleteProduct = params => {
  return axios.delete('goods/' + params.id).then(res => res.data)
}

// 根据商品ID查询详细信息
export const getProductById = params => {
  return axios.get('goods/' + params.id).then(res => res.data)
}

// 编辑提交商品
export const editProduct = params => {
  return axios.put('goods/' + params.goods_id, params).then(res => res.data)
}
// ---------------------------------------------
// 订单管理
export const getOrders = params => {
  return axios.get('orders', params).then(res => res.data)
}
// ---------------------------------------------
// 数据统计
export const getReports = params => {
  return axios.get('reports/type/' + params.type).then(res => res.data)
}
