import request from '@/utils/request'

// 资产列表-列表
export function assetsList(data) {
  return request({
    url: '/api-game/szrd/assets/list',
    method: 'post',
    data
  })
}
// 资产管理-删除
export function delAssetsList(data) {
  return request({
    url: '/api-game/szrd/assets',
    method: 'delete',
    data
  })
}
// 资产管理-更新
export function putAssetsList(data) {
  return request({
    url: '/api-game/szrd/assets',
    method: 'put',
    data
  })
}
// 资产管理-新增
export function addAssetsList(data) {
  return request({
    url: '/api-game/szrd/assets',
    method: 'post',
    data
  })
}

// 资产管理-购买资产
export function buyAssetsList(data) {
  return request({
    url: '/api-game/szrd/assets/buy',
    method: 'post',
    data
  })
}

// 资产管理-出售资产
export function saleAssetsList(data) {
  return request({
    url: '/api-game/szrd/assets/sale',
    method: 'post',
    data
  })
}

