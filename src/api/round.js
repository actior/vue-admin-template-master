import request from '@/utils/request'

// 角色管理-列表
export function getRound(data) {
  return request({
    url: '/api-game/szrd/roundInfo/list',
    method: 'post',
    data
  })
}
// 角色管理-更新
export function putRound(data) {
  return request({
    url: '/api-game/szrd/roundInfo',
    method: 'put',
    data
  })
}

