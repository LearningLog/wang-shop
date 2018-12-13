/**
 * @author: YanHuaKang
 * @2018/11/24
 * @Description:账户管理
 */
import {http} from '../api/http'

// 获取孖豆上边数据
export const getMyBeansAmount = params => {
  return http.get('/vender/integral/getby/').then(res => res.data)
}
// 获取孖豆下边数据
export const getMyBeansList = params => {
  return http.get('/vender/integral/detail/page/list/' + params.pageNum + '/' + params.pageSize + '?' + params.params).then(res => res.data)
}
