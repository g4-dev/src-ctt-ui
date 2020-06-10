<template>
  <div>
    <v-card class="ma-3 pa-6" width="344" @click="click(transcript)">
      <div class="js-transcripts-card-icon">
        <v-icon>{{ icon }}</v-icon>
      </div>

      <div class="js-transcripts-card-content">
        <p>{{ transcript.id }}</p>
        <p>{{ transcript.date }}</p>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Transcript',
  data() {
    return {
      icon: 'mdi-eye',
    }
  },
  props: ['transcript'],
  methods: {
    click(transcript) {
      var self = this
      self.$router.push({
        name: 'TranscriptShow',
        params: { id: transcript.id },
        query: { transcript: transcript },
      })
    },
  },
}
</script>

<style scoped>
.js-transcripts-card-icon {
  padding-top: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.js-transcripts-card-content {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-end;
}
</style>
