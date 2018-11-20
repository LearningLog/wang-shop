/**
 * @/assets/js/auth.js
 * 封装和用户授权相关函数
 */

const userInfoKey = 'mytoken'

/**
 * 保存登陆用户信息到cookie
 * @param value            token值 String
 * @param expires          [可选]
 * @param domain           [可选]
 * @param path             [可选]
 * @param secure           [可选]
 * @return {undefined}     无返回值
 */
export function saveUserInfo (value, expires, domain, path, secure) {
  let cookieText = ''
  cookieText += encodeURIComponent(userInfoKey) + '=' + encodeURIComponent(value)
  if (expires instanceof Date) {
    cookieText += '; expires=' + expires.toGMTString()
  }
  if (path) {
    cookieText += '; path=' + path
  }
  if (domain) {
    cookieText += '; domain=' + domain
  }
  if (secure) {
    cookieText += '; secure'
  }
  document.cookie = cookieText
}

/**
 * 从cookie中获取当前登陆用户信息
 * @return {string} 当前登陆用户信息对象字符串
 */
export function getUserInfo () {
  let cookieName = encodeURIComponent(userInfoKey) + '='
  let cookieStart = document.cookie.indexOf(cookieName)
  let cookieValue = ''
  if (cookieStart > -1) {
    var cookieEnd = document.cookie.indexOf(';', cookieStart)
    if (cookieEnd === -1) {
      cookieEnd = document.cookie.length
    }
    cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
  }
  return cookieValue
}

/**
 * 删除cookie中的用户登陆信息
 * @param domain
 * @param path
 * @param secure
 * @return {undefined} 无返回值
 */
export function removeUserInfo (domain, path, secure) {
  this.saveUserInfo('', Date(0), domain, path, secure)
}

/**
 * 获取cookie中用户信息的 Token 令牌
 * @return {string} 用户的 Token 身份令牌
 */
export function getToken () {
  try {
    // 本地存储中的 user-info 可能不是一个有效的 JSON 格式字符串
    // 所以我们这里为了避免程序出错，使用了 try-catcher 来捕获转换失败的异常
    return JSON.parse(getUserInfo()).token
  } catch (err) {
    return ''
  }
}
