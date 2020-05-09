<template>
  <div id="app" class="container">
    <div class="row" v-bind:class="{ 'visible': !room, 'hidden': room }">
      <NameInput buttonText="Join" @submit="joinSession" />
    </div>
    <div
      v-if="room && room.game && room.game.closed && !room.playerIds.includes(getPlayerId())"
      class="row"
    >
      <RoomClosed />
    </div>
    <div
      v-if="room && room.game && room.playerIds.includes(getPlayerId()) && room.game.screen == 'LOBBY'"
      class="row"
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
      v-if="room && room.game  && room.playerIds.includes(getPlayerId()) && room.game.screen == 'ROLE_REVEAL'"
      class="row"
    >
      <Reveal
        :players="players"
        :isPlayerReady="isPlayerReady"
        :team="team"
        :role="role"
        :settings="room.game.settings"
        :metadata="metadata"
        @player-ready="readyUp"
        @player-not-ready="notReady"
      />
    </div>

    <div
      v-if="room && room.game && room.playerIds.includes(getPlayerId()) && room.game.screen == 'GAME'"
      class="row"
    >
      <Game
        :game="room.game"
        :players="players"
        :team="team"
        :role="role"
        :playerId="getPlayerId()"
        :isPlayerReady="isPlayerReady"
        @reveal-quest-vote="revealQuestVote"
        @propose-player-for-quest="proposePlayerForQuest"
        @unpropose-player-for-quest="unproposePlayerForQuest"
        @select-merlin-for-id="selectMerlinForId"
        @unselect-merlin-for-id="unselectMerlinForId"
        @player-ready="readyUp"
        @player-not-ready="notReady"
        @player-approve-proposal="playerApproveVote"
        @player-succeed-quest="playerSucceedQuest"
      />
    </div>

    <div style="padding-bottom:200px"></div>
  </div>
</template>

<script>
import io from "socket.io-client";
import RoomClosed from "@/components/common/RoomClosed.vue";
import NameInput from "@/components/avalon/NameInput.vue";
import Lobby from "@/components/avalon/Lobby.vue";
import Reveal from "@/components/avalon/Reveal.vue";
import Game from "@/components/avalon/Game.vue";

export default {
  name: "AvalonGame",
  components: { NameInput, Lobby, Reveal, Game, RoomClosed },
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
      // room: {
      //   game: {
      //     state: "MERLIN_ID",
      //     screen: "GAME",
      //     settings: {
      //       percivalEnabled: false,
      //       oberonEnabled: false,
      //       morganaEnabled: false
      //     },
      //     currentQuest: {
      //       id: 2,
      //       organiserId: "111",
      //       disagreements: 0,
      //       requiredPlayers: 2,
      //       proposedPlayerIds: [],
      //       proposalAccepted: false,
      //       votes: [
      //         { choice: "SUCCEED", revealed: true },
      //         { choice: "SABOTAGE", revealed: true },
      //         { choice: "SUCCEED", revealed: true }
      //       ],
      //       result: "SUCCEED"
      //     },
      //     questLogs: [
      //       {
      //         id: 1,
      //         requiredPlayers: 2,
      //         playerIds: ["222", "333"],
      //         organiserId: "222",
      //         result: "SUCCEED"
      //       },
      //       {
      //         id: 2,
      //         requiredPlayers: 2,
      //         playerIds: [],
      //         organiserId: "",
      //         result: ""
      //       },
      //       {
      //         id: 3,
      //         requiredPlayers: 4,
      //         playerIds: [],
      //         organiserId: "",
      //         result: ""
      //       },
      //       {
      //         id: 4,
      //         requiredPlayers: 3,
      //         playerIds: [],
      //         organiserId: "",
      //         result: ""
      //       },
      //       {
      //         id: 5,
      //         requiredPlayers: 4,
      //         playerIds: [],
      //         organiserId: "",
      //         result: ""
      //       }
      //     ]
      //   }
      // },
      // players: [
      //   { name: "Ben", id: "111", ready: false, vote: "APPROVE", team: "EVIL" },
      //   { name: "Sidd", id: "222", ready: false, vote: "APPROVE", team: "EVIL" },
      //   {
      //     name: "Adam <3",
      //     id: "333",
      //     ready: false,
      //     vote: "REJECT",
      //     team: "EVIL",
      //     role: "ASSASSIN"
      //   },
      //   { name: "Sam", id: "444", ready: false, vote: "REJECT", team: "GOOD" },
      //   {
      //     name: "Rodney",
      //     id: "555",
      //     ready: false,
      //     vote: "REJECT",
      //     team: "GOOD"
      //   },
      //   { name: "Jim", id: "666", ready: false, vote: "REJECT", team: "GOOD" },
      //   { name: "Max", id: "777", ready: false, vote: "REJECT", team: "GOOD" }
      // ],
      // team: "EVIL",
      // role: "ASSASSIN",
      // metadata: ["111", "222"]
    };
  },
  computed: {
    isPlayerReady: function() {
      let player = this.players.find(o => o.id == this.getPlayerId());
      return player && player.ready;
    }
  },
  created() {
    this.socket.on("players-updated", players => {
      this.players = players;
    });
    this.socket.on("player-updated", player => {
      // Typically it should only be the 'ready' field that is updated here
      let playerToUpdate = this.players.find(o => o.id == player.id);
      playerToUpdate.ready = player.ready;
    });
    this.socket.on("player-assigned", player => {
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
    proposePlayerForQuest: function(playerId) {
      this.socket.emit("room-updated", {
        game: { currentQuest: { playerIdToPropose: playerId } }
      });
    },
    revealQuestVote: function(index) {
      this.socket.emit("room-updated", {
        game: { currentQuest: { voteToReveal: index } }
      });
    },
    unproposePlayerForQuest: function(playerId) {
      this.socket.emit("room-updated", {
        game: { currentQuest: { playerIdToUnpropose: playerId } }
      });
    },
    selectMerlinForId: function(playerId) {
      this.socket.emit("room-updated", {
        game: { currentQuest: { merlinIdToPropose: playerId } }
      });
    },
    unselectMerlinForId: function(playerId) {
      this.socket.emit("room-updated", {
        game: { currentQuest: { merlinIdToUnpropose: playerId } }
      });
    },
    joinSession: function(name) {
      this.name = name;
      this.socket.emit("player-joined", {
        name: this.name,
        roomId: this.roomId
      });
    },
    playerApproveVote: function(approve) {
      this.socket.emit("player-updated", {
        ready: true,
        approveProposal: approve
      });
    },
    playerSucceedQuest: function(succeed) {
      this.socket.emit("player-updated", {
        ready: true,
        succeedQuest: succeed
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