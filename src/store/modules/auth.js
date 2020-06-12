import api from '@/api'

const state = {
  user: {},
  isLogged: false,
}

const actions = {
  import({ commit }, { user, ...data } = null) {
    commit('loginAction', data)
    commit('isLogged', data)
    commit('userInfo', user)
  },
}

const getters = {
  isLogged: () => this.isLogged === true,
  userInfo: () => this.user,
}

const mutations = {
  loginAction(state, { token, name }) {
    api
      .auth({ name, token })
      .then((data) => {
        console.log(data)
        state.user = { token: token, name: name }
      })
      .catch(() => {
        state.isLogged = false
      })
  },
}

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
}
