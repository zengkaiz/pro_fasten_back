import Fetch from './index'
// import qs from 'qs'

const basePath = '/feapi/profasten/admin/v1'

const apiConfig = {
  // conflist
  getConfLists: basePath + '/conf/conflist', // 登录
  // 登录部分
  login: basePath + '/admin/login', // 登录
  logout: basePath + '/admin/logout', // 登出
  getUserInfo: basePath + '/admin/profile', // 获取登录用户信息
  // 管理员部分
  getUserLists: basePath + '/admin/lists', // 获取后台用户列表
  saveUser: basePath + '/admin/save', // 添加用户
  // 门店部分
  getStoreLists: basePath + '/store/lists', // 门店列表
  saveStore: basePath + '/store/save', // 保存编辑门店
  getCities: basePath + '/city/lists', // 获取城市列表
  // 产品分类
  getListsCate: basePath + '/show/listsCate', // 分类列表
  saveCate: basePath + '/show/saveCate', // 添加分类
  // 产品列表
  getShowLists: basePath + '/show/lists', // 产品列表
  saveShow: basePath + '/show/save', // 添加产品
  // 动态图片设置
  getDynamicLists: basePath + '/dynamic/lists', // 动态图片列表
  sortDynamicLists: basePath + '/dynamic/sort', // 动态图片列表排序
  saveDynamic: basePath + '/dynamic/save', // 添加动态图
  // 短信列表
  getListVerifyCode: basePath + '/cust/listVerifyCode', // 列表
  // 客户列表
  getCustLists: basePath + '/cust/lists', // 客户列表
  // 订单部分
  sendOut: basePath + '/order_intent/send', // 发货
  cancelOrder: basePath + '/order_intent/cancel', // 取消
  handleOrder: basePath + '/order_intent/handle', // 处理
  getOrderLists: basePath + '/order_intent/lists', // 订单列表
  // 新闻公告
  getNewsLists: basePath + '/news/lists', // 新闻公告列表
  editNews: basePath + '/news/save', // 新闻公告编辑
  // 评价
  getFeedbackLists: basePath + '/feedback/lists', // 评价
  // 售后
  getServiceLists: basePath + '/after_service/lists',
  handleService: basePath + '/after_service/handle',
  // 公告
  getNoticeLists: basePath + '/order_notice/lists',
  saveNotice: basePath + '/order_notice/save'
}

const api = {}
/**
* desc 登录接口
* @param {Nunber} userName 用户名
* @param {string} password 密码
*/
api.getConfLists = function() {
  return Fetch.get(apiConfig.getConfLists, { params: arguments[0], withCredentials: true })
}
/**
 * desc 登录接口
 * @param {Nunber} userName 用户名
 * @param {string} password 密码
 */
api.login = function({ userName, password }) {
  return Fetch.get(apiConfig.login, { params: arguments[0], withCredentials: true })
}
/**
 * desc 登chu接口
 */
api.logout = function() {
  return Fetch.get(apiConfig.logout, { params: arguments[0], withCredentials: true })
}
api.getUserInfo = function() {
  return Fetch.get(apiConfig.getUserInfo, { params: arguments[0], withCredentials: true })
}
api.getUserLists = function() {
  return Fetch.get(apiConfig.getUserLists, { params: arguments[0], withCredentials: true })
}
api.saveUser = function(params) {
  return Fetch.post(apiConfig.saveUser, { data: params, withCredentials: true })
}
api.getStoreLists = function() {
  return Fetch.get(apiConfig.getStoreLists, { params: arguments[0], withCredentials: true })
}
api.saveStore = function(params) {
  return Fetch.post(apiConfig.saveStore, { data: params, withCredentials: true })
}
api.getCities = function() {
  return Fetch.get(apiConfig.getCities, { params: arguments[0], withCredentials: true })
}
api.getListsCate = function() {
  return Fetch.get(apiConfig.getListsCate, { params: arguments[0], withCredentials: true })
}
api.saveCate = function(params) {
  return Fetch.post(apiConfig.saveCate, { data: params, withCredentials: true })
}
api.getShowLists = function() {
  return Fetch.get(apiConfig.getShowLists, { params: arguments[0], withCredentials: true })
}
api.saveShow = function(params) {
  return Fetch.post(apiConfig.saveShow, { data: params, withCredentials: true })
}
api.getDynamicLists = function() {
  return Fetch.get(apiConfig.getDynamicLists, { params: arguments[0], withCredentials: true })
}
api.sortDynamicLists = function(params) {
  return Fetch.post(apiConfig.sortDynamicLists, { data: params, withCredentials: true })
}
api.saveDynamic = function(params) {
  return Fetch.post(apiConfig.saveDynamic, { data: params, withCredentials: true })
}
api.getListVerifyCode = function() {
  return Fetch.get(apiConfig.getListVerifyCode, { params: arguments[0], withCredentials: true })
}
api.getCustLists = function() {
  return Fetch.get(apiConfig.getCustLists, { params: arguments[0], withCredentials: true })
}
api.sendOut = function(params) {
  return Fetch.post(apiConfig.sendOut, { data: params, withCredentials: true })
}
api.cancelOrder = function(params) {
  return Fetch.post(apiConfig.cancelOrder, { data: params, withCredentials: true })
}
api.handleOrder = function(params) {
  return Fetch.post(apiConfig.handleOrder, { data: params, withCredentials: true })
}
api.getOrderLists = function() {
  return Fetch.get(apiConfig.getOrderLists, { params: arguments[0], withCredentials: true })
}
api.getNewsLists = function() {
  return Fetch.get(apiConfig.getNewsLists, { params: arguments[0], withCredentials: true })
}
api.editNews = function(params) {
  return Fetch.post(apiConfig.editNews, { data: params, withCredentials: true })
}
api.getFeedbackLists = function() {
  return Fetch.get(apiConfig.getFeedbackLists, { params: arguments[0], withCredentials: true })
}
api.getServiceLists = function() {
  return Fetch.get(apiConfig.getServiceLists, { params: arguments[0], withCredentials: true })
}
api.handleService = function(params) {
  return Fetch.post(apiConfig.handleService, { data: params, withCredentials: true })
}
api.getNoticeLists = function() {
  return Fetch.get(apiConfig.getNoticeLists, { params: arguments[0], withCredentials: true })
}
api.saveNotice = function(params) {
  return Fetch.post(apiConfig.saveNotice, { data: params, withCredentials: true })
}
export default api
