import request from '@/utils/request'

// 对解押申请进行分页查询，state是筛选条件
export function getEscortPage(query) {
  return request({
    url: 'http://zuul.huisen.top/escort-service/escort/getEscortPage',
    method: 'get',
    params: query
  })
}
// 保存解押申请
export function doSaveEscort(data) {
  return request({
    url: 'http://zuul.huisen.top/escort-service/escort/doSaveEscort',
    method: 'post',
    data
  })
}
// 改变解押状态
// 根据entity改变，同时也需要判断是不是需要改变仓单的状态
export function doChangeStateByEntity(data) {
  return request({
    url: 'http://zuul.huisen.top/escort-service/escort/doChangeStateByEntity',
    method: 'post',
    data
  })
}
// 分页查询针对于仓库方，
// 需要根据仓库的Id进行查询
export function doEscortPageToRepo(query) {
  return request({
    url: 'http://zuul.huisen.top/escort-service/escort/doEscortPageToRepo',
    method: 'get',
    params: query
  })
}