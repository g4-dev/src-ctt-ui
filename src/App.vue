<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-content>
      <Navbar v-if="isLogged"></Navbar>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    Navbar,
  },
  data() {
    return {
      right: null,
    }
  },
  created: function() {
    console.log("Starting connection to WebSocket Server")
    this.connection = new WebSocket("ws://localhost:8082")

    this.connection.onmessage = function(event) {
      console.log(event.data);
    }

    this.connection.onopen = function(event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }

  },
  computed: {
    ...mapState('auth', ['isLogged']),
    ...mapState('theme', ['theme']),
  },
}
</script>

<style scoped>
#app-bar {
  border-width: 0 0 thin;
  border-style: solid;
  border-bottom-color: rgba(0, 0, 0, 0.12) !important;
}
</style>
