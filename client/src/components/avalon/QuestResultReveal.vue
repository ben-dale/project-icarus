<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-body text-center">
        <div class="row mb-3">
          <div
            v-for="(result, index) in results"
            :key="index"
            :class="['col-2', index === 0 ? 'offset-' + resultOffset(): '']"
          >
            <div
              v-if="result.revealed && result.choice === 'SUCCEED'"
              class="py-5 bg-info border border-info rounded text-center text-white"
            >
              <h5>Succeed</h5>
            </div>
            <div
              v-if="result.revealed && result.choice === 'SABOTAGE'"
              class="py-5 bg-danger border border-danger rounded text-center text-white"
            >
              <h5>Sabotage</h5>
            </div>
            <div v-if="!result.revealed" class="py-5 bg-light border rounded text-center">
              <h5>Result</h5>
            </div>
          </div>
        </div>
        <div v-if="!playerIsOrganiser && results.filter(r => !r.revealed).length > 0" class="row">
          <div class="col-12">{{organiserName}} is revealing the results.</div>
        </div>
        <div v-if="playerIsOrganiser && results.filter(r => !r.revealed).length > 0" class="row">
          <div
            v-for="(result, index) in results"
            :key="index"
            :class="['col-2', index === 0 ? 'offset-' + resultOffset(): '']"
          >
            <button
              class="btn btn-dark btn-block"
              v-on:click="reveal(index)"
              :disabled="result.revealed"
            >Reveal</button>
          </div>
        </div>
        <div v-if="results.filter(r => !r.revealed).length == 0" class="row">
          <div class="col-4 offset-4">
            <button class="btn btn-dark btn-block" v-on:click="ready()">Ready</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestResultReveal",
  props: {
    playerIsOrganiser: Boolean,
    organiserName: String,
    results: Array
  },
  methods: {
    resultOffset: function() {
      switch (this.results.length) {
        case 2:
          return 4;
        case 3:
          return 3;
        case 4:
          return 2;
        case 5:
          return 1;
      }
    },
    reveal: function(id) {
      this.$emit("reveal-quest-result", id);
    },
    ready: function() {
      this.$emit("ready-up");
    }
  }
};
</script>