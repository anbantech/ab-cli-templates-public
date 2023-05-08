import { createStore } from 'vuex'

export default createStore({
  state: {
    userName: ''
  },
  mutations: {
    setUserName(state, val) {
      state.userName = val
    }
  },
  actions: {},
  modules: {}
})
