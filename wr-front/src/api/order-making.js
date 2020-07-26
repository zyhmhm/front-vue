import request from '@/utils/request'

// 获取当前用户可以申请制单的预约单，并且分页查询
export function getNeedMadeAppo(query) {
  return request({
    url: 'http://zuul.huisen.top/appointment-service/appointment/getNeedMadeAppo',
    method: 'get',
    params: query
  })
}
// http://localhost:3001/ordermaking-service/ordermaking/getInfoById?appointmentId=1
// 制单时候获取基本信息
export function getInfoById(query) {
  return request({
    url: 'http://zuul.huisen.top/ordermaking-service/ordermaking/getInfoById',
    method: 'get',
    params: query
  })
}
// 提交制单申请
export function doSave(data) {
  return request({
    url: 'http://zuul.huisen.top/ordermaking-service/ordermaking/doSave',
    method: 'post',
    data
  })
}
// 仓库方查询该仓库的制单申请,根据仓库Id
export function doGetOrderMakingToRepo(query) {
  return request({
    url: 'http://zuul.huisen.top/ordermaking-service/ordermaking/doGetOrderMakingToRepo',
    method: 'get',
    params: query
  })
}
// 货主的条件分页查询
export function doGetOrderMakingToShipper(query) {
  return request({
    url: 'http://zuul.huisen.top/ordermaking-service/ordermaking/doGetOrderMakingToShipper',
    method: 'get',
    params: query
  })
}

export function doGetOrderMakingById(query) {
  return request({
    url: 'http://zuul.huisen.top/ordermaking-service/ordermaking/doGetOrderMakingById',
    method: 'get',
    params: query
  })
}

export function doAcceptOrRefuse(data) {
  return request({
    url: 'http://zuul.huisen.top/ordermaking-service/ordermaking/doAcceptOrRefuse',
    method: 'post',
    data
  })
}
// 将仓单保存
export function doSaveEleWare(data) {
  return request({
    url: 'http://zuul.huisen.top/ordermaking-service/ordermaking/doSaveEleWare',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset-UTF-8'
    },
    data
  })
}
// 自动获取需要制作的仓单
// 仓库方查询该仓库的制单申请,根据仓库Id
export function doGetEleWareInfoToMake(query) {
  return request({
    url: 'http://zuul.huisen.top/ordermaking-service/doGetEleWareInfoToMake',
    method: 'get',
    params: query
  })
}
