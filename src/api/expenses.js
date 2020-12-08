import request from '@/utils/request'

// 支出管理-列表
export function getExpenses(data) {
  return request({
    url: '/api-game/szrd/expenses/list',
    method: 'post',
    data
  })
}
// 支出管理-删除
export function delExpenses(data) {
  return request({
    url: '/api-game/szrd/expenses',
    method: 'delete',
    data
  })
}
// 支出管理-更新
export function putExpenses(data) {
  return request({
    url: '/api-game/szrd/expenses',
    method: 'put',
    data
  })
}
// 支出管理-新增
export function addExpenses(data) {
  return request({
    url: '/api-game/szrd/expenses',
    method: 'post',
    data
  })
}

// 支出管理-支出获得
export function taskeExpenses(data) {
  return request({
    url: '/api-game/szrd/expenses/get',
    method: 'post',
    data
  })
}

// 支出管理-支出移除
export function removeExpenses(data) {
  return request({
    url: '/api-game/szrd/expenses/remove',
    method: 'post',
    data
  })
}

