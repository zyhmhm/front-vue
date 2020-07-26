import request from '@/utils/request'

export function login(data) {
  // debugger
  return request({
    url: 'http://zuul.huisen.top/sso-service/user/doLogin',
    method: 'post',
    data
  })
}

export function register(data) {
  // debugger
  return request({
    url: 'http://zuul.huisen.top/sso-service/user/register',
    method: 'post',
    data
  })
}

export function checkUserName(query) {
  // debugger
  return request({
    url: 'http://zuul.huisen.top/sso-service/user/check',
    method: 'get',
    params: query
  })
}

export function getInfo(token) {
  return request({
    url: 'http://zuul.huisen.top/sso-service/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'http://zuul.huisen.top/sso-service/user/logout',
    method: 'post'
  })
}
