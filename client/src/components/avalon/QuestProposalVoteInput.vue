<template>
  <div class="col-12">
    <div class="card bg-primary text-light">
      <div class="card-body py-5 bg-dark text-center">
        <p class="card-text">{{organiser}} has proposed the following team:</p>
        <div class="row">
          <div
            v-for="(name, index) in names"
            :key="index"
            :class="['card-text mb-4 col-md-2 col-12', (index == 0 && names.length == 2 ? 'offset-md-4' : ''), (index == 0 && names.length == 3 ? 'offset-md-3' : ''),(index == 0 && names.length == 4 ? 'offset-md-2' : '')]"
          >
            <p class="card-text bg-info py-1">{{name}}</p>
          </div>
        </div>
        <p class="card-text">Your vote will be seen by the other players. This is a majority vote.</p>
      </div>
      <div class="card-footer d-none d-lg-block">
        <div class="row">
          <div class="col-6">
            <button
              @click="approve(true)"
              class="btn btn-secondary btn-block"
              :disabled="isPlayerReady"
            >Approve</button>
          </div>
          <div class="col-6">
            <button
              @click="approve(false)"
              class="btn btn-secondary btn-block"
              :disabled="isPlayerReady"
            >Reject</button>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed-bottom">
      <div class="card bg-primary rounded-0 d-none d-block d-lg-none">
        <div class="card-body">
          <div class="row">
            <div class="col-6">
              <button
                @click="approve(true)"
                class="btn btn-secondary btn-block"
                :disabled="isPlayerReady"
              >Approve</button>
            </div>
            <div class="col-6">
              <button
                @click="approve(false)"
                class="btn btn-secondary btn-block"
                :disabled="isPlayerReady"
              >Reject</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    questId: Number,
    organiser: String,
    names: Array,
    isPlayerReady: Boolean
  },
  methods: {
    approve: function(approve) {
      this.$emit("player-approve-proposal", approve);
    }
  }
};
</script>