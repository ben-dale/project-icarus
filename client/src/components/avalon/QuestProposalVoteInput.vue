<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body text-center">
          <div class="row py-5">
            <div class="col-12">
              <h4 class="card-title">{{proposal.organiser}} has proposed the following team:</h4>
              <h3 class="card-title">
                <span
                  v-for="(member, index) in proposal.members"
                  :key="index"
                  class="badge badge-pill badge-dark mx-2"
                >{{member}}</span>
              </h3>
              <h4 class="card-title">What do you think? Your vote will be seen by the other players.</h4>
            </div>
          </div>
          <div class="row pb-5">
            <div class="col-4 offset-2">
              <button class="btn btn-dark btn-lg btn-block">Approve</button>
            </div>
            <div class="col-4">
              <button class="btn btn-dark btn-lg btn-block">Reject</button>
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
    proposal: {
      type: Object,
      default: function() {
        return {
          organiser: "Sidd",
          members: ["Ben", "Sam", "Sidd", "Jim"]
        };
      }
    }
  }
};
</script>