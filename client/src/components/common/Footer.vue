<template>
  <div class="fixed-bottom text-center pt-3 pb-1 bg-primary text-light">
    <p>
      Built and mainted by <u><a class="text-light" href="https://twitter.com/mrbenjamind">@mrbenjamind</a></u>
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
