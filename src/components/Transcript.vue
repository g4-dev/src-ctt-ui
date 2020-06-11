<template>
  <div>
    <v-card class="ma-3 pa-6" width="344" height="130" max-height="130" @click="click(transcript)">
      <div class="js-transcripts-card-icon">
        <div v-if="transcript.live">
          <div class="title-live"><strong>Live</strong></div>
          <v-icon style="width:100%" color="red">{{ icon }}</v-icon>
        </div>
        <v-icon v-else>{{ icon }}</v-icon>
      </div>

      <div class="js-transcripts-card-content">
        <p>{{ transcript.id }}</p>
        <p>{{ transcript.created_at }}</p>
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
  props: {
    transcript: Object,
  },
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
  .title-live{
    color: rgb(244, 67, 54);
  }

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
