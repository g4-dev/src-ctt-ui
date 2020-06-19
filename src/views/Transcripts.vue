<template>
  <div>
    <div class="js-transcripts-datepicker">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="dates"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-combobox
            v-model="dates"
            multiple
            chips
            small-chips
            label="Choisir une date"
            prepend-icon="event"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-combobox>
        </template>
        <v-date-picker v-model="dates" multiple no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Annuler</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(dates)">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </div>
    <div class="box">
      <Transcript
        v-for="transcript in transcripts"
        v-bind:transcript="transcript"
        :key="transcript.id"
      >
      </Transcript>
    </div>
  </div>
</template>

<script>
import Transcript from '@/components/Transcript'
import api from '@/api'

export default {
  name: 'Transcripts',
  components: { Transcript },
  data() {
    return {
      transcripts: null,
      dates: null,
      menu: '',
    }
  },
  methods: {
    async getTranscripts() {
      return await api
        .get('/transcripts')
        .then((response) => (this.transcripts = response.data))
    },
  },
  async mounted() {
    this.getTranscripts()
    setInterval(function () {
      this.getTranscripts()
    }, 30000)
  },
}
</script>

<style>
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.js-transcripts-datepicker {
  width: 50%;
}
</style>
