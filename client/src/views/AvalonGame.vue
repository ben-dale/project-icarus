<template>
  <div id="app" class="container">
    <div class="row" v-bind:class="{ 'visible': !room, 'hidden': room }">
      <NameInput buttonText="Join" @submit="joinSession" />
    </div>
    <div
      class="row"
      v-bind:class="{ 'visible': room && room.game.screen === 'LOBBY', 'hidden': !room || room.game.screen !== 'LOBBY' }"
    >
      <Lobby
        :socket="socket"
        :room="room"
        :players="players"
        :isPlayerReady="isPlayerReady"
        @percivalEnabled="percivalEnabled"
        @oberonEnabled="oberonEnabled"
        @morganaEnabled="morganaEnabled"
        @readyUp="readyUp"
        @notReady="notReady"
      />
    </div>
    
    <div
      class="row"
      v-bind:class="{ 'visible': room && room.game.screen === 'ROLE_REVEAL', 'hidden': !room || room.game.screen !== 'ROLE_REVEAL' }"
    >
      <Reveal
        :players="players"
        :isPlayerReady="isPlayerReady"
        @readyUp="readyUp"
        @notReady="notReady"
      />
    </div>
    <!-- 
    <div class="row" v-bind:class="{ 'visible': screen === 'game', 'hidden': screen !== 'game' }">
      <Game
        :game="game"
        :players="players"
        :playerId="socket.id"
        :playerTeam="team"
        @revealQuestResult="revealQuestResult"
        @proposeTeam="proposeTeam"
      />
    </div>-->
  </div>
</template>

<script>
import io from "socket.io-client";
import NameInput from "@/components/avalon/NameInput.vue";
import Lobby from "@/components/avalon/Lobby.vue";
import Reveal from "@/components/avalon/Reveal.vue";
// import Game from "@/components/avalon/Game.vue";

export default {
  name: "App",
  components: { NameInput, Lobby, Reveal },
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
  data: function() {
    return {
      room: null,
      players: []
    };
  },
  computed: {
    isPlayerReady: function() {
      let player = this.players.find(o => o.id == this.socket.id);
      return player && player.ready;
    }
  },
  created() {
    this.socket.on("players-updated", players => {
      console.log(players);
      this.players = players;
    });
    this.socket.on("player-updated", player => {
      console.log(player);
      let playerToUpdate = this.players.find(o => o.id == player.id);
      for (let k in playerToUpdate) {
        playerToUpdate[k] = player[k];
      }
    });
    this.socket.on("room-updated", room => {
      console.log(room);
      this.room = room;
    });
  },
  methods: {
    percivalEnabled: function(enabled) {
      this.socket.emit("room-updated", {
        game: { settings: { percivalEnabled: enabled } }
      });
    },
    morganaEnabled: function(enabled) {
      this.socket.emit("room-updated", {
        game: { settings: { morganaEnabled: enabled } }
      });
    },
    oberonEnabled: function(enabled) {
      this.socket.emit("room-updated", {
        game: { settings: { oberonEnabled: enabled } }
      });
    },
    proposeTeam: function(memberIds) {
      this.socket.emit("propose-team", { memberIds: memberIds });
    },
    joinSession: function(name) {
      this.name = name;
      this.socket.emit("player-joined", {
        name: this.name,
        roomId: this.roomId
      });
    },
    readyUp: function() {
      this.socket.emit("player-updated", { ready: true });
    },
    notReady: function() {
      this.socket.emit("player-updated", { ready: false });
    },
    revealQuestResult: function(id) {
      console.log(id);
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