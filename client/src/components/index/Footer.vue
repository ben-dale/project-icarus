<template>
  <div class="fixed-bottom col-md-12 text-center py-5 bg-dark text-light">
    <p>
      Please consider donating to Project Icarus <u><a class="text-light" href="/donate">here</a></u>.
    </p>
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
