import request from '@/utils/request'

// 异事管理-列表
export function getEvent(data) {
  return request({
    url: '/api-game/szrd/event/list',
    method: 'post',
    data
  })
}

