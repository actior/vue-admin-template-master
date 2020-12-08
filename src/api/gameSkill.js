import request from '@/utils/request'

// 游戏技能管理-列表
export function getGameskill(data) {
  return request({
    url: '/api-game/szrd/game_skill_history/list',
    method: 'post',
    data
  })
}
// 游戏技能管理-删除
export function delGameskill(data) {
  return request({
    url: '/api-game/szrd/game_skill_history',
    method: 'delete',
    data
  })
}
// 游戏技能管理-新增
export function addGameskill(data) {
  return request({
    url: '/api-game/szrd/game_skill_history',
    method: 'post',
    data
  })
}
