<template>
  <div class="col-12">
    <div class="card bg-primary text-light">
      <div class="card-body py-4 bg-dark text-center">
        <p class="card-text">{{organiser}} has proposed the following team:</p>
        <div class="row pb-3">
          <div
            v-for="(name, index) in names"
            :key="index"
            :class="['card-text mb-2 col-12']"
          >
            <div class="bg-primary py-1">{{name}}</div>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-12">
            <p class="card-text">Do you approve or reject this proposal?</p>
            <p
              class="card-text"
            >Your vote will be seen by the other players. This is a majority vote.</p>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <button
              :class="[(vote == 'APPROVE' ? 'btn-info' : 'border-secondary'), 'btn text-white btn-block py-4 sim-approve-button']"
              :disabled="isPlayerReady"
              @click="approve(true)"
            >Approve</button>
          </div>
          <div class="col-6">
            <button
              :class="[(vote == 'REJECT' ? 'btn-info' : 'border-secondary'), 'btn text-white btn-block py-4 sim-reject-button']"
              :disabled="isPlayerReady"
              @click="approve(false)"
            >Reject</button>
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
    organiser: String,
    names: Array,
    vote: String,
    isPlayerReady: Boolean,
  },
  methods: {
    approve: function (approve) {
      this.$emit("player-approve-proposal", approve);
    },
  },
};
</script>