<template>
  <div class="col-12">
    <div class="card">
      <div class="card-header bg-light">Quest {{questId}} - Team proposal</div>
      <div class="card-body">
        <div class="row mt-3 mb-3">
          <div class="col-12 text-center">
            <p>You are tasked with proposing a team for Quest {{questId}}. Your proposal will be voted on by the other players.</p>
          </div>
        </div>
        <div class="row mb-5">
          <div
            v-for="(player, index) in selectedToDisplay"
            :class="['col-2', (index == 0 ? 'offset-' + resultOffset() : '')]"
            :key="index"
          >
            <button v-if="player.id == -1" class="btn btn-light btn-sm btn-block border" disabled>Required</button>
            <button
              v-if="player.id != -1"
              @click="unselect(player.id)"
              class="btn btn-info btn-sm btn-block"
              :disabled="isPlayerReady"
            >{{player.name}}</button>
          </div>
        </div>
        <div class="row mb-5">
          <div
            v-for="(player, index) in unselectedToDisplay"
            :key="index"
            :class="['col-2 mb-2', index % 5 === 0 ? 'offset-1' : '']"
          >
            <button
              v-if="player.id != -1"
              class="btn btn-info btn-sm btn-block"
              v-on:click="select(player.id)"
              :disabled="isPlayerReady"
            >{{player.name}}</button>

            <button v-if="player.id == -1" class="btn btn-light btn-sm btn-block border" disabled><wbr/></button>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-4 offset-4">
            <ReadyButton
              :isPlayerReady="isPlayerReady"
              :disabled="requiredPlayers != proposedPlayerIds.length"
              v-on="$listeners"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReadyButton from "@/components/common/ReadyButton.vue";

export default {
  name: "QuestProposalInput",
  components: { ReadyButton },
  props: {
    players: Array,
    requiredPlayers: Number,
    questId: Number,
    isPlayerReady: Boolean,
    proposedPlayerIds: Array
  },
  created() {
    this.notSelected = this.players.slice();
  },
  computed: {
    selectedToDisplay: function() {
      let selectedToDisplay = this.players.filter(p =>
        this.proposedPlayerIds.includes(p.id)
      );
      const blanksToAdd = this.requiredPlayers - selectedToDisplay.length;
      for (let i = 0; i < blanksToAdd; i++) {
        selectedToDisplay.push({ id: -1, name: "Required" });
      }
      return selectedToDisplay;
    },
    unselectedToDisplay: function() {
      let unselectedToDisplay = this.players.filter(
        p => !this.proposedPlayerIds.includes(p.id)
      );
      console.log(unselectedToDisplay);
      const blanksToAdd = unselectedToDisplay.length;
      for (let i = blanksToAdd; i < this.players.length; i++) {
        unselectedToDisplay.push({ id: -1, name: "" });
      }
      return unselectedToDisplay;
    }
  },
  methods: {
    resultOffset: function() {
      switch (this.requiredPlayers) {
        case 2:
          return 4;
        case 3:
          return 3;
        case 4:
          return 2;
        case 5:
          return 1;
      }
    },
    select: function(playerId) {
      this.$emit("propose-player-for-quest", playerId);
    },
    unselect: function(playerId) {
      this.$emit("unpropose-player-for-quest", playerId);
    }
  }
};
</script>