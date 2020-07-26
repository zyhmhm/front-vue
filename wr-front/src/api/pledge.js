import request from '@/utils/request'

// 对质押申请进行分页查询，state是筛选条件
export function getPledgePage(query) {
  return request({
    url: 'http://zuul.huisen.top/pledge-service/pledge/getPledgePage',
    method: 'get',
    params: query
  })
}
// 保存质押申请
export function doSavePledge(data) {
  return request({
    url: 'http://zuul.huisen.top/pledge-service/pledge/doSavePledge',
    method: 'post',
    data
  })
}
// 改变质押状态
// 根据entity改变，同时也需要判断是不是需要改变仓单的状态
export function doChangeStateByEntity(data) {
  return request({
    url: 'http://zuul.huisen.top/pledge-service/pledge/doChangeStateByEntity',
    method: 'post',
    data
  })
}
// 分页查询针对于仓库方，
// 需要根据仓库的Id进行查询
export function doPledgePageToRepo(query) {
  return request({
    url: 'http://zuul.huisen.top/pledge-service/pledge/doPledgePageToRepo',
    method: 'get',
    params: query
  })
}
