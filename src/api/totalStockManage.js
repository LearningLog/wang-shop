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
