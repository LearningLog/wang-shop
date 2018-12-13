/**
 * @author: YanHuaKang
 * @2018/11/24
 * @Description:商品管理
 */
import {http} from '../api/http'

// C端用户列表
export const getclientList = params => {
  return http.get('/admin/user/pagelist/' + params.pageNum + '/' + params.pageSize + '?' + params.params).then(res => res.data)
}
// C端销售单列表
export const getSalesList = params => {
  return http.get('/admin/userorder/sku/user/page/list/' + params.pageNum + '/' + params.pageSize + '?' + params.params).then(res => res.data)
}
