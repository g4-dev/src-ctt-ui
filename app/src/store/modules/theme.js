import vuetifyInstance from '@/plugins/vuetify'
const vuetify = vuetifyInstance.framework

const state = {
  dark: true,
}

const actions = {
  initTheme({ commit }, data) {
    commit('initTheme', data)
  },
  toggle({ commit }) {
    commit('toggle')
  },
}

const getters = {
  isDarkTheme: ({ dark }) => dark === true,
  isLightTheme: ({ dark }) => !dark,
}

const mutations = {
  initTheme(state) {
    vuetify.theme.dark =
      JSON.parse(localStorage.getItem('themeIsDark')) ?? state.dark
    state.dark = vuetify.theme.dark
    localStorage.setItem('themeIsDark', vuetify.theme.dark)
  },
  toggle(state) {
    vuetify.theme.dark = !vuetify.theme.dark
    state.dark = vuetify.theme.dark
    localStorage.setItem('themeIsDark', vuetify.theme.dark)
  },
}

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
}
