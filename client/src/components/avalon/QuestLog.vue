<template>
  <div class="col-12">
    <div class="row">
      <div class="col-12">
        <table class="table table-dark table-bordered bg-dark text-center text-light table-sm">
          <thead class="thead bg-primary">
            <tr>
              <th scope="col">Quest</th>
              <th scope="col">Required</th>
              <th scope="col">Organiser</th>
              <th scope="col" colspan="5" class="text-center">Members</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in questLog" :key="log.id">
              <th
                scope="row"
                :class="{ 'bg-info text-white': log.result === 'SUCCEED', 'bg-danger text-white': log.result === 'FAIL' }"
              >{{log.id}}</th>
              <td>{{log.requiredPlayers}}</td>
              <td>{{getPlayerNameById(log.organiserId)}}</td>
              <td
                v-for="(playerId, index) in log.playerIds"
                :key="index * log.id"
              >{{getPlayerNameById(playerId)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card bg-dark border border-primary">
          <div class="card-body text-light">
            <div
              class="card-text text-center"
              v-if="disagreements < 5"
            >Evil will steal the win after {{5 - disagreements}} {{5 - disagreements == 5 ? '' : 'more' }} proposal {{5 - disagreements == 1 ? 'rejection' : 'rejections'}}.</div>
            <div
              class="card-text text-center"
              v-if="disagreements >= 5"
            >Players could not agree on who should go on the quest. The game is now over.</div>
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
    questLog: Array,
    disagreements: Number
  },
  methods: {
    getPlayerNameById: function(id) {
      let player = this.players.find(o => o.id == id);
      return player && player.name ? player.name : "";
    }
  }
};
</script>
<style scoped>
th, td, thead th {
  border-color: #46484d;
}
</style>