import VueNativeSock from 'vue-native-websocket'
import Vue from 'vue'

Vue.use(VueNativeSock, process.env.VUE_APP_WS_IP, {
  connectManually: true,
  reconnection: false,
  format: 'json',
  reconnectionDelay: 2000,
})
