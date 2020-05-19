<template>
  <div class="col-md-12">
    <div class="card bg-primary text-light">
      <div class="card-body py-5 bg-dark text-center">
        <div class="row">
          <div class="col-12">
            <p class="card-text">This quest contains the following players:</p>
             <div class="row">
          <div
            v-for="(player, index) in names"
            :key="index"
            :class="['card-text mb-4 col-md-2 col-12', (index == 0 && names.length == 2 ? 'offset-md-4' : ''), (index == 0 && names.length == 3 ? 'offset-md-3' : ''),(index == 0 && names.length == 4 ? 'offset-md-2' : '')]"
          >
            <p class="card-text bg-info py-1">{{player}}</p>
          </div>
        </div>
            <p
              v-if="!isEvil"
              class="card-text"
            >You are in Good and can only vote 'Succeed'. Evil players on this quest may vote either 'Succeed' or 'Sabotage'.</p>
            <p
              v-if="isEvil"
              class="card-text"
            >You are in Evil and may vote either 'Succeed' or 'Sabotage'. Good players on this quest can only vote 'Succeed'.</p>
            <p
              class="card-text"
            >How would you like to proceed? Your decision will be kept anonymous.</p>
          </div>
        </div>
      </div>
      <div class="card-footer d-none d-lg-block">
        <div class="row">
          <div class="col-6">
            <button
              class="btn btn-info btn-block"
              @click="succeed(true)"
              :disabled="isPlayerReady"
            >Succeed</button>
          </div>
          <div class="col-6">
            <button
              :class="['btn', isEvil ? 'btn-danger' : 'btn-secondary', 'btn-block']"
              @click="succeed(false)"
              :disabled="!isEvil || isPlayerReady"
            >Sabotage</button>
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
                class="btn btn-info btn-block"
                @click="succeed(true)"
                :disabled="isPlayerReady"
              >Succeed</button>
            </div>
            <div class="col-6">
              <button
                :class="['btn', isEvil ? 'btn-danger' : 'btn-secondary', 'btn-block']"
                @click="succeed(false)"
                :disabled="!isEvil || isPlayerReady"
              >Sabotage</button>
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
    isEvil: Boolean,
    names: Array,
    questId: Number,
    isPlayerReady: Boolean
  },
  methods: {
    succeed: function(succeed) {
      this.$emit("player-succeed-quest", succeed);
    }
  }
};
</script>