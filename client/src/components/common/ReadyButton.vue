<template>
  <button
    @click="click"
    type="button"
    :class="['sim-ready-button', 'btn', 'btn-success', 'btn-block', (isPlayerReady ? 'btn-warning' : 'btn-success')]"
    :disabled="disabled"
  >{{isPlayerReady ? 'Not ready' : 'Ready'}}</button>
</template>
<script>
export default {
  name: "ReadyButton",
  props: {
    isPlayerReady: Boolean,
    disabled: Boolean
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