<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-content>
      <Navbar></Navbar>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  import Navbar from '@/views/components/Navbar.vue'
export default {
  name: 'App',
  components: {
    Navbar,
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light'
    }
  },
  data() {
    return {
      items: [
        { title: 'Add New User', icon: 'las la-user-plus' },
        { title: 'Update User Details', icon: 'las la-user-edit' },
        { title: 'Update User Details', icon: 'las la-user' }
      ],
      right: null
    }
  }
}
</script>

<style scoped>
#app-bar {
  border-width: 0 0 thin;
  border-style: solid;
  border-bottom-color: rgba(0, 0, 0, 0.12) !important;
}
</style>
