/**
 * @author: YanHuaKang
 * @2018/11/24
 * @Description:商品管理
 */
import {http} from '../api/http'

// 获取列表
export const getProductList = params => {
  return http.get('/admin/sku/page/list/' + params.pageNum + '/' + params.pageSize + '?skuName=' + params.skuName + '&skuId=' + params.skuId).then(res => res.data)
  // return http.get('/admin/sku/page/list/' + params.pageSize + '/' + params.pageNum).then(res => res.data)
}
// 新增产品
export const addProduct = params => {
  return http.post('/admin/sku/add', params).then(res => res.data)
}
// 编辑产品
export const updateProduct = params => {
  return http.post('/admin/sku/update', params).then(res => res.data)
}
// 删除产品
export const deleteProduct = params => {
  return http.get('/admin/sku/delete?skuIdStr=' + params).then(res => res.data)
}

// 产品详情
export const getProductDetail = params => {
  return http.get('/admin/sku/get/' + params).then(res => res.data)
}

// 单上传图片
export const uploadSingle = params => {
  return http.post('/admin/upload/uploadFile', params).then(res => res.data)
}
// 多上传图片
export const uploadBatch = params => {
  return http.post('/admin/upload/batchUploadFile', params).then(res => res.data)
}
