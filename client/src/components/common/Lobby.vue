<template>
  <div class="col-12">
    <div class="row mb-3">
      <div class="col-12">
        <div class="card bg-primary text-light">
          <p class="card-header">Game settings</p>
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
                  v-bind:class="['btn', 'border-secondary', 'btn-block', (room && room.game.settings.percivalEnabled ? 'btn-info' : 'btn-secondary'), (room && room.game.settings.percivalEnabled ? 'border-info' : 'border')]"
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
                  v-bind:class="['btn', 'border-secondary', 'btn-block', (room && room.game.settings.morganaEnabled ? 'btn-danger' : 'btn-secondary'), (room && room.game.settings.morganaEnabled ? 'border-danger' : 'border')]"
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
                  v-bind:class="['btn', 'border-secondary', 'btn-block', (room && room.game.settings.oberonEnabled ? 'btn-danger' : 'btn-secondary'), (room && room.game.settings.oberonEnabled ? 'border-danger' : 'border')]"
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
    <div class="row mb-3">
      <div class="col-12">
        <div class="card bg-dark border border-primary text-center text-light">
          <div class="card-body">
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
      </div>
    </div>

    <div class="row mb-5">
      <div class="col-12">
        <div class="card bg-primary text-light">
          <div class="card-body">
            <div class="row text-center">
              <div v-for="player in players" class="col-3" :key="player.id">
                <p
                  v-if="player.ready"
                  class="bg-success text-white py-2 mb-3 border-success rounded"
                >{{player.name}}</p>
                <p
                  v-if="!player.ready"
                  class="py-2 mb-3 text-dark rounded bg-secondary"
                >{{player.name}}</p>
              </div>
              <div v-for="index in playersStillNeeded" class="col-3" :key="index">
                <p class="text-light py-2 border border-secondary rounded">Required</p>
              </div>
              <div
                v-for="index in (maxPlayers - (players.length + playersStillNeeded))"
                class="col-3"
                :key="index+100"
              >
                <p class="text-light border border-secondary rounded py-2">Optional</p>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <!-- <div class="row"> -->
            <!-- <div class="col-6"> -->
            <ReadyButton :isPlayerReady="isPlayerReady" v-on="$listeners" />
            <!-- </div> -->
            <!-- <div class="col-6">
                <button class="btn btn-secondary btn-block">How to play</button>
            </div>-->
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="row mb-4">
      <div class="col-12">
        <div class="card">
          <div class="card-header bg-light">How the game works</div>
          <div class="card-body">
            <p
              class="card-text"
            >The goal of Good is to complete three quests and help Merlin to keep their identity hidden.</p>
            <p class="card-text">The goal of Evil is to disrupt the flow of the game.</p>
            <p
              class="card-text"
            >There are five quests to complete. Each quest has a nominated player that acts as the quest's leader. The quest leader proposes a team to head out on the quest.</p>
            <p
              class="card-text"
            >All players then vote to 'Approve' or 'Reject' the team proposal. This is a majority vote.</p>
            <p
              class="card-text"
            >If the proposal is not accepted the quest restarts with a new quest leader.</p>
            <p
              class="card-text"
            >The quest will begin once a proposal is accepted. Players on the quest will then vote on how they would like the quest to turn out.</p>
            <p class="card-text">Good team members may only choose 'Success' as the outcome.</p>
            <p class="card-text">Evil members may choose 'Success' or 'Sabotage' as the outcome.</p>
            <p class="card-text">The quest is a 'Success' if all players vote 'Success'.</p>
            <p class="card-text">The quest is a 'Fail' if one or more players vote 'Sabotage'.</p>
            <p
              class="card-text"
            >The next quest starts with a new quest leader after the current quest leader shares the result of the quest.</p>
            <p
              class="card-text"
            >After three successful quests Evil team members are exposed and the Assassin will have an opportunity to identify Merlin.</p>
            <p
              class="card-text"
            >Good will take the win if the Assassin does not manage to identify Merlin.</p>
            <p class="card-text">Evil will take the win if the Assassin manages to identify Merlin.</p>
            <p class="card-text">Evil will take the win if they sabotage three quests.</p>
            <p
              class="card-text"
            >Evil will take the win if players reject five team proposals for the same quest.</p>
            <p
              class="card-text"
            >Don't worry if this is your first time playing. Instruction and explanation is provided as you play.</p>
          </div>
        </div>
      </div>
  </div>-->
  <!-- <div class="row mb-4">
      <div class="col-12">
        <div class="card">
          <div class="card-header bg-light">Who knows what?</div>
          <div class="card-body">
            <p
              class="card-text"
            >Some players have access to important information about the other players on their screens now.</p>
            <p class="card-text">All players know which team they are in.</p>
            <p class="card-text">Evil team members know which players are in Evil.</p>
            <p class="card-text">Merlin knows which players are in Evil.</p>
            <p class="card-text">Guards do not know anything about any other player.</p>
            <p v-if="settings.oberonEnabled" class="card-text">Oberon is only visible to Merlin.</p>
            <p v-if="settings.percivalEnabled" class="card-text">Percival knows who Merlin is.</p>
            <p
              v-if="settings.morganaEnabled"
              class="card-text"
            >Morgana confuses Percival by appearing as a second Merlin.</p>
          </div>
        </div>
      </div>
  </div>-->
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