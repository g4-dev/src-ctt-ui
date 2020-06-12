<template>
  <div>Setup</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Setup',
  components: {},
  computed: {
    ...mapState('secutiry/1A', ['isLogged', 'user']),
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

let d = new Date(); d.setTime(d.getTime() + (1*24*60*60*1000)); let expires =
"expires="+ d.toUTCString(); document.cookie = "Token=" + response.data.Token +
";" + expires + ";path=/";
