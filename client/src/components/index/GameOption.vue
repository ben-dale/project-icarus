<template>
  <div class="card">
    <img :src="require('@/assets/' + image)" class="card-img-top">
    <div class="card-body text-center">
        <h5 class="card-title">{{name}}</h5>
        <h6 v-if="minPlayers && maxPlayers && teams" class="card-subtitle mb-2 text-muted">{{minPlayers}} - {{maxPlayers}} players, {{teams}} teams</h6>
        <p v-if="description" class="card-text">{{description}}</p>
        <a v-if="linkTo" :href="linkTo" class="btn btn-dark btn-block">Play</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameOption',
  props: {
    name: String,
    description: String,
    minPlayers: Number,
    maxPlayers: Number,
    teams: Number,
    linkTo: String,
    image: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
