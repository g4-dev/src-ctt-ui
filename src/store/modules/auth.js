const state = {
  token: '',
  expire: 0,
  isLogged: false,
}

const actions = {
  import({ commit }, data) {
    console.log(data)
    commit('loginAction', data)
    commit('disconnectAction', data)
  },
}

const getters = {
  isLogged: (state) => state.isLogged === true, // TODO enchance this function with expire mathematics
}

const mutations = {
  loginAction(state, { token, expire }) {
    state.isLogged = true
    state.token = token
    state.expire = expire
  },
  disconnectAction(state) {
    state.isLogged = false
    state.token = ''
    state.expire = ''
  },
}

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
}
