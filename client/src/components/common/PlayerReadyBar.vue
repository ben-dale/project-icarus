<template>
  <div class="col-12">
    <div class="card">
      <div class="card-body">
        <div class="row text-center">
          <div v-for="(player, index) in players" class="col-2" :key="player.id">
            <div :class="[(player.ready ? 'bg-success text-white' : 'text-dark bg-light border'), (index > 5 ? 'mt-3' : ''), 'pt-2', 'pb-2', 'rounded']">
              <span>{{player.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: "PlayerReadyBar",
    props: {
        players: Array
    }

}
</script>