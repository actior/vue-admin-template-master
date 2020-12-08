import request from '@/utils/request'

// 游戏信息管理-列表
export function getGameInfo(data) {
  return request({
    url: '/api-game/szrd/game_info/list',
    method: 'post',
    data
  })
}
// 游戏信息管理-删除
export function delGameInfo(data) {
  return request({
    url: '/api-game/szrd/game_info',
    method: 'delete',
    data
  })
}
// 游戏信息管理-新增
export function addGameInfo(data) {
  return request({
    url: '/api-game/szrd/game_info',
    method: 'post',
    data
  })
}
