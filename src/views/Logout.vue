<template>
  <p>Déconnexion...</p>
</template>

<script>
import { setToken } from '../utils/token'

export default {
  name: 'Logout',
  mounted() {
    setToken('')
    this.$router.push({ name: 'Login' })
  },
}
</script>
