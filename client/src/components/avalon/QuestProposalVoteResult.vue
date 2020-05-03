<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-body text-center">
        <div class="row py-5">
          <div class="col-5 offset-1">
            <h3 class="card-title">Approve</h3>
            <h3 class="card-title">
              <span
                v-for="(player, index) in players.filter(p => p.vote == 'APPROVE')"
                :key="index"
                class="badge badge-pill badge-dark mx-2 my-2"
              >{{player.name}}</span>
            </h3>
          </div>
          <div class="col-5">
            <h3 class="card-title">Reject</h3>
            <h3 class="card-title">
              <span
                v-for="(player, index) in players.filter(p => p.vote == 'REJECT')"
                :key="index"
                class="badge badge-pill badge-dark mx-2 my-2"
              >{{player.name}}</span>
            </h3>
          </div>
        </div>
        <div class="row">
          <div class="col-4 offset-4">
            <p v-if="proposalAccepted">The team proposal has been approved.</p>
            <p v-if="!proposalAccepted">The team proposal has been rejected.</p>
          </div>
        </div>
        <div class="row py-5">
          <div class="col-4 offset-4">
            <button class="btn btn-dark btn-block">OK</button>
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
    proposalAccepted: Boolean
  }
};
</script>