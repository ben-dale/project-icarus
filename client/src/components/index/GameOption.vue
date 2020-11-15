<template>
  <div class="card bg-dark border-primary text-light">
    <h5 class="card-header border-primary text-center">{{name}}</h5>
    <div class="card-body text-center bg-dark">
      <p v-if="description" class="card-text">{{description}}</p>
      <p>Based on the original board game.</p>
      <p
        class="card-subtitle"
      ><b>{{minPlayers}} - {{maxPlayers}} players{{teams == 0 ? '' : ', ' + teams + ' teams'}}</b></p>
    </div>
    <div v-if="!comingSoon" class="card-footer bg-primary">
      <button class="btn btn-md btn-secondary btn-block" @click="$emit('play')">Create lobby</button>
    </div>
     <div v-if="comingSoon" class="card-footer bg-primary text-center">
      Coming Soon!
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
    image: String,
    comingSoon: Boolean
  }
};
</script>