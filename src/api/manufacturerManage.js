/**
 * @author: YanHuaKang
 * @2018/11/24
 * @Description:厂商管理
 */
import {http} from '../api/http'

// 获取列表
export const getManufacturerList = params => {
  return http.get('/admin/manufacturer/page/list/' + params.pageNum + '/' + params.pageSize + '?' + params.params).then(res => res.data)
}
// 新增厂商
export const addManufacturer = params => {
  return http.post('/admin/manufacturer/saveManufacturer', params).then(res => res.data)
}
// 编辑厂商
export const editManufacturer = params => {
  return http.post('/admin/manufacturer/saveManufacturer', params).then(res => res.data)
}
// 删除厂商
export const deleteManufacturers = params => {
  return http.get('/admin/manufacturer/delManufacturer?ids=' + params).then(res => res.data)
}
// 厂商详情
export const getManufacturerDetail = params => {
  return http.get('/admin/manufacturer/toEdit/' + params).then(res => res.data)
}
