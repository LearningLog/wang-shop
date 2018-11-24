import {http} from '../api/http'

// 获取列表
export const getProductList = params => {
  return http.get('getProductList', params).then(res => res.data)
}
// 发布产品
export const publishProduct = params => {
  return this.$http.post('publishProduct', params).then(res => res.data)
}
// 删除产品
export const deleteProduct = params => {
  return http.get('deleteProduct', params).then(res => res.data)
}
// 产品详情
export const productDetail = params => {
  return http.get('productDetail', params).then(res => res.data)
}
