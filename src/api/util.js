/**
 * @author: YanHuaKang
 * @2018/12/15
 * @Description: 公用js 方法
 */
// input失焦小数限制
export function onNumValid (val, num) {
  val = val === undefined ? '' : val
  val = val.toString()
  val = val.replace(/[^\d.]/g, '') // 清除"数字"和"."以外的字符
  val = val.replace(/^\./g, '') // 验证第一个字符是数字而不是
  val = val.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
  val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  switch (num) {
    case 2:
      val = val.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 只能输入两个小数
      break
    case 3:
      val = val.replace(/^(-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3') // 只能输入三个小数
      break
    case 4:
      val = val.replace(/^(-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3') // 只能输入三个小数
      break
  }
  return val
}

// input键入小数限制
export function onKeyValid (val, num) {
  val = val === undefined ? '' : val
  val = val.toString()
  if (num === 2) {
    let reg = /^0\.{1}\d{0,2}|\.{1}\d{0,2}/
    if (!reg.test(val)) {
      return ''
    }
  } else if (num === 3) {
    let reg = /^0\.{1}\d{0,2}|\.{1}\d{0,3}/
    if (!reg.test(val)) {
      return ''
    }
  } else if (num === 4) {
    let reg = /^0\.{1}\d{0,2}|\.{1}\d{0,4}/
    if (!reg.test(val)) {
      return ''
    }
  }
  return val
}
export function onValidnum (val, event) {
  val = val === undefined ? '' : val
  val = val.toString()
  let reg = /^\d+$/
  if (!reg.test(val)) {
    if (event === 'blur') {
      val = val.substring(0, val.length - 1)
      return false
    }
    if (event === 'keyup' || event === 'input') {
      val = val.replace(/[^\d]/g, '') // 清除数字以外的
      return false
    }
  }
}
export function checkNum (val, num) {
  var re = /^\d+(?=\.{0,1}\d+$|$)/
  if (val !== '') {
    if (!re.test(val)) {
      return ''
    }
  }

  val = parseFloat(val).toFixed(num)
}
export function validatePhone (num) {
  var isPhone = /^1[3-9]\d{9}$/ // 手机号码
  var isMob = /^0?1[3|4|5|8][0-9]\d{8}$/ // 座机格式
  if (isMob.test(num) || isPhone.test(num)) {
    return true
  } else {
    return false
  }
}
