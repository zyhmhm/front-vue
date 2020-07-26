import request from '@/utils/request'

/**
 * @param {Object} query
 * 根据仓单的Id查询相应的仓单的信息
 */
export function getEleWareInfoByTypeId(query) {
  return request({
    url: 'http://zuul.huisen.top/ordermaking-service/getEleWareInfoByTypeId',
    method: 'get',
    params: query
  })
}
// 获取仓单的分页查询信息————货主
export function getEleWarePage(query) {
  return request({
    url: 'http://zuul.huisen.top/ordermaking-service/getEleWarePage',
    method: 'get',
    params: query
  })
}
