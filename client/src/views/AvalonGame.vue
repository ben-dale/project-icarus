<template>
  <div id="app" class="container">
    <div
      class="row"
      v-bind:class="{ 'visible': screen == 'nameInputScreen', 'hidden': screen != 'nameInputScreen' }"
    >
      <NameInput buttonText="Join" @submit="joinSession" />
    </div>
    <div
      class="row"
      v-bind:class="{ 'visible': screen === 'lobbyScreen', 'hidden': screen !== 'lobbyScreen' }"
    >
      <div class="col-12">
        <div class="row mb-5">
          <div class="col-md-12 text-center">
            <h1 class="display-4 pb-5">The Resistance: Avalon</h1>
            <p
              class="lead"
            >The following screen will reveal which team you are in and what role you will play.</p>
            <p
              class="lead"
            >Further instruction and explanation will be provided as you play through the game.</p>
            <p class="lead">The game will start when every one is ready.</p>
          </div>
        </div>
        <div class="row">
          <div
            class="col-6 col-md-4 mb-3 text-truncate text-center"
            v-for="member in members"
            :key="member.id"
          >
            <div
              v-if="!member.empty"
              v-bind:class="[member.ready ? readyClasses : 'card']"
            >
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
            <button type="button" class="btn btn-danger btn-lg btn-block">Leave</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import NameInput from "@/components/avalon/NameInput.vue";

export default {
  name: "App",
  components: { NameInput },
  props: {
    socket: {
      type: Object,
      default: function() {
        let socket = null;
        if (process.env.NODE_ENV == "development") {
          socket = io.connect("http://localhost:3000", {
            upgrade: false,
            transports: ["websocket"]
          });
        } else {
          socket = io.connect({ upgrade: false, transports: ["websocket"] });
        }
        return socket;
      }
    },
    roomId: String
  },
  created() {
    this.socket.on("room-updated", roomData => {
      this.roomOwner = roomData.members[roomData.owner];
      this.members = [];
      for (const field in roomData.members) {
        let player = {
          id: field,
          name: roomData.members[field].name,
          ready: roomData.members[field].ready
        }
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
  data: function() {
    return {
      name: "",
      screen: "nameInputScreen",
      minPlayers: 5,
      maxPlayers: 10,
      members: [],
      currentMemberCount: 0,
      roomOwner: {},
      readyClasses: "card bg-success text-white",
      currentPlayer: {}
    };
  },
  methods: {
    joinSession: function(name) {
      this.name = name;
      this.screen = "lobbyScreen";
      this.socket.emit("player-join", { name: this.name, roomId: this.roomId });
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
    }
  }
};
</script>
<style scoped>
.hidden {
  display: none;
}
.visible {
  display: flex;
}
</style>