<template>
  <div class="col-md-12">
    <table class="table text-center table-bordered table-sm">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Quest</th>
          <th scope="col">Players required</th>
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
</template>
<script>
export default {
  props: {
    players: Array,
    questLog: Array
  },
  methods: {
    getPlayerNameById: function(id) {
      let player = this.players.find(o => o.id == id);
      return player && player.name ? player.name : "";
    }
  }
};
</script>