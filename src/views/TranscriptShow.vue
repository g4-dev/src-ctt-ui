<template>
  <div class="pa-10 js-transcripts-transcript-container">
    <v-btn class="mx-2" fab dark small color="primary" @click="returnTranscript">
      <v-icon dark>mdi-arrow-left</v-icon>
    </v-btn>

    <v-card class="mx-auto js-transcripts-transcript-edit-card" max-width="900">
      <div v-if="transcript.status == progress" class="pa-6 live">
        <v-icon color="red">{{ icon }}</v-icon>
        <span><strong>Live</strong></span>
      </div>
      <v-card-text class="pa-6 fc-black">
        {{ transcript.text_path }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import api from '@/api'
export default {
  name: 'TranscriptShow',
  data() {
    return {
      transcript: null,
      icon: 'mdi-eye',
    }
  },
  created() {},
  async mounted() {
    try {
      console.log(api.get('/transcripts/' + this.$route.params.id).then(response => (this.transcript = response.data)))
      await api.get('/transcript/' + this.$route.params.id).then(response => (this.transcript = response.data))
    } catch(err){
      console.log(err)
    }
  },
  methods: {
    returnTranscript() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
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
