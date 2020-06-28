<template>
  <v-app
    :style="
      isLightTheme
        ? { background: $vuetify.theme.themes['light'].background }
        : ''
    "
  >
    <v-content>
      <Navbar v-if="isLogged"></Navbar>
      <v-container>
        <Header></Header>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Header from './components/Header.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    Navbar,
    Header,
  },
  data() {
    return {
      right: null,
    }
  },
  created() {
    this.$store.dispatch('theme/initTheme')
  },
  computed: {
    ...mapGetters('auth', ['isLogged']),
    ...mapGetters('theme', ['isLightTheme']),
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
