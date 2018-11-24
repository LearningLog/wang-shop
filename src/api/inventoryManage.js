import {http} from '../api/http'

// 获取列表
export const getProductList = params => {
  return http.get('getProductList', params).then(res => res.data)
}
// 新增||编辑产品
export const editProduct = params => {
  return http.post('editProduct', params).then(res => res.data)
}
// 删除产品
export const deleteProduct = params => {
  return http.get('deleteProduct', params).then(res => res.data)
}
// 上传图片
export const uploadInfo = () => {
  return http.get('/upload').then(res => res.data)
}
// 产品详情
export const productDetail = params => {
  return http.get('productDetail', params).then(res => res.data)
}
