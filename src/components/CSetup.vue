<template>
  <v-container fluid grid-list-md text-center>
    <v-alert v-model="alert" dark color="red">
      Le nom n'est pas bon !
    </v-alert>
    <v-layout align-center justify-center>
      <v-flex xs12 sm9 md5>
        <v-card id="carteSetup" class="mx-auto transparent">
          <v-card-title class="justify-center headline">
            Setup d'installation
          </v-card-title>
          <v-card-text v-if="formulaire">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Nom"
                append-icon="mdi-arrow-right-bold-circle-outline"
                @click:append="validate"
                required
              />
              <p>
                Pour initialiser l'application une clé mère doit être créée
                ainsi que votre premier jeton d'accès
              </p>
            </v-form>
          </v-card-text>
          <v-card-text v-if="!formulaire">
            <v-text-field
              v-model="clefMere"
              disabled
              outlined
              label="Votre clé mère :"
            />
            <v-text-field
              v-model="clefAcces"
              disabled
              outlined
              label="Clé d'accès :"
            />
            <h2>Attention</h2>
            <p>
              Veillez à bien
              <span style="color: red;">conserver ces deux clés</span>. La clé
              mère vous permet de générer de nouveaux accès. Votre première clé
              d'accès permet de se connecter à l'interface. L'API grâce à la clé
              mère permet de générer de nouveaux accès sans passer par
              l'interface
            </p>
            <v-btn class="ma-2" outlined color="white" @click="login"
              >Commencer<v-icon id="iconBouton"
                >mdi-arrow-right-bold-circle-outline</v-icon
              ></v-btn
            >
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    key: '',
    valid: true,    
    alert: false,
    formulaire: true,
    clefMere: 'ofvnobjnezo-561rze-orneg-ree1e-geb15-ergionb120510',
    clefAcces: 'moiebgnobGRfeiubjr620rbbpiijejognbNGROMBJNnoernb0eb695b1',
    name: '',
    nameRules: [
      (v) => !!v || 'Le nom est requis',
      (v) =>
        (v && v.length >= 4) || 'Le nom doit être supérieur à 4 caractères',
    ],
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        if (this.name == 'Coco') {
          this.formulaire = false
        } else {
          this.alert = true
        }
      }
    },
    login() {
      this.$router.push('login')
    },
  },
}
</script>

<style scoped>
#carteSetup {
  margin-top: 30%;
}
h2 {
  margin-bottom: 10px;
}
#iconBouton {
  margin-left: 5px;
  margin-right: -5px;
}
#cleSetup {
  color: red;
}
</style>
