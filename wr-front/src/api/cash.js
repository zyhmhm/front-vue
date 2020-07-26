import request from '@/utils/request'

/**
 * @param {Object} query
 * 根据仓单的Id查询相应的仓单的信息
 */
export function getEleWareInfoById(query) {
  return request({
    url: 'http://zuul.huisen.top/ordermaking-service/getEleWareInfoById',
    method: 'get',
    params: query
  })
}

export function doSaveCash(data) {
  return request({
    url: 'http://zuul.huisen.top/cash-service/doSaveCash',
    method: 'post',
    data
  })
}

// 针对于仓促企业的分页查询
export function doGetCashPage(query) {
  return request({
    url: 'http://zuul.huisen.top/cash-service/doGetCashPage',
    method: 'get',
    params: query
  })
}
// 针对于仓储企业的审核操作
export function doAcceptOrRefuse(data) {
  return request({
    url: 'http://zuul.huisen.top/cash-service/doAcceptOrRefuse',
    method: 'post',
    data
  })
}

// 针对于货主的分页查询
export function doGetCashPageToShipper(query) {
  return request({
    url: 'http://zuul.huisen.top/cash-service/doGetCashPageToShipper',
    method: 'get',
    params: query
  })
}
