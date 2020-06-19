<template>
  <div>Setup</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Setup',
  components: {},
  computed: {
    ...mapState('auth', ['isLogged']),
  },
  mounted() {},
  data() {
    return {
      right: null,
    }
  },
}
</script>

<style></style>
