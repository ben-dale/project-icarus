<template>
  <div class="card" style="width: 18rem;">
    <img src="https://placeimg.com/200/100/any" class="card-img-top">
    <div class="card-body">
        <h5 class="card-title">{{name}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{minPlayers}} - {{maxPlayers}} players, {{teams}} teams</h6>
        <p class="card-text">{{description}}</p>
        <a :href="linkTo" class="btn btn-primary btn-block">Play</a>
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
    linkTo: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
