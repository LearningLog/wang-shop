/**
 * @author: YanHuaKang
 * @2018/11/24
 * @Description:总库存管理
 */
import {http} from '../api/http'

// 获取总库存列表
export const getTotalList = params => {
  return http.get('/admin/platorm/stock/page/list/' + params.pageNum + '/' + params.pageSize + '?' + params.params).then(res => res.data)
}
// 获取明细列表
export const getDetailList = params => {
  return http.get('/admin/platorm/stock/detail/page/list/' + params.pageNum + '/' + params.pageSize + '?' + params.params).then(res => res.data)
}
// 获取库存明细操作类型
export const getStockDetailOperationType = params => {
  return http.get('/admin/common/platformstockdetail/operatetype/list/').then(res => res.data)
}
