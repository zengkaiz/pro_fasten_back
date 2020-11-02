/**
 * [mutations description]
 * @type {Object}
 */
let mutations = {
  setUserName(state, userName) {
    state.userName = userName
  },
  setConfLists(state, confLists) {
    state.confLists = confLists
  },
  setIsloginPage(state, bul) {
    state.isLoginPage = bul
  }
}

export default mutations
