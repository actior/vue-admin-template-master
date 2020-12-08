import request from '@/utils/request'

// 角色管理-列表
export function getRole(data) {
  return request({
    url: '/api-game/szrd/role/list',
    method: 'post',
    data
  })
}
// 角色管理-删除
export function delRole(data) {
  return request({
    url: '/api-game/szrd/role',
    method: 'delete',
    data
  })
}
// 角色管理-更新
export function putRole(data) {
  return request({
    url: '/api-game/szrd/role',
    method: 'put',
    data
  })
}
// 角色管理-新增
export function addRole(data) {
  return request({
    url: '/api-game/szrd/role',
    method: 'post',
    data
  })
}
