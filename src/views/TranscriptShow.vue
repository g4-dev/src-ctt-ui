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
      <p class="fc-black pa-10">
        {{ content }}
      </p>
    </v-card>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'TranscriptShow',
  data() {
    return {
      transcript: {
        status: 'none',
        uuid: '',
        text_file: '',
        audio_file: '',
      },
      live: null,
      icon: 'mdi-eye',
      content: '',
      audio_dl: '',
      types: ['audio_file', 'text_file'],
    }
  },
  computed: {
    progressing() {
      return this.transcript.status === 'progress'
    },
  },
  created() {
    try {
      this.getTranscript(this.$route.params.id).then((val) => {
        const connectLink = `${process.env.VUE_APP_WS_IP}?uuid=${val.uuid}`
        const progressing = val.status === 'progress'

        console.log(progressing)
        if (!this.progressing || !progressing) {
          this.readTextFromApi()
        } else {
          if (this.live) this.live.close()
          this.live = new WebSocket(connectLink)
          this.live.onopen = (event) => {
            console.log(event)
            this.live.send('zreiofiozre')
            console.log(
              'Successfully connected to the echo websocket server...'
            )
          }

          this.live.onmessage = ({ data }) => {
            this.content += data
            console.log(data)
          }
        }
      })
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    receiveText(ev) {
      console.log('received ui :', ev)
    },
    async readTextFromApi() {
      this.content = (
        await api.post('/transcripts/read-text', {
          path: this.transcript['text_file'],
        })
      ).data
    },
    returnTranscript() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    async getTranscript(id) {
      return (this.transcript = (await api.get(`/transcripts/${id}`)).data)
    },
    transcriptPath: function (type) {
      if (!this.types.includes(type)) {
        return '#'
      }

      return process.env.VUE_APP_API + '/' + this.transcript[type]
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
