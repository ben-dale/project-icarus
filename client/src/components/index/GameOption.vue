<template>
  <div class="card">
    <!-- <img :src="require('@/assets/' + image)" class="card-img-top"> -->
    <div class="card-body text-center">
        <h5 class="card-title">{{name}}</h5>
        <h6 v-if="minPlayers && maxPlayers && teams" class="card-subtitle pb-2 text-muted">{{minPlayers}} - {{maxPlayers}} players, {{teams}} teams</h6>
        <p v-if="description" class="card-text">{{description}}</p>
        <router-link v-if="linkTo" :to="linkTo" class="btn btn-dark btn-block">Play</router-link>
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
