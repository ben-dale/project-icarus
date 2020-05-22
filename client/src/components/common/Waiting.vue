<template>
  <div class="col-12">
    <div class="card bg-primary text-light">
      <div class="card-body py-5 bg-dark text-center">
        <div class="row">
          <div class="col-12">
            <p v-for="(line, index) in lines" :key="index" class="card-text">{{line}}</p>
          </div>
        </div>
      </div>
      <div class="card-footer d-none d-lg-block">
        <ReadyButton :isPlayerReady="isPlayerReady" v-on="$listeners" />
      </div>
    </div>
    <div class="fixed-bottom">
      <div class="card bg-primary rounded-0 d-none d-block d-lg-none">
        <div class="card-body pb-5">
          <ReadyButton :isPlayerReady="isPlayerReady" v-on="$listeners" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReadyButton from "@/components/common/ReadyButton.vue";
export default {
  name: "Waiting",
  components: { ReadyButton },
  props: {
    lines: Array,
    isPlayerReady: Boolean
  }
};
</script>
