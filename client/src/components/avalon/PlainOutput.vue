<template>
  <div class="col-md-12">
    <div class="card">
      <h5 class="card-header">{{header}}</h5>
      <div class="card-body text-center">
        <div class="row">
          <div class="col-12 pt-5">
            <h5 class="card-title">{{line}}</h5>
          </div>
        </div>
        <div class="row py-5">
          <div class="col-md-4 offset-md-4">
            <button
              v-if="!isPlayerReady"
              v-on:click="readyUp()"
              type="button"
              class="btn btn-success  btn-block"
            >Ready</button>
            <button
              v-if="isPlayerReady"
              v-on:click="notReady()"
              type="button"
              class="btn btn-warning btn-block"
            >Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    header: String,
    line: String,
    isPlayerReady: Boolean
  },
  methods: {
    readyUp: function() {
      this.$emit("ready-up");
    },
    notReady: function() {
      this.$emit("not-ready");
    }
  }
};
</script>