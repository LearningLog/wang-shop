import {http} from '../api/http'

// 获取列表
export const getProductList = params => {
  return http.post('getProductList', params).then(res => res.data)
}
// 搜索产品
export const searchProduct = params => {
  return http.post('searchProduct', params).then(res => res.data)
}
