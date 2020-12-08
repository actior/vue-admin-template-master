import request from '@/utils/request'

// 游戏事件管理-列表
export function getGameEvent(data) {
  return request({
    url: '/api-game/szrd/game_event_history/list',
    method: 'post',
    data
  })
}
// 游戏事件管理-删除
export function delGameEvent(data) {
  return request({
    url: '/api-game/szrd/game_event_history',
    method: 'delete',
    data
  })
}
// 游戏事件管理-新增
export function addGameEvent(data) {
  return request({
    url: '/api-game/szrd/game_event_history',
    method: 'post',
    data
  })
}
