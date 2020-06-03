export const THEMES = {
  dark: 'dark',
  light: 'light'
}

const state = {
  theme: THEMES.light
}

const actions = {
  import({ commit }, { allowedTypes, theme, ...data } = null) {
    commit('init', data)
    commit('setTheme', theme)
    commit('setAllowedTypes', allowedTypes)
  }
}

const getters = {
  isDefaultTheme: ({ theme }) => theme === theme.dark,
  isLightTheme: (state, getters) => !getters.isDefaultTheme
}

const mutations = {
  init(state, { theme }) {
    state.theme = theme
  },
  setTheme(state, theme) {
    const formatedtheme = (theme && String(theme).toUpperCase()) || null
    state.theme = theme[formatedtheme] || theme.dark
  },
  setAllowedTypes(state, allowedTypes) {
    state.allowedTypes = allowedTypes
  }
}

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations
}
