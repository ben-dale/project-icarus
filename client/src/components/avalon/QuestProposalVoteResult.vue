<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header bg-light">Quest {{questId}} - Proposal result</div>
      <div class="card-body text-center">
        <div class="row mb-5">
          <div class="col-5 offset-1">
            <div class="card">
              <div class="card-header bg-light">Approve</div>
              <h5 class="card-text">
                <span
                  v-for="(player, index) in players.filter(p => p.vote == 'APPROVE')"
                  :key="index"
                  class="badge badge-info mx-2 my-2"
                >{{player.name}}</span>
              </h5>
            </div>
          </div>
          <div class="col-5">
            <div class="card">
              <div class="card-header bg-light">Reject</div>
              <h5 class="card-text">
                <span
                  v-for="(player, index) in players.filter(p => p.vote == 'REJECT')"
                  :key="index"
                  class="badge badge-info mx-2 my-2"
                >{{player.name}}</span>
              </h5>
            </div>
          </div>
        </div>
        <div class="row mt-3 mb-4">
          <div class="col-12">
            <p class="card-text" v-if="proposalAccepted">The proposal has been approved.</p>
            <p class="card-text" v-if="!proposalAccepted">The proposal has been rejected.</p>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-4 offset-4">
            <button class="btn btn-dark btn-sm btn-block">OK</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    players: Array,
    proposalAccepted: Boolean,
    questId: Number
  }
};
</script>