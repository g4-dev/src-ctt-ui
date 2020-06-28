<template>
  <v-navigation-drawer app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Call2Text
          <!-- TODO : variable -->
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        router
        :to="item.url"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-btn
        medium
        fab
        class="ml-4 my-4"
        @click="$store.dispatch('theme/toggle')"
      >
        <v-icon>mdi-weather-night</v-icon>
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>
<script>
import { parseMenuFromRouter } from '../utils/menu'

export default {
  name: 'Navbar',
  data() {
    return {
      items: parseMenuFromRouter(),
      right: null,
    }
  },
}
</script>

<style scoped></style>
