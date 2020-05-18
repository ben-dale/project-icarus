<template>
  <div class="row text-center">
    <div
      v-for="(player) in players"
      :class="['col-6 col-md-4 col-lg-' + nameColSpan]"
      :key="player.id"
    >
      <p
        :class="[(player.ready ? 'bg-success' : 'bg-primary'), 'mb-3 py-1 text-white']"
        :disabled="true"
      >{{player.name}}</p>
    </div>
    <div
      v-for="i in maxPlayers - players.length"
      :class="['col-6 col-md-4 col-lg-' + nameColSpan]"
      :key="i"
    >
      <p
        v-if="showEmptySpaces"
        class="py-1 mb-3 border-primary border"
      >‏‏‎ ‎</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "PlayerReadyBar",
  props: {
    players: Array,
    maxPlayers: {
      type: Number,
      default: 10
    },
    nameColSpan: {
      type: Number,
      default: 3
    },
    showEmptySpaces: Boolean
  }
};
</script>