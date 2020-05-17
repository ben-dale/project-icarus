<template>
  <div class="row text-center">
    <div v-for="(player) in players" class="col-12 col-md-4 col-lg-4" :key="player.id">
      <button
        :class="[(player.ready ? 'btn-success' : 'btn-primary'), 'mt-3', 'btn btn-sm btn-block rounded-0']"
        :disabled="true"
      >{{player.name}}</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "PlayerReadyBar",
  props: {
    players: Array,
    width: {
      type: Number,
      default: 12
    },
    namesPerRow: {
      type: Number,
      default: 6
    }
  }
};
</script>
<style scoped>
.btn.disabled,
.btn:disabled {
  opacity: 1;
}
.card-body {
  padding-bottom: 0;
}
</style>