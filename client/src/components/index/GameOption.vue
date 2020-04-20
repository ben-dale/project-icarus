<template>

    <div class="card" style="width: 18rem;">
    <img src="https://placeimg.com/200/100/any" class="card-img-top">
    <div class="card-body">
        <h5 class="card-title">{{name}}</h5>
        <p class="card-text">{{description}}</p>
        <p class="card-text">{{minPlayers}} - {{maxPlayers}} players, {{teams}} teams</p>
        <a href="#" class="btn btn-primary btn-block">Play</a>
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
    teams: Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
