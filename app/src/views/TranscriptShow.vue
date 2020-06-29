<template>
  <div class="pa-10 js-transcripts-transcript-container">
    <v-alert v-show="error" type="error" dismissible>
      {{ error }}
    </v-alert>
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
    <div v-if="!progressing">
      <v-card-text class="pa-6 fc-black">
        <a v-bind:href="transcriptPath('audio_file')">Audio</a>
      </v-card-text>
    </div>

    <v-card class="mx-auto js-transcripts-transcript-edit-card" max-width="900">
      <div v-if="progressing" class="pa-6 live">
        <v-icon color="red">{{ icon }}</v-icon>
        <span><strong>Live</strong></span>
      </div>
      <p class="fc-black pa-10" v-html="content"></p>
    </v-card>
  </div>
</template>

<script>
import api from '@/api'
import { parseText } from '../utils/text'

export default {
  name: 'TranscriptShow',
  data() {
    return {
      transcript: {
        status: 'canceled',
        id: '',
        text_file: '',
        audio_file: '',
      },
      error: null,
      icon: 'mdi-eye',
      content: '',
      types: ['audio_file', 'text_file'],
    }
  },
  computed: {
    progressing() {
      return this.transcript.status === 'progress'
    },
  },
  async created() {
    this.transcript = await this.getTranscript(this.$route.params.id)
    if (!this.progressing) {
      this.content = await this.readTextFromApi()
    }
    if (this.progressing) {
      try {
        this.$connect(`${process.env.VUE_APP_WS_IP}?id=${this.transcript.id}`)
      } catch (e) {
        this.error = e.message
      }
    }
  },
  mounted() {
    if (this.progressing) {
      this.$socket.addEventListener('open', function () {
        this.$socket.send('Ui connected')
      })
      this.$socket.addEventListener('message', function ({ data }) {
        this.content += parseText(data)
      })
    }
  },
  methods: {
    /**
     * @param transcript Read transcript text
     */
    async readTextFromApi() {
      return parseText(
        (await api.get(`/transcripts/text/${this.transcript.id}`)).data
      )
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
