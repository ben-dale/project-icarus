<template>
  <div id="app" class="container">
    <div class="row">
      <IndexTitle />
    </div>
    <div class="row">
      <GameOption name="The Resistance: Avalon" description="Avalon pits the forces of Good and Evil in a battle to control the future of civilization." :minPlayers="5" :maxPlayers="12" :teams="2" />
    </div>
  </div>
</template>

<script>
import IndexTitle from './components/index/IndexTitle.vue'
import GameOption from './components/index/GameOption.vue'

export default {
  name: 'App',
  components: {
    IndexTitle,
    GameOption
  }
}
</script>