import {http} from '../api/http'

// export const uploadInfo = () => {
//   return {
//     url: baseURL,
//     token: localStorage.getItem('mytoken')
//   }
// }

// 登录验证
export const checkUser = params => {
  return http.post('login', params).then(res => res.data)
}

// 退出登录
export const logout = params => {
  return http.get('logout', params).then(res => res.data)
}

// 修改密码
export const modifyPassword = params => {
  return http.get('modify', params).then(res => res.data)
}
