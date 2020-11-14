<template>
  <div class="container">
    <div
      v-if="room && room.game && !room.game.closed && !room.playerIds.includes(socket.id)"
      class="row"
    >
      <div class="col-12">
        <div class="row mb-3">
          <div class="col-12 col-lg-8 offset-lg-2 text-center">
            <h5 class="text-light">Enter your name</h5>
          </div>
        </div>
        <div class="row">
          <TextInput buttonText="Join" @submit="joinSession" :placeholder="'Name'" :length="8" />
        </div>
      </div>
    </div>
    <div
      v-if="room && room.game && room.game.closed && !room.playerIds.includes(socket.id) && room.disconnectedPlayerIds.length > 0"
      class="row"
    >
      <div class="col-12">
        <div class="row mb-3">
          <div class="col-12 col-lg-8 offset-lg-2 text-center">
            <h5 class="text-light">Enter your code</h5>
          </div>
        </div>
        <div class="row">
          <TextInput buttonText="Rejoin" @submit="rejoinSession" :placeholder="'Code'" />
        </div>
      </div>
    </div>
    <div
      v-if="room && room.game && room.game.closed && !room.playerIds.includes(socket.id) && room.disconnectedPlayerIds.length == 0"
      class="row"
    >
      <RoomClosed />
    </div>

    <div
      v-if="room && room.game.closed && room.disconnectedPlayerIds.length > 0 && room.playerIds.includes(getPlayerId())"
    >
      <div class="row" v-for="player in getDisconnectedPlayers()" :key="player.id">
        <div class="col-12">
          <div class="card bg-dark border border-primary mb-5">
            <div class="card-body text-light text-center py-5">
              <p class="card-text">{{player.name}} has left the game.</p>
              <p class="card-text">The game will resume when {{player.name}} rejoins the game.</p>
              <p class="card-text">
                They may rejoin the game using the code
                <span
                  class="bg-primary px-2 py-1"
                >{{player.id}}</span>
              </p>
            </div>
            <div class="card-footer bg-primary">
              <button
                :id="'copyLinkAndCodeButton'+player.id"
                @click="copyLinkAndCode(player.id, player.name)"
                class="btn btn-secondary btn-block"
              >Copy link + code</button>
            </div>
          </div>
        </div>
      </div>
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
        :minPlayers="5"
        @percival-enabled="percivalEnabled"
        @oberon-enabled="oberonEnabled"
        @morgana-enabled="morganaEnabled"
        @player-ready="readyUp"
        @player-not-ready="notReady"
      />
    </div>

    <div
      v-if="room && room.game  && room.playerIds.includes(getPlayerId()) && room.game.screen == 'ROLE_REVEAL' && room.disconnectedPlayerIds.length == 0"
      class="row"
    >
      <RoleReveal
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
      v-if="room && room.game && room.playerIds.includes(getPlayerId()) && room.game.screen == 'GAME' && room.disconnectedPlayerIds.length == 0"
      class="row"
    >
      <Game
        :game="room.game"
        :players="players"
        :team="team"
        :role="role"
        :vote="vote"
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
    <div class="row d-none d-lg-block">
      <Footer />
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import RoomClosed from "@/components/common/RoomClosed.vue";
import TextInput from "@/components/common/TextInput.vue";
import Lobby from "@/components/common/Lobby.vue";
import RoleReveal from "@/components/avalon/RoleReveal.vue";
import Game from "@/components/avalon/Game.vue";
import Footer from "@/components/common/Footer.vue";

