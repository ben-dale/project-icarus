<template>
  <div class="col-12">
    <div class="card bg-primary text-light">
      <div class="card-header">Quest {{questId}} - {{header}}</div>
      <div class="card-body text-center">
        <div class="row">
          <div class="col-12">
            <p class="card-text">{{line1}}</p>
            <p class="card-text">{{line2}}</p>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <ReadyButton :isPlayerReady="isPlayerReady" v-on="$listeners" />
      </div>
    </div>
  </div>
</template>

<script>
import ReadyButton from "@/components/common/ReadyButton.vue";
export default {
  name: "QuestWaiting",
  components: { ReadyButton },
  props: {
    questId: Number,
    organiserName: String,
    line1: String,
    line2: String,
    header: String,
    isPlayerReady: Boolean
  }
};
</script>
