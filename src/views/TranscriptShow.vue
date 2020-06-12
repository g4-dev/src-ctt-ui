<template>
  <div class="pa-10 js-transcripts-transcript-container">
    <v-card class="mx-auto js-transcripts-transcript-edit-card" max-width="900">
      <div v-if="transcript.live" class="pa-6 live">
        <v-icon color="red">{{ icon }}</v-icon>
        <span><strong>Live</strong></span>
      </div>
      <v-card-text class="pa-6 fc-black">
        {{ transcript.message }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'TranscriptShow',
  data() {
    return {
      transcript: [],
      icon: 'mdi-eye',
    }
  },
  created() {},
  mounted() {
    if (
      JSON.parse(localStorage.getItem('transcript')) &&
      JSON.parse(localStorage.getItem('transcript')).id
    ) {
      this.transcript = JSON.parse(localStorage.getItem('transcript'))
    } else {
      localStorage.transcript = JSON.stringify(this.$route.query.transcript)
      this.transcript = JSON.parse(localStorage.getItem('transcript'))
    }
  },
}
</script>

<style scoped>
.live {
  color: rgb(244, 67, 54);
}
.js-transcripts-transcript-edit-card {
  height: 100%;
  background-color: gainsboro;
}
.js-transcripts-transcript-container {
  height: 100%;
  position: relative;
}
.fc-black {
  color: black !important;
}
</style>
