import request from '@/utils/request'

// 玩家现金变动管理-列表
export function getPlayerCash(data) {
  return request({
    url: '/api-game/szrd/player_cash_history/list',
    method: 'post',
    data
  })
}
// 玩家现金变动管理-删除
export function delPlayerCash(data) {
  return request({
    url: '/api-game/szrd/player_cash_history',
    method: 'delete',
    data
  })
}
// 玩家现金变动管理-新增
export function addPlayerCash(data) {
  return request({
    url: '/api-game/szrd/player_cash_history',
    method: 'post',
    data
  })
}
