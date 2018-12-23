/**
 * @author: YanHuaKang
 * @2018/11/24
 * @Description:登录
 */
import {http} from '../api/http'
import {getToken} from './auth'

/**
 * 管理员登录
 * @param params loginName 用户名, password 密码
 * @returns {*}
 */
export const loginAdmin = params => {
  return http.post('/admin/passport/login', params).then(res => res.data)
}

/**
 * 厂商登录
 * @param params loginName 用户名, password 密码
 * @returns {*}
 */
export const loginManufacturer = params => {
  return http.post('/manufacturer/passport/login', params).then(res => res.data)
}

/**
 * 商家登录
 * @param params loginName 用户名, password 密码
 * @returns {*}
 */
export const loginVender = params => {
  return http.post('/vender/passport/login', params).then(res => res.data)
}

/**
 * 退出登录
 * @param params cookie中携带 adminToken 参数
 * @returns {*}
 */
export const logoutAdmin = params => {
  return http.post('/admin/passport/logout', params).then(res => res.data)
}

export const logoutManufacturer = params => {
  return http.post('/manufacturer/passport/logout', params).then(res => res.data)
}

export const logoutVender = params => {
  return http.post('/vender/passport/logout', params).then(res => res.data)
}

/**
 * 根据ID查询管理员信息
 * @param params  cookie中携带token参数
 * @returns {*}
 */
export const getUserInfo = params => {
  let tokenName = ''
  if (params) {
    tokenName = params
  } else {
    tokenName = getToken('userType')
  }
  if (tokenName === 'adminToken') {
    return http.get('/admin/passport/info').then(res => res.data)
  } else if (tokenName === 'manufacturerToken') {
    return http.get('/manufacturer/passport/info').then(res => res.data)
  } else if (tokenName === 'venderToken') {
    return http.get('/vender/passport/info').then(res => res.data)
  } else {
    this.$message({
      type: 'error',
      message: '当前登录身份错误！，请重新登录'
    })
    this.$router.push({
      path: '/login',
      query: {
        redirect: window.location.hash
      }
    })
  }
}

/**
 * 修改密码
 * @param params
 * @returns {*}
 */
export const modifyPassword = params => {
  return http.get('modify', params).then(res => res.data)
}
