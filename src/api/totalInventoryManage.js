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
// 新增||编辑产品
export const editProduct = params => {
  return http.post('editProduct', params).then(res => res.data)
}
// 删除产品
export const edeleteProduct = params => {
  return http.get('edeleteProduct', params).then(res => res.data)
}
// 上传图片
export const uploadInfo = () => {
  return http.get('/upload').then(res => res.data)
}
// 产品详情
export const productDetail = params => {
  return http.get('productDetail', params).then(res => res.data)
}
