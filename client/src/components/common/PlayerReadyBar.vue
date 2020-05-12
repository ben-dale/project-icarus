<template>
  <div :class="['col-'+width, 'offset-' + getCardOffset()]">
    <div class="card bg-dark border border-primary">
      <div class="card-body">
        <div class="row text-center">
          <div v-for="(player) in players" :class="['col-' + getNameWidth()]" :key="player.id">
            <button
              :class="[(player.ready ? 'btn-success' : 'btn-primary border-primary'), 'mb-3', 'btn btn-sm btn-block']"
              disabled
            >{{player.name}}</button>
          </div>
        </div>
      </div>
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
  },
  methods: {
    getNameWidth: function() {
      switch (this.namesPerRow) {
        case 1:
          return 12;
        case 2:
          return 6;
        case 3:
          return 4;
        case 4:
          return 3;
        case 6:
          return 2;
      }
    },
    getCardOffset: function() {
      switch (this.width) {
        case 12:
          return 0;
        case 8:
          return 2;
        case 6:
          return 3;
      }
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