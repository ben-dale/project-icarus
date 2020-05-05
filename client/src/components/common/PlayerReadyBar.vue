<template>
  <div class="col-12">
    <div class="card">
      <div class="card-body">
        <div class="row text-center">
          <div v-for="(player, index) in players" class="col-2" :key="player.id">
            <button :class="[(player.ready ? 'btn-success' : 'btn-light'), (index > 5 ? 'mt-3' : ''), 'btn-sm btn-block']" disabled>
              {{player.name}}
            </button>
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