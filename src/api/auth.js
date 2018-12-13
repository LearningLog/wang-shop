/**
 * @author: YanHuaKang
 * @2018/11/24
 * @Description:封装和用户授权相关函数
 */

// var tokenName = ''

/**
 * 这是有设定过期时间的使用示例：
 * @param str             s20是代表20秒  h是指小时，如12小时则是：h12   d是天数，30天则：d30
 * @returns {number}
 */
function getsec (str) {
  var str1 = str.substring(1, str.length) * 1
  var str2 = str.substring(0, 1)
  if (str2 === 's') {
    return str1 * 1000
  } else if (str2 === 'h') {
    return str1 * 60 * 60 * 1000
  } else if (str2 === 'd') {
    return str1 * 24 * 60 * 60 * 1000
  }
}
/**
 *保存登陆用户信息到cookie
 * @param name
 * @param value
 * @param time    这是有设定过期时间的使用示例：s20是代表20秒  h是指小时，如12小时则是：h12   d是天数，30天则：d30
 */
export function saveToken (name, value, time) {
  var strsec = getsec(time)
  var exp = new Date()
  exp.setTime(exp.getTime() + strsec * 1)
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
}

/**
 * 从cookie中获取当前登陆用户信息
 * @return {string} 当前登陆用户信息对象字符串
 */
export function getToken (name) {
  var arr = []
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (document.cookie.match(reg)) {
    arr = document.cookie.match(reg)
    return unescape(arr[2])
  } else {
    return null
  }
}

/**
 * 删除cookie中的用户登陆信息
 * @param domain
 * @param path
 * @param secure
 * @return {undefined} 无返回值
 */
export function removeToken (name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getToken(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}

/**
 * 获取cookie中用户信息的 Token 令牌
 * @return {string} 用户的 Token 身份令牌
 */
// export function getToken () {
//   try {
//     // cooike存储中的 adminToken 可能不是一个有效的 JSON 格式字符串
//     // 所以我们这里为了避免程序出错，使用了 try-catcher 来捕获转换失败的异常
//     return getToken()
//   } catch (err) {
//     return ''
//   }
// }
