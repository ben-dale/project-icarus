<template>
  <div class="col-12">
    <div class="card">
      <h5 class="card-header bg-light">Quest {{questId}} - Team Proposal</h5>
      <div class="card-body text-center">
        <div class="row mt-4">
          <div class="col-12">
            <h5>
              <span class="badge badge-dark">{{organiserName}}</span> is currently putting together a team proposal.
            </h5>
            <h5>All players will vote on the propsal shortly.</h5>
          </div>
        </div>
        <div class="row mt-5 mb-3">
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
  name: "QuestProposalWaiting",
  components: { ReadyButton },
  props: {
    questId: String,
    organiserName: String,
    isPlayerReady: Boolean
  }
};
</script>
