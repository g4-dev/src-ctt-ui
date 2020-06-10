<template>
  <div class="box">
    <Transcript
      v-for="transcript in transcripts"
      v-bind:transcript="transcript"
      :key="transcript"
    >
    </Transcript>
  </div>
</template>

<script>
import Transcript from '@/components/Transcript'

export default {
  name: 'Transcripts',
  components: { Transcript },

  data() {
    return {
      transcripts: [
        {
          id: '1',
          date: '16-10-2020',
          message:
            'test testtest testtesttesttesttesttest testtesttesttest testtesttesttesttesttest test test test 1',
        },
        {
          id: '2',
          date: '16-10-2020',
          message:
            'test testtest testtesttesttesttesttest testtesttesttest testtesttesttesttesttest 2',
        },
        {
          id: '3',
          date: '16-10-2020',
          message:
            'test testtest testtesttesttesttesttest testtesttesttest testtesttesttesttesttest 3',
        },
        {
          id: '4',
          date: '16-10-2020',
          message:
            'test testtest testtesttesttesttesttest testtesttesttest testtesttesttesttesttest 4',
        },
      ],
    }
  },
  mounted() {
    localStorage.removeItem('transcript')
  },
}
</script>

<style>
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