export default {
  name: "AvalonGame",
  components: { TextInput, Lobby, RoleReveal, Game, RoomClosed, Footer },
  props: {
    socket: {
      type: Object,
      default() {
        let socket = null;
        if (process.env.NODE_ENV == "development") {
          socket = io.connect("http://localhost:3000", {
            upgrade: false,
            transports: ["websocket"]
          });
        } else {
          socket = io.connect({ upgrade: false, transports: ["websocket"] });
        }
        socket.emit("connect-avalon");
        return socket;
      }
    },
    roomId: String
  },
  data() {
    return {
      room: null,
      players: [],
      team: null,
      role: null,
      vote: null,
      metadata: []
    };
  },
  computed: {
    isPlayerReady() {
      let player = this.players.find(o => o.id == this.getPlayerId());
      return player && player.ready;
    }
  },
  created() {
    this.socket.on("players-updated", players => {
      // console.log("players-updated");
      // console.log(players);
      this.players = players;
    });
    this.socket.on("player-updated", player => {
      // console.log("player-updated");
      // console.log(player);
      // Typically it should only be the 'ready' field that is updated here
      let playerToUpdate = this.players.find(o => o.id == player.id);
      playerToUpdate.ready = player.ready;
    });
    this.socket.on("player-assigned", player => {
      // console.log("player-assigned");
      // console.log(player);
      this.team = player.team;
      this.role = player.role;
      this.vote = player.vote;
      this.metadata = player.metadata.slice();
    });
    this.socket.on("room-updated", room => {
      // console.log("room-updated");
      // console.log(room);
      this.room = room;
    });
    this.socket.emit("get-room", { roomId: this.roomId });
  },
  beforeRouteLeave(to, from, next) {
    // https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards
    this.socket.close();
    next();
  },
  methods: {
    getPageUrl() {
      return window.location.href;
    },
    getDisconnectedPlayers() {
      return this.room.disconnectedPlayerIds
        .filter(pid => this.room.playerIds.includes(pid))
        .map(pid => this.getPlayerById(pid))
        .filter(p => p);
    },
    getPlayerById(playerId) {
      return this.players.find(p => p.id == playerId);
    },
    percivalEnabled(enabled) {
      this.socket.emit("room-updated", {
        game: { settings: { percivalEnabled: enabled } }
      });
    },
    getPlayerId() {
      return this.socket.id;
    },
    morganaEnabled(enabled) {
      this.socket.emit("room-updated", {
        game: { settings: { morganaEnabled: enabled } }
      });
    },
    oberonEnabled(enabled) {
      this.socket.emit("room-updated", {
        game: { settings: { oberonEnabled: enabled } }
      });
    },
    proposePlayerForQuest(playerId) {
      this.socket.emit("room-updated", {
        game: { currentQuest: { playerIdToPropose: playerId } }
      });
    },
    revealQuestVote(index) {
      this.socket.emit("room-updated", {
        game: { currentQuest: { voteToReveal: index } }
      });
    },
    unproposePlayerForQuest(playerId) {
      this.socket.emit("room-updated", {
        game: { currentQuest: { playerIdToUnpropose: playerId } }
      });
    },
    selectMerlinForId(playerId) {
      this.socket.emit("room-updated", {
        game: { currentQuest: { merlinIdToPropose: playerId } }
      });
    },
    unselectMerlinForId(playerId) {
      this.socket.emit("room-updated", {
        game: { currentQuest: { merlinIdToUnpropose: playerId } }
      });
    },
    joinSession(name) {
      this.socket.emit("player-joined", {
        name: name,
        roomId: this.roomId
      });
    },
    rejoinSession(code) {
      this.socket.emit("player-rejoined", {
        id: code,
        roomId: this.roomId
      });
    },
    playerApproveVote(approve) {
      this.socket.emit("player-updated", {
        approveProposal: approve
      });
    },
    playerSucceedQuest(succeed) {
      this.socket.emit("player-updated", {
        succeedQuest: succeed
      });
    },
    readyUp() {
      this.socket.emit("player-updated", { ready: true });
    },
    readyUpWithVote(vote) {
      this.socket.emit("player-updated", { ready: true, vote: vote });
    },
    notReady() {
      this.socket.emit("player-updated", { ready: false });
    },
    copyLinkAndCode(playerId, playerName) {
      navigator.clipboard.writeText(
        "Hey, " +
          playerName +
          "! It looks like you left the game. Follow this link: " +
          window.location.href +
          " and enter the code: " +
          playerId
      );
      const buttonId = "copyLinkAndCodeButton" + playerId;
      document.getElementById(buttonId).classList.remove("btn-secondary");
      document.getElementById(buttonId).classList.add("btn-primary");
      document.getElementById(buttonId).innerHTML = "Copied!";
      setTimeout(() => {
        document.getElementById(buttonId).classList.add("btn-secondary");
        document.getElementById(buttonId).classList.remove("btn-primary");
        document.getElementById(buttonId).innerHTML = "Copy link + code";
      }, 400);
    }
  }
};
</script>
