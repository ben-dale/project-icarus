<template>
  <div class="row text-center">
    <div
      v-for="(player) in players"
      :class="['col-3 col-md-4 col-lg-' + nameColSpan]"
      :key="player.id"
    >
      <p
        :class="[(player.ready ? 'bg-success' : 'bg-primary'), 'mb-3 py-1 text-white d-none d-md-block']"
        :disabled="true"
      >{{player.name}}</p>
      <p
        :class="[(player.ready ? 'bg-success' : 'bg-primary'), 'mb-3 py-1 text-white d-none d-block d-md-none']"
        :disabled="true"
      >{{player.name[0]}}</p>
    </div>
    <div
      v-for="i in maxPlayers - players.length"
      :class="['col-3 col-md-4 col-lg-' + nameColSpan]"
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