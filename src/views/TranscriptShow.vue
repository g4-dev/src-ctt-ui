<template>
  <div class="pa-10 js-transcripts-transcript-container">
    <v-btn
      class="mx-2"
      fab
      dark
      small
      color="primary"
      @click="returnTranscript"
    >
      <v-icon dark>mdi-arrow-left</v-icon>
    </v-btn>
    <div v-if="transcript.status !== 'progress'">
      <v-card-text class="pa-6 fc-black">
        <a v-bind:href="transcriptPath('text_file')">Text</a>
      </v-card-text>
      <v-card-text class="pa-6 fc-black">
        <a v-bind:href="transcriptPath('audio_file')">Audio</a>
      </v-card-text>
    </div>

    <v-card class="mx-auto js-transcripts-transcript-edit-card" max-width="900">
      <div v-if="transcript.status === 'progress'" class="pa-6 live">
        <v-icon color="red">{{ icon }}</v-icon>
        <span><strong>Live</strong></span>
      </div>
    </v-card>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'TranscriptShow',
  data() {
    return {
      transcript: {},
      icon: 'mdi-eye',
      text_content: '',
      audio_dl: '',
      types: ['audio_file', 'text_file'],
    }
  },
  async created() {
    try {
      await this.getTranscript(this.$route.params.id)
      console.log(this.transcript)
      this.content = api.get(this.transcriptPath('text_file'))
    } catch (err) {
      console.log(err)
    }
  },
  mounted() {
    console.log('Starting connection to WebSocket Server')
    this.connection = new WebSocket(
      `${process.env.VUE_APP_WS_IP}?uuid=${this.transcript.uuid}`
    )

    // event returned by api is uuid
    this.connection.onmessage = function (event) {
      console.log(this.transcripts[event])
    }

    this.connection.onopen = function (event) {
      console.log(event)
      console.log('Successfully connected to the echo websocket server...')
    }
  },
  methods: {
    returnTranscript() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    async getTranscript(id) {
      this.transcript = (await api.get(`/transcripts/${id}`)).data
    },
    transcriptPath: function (type) {
      if (this.types.includes(type)) {
        return '#'
      }
      return process.env.VUE_APP_API + '/uploads/' + this.transcript[type]
    },
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
