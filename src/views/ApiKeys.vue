<template>
  <div class="pa-6">
    <v-alert v-show="success" type="success">
      L'utilisateur a été supprimé avec succès
    </v-alert>
    <v-alert v-show="error" type="error">
      Une erreur est survenue
    </v-alert>
    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Gestion utilisateur</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
<!--          <v-dialog v-model="dialog" max-width="500px">-->
<!--            <template v-slot:activator="{ on, attrs }">-->
<!--              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"-->
<!--                >Ajouter</v-btn-->
<!--              >-->
<!--            </template>-->
<!--            <v-card>-->
<!--              <v-card-title>-->
<!--                <span class="headline">{{ formTitle }}</span>-->
<!--              </v-card-title>-->

<!--              <v-card-text>-->
<!--                <v-container>-->
<!--                  <v-row>-->
<!--                    <v-col cols="12">-->
<!--                      <v-text-field-->
<!--                        v-model="editedItem.name"-->
<!--                        label="Nom de l'utilisateur"-->
<!--                      ></v-text-field>-->
<!--                    </v-col>-->
<!--                  </v-row>-->
<!--                </v-container>-->
<!--              </v-card-text>-->

<!--              <v-card-actions>-->
<!--                <v-spacer></v-spacer>-->
<!--                <v-btn color="blue darken-1" text @click="close">Annulez</v-btn>-->
<!--                <v-btn color="blue darken-1" text @click="save">Ok</v-btn>-->
<!--              </v-card-actions>-->
<!--            </v-card>-->
<!--          </v-dialog>-->
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
  <!--        <v-icon small class="mr-2" @click="editItem(item)">-->
  <!--          mdi-pencil-->
  <!--        </v-icon>-->
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        Pas d'utilisateurs
      </template>
    </v-data-table>
  </div>
</template>

<script>
import api from '@/api'
// Create the crud to manage and request new api keys
export default {
  name: 'Access',
  data: () => ({
    disabled: false,
    success: false,
    error: false,
    motherskey: '',
    dialog: false,
    headers: [
      {
        text: 'Utilisateur',
        value: 'name',
        sortable: false,
      },
      { text: 'Action', value: 'actions', sortable: false },
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      name: '',
    },
    defaultItem: {
      name: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? 'Ajouter un utilisateur'
        : 'Editer un utilisateur'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    async initialize() {
      await api.get('/users').then(response => (this.users = (response.data)))
      await console.log(this.users)
    },
    editItem(item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true

    },

    deleteItem(item) {
      const index = this.users.indexOf(item)
      if(confirm("Etes vous sur de vouloir suprimmer l'utilisateur")) {
        // api.delete('/users/' + item.id)
        //dans le then mettre le success à true // dans le catch mettre une erreur
        this.success  = true
        this.users.splice(index, 1)
      }

    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem)
      } else {
        this.users.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style scoped></style>
