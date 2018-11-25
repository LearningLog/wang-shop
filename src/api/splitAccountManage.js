/**
 * @author: YanHuaKang
 * @2018/11/24
 * @Description:商品管理
 */
import {http} from '../api/http'

// 获取列表
export const getSplitAccountList = params => {
  return http.get('getSplitAccountList', params).then(res => res.data)
}
// 新增||编辑产品
export const saveProduct = params => {
  return http.post('saveProduct', params).then(res => res.data)
}
// 删除产品
export const deleteSplitAccount = params => {
  return http.get('deleteSplitAccount', params).then(res => res.data)
}
// 上传图片
export const uploadInfo = () => {
  return http.get('/upload').then(res => res.data)
}
// 产品详情
export const getOrderFormDetail = params => {
  return http.get('getOrderFormDetail', params).then(res => res.data)
}
