<template>
  <div class="col-12">
    <div class="card bg-primary text-light">
      <div class="card-body bg-dark text-center">
        <div class="row">
          <div class="col-6">
            <div class="row">
              <div class="col-12">
                <p class="card-text">Approve</p>
              </div>
            </div>
            <hr class="border border-primary" />
            <div class="row">
              <div
                class="col-12 mt-2"
                v-for="(player, index) in players.filter(p => p.vote == 'APPROVE')"
                :key="index"
              >
                <div class="card-text bg-primary py-1">{{player.name}}</div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-12">
                <p class="card-text">Reject</p>
              </div>
            </div>
            <hr class="border border-primary" />
            <div class="row">
              <div
                class="col-12 mt-2"
                v-for="(player, index) in players.filter(p => p.vote == 'REJECT')"
                :key="index"
              >
                <div class="card-text bg-primary py-1">{{player.name}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer d-none d-lg-block">
        <ReadyButton :isPlayerReady="isPlayerReady" v-on="$listeners" />
      </div>
    </div>
    <div class="fixed-bottom">
      <div class="card bg-primary rounded-0 d-none d-block d-lg-none">
        <div class="card-body pb-5">
          <ReadyButton :isPlayerReady="isPlayerReady" v-on="$listeners" />
        </div>
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
<style scoped>
.btn.disabled,
.btn:disabled {
  opacity: 1;
}
</style>