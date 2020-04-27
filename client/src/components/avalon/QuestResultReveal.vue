<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-body text-center">
        <div v-if="questResult.requiresDoubleFail" class="card-text">
          <p class="lead">Evil require two Fail cards in order to sabotage this quest.</p>
        </div>
        <div class="row mb-3">
          <div
            v-for="(result, index) in questResult.results"
            :key="result.id"
            :class="['col-md-2', index === 0 ? 'offset-md-' + resultOffset(): '']"
          >
            <div
              v-if="result.revealed && result.result === 'success'"
              class="py-5 bg-info border border-info rounded text-center text-white"
            >
              <h5>Succeed</h5>
            </div>
            <div
              v-if="result.revealed && result.result === 'fail'"
              class="py-5 bg-danger border border-danger rounded text-center text-white"
            >
              <h5>Fail</h5>
            </div>
            <div v-if="!result.revealed" class="py-5 bg-light border rounded text-center">
              <h5>Result</h5>
            </div>
          </div>
        </div>
        <div class="row">
          <div
            v-for="(result, index) in questResult.results"
            :key="result.id"
            :class="['col-md-2', index === 0 ? 'offset-md-' + resultOffset(): '']"
          >
            <button
              class="btn btn-dark btn-block"
              v-on:click="reveal(result.id)"
              :disabled="result.revealed"
            >Reveal</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    questResult: {
      type: Object,
      default: function() {
        return {
          requiresDoubleFail: true,
          results: [
            { id: "2fa3f", revealed: false, result: "success" },
            { id: "fff3f", revealed: true, result: "success" },
            { id: "2fff3f", revealed: true, result: "fail" },
            { id: "2wfff3f", revealed: false, result: "success" },
            { id: "2fff3f", revealed: false, result: "success" }
          ]
        };
      }
    }
  },
  methods: {
    resultOffset: function() {
      switch (this.questResult.results.length) {
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
      this.$emit("revealQuestResult", id);
    }
  }
};
</script>