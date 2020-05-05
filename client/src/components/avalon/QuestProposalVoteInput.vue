<template>
  <div class="col-12">
    <div class="card">
      <h5 class="card-header bg-light">Quest {{questId}} - Proposal vote</h5>
      <div class="card-body text-center">
        <div class="row mt-3 mb-5">
          <div class="col-12">
            <h5 class="card-text">{{organiser}} has proposed the following team:</h5>
            <h4 class="card-text mb-5">
              <span
                v-for="(name, index) in names"
                :key="index"
                class="badge badge-info mx-2"
              >{{name}}</span>
            </h4>
            <h5 class="card-text">What do you think? Your vote will be seen by the other players.</h5>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-3 offset-3">
            <button class="btn btn-dark btn-block">Approve</button>
          </div>
          <div class="col-3">
            <button class="btn btn-dark btn-block">Reject</button>
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
    names: Array
  }
};
</script>