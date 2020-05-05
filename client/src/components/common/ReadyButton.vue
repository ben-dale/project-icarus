<template>
  <button
    @click="click"
    type="button"
    :class="['btn', 'btn-success', 'btn-block', (!large ? '' : 'btn-lg'), (isPlayerReady ? 'btn-warning' : 'btn-success')]"
  >{{isPlayerReady ? 'Not ready' : 'Ready'}}</button>
</template>
<script>
export default {
  name: "ReadyButton",
  props: {
    isPlayerReady: Boolean,
    large: Boolean
  },
  methods: {
    click: function() {
      this.isPlayerReady
        ? this.$emit("player-not-ready")
        : this.$emit("player-ready");
    }
  }
};
</script>