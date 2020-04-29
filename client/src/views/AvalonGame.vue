<template>
  <div id="app" class="container">
    <div
      class="row"
      v-bind:class="{ 'visible': screen == 'joinScreen', 'hidden': screen != 'joinScreen' }"
    >
      <NameInput buttonText="Join" @submit="joinSession" />
    </div>
    <div class="row" v-bind:class="{ 'visible': screen === 'lobby', 'hidden': screen !== 'lobby' }">
      <Lobby
        :socket="socket"
        :roomId="roomId"
        :players="players"
        :morganaSelected="morganaSelected"
        :percivalSelected="percivalSelected"
        :oberonSelected="oberonSelected"
        :roomOwner="roomOwner"
        :isPlayerReady="isPlayerReady"
        @togglePercival="togglePercival"
        @toggleMorgana="toggleMorgana"
        @toggleOberon="toggleOberon"
        @readyUp="readyUp"
        @notReady="notReady"
      />
    </div>
    <div
      class="row"
      v-bind:class="{ 'visible': screen === 'roleReveal', 'hidden': screen !== 'roleReveal' }"
    >
      <Reveal
        :players="players"
        :isPlayerReady="isPlayerReady"
        @readyUp="readyUp"
        @notReady="notReady"
      />
    </div>
    <div class="row" v-bind:class="{ 'visible': screen === 'game', 'hidden': screen !== 'game' }">
      <Game
        :game="game"
        :players="players"
        :playerId="socket.id"
        :playerTeam="team"
        @revealQuestResult="revealQuestResult"
        @proposeTeam="proposeTeam"
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
  name: "App",
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
      roomOwner: "",
      morganaSelected: false,
      percivalSelected: false,
      oberonSelected: false,
      players: [
        { id: "aaa", name: "Ben" },
        { id: "bbb", name: "Sidd" },
        { id: "ccc", name: "Sam" },
        { id: "ddd", name: "Adam <3" }
      ],
      name: "",
      screen: "joinScreen",
      team: "evil",
      role: "",
      game: {}
      // game: {
      //   questLog: {
      //     logs: [
      //       {
      //         id: 1,
      //         requiresDoubleFail: false,
      //         required: 2,
      //         organiser: "aaa",
      //         members: ["aaa", "ddd"],
      //         result: "succeed"
      //       },
      //       {
      //         id: 2,
      //         requiresDoubleFail: false,
      //         required: 3,
      //         organiser: "aaa",
      //         members: ["aaa", "ccc", "aaa"],
      //         result: "succeed"
      //       },
      //       {
      //         id: 3,
      //         requiresDoubleFail: true,
      //         required: 4,
      //         organiser: "aaa",
      //         members: ["aaa", "bbb", "aaa", "ddd"],
      //         result: "fail"
      //       },
      //       {
      //         id: 4,
      //         requiresDoubleFail: true,
      //         required: 3,
      //         organiser: "aaa",
      //         members: ["aaa", "aaa", "ddd"],
      //         result: "fail"
      //       },
      //       {
      //         id: 5,
      //         requiresDoubleFail: true,
      //         required: 4,
      //         organiser: "",
      //         members: ["", "", "", ""],
      //         result: ""
      //       }
      //     ]
      //   },
      //   activeQuest: {
      //     id: 5,
      //     disagreements: 0,
      //     organiser: "aaa",
      //     proposedMembers: ["aaa", "bbb"],
      //     proposalAccepted: true,
      //     requiresDoubleFail: false,
      //     results: [{ id: 0, revealed: false, result: "success" },{ id: 1, revealed: false, result: "fail" }],
      //     result: "succeed"
      //   },
      //   state: "questResultReveal"
      // }
    };
  },
  computed: {
    isPlayerReady: function() {
      let player = this.players.find(o => o.id == this.socket.id);
      return player && player.ready;
    }
  },
  created() {
    this.socket.on("player-updated", playerData => {
      console.log(playerData);
      let playerToUpdate = this.players.find(o => o.id == playerData.id);
      for (let k in playerToUpdate) {
        playerToUpdate[k] = playerData[k];
      }
    });
    this.socket.on("room-updated", roomData => {
      console.log(roomData);
      this.game = roomData.game;
      this.screen = roomData.screen;
      this.players = roomData.players;
      this.roomOwner = roomData.owner;
      this.percivalSelected = roomData.settings.percivalSelected;
      this.morganaSelected = roomData.settings.morganaSelected;
      this.oberonSelected = roomData.settings.oberonSelected;
    });
  },
  methods: {
    togglePercival: function() {
      this.percivalSelected
        ? (this.percivalSelected = false)
        : (this.percivalSelected = true);
      this.emitSettingsChange();
    },
    toggleMorgana: function() {
      this.morganaSelected
        ? (this.morganaSelected = false)
        : (this.morganaSelected = true);
      this.emitSettingsChange();
    },
    toggleOberon: function() {
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
    proposeTeam: function(memberIds) {
      this.socket.emit("propose-team", { memberIds: memberIds });
    },
    joinSession: function(name) {
      this.name = name;
      this.socket.emit("player-join", { name: this.name, roomId: this.roomId });
    },
    readyUp: function() {
      this.socket.emit("player-ready", { screen: this.screen });
    },
    notReady: function() {
      this.socket.emit("player-not-ready");
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