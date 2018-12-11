/**
 * @author: YanHuaKang
 * @2018/11/24
 * @Description:销售管理
 */
import {http} from '../api/http'

// 获取列表
export const getOrderFormList = params => {
  return http.get('/admin/userorder/admin/pagelist/' + params.pageNum + '/' + params.pageSize + '?' + params.params).then(res => res.data)
}
// 获取订单详情列表
export const getOrderFormDetailList = params => {
  return http.get('/admin/userorder/sku/page/list/' + params.pageNum + '/' + params.pageSize + '?orderId=' + params).then(res => res.data)
}
