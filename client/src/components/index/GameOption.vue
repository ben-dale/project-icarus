<template>
  <div class="card bg-dark border-primary text-light">
    <h5 class="card-header border-primary text-center">{{name}}</h5>
    <div class="card-body text-center bg-dark">
      <p v-if="description" class="card-text">{{description}}</p>
      <p
        v-if="minPlayers && maxPlayers && teams"
        class="card-subtitle"
      >{{minPlayers}} - {{maxPlayers}} players, {{teams}} teams</p>
    </div>
    <div v-if="linkTo" class="card-footer bg-primary">
      <router-link v-if="linkTo" :to="linkTo" class="btn btn-sm btn-secondary btn-block">Play</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameOption",
  props: {
    name: String,
    description: String,
    minPlayers: Number,
    maxPlayers: Number,
    teams: Number,
    linkTo: String,
    image: String
  }
};
</script>