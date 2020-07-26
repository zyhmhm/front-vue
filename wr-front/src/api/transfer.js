import request from '@/utils/request'

// 对转让申请进行分页查询，state是筛选条件
export function getTransferPage(query) {
  return request({
    url: 'http://zuul.huisen.top/transfer-service/transfer/getTransferPage',
    method: 'get',
    params: query
  })
}
// 保存转让申请
export function doSaveTransfer(data) {
  return request({
    url: 'http://zuul.huisen.top/transfer-service/transfer/doSaveTransfer',
    method: 'post',
    data
  })
}
//  改变转让申请状态
// 受让人确认转让，仓库方确认转让都调用这个方法
export function doChangeState(data) {
  return request({
    url: 'http://zuul.huisen.top/transfer-service/transfer/doChangeState',
    method: 'post',
    data
  })
}
// 获取转让单据的分页信息、针对于仓库方
// 需要根据repoId新型查询
export function getTransferPageToRepo(query) {
  return request({
    url: 'http://zuul.huisen.top/transfer-service/transfer/getTransferPageToRepo',
    method: 'get',
    params: query
  })
}
