<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-body text-center">
        <div class="row py-5">
          <div class="col-5 offset-1">
            <h3 class="card-title">Approve</h3>
            <h3 class="card-title">
              <span
                v-for="(member, index) in proposal.result.approve"
                :key="index"
                class="badge badge-pill badge-dark mx-2 my-2"
              >{{member}}</span>
            </h3>
          </div>
          <div class="col-5">
            <h3 class="card-title">Reject</h3>
            <h3 class="card-title">
              <span
                v-for="(member, index) in proposal.result.reject"
                :key="index"
                class="badge badge-pill badge-dark mx-2 my-2"
              >{{member}}</span>
            </h3>
          </div>
        </div>
        <div class="row py-5">
          <div class="col-4 offset-4">
            <button class="btn btn-dark btn-lg btn-block">OK</button>
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
          result: {
            approve: [
              "Ben",
              "Adam"
            ],
            reject: ["Sam", "Sidd"]
          }
        };
      }
    }
  }
};
</script>