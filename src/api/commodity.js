import {http} from '../api/http'

// 获取列表
export const getProductList = params => {
  return http.get('getProductList', params).then(res => res.data)
}
// 搜索产品
export const searchProduct = params => {
  return http.get('searchProduct', params).then(res => res.data)
}
// 新增||编辑产品
export const editProduct = params => {
  return http.post('addProduct', params).then(res => res.data)
}
