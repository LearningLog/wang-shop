/**
 * @author: YanHuaKang
 * @2018/11/24
 * @Description:库存管理
 */
import {http} from '../api/http'

// 获取库存列表
export const getStockList = params => {
  return http.get('/admin/venderStockQuery/venderstock/page/list/' + params.pageNum + '/' + params.pageSize + '?' + params.params).then(res => res.data)
}
// 获取入库单列表
export const getGodownEntryList = params => {
  return http.get('/admin/venderStockQuery/vendersku/page/list/' + params.pageNum + '/' + params.pageSize + '/' + params.venderId + '?' + params.params).then(res => res.data)
}
// 获取入库单状态
export const getGodownEntryState = params => {
  return http.get('/admin/common/venderOrderstatus/list/').then(res => res.data)
}
// 获取明细列表
export const getDetailList = params => {
  return http.get('/admin/platorm/stock/detail/page/list/' + params.pageNum + '/' + params.pageSize + '?' + params.params).then(res => res.data)
}
// 获取库存明细操作类型
export const getStockDetailOperationType = params => {
  return http.get('/admin/common/platformstockdetail/operatetype/list/').then(res => res.data)
}
