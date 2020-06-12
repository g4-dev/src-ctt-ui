<template>
<div>
  <v-row justify="center" class="pa-6">
    <v-col cols="6">
    </v-col>
    <v-col cols="6">
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
    </v-col>
  </v-row>
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

export default {
  name: 'Transcripts',
  components: { Transcript },

  data() {
    return {
      dates: [],
      menu: false,
      transcripts: [
        {
          id: '1',
          date: '16-10-2020',
          message:
            'test testtest testtesttesttesttesttest testtesttesttest testtesttesttesttesttest test test test 1',
          live:0
        },
        {
          id: '2',
          date: '16-10-2020',
          message:
            'test testtest testtesttesttesttesttest testtesttesttest testtesttesttesttesttest 2',
          live:0
        },
        {
          id: '3',
          date: '16-10-2020',
          message:
            'test testtest testtesttesttesttesttest testtesttesttest testtesttesttesttesttest 3',
          live:1
        },
        {
          id: '4',
          date: '16-10-2020',
          message:
            'test testtest testtesttesttesttesttest testtesttesttest testtesttesttesttesttest 4',
          live:0
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
