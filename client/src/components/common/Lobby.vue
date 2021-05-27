<template>
  <div class="col-12 col-md-8 offset-md-2">
    <div class="row mb-3">
      <div class="col-12">
        <div v-if="isRoomOwner" class="card bg-dark border-primary text-light mt-3">
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
                  v-bind:class="['btn border-secondary btn-block text-white', (room && room.game.settings.percivalEnabled ? 'btn-info border-info' : '')]"
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
                  v-bind:class="['btn border-secondary btn-block text-white', (room && room.game.settings.morganaEnabled ? 'btn-danger border-danger' : '')]"
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
                  v-bind:class="['btn border-secondary btn-block text-white', (room && room.game.settings.oberonEnabled ? 'btn-danger border-danger' : '')]"
                  :disabled="!isRoomOwner || (room.game.settings.morganaEnabled && players.length < 7)"
                >
                  Oberon
                  <br />Invisible to all but Merlin
                </button>
              </div>
            </div>
            <hr class="border border-primary mt-0"/>
            <div class="row">
              <div class="col-md-12 mb-3">
                <button
                  v-on:click="questLogEnabled(!room.game.settings.questLogEnabled)"
                  type="button"
                  v-bind:class="['btn border-secondary btn-block text-white', (room && room.game.settings.questLogEnabled ? 'btn-secondary border-secondary text-dark' : '')]"
                  :disabled="!isRoomOwner"
                >
                  Quest Log
                  <br />Show quest history
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
    <div class="row mb-3 mobile-bottom-page-padding">
      <div class="col-12">
        <div class="card bg-dark border border-primary text-center text-light">
          <div class="card-body py-4">
            <p
              class="card-text"
            >Instructions and explanations are provided to you during the game.</p>
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
          <div class="card-footer bg-primary d-none d-md-block">
            <div class="row">
              <div class="col-6">
                <ReadyButton :isPlayerReady="isPlayerReady" v-on="$listeners" />
              </div>
              <div class="col-6">
                <button
                  class="btn-copy-link btn btn-block btn-secondary"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Copied!"
                  @click="share"
                >Share</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed-bottom">
      <div class="card bg-primary rounded-0 d-none d-block d-md-none pb-5">
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-md-6 pb-3">
              <ReadyButton :isPlayerReady="isPlayerReady" v-on="$listeners" />
            </div>
            <div class="col-12 col-md-3">
              <button
                class="btn-copy-link-sm btn btn-block btn-secondary"
                data-toggle="tooltip"
                data-placement="top"
                title="Copied!"
                @click="shareSmall"
              >Share</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row d-none d-md-block">
      <Footer />
    </div>
  </div>
</template>

<script>
import ReadyButton from "@/components/common/ReadyButton.vue";
import PlayerReadyBar from "@/components/common/PlayerReadyBar.vue";
import Footer from "@/components/common/Footer.vue";
import $ from "jquery";

export default {
  name: "Lobby",
  components: { ReadyButton, PlayerReadyBar, Footer },
  props: {
    minPlayers: Number,
    socket: Object,
    room: Object,
    players: Array,
    isPlayerReady: Boolean
  },
  created() {
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
      $(".btn-copy-link").tooltip("disable");
      $(".btn-copy-link-sm").tooltip("disable");
    });
  },
  computed: {
    isRoomOwner() {
      return this.room && this.socket.id == this.room.ownerId;
    },
    playersStillNeeded() {
      return this.players.length >= this.minPlayers
        ? 0
        : this.minPlayers - this.players.length;
    }
  },
  methods: {
    share() {
      navigator.clipboard.writeText(window.location.href);
      $(".btn-copy-link").tooltip("enable");
      $(".btn-copy-link").tooltip("show");
      setTimeout(() => {
        $(".btn-copy-link").tooltip("hide");
        $(".btn-copy-link").tooltip("disable");
        $(".btn-copy-link").trigger("blur");
      }, 400);
    },
    shareSmall() {
      navigator.clipboard.writeText(window.location.href);
      $(".btn-copy-link-sm").tooltip("enable");
      $(".btn-copy-link-sm").tooltip("show");
      setTimeout(() => {
        $(".btn-copy-link-sm").tooltip("hide");
        $(".btn-copy-link-sm").tooltip("disable");
        $(".btn-copy-link-sm").trigger("blur");
      }, 400);
    },
    percivalEnabled(enabled) {
      this.$emit("percival-enabled", enabled);
    },
    morganaEnabled(enabled) {
      this.$emit("morgana-enabled", enabled);
    },
    oberonEnabled(enabled) {
      this.$emit("oberon-enabled", enabled);
    },
    questLogEnabled(enabled) {
      this.$emit("quest-log-enabled", enabled);
    },
  }
};
</script>
<style scoped>
.btn-info:disabled,
.btn-danger:disabled {
  opacity: 1;
}
</style>