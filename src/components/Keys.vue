<template>
  <div>
    <v-text-field :value="keyItem.key" solo disabled></v-text-field>
  </div>
</template>

<script>
export default {
  name: 'Keys',
  props: ['keyItem'],
}
</script>

<style scoped></style>
