import Fetch from './index'
import qs from 'qs'

const basePath = '/feapi/profasten/admin/v1'

const apiConfig = {
  register: basePath + '/user/register', // 注册
  login: basePath + '/admin/login', // 登录
  logout: basePath + '/user/logout' // 登出
}

const api = {}

/**
 * desc 注册接口
 * @param {Nunber} mobile 手机号
 * @param {string} name 用户名
 * @param {string} password 密码
 */
api.register = function() {
  return Fetch.post(apiConfig.register, { data: qs.stringify(arguments[0]), withCredentials: true })
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
 * @param {Nunber} mobile 手机号
 */
api.logout = function() {
  return Fetch.get(apiConfig.logout, { params: arguments[0], withCredentials: true })
}
export default api
