<template>
  <div class="pa-6">
    <v-text-field
      dense
      clearable
      label="Entrez la clef mère pour gérer les accès"
      v-on:keyup.enter="submit"
      v-model="motherskey"
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1"
      v-if="disabled === true"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Gestion utilisateur</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
                >Ajouter</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Nom de l'utilisateur"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Annulez</v-btn>
                <v-btn color="blue darken-1" text @click="save">Ok</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
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
// Create the crud to manage and request new api keys
export default {
  name: 'Access',
  data: () => ({
    disabled: false,
    motherskey: '',
    dialog: false,
    headers: [
      {
        text: 'Utilisateur',
        value: 'name',
        sortable: false,
      },
      { text: 'Clef', value: 'key', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      key: 0,
    },
    defaultItem: {
      name: '',
      key: 0,
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
    submit() {
      alert('zizicoptere')
      this.disabled = true
    },
    initialize() {
      this.users = [
        {
          name: 'Frozen Yogurt',
          key: 159,
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const index = this.users.indexOf(item)
      confirm("Etes vous sur de vouloir suprimmer l'utilisateur") &&
        this.users.splice(index, 1)
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
