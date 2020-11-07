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
            <div class="row mb-5">
              <div class="col-12">
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
                >How would you like to proceed? Your vote will be kept anonymous.</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6 col-md-3 offset-md-3">
                <button
                  :class="[(vote == 'SUCCEED' ? 'btn-info' : 'border-secondary'), 'btn text-white btn-block py-4 sim-succeed-button']"
                  :disabled="isPlayerReady"
                  @click="succeed(true)"
                >Succeed</button>
              </div>
              <div class="col-6 col-md-3">
                <button
                  :class="[(vote == 'SABOTAGE' ? 'btn-danger' : 'border-secondary'), 'btn text-white btn-block py-4 sim-sabotage-button']"
                  :disabled="!isEvil || isPlayerReady"
                  @click="succeed(false)"
                >Sabotage</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer d-none d-lg-block">
        <ReadyButton :isPlayerReady="isPlayerReady" v-on="$listeners" :disabled="vote == ''" />
      </div>
    </div>
    <div class="fixed-bottom">
      <div class="card bg-primary rounded-0 d-none d-block d-lg-none">
        <div class="card-body pb-5">
          <ReadyButton :isPlayerReady="isPlayerReady" v-on="$listeners" :disabled="vote == ''" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ReadyButton from "@/components/common/ReadyButton.vue";

export default {
  components: { ReadyButton },
  props: {
    isEvil: Boolean,
    names: Array,
    isPlayerReady: Boolean,
    vote: String
  },
  methods: {
    succeed: function(succeed) {
      this.$emit("player-succeed-quest", succeed);
    }
  }
};
</script>