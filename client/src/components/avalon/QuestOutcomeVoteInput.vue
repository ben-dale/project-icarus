<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header bg-light">Quest {{questId}} - Quest underway</div>
      <div class="card-body text-center">
        <div class="row mt-3 mb-4">
          <div class="col-12">
            <p class="card-text">You are on a quest with the following players:</p>
            <h5 class="card-text mb-5">
              <span
                v-for="(player, index) in players"
                :key="index"
                class="badge badge-info mx-2"
              >{{player}}</span>
            </h5>
            <p class="card-text">How would you like to proceed? Your decision will be kept anonymous.</p>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-3 offset-3">
            <button class="btn btn-sm btn-info btn-block">Succeed</button>
          </div>
          <div class="col-3">
            <button class="btn btn-sm btn-danger btn-block" :disabled="!isEvil">Sabotage</button>
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
    questId: Number
  }
};
</script>