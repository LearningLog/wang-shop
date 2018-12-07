/**
 * @author: YanHuaKang
 * @2018/11/24
 * @Description:登录
 */
import {http} from '../api/http'

// export const uploadInfo = () => {
//   return {
//     url: baseURL,
//     token: localStorage.getItem('mytoken')
//   }
// }

/**
 * 登录验证
 * @param params loginName 用户名, password 密码
 * @returns {*}
 */
export const checkUser = params => {
  return http.post('/admin/passport/login', params).then(res => res.data)
}

/**
 * 退出登录
 * @param params cookie中携带 adminToken 参数
 * @returns {*}
 */
export const logout = params => {
  return http.post('/admin/passport/logout', params).then(res => res.data)
}

/**
 * 根据ID查询管理员信息
 * @param params  cookie中携带adminToken参数
 * @returns {*}
 */
export const getUserInfoById = params => {
  return http.get('/admin/passport/info', params).then(res => res.data)
}

/**
 * 修改密码
 * @param params
 * @returns {*}
 */
export const modifyPassword = params => {
  return http.get('modify', params).then(res => res.data)
}
