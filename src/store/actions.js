import { setCookie } from '@/utils/cookie.js'
import api from '@/apiFetch/api'
import md5 from 'js-md5'

var actions = {
  init(state, { userName, password }) {
    return new Promise((resolve, reject) => {
      const loginForm = { userName, password }
      loginForm.password = md5(loginForm.password)
      api
        .login(loginForm)
        .then((data) => {
          const userInfo = {
            uid: data.id,
            userName: data.nickName
          }
          setCookie('uid', data.id)
          setCookie('userInfo', userInfo)
          state.userInfo = data.userInfo
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
export default actions
