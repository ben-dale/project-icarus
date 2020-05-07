<template>
  <div class="col-12">
    <div class="card">
      <div class="card-header bg-light">Quest {{questId}} - Proposal vote</div>
      <div class="card-body text-center">
        <div class="row mt-3 mb-4">
          <div class="col-12">
            <p class="card-text">{{organiser}} has proposed the following team:</p>
            <h5 class="card-text mb-5">
              <span
                v-for="(name, index) in names"
                :key="index"
                class="badge badge-info mx-2"
              >{{name}}</span>
            </h5>
            <p class="card-text">What do you think? Your vote will be seen by the other players.</p>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-3 offset-3">
            <button
              @click="approve(true)"
              class="btn btn-dark btn-sm btn-block"
              :disabled="isPlayerReady"
            >Approve</button>
          </div>
          <div class="col-3">
            <button
              @click="approve(false)"
              class="btn btn-dark btn-sm btn-block"
              :disabled="isPlayerReady"
            >Reject</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    questId: Number,
    organiser: String,
    names: Array,
    isPlayerReady: Boolean
  },
  methods: {
    approve: function(approve) {
      this.$emit("player-approve-proposal", approve);
    }
  }
};
</script>