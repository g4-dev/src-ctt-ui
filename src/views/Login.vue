<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs4 offset-xs4>
        <v-card
          elevation-24
          style="padding: 20px; border: 1px; border-radius: 50px;"
        >
          <v-card-text>
            <h4 class="display-2 font-weight-bold">Connexion</h4>
            <hr />
            <br />
            <v-form>
              <v-text-field
                v-model="name"
                label="Nom"
                type="text"
                color="white"
                counter="10"
              >
              </v-text-field>
              <v-text-field
                v-model="token"
                label="Clé token"
                type="password"
                color="white"
              >
              </v-text-field>
            </v-form>
            <br />
            <v-btn color="grey darken-2" large @click:prepend="loginAction"
              >Se connecter</v-btn
            >
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import store from '@/store'

export default {
  name: 'Login',
  data() {
    return {
      name: '',
      token: '',
    }
  },
  methods: {
    loginAction() {
      this.name = 'user_tess'
      this.token = '0a81b606-77a6-453d-ad47-4e8a63860330'
      console.log('append clicked', this.name)
      store
        .dispatch('auth/loginAction', {
          token: this.token,
          name: this.name,
        })
        .then((val) => {
          console.log('auth', val)
        })
    },
  },
}
</script>

<style></style>
