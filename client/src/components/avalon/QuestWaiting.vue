<template>
  <div class="col-12">
    <div class="card">
      <div class="card-header bg-light">Quest {{questId}} - {{header}}</div>
      <div class="card-body text-center">
        <p class="card-text">{{line1}}</p>
        <p class="card-text">{{line2}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestWaiting",
  props: {
    questId: Number,
    organiserName: String,
    line1: String,
    line2: String,
    header: String
  }
};
</script>
