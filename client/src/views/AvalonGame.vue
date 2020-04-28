<template>
  <div id="app" class="container">
    <div
      class="row"
      v-bind:class="{ 'visible': screen == 'joinScreen', 'hidden': screen != 'joinScreen' }"
    >
      <NameInput buttonText="Join" @submit="joinSession" />
    </div>
    <div
      class="row"
      v-bind:class="{ 'visible': screen === 'lobbyScreen', 'hidden': screen !== 'lobbyScreen' }"
    >
      <Lobby
        :socket="socket"
        :roomId="roomId"
        :players="players"
        :morganaSelected="morganaSelected"
        :percivalSelected="percivalSelected"
        :oberonSelected="oberonSelected"
        :roomOwner="roomOwner"
        :isPlayerReady="isPlayerReady"
        @togglePercival="togglePercival()"
        @toggleMorgana="toggleMorgana()"
        @toggleOberon="toggleOberon()"
        @readyUp="readyUp()"
        @notReady="notReady()"
      />
    </div>
    <div
      class="row"
      v-bind:class="{ 'visible': screen === 'revealScreen', 'hidden': screen !== 'revealScreen' }"
    >
      <Reveal
        :players="players"
        :isPlayerReady="isPlayerReady"
        @readyUp="readyUp()"
        @notReady="notReady()"
      />
    </div>
    <div
      class="row"
      v-bind:class="{ 'visible': screen === 'gameScreen', 'hidden': screen !== 'gameScreen' }"
    >
      <Game :game="game" :players="players" playerId="aaa" />
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
      players: [{ id: "aaa", name: "Ben" }, { id: "bbb", name: "Sidd" }],
      name: "",
      screen: "gameScreen",
      team: "",
      role: "",
      game: {
        questLog: {
            logs: [
                { id: 1, requiresDoubleFail: true, organiser: "aaa", members: ["aaa", "aaa"], result: "succeed" },
                { id: 2, requiresDoubleFail: false, organiser: "aaa", members: ["aaa", "aaa", "aaa"], result: "succeed" },
                { id: 3, requiresDoubleFail: false, organiser: "aaa", members: ["aaa", "aaa", "aaa"], result: "succeed" },
                { id: 4, requiresDoubleFail: false, organiser: "aaa", members: ["aaa", "aaa", "aaa"], result: "fail" },
                { id: 5, requiresDoubleFail: false, organiser: "", members: ["", "", "", ""], result: "" },
            ]
        },
        activeQuest: {
            id: 1,
            disagreements: 0,
            organiser: "aaa",
            proposedMembers: ["aaa", "bbb"],
            proposalAccepted: true,
            requiresDoubleFail: false,
            questResults: [{ id: 0, revealed: false, result: "success" }],
            result: "pass/fail"
        },
        state: "questProposal"
      }
    };
  },
  computed: {
    isPlayerReady: function() {
      let player = this.players.find(o => o.id == this.socket.id);
      return player && player.ready;
    }
  },
  created() {
    this.socket.on("reveal-started", playerData => {
      this.player = playerData;
      this.screen = "revealScreen";
    });
    this.socket.on("game-started", () => {
      this.screen = "gameScreen";
    });
    this.socket.on("player-updated", playerData => {
      console.log(playerData);
      let playerToUpdate = this.players.find(o => o.id == playerData.id);
      for (let k in playerToUpdate) {
        playerToUpdate[k] = playerData[k];
      }
    });
    this.socket.on("room-updated", roomData => {
      console.log(roomData);
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
    joinSession: function(name) {
      this.name = name;
      this.screen = "lobbyScreen";
      this.socket.emit("player-join", { name: this.name, roomId: this.roomId });
    },
    readyUp: function() {
      this.socket.emit("player-ready", { screen: this.screen });
    },
    notReady: function() {
      this.socket.emit("player-not-ready");
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