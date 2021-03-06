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
        status: 'progress',
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
  watch: {
    socket() {
      this.$socket.addEventListener('message', function ({ data }) {
        this.content += data
      })
    },
  },
  computed: {
    progressing() {
      return this.transcript.status === 'progress'
    },
  },
  created() {
    this.getTranscript(this.$route.params.id).then(async (val) => {
      this.transcript.status = val.status
      if (this.transcript.status !== 'progress') {
        this.content = await this.readTextFromApi(val)
      }
      this.transcript.uuid = val.uuid
    })
    this.$connect(`${process.env.VUE_APP_WS_IP}?uuid=${this.transcript.uuid}`)
  },
  mounted() {
    this.$socket.addEventListener('open', function () {
      this.$socket.send('Ui connected')
    })
  },
  methods: {
    /**
     * @param transcript Read text from transcript
     */
    async readTextFromApi(transcript) {
      return (
        await api.post('/transcripts/read-text', {
          path: transcript['text_file'],
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
