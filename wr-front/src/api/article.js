import request from '@/utils/request'

export function doAcceptOrRefuse(data) {
  return request({
    url: 'http://zuul.huisen.top/appointment-service/appointment/doAcceptOrRefuse',
    method: 'post',
    data
  })
}
export function postAppointment(data) {
  return request({
    // url: '/vue-element-admin/article/list',
    url: 'http://zuul.huisen.top/appointment-service/appointment/postAppointment',
    method: 'post',
    data
  })
}
export function fetchList2(query) {
  return request({
    // url: '/vue-element-admin/article/list',
    url: 'http://zuul.huisen.top/appointment-service/appointment/getAppointmentPage',
    method: 'get',
    params: query
  })
}
export function getAppointmentPageToRepo(query) {
  return request({
    // url: '/vue-element-admin/article/list',
    url: 'http://zuul.huisen.top/appointment-service/appointment/getAppointmentPageToRepo',
    method: 'get',
    params: query
  })
}
export function doSubmitApp(query) {
  return request({
    url: 'http://zuul.huisen.top/appointment-service/appointment/doSubmitApp',
    method: 'get',
    params: query
  })
}
export function doFindAppById(query) {
  return request({
    url: 'http://zuul.huisen.top/appointment-service/appointment/doFindAppoById',
    method: 'get',
    params: query
  })
}
export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    // url: 'http://localhost:3001/appointment-service/appointment/getAppointmentPage',
    method: 'get',
    params: query
  })
}

//确认已入库
export function doSureInRepo(data) {
  return request({
    url: 'http://zuul.huisen.top/appointment-service/appointment/doChangeStateById',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset-UTF-8'
    },
    data
  })
}

// 删除预约单
export function deleteAppoById(query) {
  return request({
    url: 'http://zuul.huisen.top/appointment-service/appointment/deleteAppoById',
    // url: 'http://localhost:3001/appointment-service/appointment/getAppointmentPage',
    method: 'get',
    params: query
  })
}
// 改变状态并填写每个货物明细单状态
export function doInRepoForRepo(data) {
  return request({
    url: 'http://zuul.huisen.top/appointment-service/appointment/doInRepoForRepo',
    method: 'post',
    data
  })
}







export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
