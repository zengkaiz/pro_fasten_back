import Fetch from './fetch'
export default new Fetch({
  resHandle: (res) => {
    console.log(res.error)
    if (!res.error) {
      return Promise.resolve(res)
    }
    console.log(res.error.code)
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ errorNo: res.error.code, errorMsg: res.error.message })
  }
})
