<template>
  <div class="pa-6">
    <v-alert v-show="success" type="success">
      L'utilisateur a été supprimé avec succès
    </v-alert>
    <v-alert v-show="error" type="error">
      Une erreur est survenue
    </v-alert>
    <v-data-table :headers="headers" :items="users" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Gestion utilisateur</v-toolbar-title>
          <v-input></v-input>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                @click="toggleMethod('create')"
              >
                Ajouter
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row v-if="method === 'create'">
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Nom de l'utilisateur"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.master"
                        label="Clé mère"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Annulez</v-btn>
                <v-btn color="blue darken-1" text @click="dispatchMethod"
                  >Ok</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn small icon @click="toggleMethod('delete', item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
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

    dialogText: {
      create: 'Créer',
      delete: 'Suppression',
    },
    method: 'create', // possible : "delete"
    methodArgs: [],
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
      master: '',
    },
    defaultItem: {
      name: '',
    },
  }),
  computed: {
    formTitle() {
      return this.dialogText[this.method]
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
      await api.get('/users').then((response) => (this.users = response.data))
    },
    /**
     * @method
     */
    delete(item) {
      const index = this.users.indexOf(item)
      try {
        api.remove(`/users/${item.id}`, {
          headers: { master_key: this.editedItem.master },
        })
        this.success = true
        this.users.splice(index, 1)
      } catch (e) {
        this.error = true
      }
      // Don't forget close these events
      this.methodArgs = null
      this.close()
    },
    /**
     * @method
     */
    create() {
      try {
        api.get(`/users/create?name=${this.editedItem.name}`, {
          headers: { master_key: this.editedItem.master },
        })
        this.users.push(this.editedItem)
        this.success = true
      } catch (e) {
        this.error = true
      }
      // Don't forget close these events
      this.methodArgs = null
      this.close()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    dispatchMethod() {
      this[this.method](this.methodArgs)
    },
    toggleMethod(method, args) {
      this.dialog = true
      this.methodArgs = args
      this.method = method
    },
  },
}
</script>

<style scoped></style>
