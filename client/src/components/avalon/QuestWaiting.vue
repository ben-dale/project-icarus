<template>
  <div class="col-12">
    <div class="card">
      <h5 class="card-header bg-light">Quest {{questId}} - {{header}}</h5>
      <div class="card-body text-center">
        <div class="row my-3">
          <div class="col-12">
            <h5>{{line1}}</h5>
            <h5>{{line2}}</h5>
          </div>
        </div>
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
