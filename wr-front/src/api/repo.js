import request from '@/utils/request'

// 获取仓库的基本信息
export function getRepoInfo(query) {
  return request({
    url: 'http://zuul.huisen.top/repo-service/repo/getRepoInfo',
    method: 'get',
    params: query
  })
}
// 保存解押申请
export function doGetPositionPage(query) {
  return request({
    url: 'http://zuul.huisen.top/repo-service/repo/doGetPositionPage',
    method: 'get',
    params: query
  })
}
// 改变解押状态
// 根据entity改变，同时也需要判断是不是需要改变仓单的状态
export function doUpdateRepo(data) {
  return request({
    url: 'http://zuul.huisen.top/repo-service/repo/doUpdateRepo',
    method: 'post',
    data
  })
}
// 分页查询针对于仓库方，
// 需要根据仓库的Id进行查询
export function doUpdatePosition(data) {
  return request({
    url: 'http://zuul.huisen.top/repo-service/repo/doUpdatePosition',
    method: 'post',
    data
  })
}
export function doSavePosition(data) {
  return request({
    url: 'http://zuul.huisen.top/repo-service/repo/doSavePosition',
    method: 'post',
    data
  })
}

// 保存解押申请
export function getNoUsedPosition(query) {
  return request({
    url: 'http://zuul.huisen.top/repo-service/repo/getNoUsedPosition',
    method: 'get',
    params: query
  })
}

// 添加仓库
export function doSaveRepo(data) {
  return request({
    url: 'http://zuul.huisen.top/repo-service/repo/doSaveRepo',
    method: 'post',
    data
  })
}

// 获取所有仓库
export function getAllRepo(query) {
  return request({
    url: 'http://zuul.huisen.top/repo-service/repo/getAllRepo',
    method: 'get',
    params: query
  })
}
