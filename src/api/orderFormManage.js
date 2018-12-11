/**
 * @author: YanHuaKang
 * @2018/11/24
 * @Description:订单管理
 */
import {http} from '../api/http'

// 获取列表
export const getOrderFormList = params => {
  return http.get('/admin/venderOrderQuery/page/list/' + params.pageNum + '/' + params.pageSize + '?' + params.params).then(res => res.data)
}
// 获取列表
export const getOrderFormDetailList = params => {
  return http.get('/admin/venderOrderQuery/toDetail//' + params.params).then(res => res.data)
}
