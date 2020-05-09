<!-- Uses for both game outcome and quest outcomes -->
<template>
  <div class="col-md-12">
    <div :class="['card', (winner == 'EVIL' ? 'bg-danger' : 'bg-info')]">
      <div class="card-body text-center">
        <div class="row">
          <div class="col-md-12">
            <div class="row py-5">
              <div class="col-12">
                <h4 class="card-title text-white">{{outcome}}</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="row pb-5">
          <div class="col-4 offset-4">
            <button
              @click="ready"
              class="btn btn-dark btn-block"
              :disabled="isPlayerReady"
            >{{buttonText}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    winner: String,
    outcome: String,
    buttonText: String,
    isPlayerReady: Boolean
  },
  methods: {
    ready: function() {
      this.$emit("player-ready");
    }
  }
};
</script>