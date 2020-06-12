<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-content>
      <Navbar v-if="isLogged"></Navbar>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { mapState } from 'vuex'
import api from './api'

export default {
  name: 'App',
  components: {
    Navbar,
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light'
    },
    ...mapState('auth', ['isLogged', 'user']),
  },
  created() {
    console.log(this)
    // Intercept bad response from api to verify login and change state
    api.session.interceptors.response.use(undefined, (err) => {
      return new Promise(() => {
        if (err.response.status && [401, 403].includes(err.response.status)) {
          this.$store.dispatch('auth/disconnect')
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
  data() {
    return {
      right: null,
    }
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
