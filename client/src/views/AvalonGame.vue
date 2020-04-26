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
      <Lobby
        :socket="socket"
        :roomId="roomId"
        :players="players"
        :morganaSelected="morganaSelected"
        :percivalSelected="percivalSelected"
        :oberonSelected="oberonSelected"
        :roomOwner="roomOwner"
        @togglePercival="selectPercival()"
        @toggleMorgana="selectMorgana()"
        @toggleOberon="selectOberon()"
      />
    </div>
    <div
      class="row"
      v-bind:class="{ 'visible': screen === 'revealScreen', 'hidden': screen !== 'revealScreen' }"
    >
      <Reveal @playerReady="playerReady()" />
    </div>
    <div
      class="row"
      v-bind:class="{ 'visible': screen === 'gameScreen', 'hidden': screen !== 'gameScreen' }"
    >
      <div class="col-md-12">
        <div class="row mb-3">
          <div class="col-md-12">
            <div class="card">
              <h5 class="card-header">Quest log</h5>
              <div class="card-body">
                <table class="table text-center table-bordered table-sm">
                  <thead>
                    <tr>
                      <th scope="col">Quest</th>
                      <th scope="col">Organiser</th>

                      <th scope="col" colspan="4" class="text-center">Members</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr class="bg-light">
                      <th scope="row">2</th>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr class="bg-light">
                      <th scope="row">3</th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr class="bg-light">
                      <th scope="row">4</th>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr class="bg-light">
                      <th scope="row">5</th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">Sidd is deciding on who should go on the quest.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import NameInput from "@/components/avalon/NameInput.vue";
import Lobby from "@/components/avalon/Lobby.vue";
import Reveal from "@/components/avalon/Reveal.vue";

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
  created() {
    this.socket.on("game-started", playerData => {
      this.player = playerData;
      this.screen = "revealScreen";
    });
    this.socket.on("player-updated", playerData => {
      let playerToUpdate = this.players.find(o => o.id == playerData.id);
      for (let k in playerToUpdate) {
        playerToUpdate[k] = playerData[k];
      }
    });
    this.socket.on("room-updated", roomData => {
      this.players = roomData.players;
      this.roomOwner = roomData.owner;
      this.percivalSelected = roomData.settings.percivalSelected;
      this.morganaSelected = roomData.settings.morganaSelected;
      this.oberonSelected = roomData.settings.oberonSelected;
    });
  },
  data: function() {
    return {
      roomOwner: "",
      morganaSelected: false,
      percivalSelected: false,
      oberonSelected: false,
      players: [],
      name: "",
      screen: "nameInputScreen",
      player: {}
    };
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
    joinSession: function(name) {
      this.name = name;
      this.screen = "lobbyScreen";
      this.socket.emit("player-join", { name: this.name, roomId: this.roomId });
    },
    playerReady: function() {
      this.socket.emit("player-ready");
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