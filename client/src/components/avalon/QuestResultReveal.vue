<template>
  <div class="col-md-12">
    <div class="card bg-primary text-light">
      <div class="card-body py-5 bg-dark text-center">
        <div class="row mb-2">
          <div class="col-12">
            <p v-if="!playerIsOrganiser">{{organiserName}} is revealing the results of the quest...</p>
            <p v-if="playerIsOrganiser">You are revealing the results of the request to everyone.</p>
          </div>
        </div>

        <div class="row">
          <div
            v-for="(result, index) in results"
            :key="index"
            :class="['col-lg-2 mb-3', index === 0 ? 'offset-lg-' + resultOffset(): '']"
          >
            <button
              v-if="!result.revealed"
              class="btn btn-secondary btn py-4 btn-block"
              v-on:click="revealQuestVote(index)"
              :disabled="!playerIsOrganiser"
            >Reveal</button>
            <button
              v-if="result.revealed && result.choice === 'SUCCEED'"
              class="btn btn-info btn py-4 btn-block"
              disabled
            >Succeed</button>
            <button
              v-if="result.revealed && result.choice === 'SABOTAGE'"
              class="btn btn-danger btn py-4 btn-block"
              disabled
            >Sabotage</button>
          </div>
        </div>
      </div>
      <div class="card-footer d-none d-lg-block">
        <ReadyButton
          :isPlayerReady="isPlayerReady"
          :disabled="questResult == ''"
          v-on="$listeners"
        />
      </div>
    </div>
    <div class="fixed-bottom">
      <div class="card bg-primary rounded-0 d-none d-block d-lg-none">
        <div class="card-body">
          <ReadyButton
            :isPlayerReady="isPlayerReady"
            v-on="$listeners"
            :disabled="questResult == ''"
          />
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
      this.$emit("reveal-quest-vote", index);
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
<style scoped>
.btn-danger:disabled,
.btn-info:disabled {
  opacity: 1;
}
</style>