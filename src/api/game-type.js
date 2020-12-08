import request from '@/utils/request'

// 游戏类型管理-列表
export function getGame(data) {
  return request({
    url: `/api-game/szrd/game/type/list/${type}`,
    method: 'post',
    data
  })
}
