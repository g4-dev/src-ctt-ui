import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import api from './api'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  beforeMount() {
    // request tests
    api.get('/users').then((val) => console.log(val))
  },
  render: (h) => h(App),
}).$mount('#app')
