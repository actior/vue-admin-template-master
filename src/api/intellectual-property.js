import request from '@/utils/request'

// 知识产权管理-列表
export function getIntel(data) {
  return request({
    url: '/api-game/szrd/intellectual_property/list',
    method: 'post',
    data
  })
}
// 知识产权管理-删除
export function delIntel(data) {
  return request({
    url: '/api-game/szrd/intellectual_property',
    method: 'delete',
    data
  })
}
// 知识产权管理-更新
export function putIntel(data) {
  return request({
    url: '/api-game/szrd/intellectual_property',
    method: 'put',
    data
  })
}
// 知识产权管理-新增
export function addIntel(data) {
  return request({
    url: '/api-game/szrd/intellectual_property',
    method: 'post',
    data
  })
}

// 知识产权管理-获得知识产权
export function intellectual(data) {
  return request({
    url: '/api-game/szrd/intellectual_property/get',
    method: 'post',
    data
  })
}

// 知识产权管理-出售知识产权
export function saleIntel(data) {
  return request({
    url: '/api-game/szrd/intellectual_property/sale',
    method: 'post',
    data
  })
}
