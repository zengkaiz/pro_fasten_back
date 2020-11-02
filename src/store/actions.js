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
          localStorage.userName = data.userName
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getUserInfo() {
    return new Promise((resolve, reject) => {
      api
        .getUserInfo()
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getConfLists() {
    return new Promise((resolve, reject) => {
      api
        .getConfLists()
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
export default actions
