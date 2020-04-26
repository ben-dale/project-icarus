<template>
  <div class="col-12">
    <div class="row mb-5">
      <div class="col-md-12 text-center">
        <h1 class="display-4 pb-5">The Resistance: Avalon</h1>
        <p
          class="lead"
        >The following screen will reveal which team you are in and which role you will play.</p>
        <p
          class="lead"
        >Further instruction and explanation will be provided as you play through the game.</p>
        <p class="lead"><span class="text-info">{{roomOwnerName}}</span> is the lobby's admin, can change the settings and will start the game when everyone is ready.</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 mb-3">
        <div class="card">
          <h5 class="card-header">Game settings</h5>
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
                  v-bind:class="['btn', 'btn-block', (percivalSelected ? 'btn-info' : 'btn-outline-info')]"
                  :disabled="!isRoomOwner"
                >
                  <h5>Percival</h5>Knows Merlin's identity
                </button>
              </div>
              <div class="col-md-4 mb-3">
                <button
                  v-on:click="toggleMorgana()"
                  type="button"
                  v-bind:class="['btn', 'btn-block', (morganaSelected ? 'btn-danger' : 'btn-outline-danger')]"
                  :disabled="!isRoomOwner"
                >
                  <h5>Morgana</h5>Appears as a second Merlin to Percival
                </button>
              </div>
              <div class="col-md-4">
                <button
                  v-on:click="toggleOberon()"
                  type="button"
                  v-bind:class="['btn', 'btn-block', (oberonSelected ? 'btn-danger' : 'btn-outline-danger')]"
                  :disabled="!isRoomOwner"
                >
                  <h5>Oberon</h5>Known only to Merlin as Evil member
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5 text-center">
      <div class="col-12">
        <p
          v-if="playersStillNeeded > 0"
          class="lead"
        >Waiting for {{playersStillNeeded}} more {{playersStillNeeded == 1 ? 'player' : 'players'}}...</p>
        <p v-if="playersStillNeeded == 0" class="lead">
          Waiting for all players to click
          <span class="text-success">Ready</span>.
        </p>
      </div>
    </div>
    <div class="row">
      <div
        class="col-6 col-md-4 mb-3 text-truncate text-center"
        v-for="player in players"
        :key="player.id"
      >
        <div v-bind:class="[player.ready ? readyClasses : 'card']">
          <div class="card-body">
            <div class="card-text lead">{{player.name}}</div>
          </div>
        </div>
      </div>
      <div
        class="col-6 col-md-4 mb-3 text-truncate text-center"
        v-for="index in playersStillNeeded"
        :key="index"
      >
        <div class="card">
          <div class="card-body">
            <div class="card-text lead text-muted text-center">Required</div>
          </div>
        </div>
      </div>
      <div
        class="col-6 col-md-4 mb-3 text-truncate text-center"
        v-for="index in (maxPlayers - (players.length + playersStillNeeded))"
        :key="index + 100"
      >
        <div class="card">
          <div class="card-body">
            <div class="card-text lead text-muted text-center">Optional</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-4 offset-md-2 mb-3">
        <button
          v-if="!isPlayerReady"
          v-on:click="readyUp()"
          type="button"
          class="btn btn-success btn-lg btn-block"
        >Ready up</button>
        <button
          v-if="isPlayerReady"
          v-on:click="notReady()"
          type="button"
          class="btn btn-warning btn-lg btn-block"
        >Cancel</button>
      </div>
      <div class="col-md-4">
        <button v-on:click="leave()" type="button" class="btn btn-danger btn-lg btn-block">Leave</button>
      </div>
    </div>
    <div v-if="isRoomOwner" class="row">
      <div class="col-md-8 offset-md-2">
        <button
          v-on:click="startGame"
          type="button"
          class="btn btn-success btn-lg btn-block"
          :disabled="!allPlayersReady || players.length < minPlayers"
        >Start game</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    roomId: String
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
    isPlayerReady: function() {
      let player = this.players.find(o => o.id == this.socket.id);
      return player && player.ready;
    },
    isRoomOwner: function() {
      return this.socket.id == this.roomOwner;
    },
    roomOwnerName: function() {
      let player = this.players.find(o => o.id == this.roomOwner);
      if (player) {
        return player.name;
      }
      return "";
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
    startGame: function() {
      this.socket.emit("start-game", { roomId: this.roomId });
    },
    readyUp: function() {
      this.socket.emit("player-ready");
    },
    notReady: function() {
      this.socket.emit("player-not-ready");
    },
    leave: function() {
      this.socket.disconnect();
      this.$router.replace({ name: `Avalon` });
    }
  }
};
</script>
<style scoped>
</style>