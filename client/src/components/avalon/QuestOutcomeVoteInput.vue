<template>
  <div class="col-md-12">
    <div class="card">
      <h5 class="card-header bg-light">Quest {{questId}} - Quest underway</h5>
      <div class="card-body text-center">
        <div class="row mt-3 mb-5">
          <div class="col-12">
            <h5 class="card-title">You are on a quest with the following players</h5>
            <h4 class="card-title pb-5">
              <span
                v-for="(player, index) in players"
                :key="index"
                class="badge badge-info mx-2"
              >{{player}}</span>
            </h4>
            <h5 class="card-text">How would you like to proceed?</h5>
            <h5 class="card-text">Your decision will be kept anonymous.</h5>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-3 offset-3">
            <button class="btn btn-info btn-block">Succeed</button>
          </div>
          <div class="col-3">
            <button class="btn btn-danger btn-block" :disabled="!isEvil">Sabotage</button>
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