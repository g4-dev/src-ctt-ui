import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'
import 'line-awesome/dist/font-awesome-line-awesome/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg', // default - only for display purposes
  },
  theme: {
    light: {
      primary: colors.blue,
      secondary: '#b0bec5',
      accent: '#8c9eff',
      error: '#b71c1c',
      background: colors.grey.lighten5,
    },
    dark: {
      primary: colors.blue,
      secondary: '#b0bec5',
      accent: '#8c9eff',
      error: '#b71c1c',
      background: colors.grey.darken4,
    },
  },
})
