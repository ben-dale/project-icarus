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
        @percival-enabled="percivalEnabled"
        @oberon-enabled="oberonEnabled"
        @morgana-enabled="morganaEnabled"
        @player-ready="readyUp"
        @player-not-ready="notReady"
      />
    </div>

    <div
      class="row"
      v-bind:class="{ 'visible': room && room.game.screen === 'ROLE_REVEAL', 'hidden': !room || room.game.screen !== 'ROLE_REVEAL' }"
    >
      <Reveal
        :players="players"
        :isPlayerReady="isPlayerReady"
        :team="team"
        :role="role"
        :settings="room && room.game ? room.game.settings : {}"
        :metadata="metadata"
        @player-ready="readyUp"
        @player-not-ready="notReady"
      />
    </div>

    <div
      class="row"
      v-bind:class="{ 'visible': room && room.game.screen === 'GAME', 'hidden': !room || room.game.screen !== 'GAME' }"
    >
      <Game
        :game="room && room.game ? room.game : {}"
        :players="players"
        :team="team"
        :role="role"
        :playerId="getPlayerId()"
        :isPlayerReady="isPlayerReady"
        @reveal-quest-result="revealQuestResult"
        @propose-team="proposeTeam"
        @player-ready="readyUp"
        @player-not-ready="notReady"
      />
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import NameInput from "@/components/avalon/NameInput.vue";
import Lobby from "@/components/avalon/Lobby.vue";
import Reveal from "@/components/avalon/Reveal.vue";
import Game from "@/components/avalon/Game.vue";

export default {
  name: "AvalonGame",
  components: { NameInput, Lobby, Reveal, Game },
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
      players: [],
      team: null,
      role: null,
      metadata: []
      // playerId: "111",
      // room: {
      //   game: {
      //     state: "QUEST_PROPOSING",
      //     screen: "GAME",
      //     settings: {
      //       percivalEnabled: false,
      //       oberonEnabled: false,
      //       morganaEnabled: false
      //     },
      //     currentQuest: {
      //       id: "1",
      //       organiserId: "222",
      //       disagreements: 0,
      //       proposedPlayerIds: ["111", "333"],
      //       proposalAccepted: false,
      //       votes: [
      //         { choice: "SUCCEED", revealed: true },
      //         { choice: "SABOTAGE", revealed: true },
      //         { choice: "SUCCEED", revealed: true }
      //       ],
      //       result: ""
      //     },
      //     questLogs: [
      //       {
      //         id: "1",
      //         requiredPlayers: 2,
      //         playerIds: ["222", "333"],
      //         organiserId: "222",
      //         result: "SUCCEED"
      //       },
      //       {
      //         id: "2",
      //         requiredPlayers: 3,
      //         playerIds: [],
      //         organiserId: "",
      //         result: ""
      //       },
      //       {
      //         id: "3",
      //         requiredPlayers: 4,
      //         playerIds: [],
      //         organiserId: "",
      //         result: ""
      //       },
      //       {
      //         id: "4",
      //         requiredPlayers: 3,
      //         playerIds: [],
      //         organiserId: "",
      //         result: ""
      //       },
      //       {
      //         id: "5",
      //         requiredPlayers: 4,
      //         playerIds: [],
      //         organiserId: "",
      //         result: ""
      //       }
      //     ]
          
      //   }
      // },
      // players: [
      //   { name: "Ben", id: "111", ready: false, vote: "APPROVE" },
      //   { name: "Sidd", id: "222", ready: true, vote: "REJECT" },
      //   { name: "Adam <3", id: "333", ready: false, vote: "REJECT" },
      //   { name: "Sam", id: "444", ready: false, vote: "REJECT" },
      //   { name: "Rodney", id: "555", ready: false, vote: "REJECT" },
      //   { name: "Jim", id: "666", ready: false, vote: "REJECT" },
      //   { name: "Max", id: "777", ready: false, vote: "REJECT" },
      // ],
      // team: "EVIL",
      // role: "MINION",
      // metadata: ["111", "222"]
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
    this.socket.on("player-assigned", player => {
      console.log(player);
      this.team = player.team;
      this.role = player.role;
      this.metadata = player.metadata.slice();
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
    getPlayerId: function() {
      // return "111";
      return this.socket.id;
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
    proposeTeam: function(playerIds) {
      this.socket.emit("room-updated", {
        game: { currentQuest: { proposedPlayerIds: playerIds } }
      });
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
    readyUpWithVote(vote) {
      this.socket.emit("player-updated", { ready: true, vote: vote });
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