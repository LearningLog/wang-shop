/**
 * @author: YanHuaKang
 * @2018/11/24
 * @Description:发布管理
 */
import {http} from '../api/http'

// 获取列表
export const getProductList = params => {
  return http.get('/admin/sku/publish/pagelist/' + params.pageNum + '/' + params.pageSize + '?' + params.params).then(res => res.data)
}
// 新增发布产品
export const publishProductAdd = params => {
  return http.post('/admin/sku/publish/add', params).then(res => res.data)
}
// 修改发布产品
export const publishProductEdit = params => {
  return http.post('/admin/sku/publish/update', params).then(res => res.data)
}
// 删除产品
export const deleteProduct = params => {
  return http.get('/admin/sku/publish/detele?publishIdStr=' + params).then(res => res.data)
}
// 产品详情
export const getPublishDetail = params => {
  return http.get('/admin/sku/publish/get/' + params).then(res => res.data)
}
// 获取审核列表
export const getPublishList = params => {
  return http.get('/admin/sku/publish/approve/pagelist/' + params.pageNum + '/' + params.pageSize + '?' + params.params).then(res => res.data)
}
// 审核产品
export const approve = params => {
  return http.post('/admin/sku/publish/approve', params).then(res => res.data)
}
