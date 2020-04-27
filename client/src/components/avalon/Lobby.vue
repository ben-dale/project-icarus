<template>
  <div class="col-12">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <h5 class="card-header text-center">Game settings</h5>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 mb-3">
                <button type="button" class="btn btn-info btn-block" disabled>
                  <h5>Merlin</h5>Knows which team each player is a member of
                </button>
              </div>
              <div class="col-md-6 mb-3">
                <button type="button" class="btn btn-danger btn-block" disabled>
                  <h5>Assassin</h5>Has an opportunity to steal the win after three successful quests
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 mb-3">
                <button
                  v-on:click="togglePercival()"
                  type="button"
                  v-bind:class="['btn', 'btn-block', (percivalSelected ? 'btn-info' : 'btn-light'), (percivalSelected ? 'border-info' : 'border')]"
                  :disabled="!isRoomOwner"
                >
                  <h5>Percival</h5>Knows Merlin's identity
                </button>
              </div>
              <div class="col-md-4 mb-3">
                <button
                  v-on:click="toggleMorgana()"
                  type="button"
                  v-bind:class="['btn', 'btn-block', (morganaSelected ? 'btn-danger' : 'btn-light'), (morganaSelected ? 'border-danger' : 'border')]"
                  :disabled="!isRoomOwner"
                >
                  <h5>Morgana</h5>Appears as a second Merlin to Percival
                </button>
              </div>
              <div class="col-md-4">
                <button
                  v-on:click="toggleOberon()"
                  type="button"
                  v-bind:class="['btn', 'btn-block', (oberonSelected ? 'btn-danger' : 'btn-light'), (oberonSelected ? 'border-danger' : 'border')]"
                  :disabled="!isRoomOwner"
                >
                  <h5>Oberon</h5>Invisible to all but Merlin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row pt-4 pb-3">
      <div class="col-md-12 text-center">
        <p
          class="lead"
        >Further instruction and explanation will be provided as you play through The Resistance: Avalon. <br/>The next screen will reveal which team you are in and which role you will play.</p>
        <p
          v-if="playersStillNeeded > 0"
          class="lead"
        >We are still waiting for {{playersStillNeeded}} more {{playersStillNeeded == 1 ? 'player' : 'players'}} to join the lobby.</p>
        <p v-if="playersStillNeeded == 0" class="lead">
          Waiting for all players to click
          <span class="text-success">Ready</span>.
        </p>
      </div>
    </div>

    <div class="row mb-5">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row text-center">
              <div v-for="player in players" class="col-md-3" :key="player.id">
                <div
                  v-if="player.ready"
                  class="bg-success text-white pt-2 pb-1 mb-3 border border-success rounded"
                >
                  <h5>{{player.name}}</h5>
                </div>
                <div
                  v-if="!player.ready"
                  class="text-dark pt-2 pb-1 mb-3 border bg-light rounded"
                >
                  <h5>{{player.name}}</h5>
                </div>
              </div>
              <div v-for="index in playersStillNeeded" class="col-md-3" :key="index">
                <div class="text-secondary pt-2 pb-1 mb-3 border rounded">
                  <h5>Required</h5>
                </div>
              </div>
              <div
                v-for="index in (maxPlayers - (players.length + playersStillNeeded))"
                class="col-md-3"
                :key="index+100"
              >
                <div class="text-secondary pt-2 pb-1 mb-3 border rounded">
                  <h5>Optional</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-md-6 offset-md-3">
        <button
          v-if="!isPlayerReady"
          v-on:click="readyUp()"
          type="button"
          class="btn btn-success btn-lg btn-block"
        >Ready</button>
        <button
          v-if="isPlayerReady"
          v-on:click="notReady()"
          type="button"
          class="btn btn-warning btn-lg btn-block"
        >Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
// import Title from '@/components/avalon/Title.vue'

export default {
  // components: { Title },
  props: {
    socket: Object,
    players: {
      type: Array,
      default: () => []
    },
    percivalSelected: Boolean,
    morganaSelected: Boolean,
    oberonSelected: Boolean,
    roomOwner: String,
    roomId: String,
    isPlayerReady: Boolean
  },
  data: function() {
    return {
      name: "",
      minPlayers: 5,
      maxPlayers: 10,
      currentMemberCount: 0,
      readyClasses: "card bg-success text-white"
    };
  },
  computed: {
    isRoomOwner: function() {
      return this.socket.id == this.roomOwner;
    },
    playersStillNeeded: function() {
      return this.players.length >= this.minPlayers
        ? 0
        : this.minPlayers - this.players.length;
    },
    allPlayersReady: function() {
      for (let i = 0; i < this.players.length; i++) {
        if (!this.players[i].ready) {
          return false;
        }
      }
      return true;
    }
  },
  methods: {
    togglePercival: function() {
      this.$emit("togglePercival");
    },
    toggleMorgana: function() {
      this.$emit("toggleMorgana");
    },
    toggleOberon: function() {
      this.$emit("toggleOberon");
    },
    readyUp: function() {
      this.$emit("readyUp");
    },
    notReady: function() {
      this.$emit("notReady");
    }
  }
};
</script>
<style scoped>
</style>