<template>
  <div class="col-12">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <p class="card-header text-center">Game settings</p>
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-6">
                <button type="button" class="btn btn-info btn-block" disabled>
                  Merlin
                  <br />Knows which team each player is a member of
                </button>
              </div>
              <div class="col-6">
                <button type="button" class="btn btn-danger btn-block" disabled>
                  Assassin
                  <br />Has an opportunity to steal the win after three successful quests
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <button
                  v-on:click="percivalEnabled(!room.game.settings.percivalEnabled)"
                  type="button"
                  v-bind:class="['btn', 'btn-block', (room && room.game.settings.percivalEnabled ? 'btn-info' : 'btn-light'), (room && room.game.settings.percivalEnabled ? 'border-info' : 'border')]"
                  :disabled="!isRoomOwner"
                >
                  Percival
                  <br />Knows Merlin's identity
                </button>
              </div>
              <div class="col-4">
                <button
                  v-on:click="morganaEnabled(!room.game.settings.morganaEnabled)"
                  type="button"
                  v-bind:class="['btn', 'btn-block', (room && room.game.settings.morganaEnabled ? 'btn-danger' : 'btn-light'), (room && room.game.settings.morganaEnabled ? 'border-danger' : 'border')]"
                  :disabled="!isRoomOwner || (room.game.settings.oberonEnabled && players.length < 7)"
                >
                  Morgana
                  <br />Appears as a second Merlin to Percival
                </button>
              </div>
              <div class="col-4">
                <button
                  v-on:click="oberonEnabled(!room.game.settings.oberonEnabled)"
                  type="button"
                  v-bind:class="['btn', 'btn-block', (room && room.game.settings.oberonEnabled ? 'btn-danger' : 'btn-light'), (room && room.game.settings.oberonEnabled ? 'border-danger' : 'border')]"
                  :disabled="!isRoomOwner || (room.game.settings.morganaEnabled && players.length < 7)"
                >
                  Oberon
                  <br />Invisible to all but Merlin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row pt-4 pb-3">
      <div class="col-12 text-center">
        <p>Further instruction and explanation will be provided as you play through The Resistance: Avalon.</p>
        <p>The next screen will reveal which team you are in and which role you will play.</p>
        <p
          v-if="playersStillNeeded > 0"
        >We are still waiting for {{playersStillNeeded}} more {{playersStillNeeded == 1 ? 'player' : 'players'}} to join the lobby.</p>
        <p v-if="playersStillNeeded == 0">
          Waiting for all players to click
          <span class="badge badge-success">Ready</span>
        </p>
      </div>
    </div>

    <div class="row mb-5">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row text-center">
              <div v-for="player in players" class="col-3" :key="player.id">
                <p
                  v-if="player.ready"
                  class="bg-success text-white py-2 mb-3 border border-success rounded"
                >{{player.name}}</p>
                <p
                  v-if="!player.ready"
                  class="text-dark py-2 mb-3 border bg-light rounded"
                >{{player.name}}</p>
              </div>
              <div v-for="index in playersStillNeeded" class="col-3" :key="index">
                <p class="text-secondary py-2 border rounded">Required</p>
              </div>
              <div
                v-for="index in (maxPlayers - (players.length + playersStillNeeded))"
                class="col-3"
                :key="index+100"
              >
                <p class="text-secondary border rounded py-2">Optional</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-6 offset-3">
        <ReadyButton :isPlayerReady="isPlayerReady" v-on="$listeners" />
      </div>
    </div>
  </div>
</template>

<script>
import ReadyButton from "@/components/common/ReadyButton.vue";
export default {
  name: "Lobby",
  components: { ReadyButton },
  props: {
    socket: Object,
    room: Object,
    players: Array,
    isPlayerReady: Boolean
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
    isRoomOwner: function() {
      return this.room && this.socket.id == this.room.ownerId;
    },
    playersStillNeeded: function() {
      return this.players.length >= this.minPlayers
        ? 0
        : this.minPlayers - this.players.length;
    }
  },
  methods: {
    percivalEnabled: function(enabled) {
      this.$emit("percival-enabled", enabled);
    },
    morganaEnabled: function(enabled) {
      this.$emit("morgana-enabled", enabled);
    },
    oberonEnabled: function(enabled) {
      this.$emit("oberon-enabled", enabled);
    }
  }
};
</script>
<style scoped>
</style>