import request from '@/utils/request'

// 奇人管理-列表
export function getSkill(data) {
  return request({
    url: '/api-game/szrd/skill/list',
    method: 'post',
    data
  })
}

