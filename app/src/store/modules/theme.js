import vuetify from '@/plugins/vuetify'

export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
}

const state = {
  theme: THEMES.DARK,
}

const actions = {
  setTheme({ commit }, data) {
    commit('setTheme', data)
  },
  toggle({ commit }) {
    commit('toggle')
  },
}

const getters = {
  isDarkTheme: ({ theme }) => theme === THEMES.DARK,
  isLightTheme: (state, getters) => !getters.isDarkTheme(),
}

const mutations = {
  setTheme(state, theme) {
    theme = theme || localStorage.getItem('theme') || THEMES.DARK
    const formatedtheme = String(theme).toUpperCase()
    state.theme = THEMES[formatedtheme]
    localStorage.setItem('theme', theme)
    vuetify.theme.dark = state.theme === THEMES.DARK ? true : false
    vuetify.theme.light = state.theme === THEMES.LIGHT ? true : false
  },
  toggle(state) {
    if (this.getters['theme/isDarkTheme']) {
      state.theme = THEMES.LIGHT
      localStorage.setItem('theme', THEMES.LIGHT)
      vuetify.theme.light = true
      vuetify.theme.dark = true
    } else {
      state.theme = THEMES.DARK
      localStorage.setItem('theme', THEMES.DARK)
      vuetify.theme.dark = true
      vuetify.theme.light = true
    }
  },
}

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
}
