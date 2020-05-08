<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header bg-light">Quest {{questId}} - Result</div>
      <div class="card-body text-center">
        <div class="row my-3">
          <div
            v-for="(result, index) in results"
            :key="index"
            :class="['col-2', index === 0 ? 'offset-' + resultOffset(): '']"
          >
            <div
              v-if="result.revealed && result.choice === 'SUCCEED'"
              class="py-5 bg-info border border-info rounded text-center text-white"
            >Succeed</div>
            <div
              v-if="result.revealed && result.choice === 'SABOTAGE'"
              class="py-5 bg-danger border border-danger rounded text-center text-white"
            >Sabotage</div>
            <div v-if="!result.revealed" class="py-5 bg-transparent border rounded text-center">
              <wbr />
            </div>
          </div>
        </div>
        <div v-if="!playerIsOrganiser && questResult === ''" class="row mb-3 pt-4">
          <div class="col-12">
            <p>{{organiserName}} is revealing the results...</p>
          </div>
        </div>
        <div v-if="playerIsOrganiser && questResult === ''" class="row mb-3">
          <div
            v-for="(result, index) in results"
            :key="index"
            :class="['col-2', index === 0 ? 'offset-' + resultOffset(): '']"
          >
            <button
              class="btn btn-dark btn-sm btn-block"
              v-on:click="revealQuestVote(index)"
              :disabled="result.revealed"
            >Reveal</button>
          </div>
        </div>
        <div v-if="questResult == 'FAIL'" class="row pt-4">
          <div class="col-12">
            <p>The quest was sabotaged!</p>
          </div>
        </div>
        <div v-if="questResult == 'SUCCEED'" class="row pt-4">
          <div class="col-12">
            <p>The quest was completed successfully.</p>
          </div>
        </div>
        <div v-if="questResult !== ''" class="row mb-3">
          <div class="col-4 offset-4">
            <ReadyButton :isPlayerReady="isPlayerReady" v-on="$listeners" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReadyButton from "@/components/common/ReadyButton.vue";
export default {
  name: "QuestResultReveal",
  components: { ReadyButton },
  props: {
    playerIsOrganiser: Boolean,
    organiserName: String,
    results: Array,
    questId: Number,
    questResult: String,
    isPlayerReady: Boolean
  },
  methods: {
    revealQuestVote: function(index) {
      this.$emit('reveal-quest-vote', index);
    },
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
    }
  }
};
</script>