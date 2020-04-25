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
        <p class="lead">The game will start when every one is ready.</p>
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
                  <h5>Merlin</h5>Can see all players in Good
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
                  v-on:click="selectPercival()"
                  type="button"
                  v-bind:class="['btn', 'btn-block', (percivalSelected ? 'btn-info' : 'btn-outline-info')]"
                >
                  <h5>Percival</h5>Knows Merlin's identity
                </button>
              </div>
              <div class="col-md-4 mb-3">
                <button
                  v-on:click="selectMorgana()"
                  type="button"
                  v-bind:class="['btn', 'btn-block', (morganaSelected ? 'btn-danger' : 'btn-outline-danger')]"
                >
                  <h5>Morgana</h5>Shows as a second Merlin to Percival
                </button>
              </div>
              <div class="col-md-4">
                <button
                  v-on:click="selectOberon()"
                  type="button"
                  v-bind:class="['btn', 'btn-block', (oberonSelected ? 'btn-danger' : 'btn-outline-danger')]"
                >
                  <h5>Oberon</h5>Is only known to Merlin
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
          v-if="playersStillNeeded() > 0"
          class="lead"
        >Waiting for {{playersStillNeeded()}} more {{playersStillNeeded() == 1 ? 'player' : 'players'}}...</p>
        <p v-if="playersStillNeeded() == 0" class="lead">
          Waiting for all players to click
          <span class="text-success">Ready</span>.
        </p>
      </div>
    </div>
    <div class="row">
      <div
        class="col-6 col-md-4 mb-3 text-truncate text-center"
        v-for="member in members"
        :key="member.id"
      >
        <div v-if="!member.empty" v-bind:class="[member.ready ? readyClasses : 'card']">
          <div class="card-body">
            <div class="card-text lead">{{member.name}}</div>
          </div>
        </div>
        <div v-if="member.empty" class="card">
          <div class="card-body">
            <div class="card-text lead text-muted text-center">{{member.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-4 offset-md-2 mb-3">
        <button
          v-if="!playerReady()"
          v-on:click="readyUp()"
          type="button"
          class="btn btn-success btn-lg btn-block"
        >Ready up</button>
        <button
          v-if="playerReady()"
          v-on:click="notReady()"
          type="button"
          class="btn btn-warning btn-lg btn-block"
        >Cancel</button>
      </div>
      <div class="col-md-4">
        <button v-on:click="leave()" type="button" class="btn btn-danger btn-lg btn-block">Leave</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    socket: Object,
    roomId: String
  },
  data: function() {
    return {
      name: "",
      ownerSocketId: "",
      minPlayers: 5,
      maxPlayers: 10,
      members: [],
      currentMemberCount: 0,
      readyClasses: "card bg-success text-white",
      currentPlayer: {},
      percivalSelected: false,
      morganaSelected: false,
      oberonSelected: false
    };
  },
  created() {
    this.socket.on("room-updated", roomData => {
      this.percivalSelected = roomData.settings.percivalSelected;
      this.morganaSelected = roomData.settings.morganaSelected;
      this.oberonSelected = roomData.settings.oberonSelected;
      this.ownerSocketId = roomData.owner;
      this.members = [];
      for (const field in roomData.members) {
        let player = {
          id: field,
          name: roomData.members[field].name,
          ready: roomData.members[field].ready
        };
        if (this.socket.id == field) {
          this.currentPlayer = player;
        }
        this.members.push(player);
      }
      this.currentMemberCount = this.members.length; // Record current number of members before adding the padding seats
      let requiredPlayersToAdd = this.playersStillNeeded();
      let optionalPlayersToAdd =
        this.maxPlayers - (this.members.length + requiredPlayersToAdd);
      for (let i = 0; i < requiredPlayersToAdd; i++) {
        this.members.push({ id: i, name: "Required", empty: true });
      }
      for (let i = 0; i < optionalPlayersToAdd; i++) {
        this.members.push({ id: i + 100, name: "Optional", empty: true });
      }
    });
  },
  methods: {
    selectPercival: function() {
      this.percivalSelected
        ? (this.percivalSelected = false)
        : (this.percivalSelected = true);
      this.emitSettingsChange();
    },
    selectMorgana: function() {
      this.morganaSelected
        ? (this.morganaSelected = false)
        : (this.morganaSelected = true);
      this.emitSettingsChange();
    },
    selectOberon: function() {
      this.oberonSelected
        ? (this.oberonSelected = false)
        : (this.oberonSelected = true);
      this.emitSettingsChange();
    },
    emitSettingsChange: function() {
      this.socket.emit("update-settings", {
        roomId: this.roomId,
        settings: {
          oberonSelected: this.oberonSelected,
          morganaSelected: this.morganaSelected,
          percivalSelected: this.percivalSelected
        }
      });
    },
    playersStillNeeded: function() {
      return this.currentMemberCount >= this.minPlayers
        ? 0
        : this.minPlayers - this.currentMemberCount;
    },
    readyUp: function() {
      this.socket.emit("player-ready", { roomId: this.roomId });
    },
    notReady: function() {
      this.socket.emit("player-not-ready", { roomId: this.roomId });
    },
    playerReady: function() {
      return this.currentPlayer.ready;
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