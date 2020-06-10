import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import api from './api/singleton'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  beforeMount() {
    api.session.interceptors.response.use(
      response => response,
      error => {
        this.$store.dispatch('error/handleXHR', error.response)
        return Promise.reject(error)
      }
    )
    console.log(api.get("/transcripts"))
  },
  render: h => h(App)
}).$mount('#app')
