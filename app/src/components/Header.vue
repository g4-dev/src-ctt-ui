<template>
  <v-toolbar dense flat tile color="transparent">
    <slot name="header"></slot>
    <v-spacer></v-spacer>
    <v-btn v-if="isLogged" :to="'/logout'" class="align-self-end"
      >Déconnexion</v-btn
    >
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Logout',
  computed: {
    ...mapGetters('auth', ['isLogged']),
  },
}
</script>
