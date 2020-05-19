<template>
  <div class="col-12">
    <div class="row mb-3">
      <div class="col-12">
        <div class="card bg-dark border-primary text-light">
          <div class="card-body" style="padding-bottom:0">
            <div class="row">
              <div class="col-lg-6 col-md-12 mb-3">
                <button type="button" class="btn btn-info btn-block" :disabled="!isRoomOwner">
                  Merlin
                  <br />Knows which team each player is in
                </button>
              </div>
              <div class="col-lg-6 col-md-12 mb-3">
                <button type="button" class="btn btn-danger btn-block" :disabled="!isRoomOwner">
                  Assassin
                  <br />Has an opportunity to steal the win
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 col-lg-4 mb-3">
                <button
                  v-on:click="percivalEnabled(!room.game.settings.percivalEnabled)"
                  type="button"
                  v-bind:class="['btn', 'btn-block', (room && room.game.settings.percivalEnabled ? 'btn-info' : 'btn-outline-info')]"
                  :disabled="!isRoomOwner"
                >
                  Percival
                  <br />Knows Merlin's identity
                </button>
              </div>
              <div class="col-md-12 col-lg-4 mb-3">
                <button
                  v-on:click="morganaEnabled(!room.game.settings.morganaEnabled)"
                  type="button"
                  v-bind:class="['btn', 'btn-block', (room && room.game.settings.morganaEnabled ? 'btn-danger' : 'btn-outline-danger')]"
                  :disabled="!isRoomOwner || (room.game.settings.oberonEnabled && players.length < 7)"
                >
                  Morgana
                  <br />Disguised as Merlin
                </button>
              </div>
              <div class="col-md-12 col-lg-4 mb-3">
                <button
                  v-on:click="oberonEnabled(!room.game.settings.oberonEnabled)"
                  type="button"
                  v-bind:class="['btn', 'btn-block', (room && room.game.settings.oberonEnabled ? 'btn-danger' : 'btn-outline-danger')]"
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
        <div class="card bg-dark border border-primary">
          <div class="card-body pb-1">
            <PlayerReadyBar :nameColSpan="2" :players="players" :showEmptySpaces="true" />
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <div class="card bg-dark border border-primary text-center text-light">
          <div class="card-body py-5">
            <p
              class="card-text"
            >Instruction and explanation will be provided as you play through The Resistance: Avalon.</p>
            <p
              class="card-text"
            >The next screen will reveal which team you are in and which role you will play.</p>
            <p class="card-text">You may wish to keep your role and team to yourself.</p>
            <p
              class="card-text"
              v-if="playersStillNeeded > 0"
            >We are still waiting for {{playersStillNeeded}} more {{playersStillNeeded == 1 ? 'player' : 'players'}} to join the lobby.</p>
            <p
              class="card-text"
              v-if="playersStillNeeded == 0"
            >The game will begin when all players are ready.</p>
          </div>
          <div class="card-footer bg-primary d-none d-lg-block">
            <div class="row">
              <div class="col-6">
                <ReadyButton :isPlayerReady="isPlayerReady" v-on="$listeners" />
              </div>
              <div class="col-6">
                <button
                  id="copyLinkButton"
                  :class="['btn btn-block', (showLinkCopiedText ? 'btn-primary' : 'btn-secondary')]"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Tooltip on top"
                  @click="copyLink"
                >{{showLinkCopiedText ? 'Copied!' : 'Copy link'}}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed-bottom">
      <div class="card bg-primary rounded-0 d-none d-block d-lg-none pb-5">
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-md-6 pb-3">
              <ReadyButton :isPlayerReady="isPlayerReady" v-on="$listeners" />
            </div>
            <div class="col-12 col-md-6">
              <button
                id="copyLinkButton"
                :class="['btn btn-block', (showLinkCopiedText ? 'btn-primary' : 'btn-secondary')]"
                data-toggle="tooltip"
                data-placement="top"
                title="Tooltip on top"
                @click="copyLink"
              >{{showLinkCopiedText ? 'Copied!' : 'Copy link'}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReadyButton from "@/components/common/ReadyButton.vue";
import PlayerReadyBar from "@/components/common/PlayerReadyBar.vue";

export default {
  name: "Lobby",
  components: { ReadyButton, PlayerReadyBar },
  props: {
    socket: Object,
    room: Object,
    players: Array,
    isPlayerReady: Boolean
  },
  data: function() {
    return {
      name: "",
      showRules: false,
      minPlayers: 5,
      maxPlayers: 10,
      currentMemberCount: 0,
      readyClasses: "card bg-success text-white",
      showLinkCopiedText: false
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
    copyLink: function() {
      navigator.clipboard.writeText(window.location.href);
      this.showLinkCopiedText = true;
      setTimeout(() => (this.showLinkCopiedText = false), 400);
    },
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
.btn:disabled {
  opacity: 1;
}
</style>