<template>
  <div class="col-md-12">
    <div class="card bg-primary text-light">
      <div class="card-header">Quest {{questId}} - Quest underway</div>
      <div class="card-body bg-dark text-center">
        <div class="row">
          <div class="col-12">
            <p class="card-text">This quest contains the following players:</p>
            <h5 class="card-text mb-5">
              <span
                v-for="(player, index) in players"
                :key="index"
                class="badge badge-info mx-2"
              >{{player}}</span>
            </h5>
            <p
              class="card-text"
            >How would you like to proceed? Your decision will be kept anonymous.</p>
          </div>
        </div>
        
      </div>
      <div class="card-footer">
          <div class="row">
            <div class="col-6">
              <button
                class="btn btn-sm btn-info btn-block"
                @click="succeed(true)"
                :disabled="isPlayerReady"
              >Succeed</button>
            </div>
            <div class="col-6">
              <button
                :class="['btn', 'btn-sm', isEvil ? 'btn-danger' : 'btn-secondary', 'btn-block']"
                @click="succeed(false)"
                :disabled="!isEvil || isPlayerReady"
              >Sabotage</button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isEvil: Boolean,
    players: Array,
    questId: Number,
    isPlayerReady: Boolean
  },
  methods: {
    succeed: function(succeed) {
      this.$emit("player-succeed-quest", succeed);
    }
  }
};
</script>