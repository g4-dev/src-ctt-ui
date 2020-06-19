<template>
  <div>
    <v-text-field
      :value="keyItem.key"
      append-icon="mdi-delete"
      solo
      @click:append="deleteKey"
    >
    </v-text-field>
  </div>
</template>

<script>
export default {
  name: 'Keys',
  props: ['keyItem'],
  methods: {
    deleteKey() {
      alert('click:append')
    },
  },
}
</script>

<style scoped></style>
