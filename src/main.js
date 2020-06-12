import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import api from './api'
//import { getCookie } from '@/utils/getCookie'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  beforeMount() {
    // request tests
    api.get('/users').then((val) => console.log(val))

    api.session.interceptors.response.use((err) => {
      return new Promise(() => {
        if (err.response.status === 401) {
          this.$router.push({ path: '/login' })
        } else if (err.response.status === 500) {
          document.open()
          document.write(err.response.data)
          document.close()
        }
        throw err
      })
    })
  },
  render: (h) => h(App),
}).$mount('#app')
