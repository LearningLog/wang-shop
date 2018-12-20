/**
 * @author: YanHuaKang
 * @2018/11/24
 * @Description:分账管理
 */
import {http} from '../api/http'

// 获取列表
export const getSplitAccountList = params => {
  return http.get('/admin/sharebillquery/page/list/' + params.pageNum + '/' + params.pageSize + '?' + params.params).then(res => res.data)
}
// 产品详情
export const getOrderFormDetailList = params => {
  return http.get('/admin/sharebillquery/toBillDetail/' + params.shareBillId + '?' + params.params).then(res => res.data)
}
// 获取分账单类型
export const getSplitAccountType = params => {
  return http.get('/admin/common/sharebilltype/list/').then(res => res.data)
}
// 获取分账单状态
export const getSplitAccountState = params => {
  return http.get('/admin/common/sharebillstatus/list/').then(res => res.data)
}
