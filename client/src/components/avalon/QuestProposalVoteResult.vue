<template>
  <div class="col-md-12">
    <div class="card bg-primary text-light">
      <div class="card-body bg-dark text-center">
        <div class="row">
          <div class="col-5 offset-1">
            <h5>Approve</h5>
            <hr class="border border-primary" />
            <h5>
              <span
                v-for="(player, index) in players.filter(p => p.vote == 'APPROVE')"
                :key="index"
                class="badge badge-info mx-2 my-2"
              >{{player.name}}</span>
            </h5>
          </div>
          <div class="col-5">
            <h5>Reject</h5>
             <hr class="border border-primary" />
            <h5>
              <span
                v-for="(player, index) in players.filter(p => p.vote == 'REJECT')"
                :key="index"
                class="badge badge-info mx-2 my-2"
              >{{player.name}}</span>
            </h5>
          </div>
        </div>
        <!-- <div class="row mt-3 mb-4">
          <div class="col-12">
            <p class="card-text" v-if="proposalAccepted">The proposal has been approved.</p>
            <p class="card-text" v-if="!proposalAccepted">The proposal has been rejected.</p>
          </div>
        </div> -->
      </div>
      <div class="card-footer">
        <ReadyButton :isPlayerReady="isPlayerReady" v-on="$listeners" />
      </div>
    </div>
  </div>
</template>

<script>
import ReadyButton from "@/components/common/ReadyButton.vue";
export default {
  components: { ReadyButton },
  props: {
    players: Array,
    proposalAccepted: Boolean,
    questId: Number,
    isPlayerReady: Boolean
  }
};
</script>