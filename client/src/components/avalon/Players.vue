<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-body">
        <div class="row text-center">
          <div v-for="player in players" class="col-md-2" :key="player.id">
            <div
              v-if="player.ready"
              class="bg-success text-white pt-2 pb-1 mb-3 border border-success rounded"
            >
              <h5>{{player.name}}</h5>
            </div>
            <div v-if="!player.ready" class="text-dark pt-2 pb-1 mb-3 border rounded">
              <h5>{{player.name}}</h5>
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
    players: {
      type: Array,
      default: function() {
        return [
          { name: "Ben", active: false },
          { name: "Sidd", active: true },
          { name: "Sam", active: false },
          { name: "Rodney", active: false }
        ];
      }
    }
  }
};
</script>