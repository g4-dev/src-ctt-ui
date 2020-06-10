<template>
  <div class="js-apikey-container">
    <Keys
      v-for="keyItem in keys"
      v-bind:keyItem="keyItem"
      :key="keyItem"
    ></Keys>
  </div>
</template>

<script>
// Create the crud to manage and request new api keys
import Keys from '@/components/Keys'
export default {
  name: 'Access',
  components: { Keys },
  data() {
    return {
      keys: [
        { id: '1', key: 'rezrezrzerezrzerze' },
        { id: '2', key: 'rezrezrzerezrzerze' },
        { id: '3', key: 'rezrezrzerezrzerze' },
        { id: '4', key: 'rezrezrzerezrzerze' },
      ],
    }
  },
}
</script>

<style>
.js-apikey-container {
  padding: 40px;
}
</style>
