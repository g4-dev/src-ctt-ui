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
    // TODO: Example requests
    // api
    //   .auth({
    //     name: 'user_tess',
    //     token: '3553d7ad-72e3-4f2d-b75c-862082ddb15e',
    //   })
    //   .then((val) => console.log(val))
    //   .catch((err) => console.error('err auth', err))
    // api.get('/transcripts').then((val) => console.log('trabs', val))
  },
  render: (h) => h(App),
}).$mount('#app')
