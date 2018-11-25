/**
 * @author: YanHuaKang
 * @2018/11/24
 * @Description:厂商管理
 */
import {http} from '../api/http'

// 获取列表
export const getManufacturerList = params => {
  return http.get('getManufacturerList', params).then(res => res.data)
}
// 新增||编辑产品
export const saveManufacturer = params => {
  return http.post('saveManufacturer', params).then(res => res.data)
}
// 删除产品
export const deleteManufacturer = params => {
  return http.get('deleteManufacturer', params).then(res => res.data)
}
// 产品详情
export const getManufacturerDetail = params => {
  return http.get('getManufacturerDetail', params).then(res => res.data)
}
