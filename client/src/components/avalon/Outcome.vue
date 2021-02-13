<template>
  <div class="col-md-12">
    <div :class="['card', (winner == 'EVIL' ? 'bg-danger' : 'bg-info')]">
      <div class="card-body text-center py-5">
        <h4 class="card-title text-white">{{outcome}}</h4>
      </div>
      <div class="card-footer d-none d-lg-block">
        <button
          @click="ready"
          class="btn btn-secondary btn-block"
          :disabled="isPlayerReady"
        >{{buttonText}}</button>
      </div>
    </div>
    <div class="fixed-bottom">
      <div class="card bg-primary rounded-0 d-none d-block d-lg-none">
        <div class="card-body pb-5">
          <button
            @click="ready"
            class="btn btn-secondary btn-block"
            :disabled="isPlayerReady"
          >{{buttonText}}</button>
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