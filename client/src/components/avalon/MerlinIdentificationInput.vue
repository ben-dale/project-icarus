<template>
  <div class="col-12">
    <div class="card bg-primary text-light">
      <div class="card-header">Quest {{questId}} - Assassination attempt</div>
      <div class="card-body">
        <div class="row mb-4">
          <div class="col-12 text-center">
            <p
              class="card-text"
            >Your identity has been revealed to all players. You may now discuss openly with your team members who you believe Merlin is.</p>
            <p
              class="card-text"
            >If you manage to successfully identify Merlin you will steal the win.</p>
          </div>
        </div>
        <div class="row mb-4">
          <div
            v-for="(player, index) in players"
            :key="index"
            :class="['col-2 mb-2', index == 0 && players.length == 3 ? 'offset-3' : '', index == 0 && players.length == 4 ? 'offset-2' : '']"
          >
            <button
              v-if="!proposedPlayerIds.includes(player.id)"
              class="btn btn-secondary btn-sm btn-block"
              v-on:click="select(player.id)"
              :disabled="isPlayerReady || requiredPlayers == proposedPlayerIds.length"
            >{{player.name}}</button>
            <button
              v-if="proposedPlayerIds.includes(player.id)"
              class="btn btn-info btn-sm btn-block"
              v-on:click="unselect(player.id)"
              :disabled="isPlayerReady"
            >{{player.name}}</button>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <ReadyButton
          :isPlayerReady="isPlayerReady"
          :disabled="requiredPlayers != proposedPlayerIds.length"
          v-on="$listeners"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ReadyButton from "@/components/common/ReadyButton.vue";

export default {
  name: "MerlinIdentificationInput",
  components: { ReadyButton },
  props: {
    players: Array,
    requiredPlayers: Number,
    questId: Number,
    isPlayerReady: Boolean,
    proposedPlayerIds: Array
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
      this.$emit("select-merlin-for-id", playerId);
    },
    unselect: function(playerId) {
      this.$emit("unselect-merlin-for-id", playerId);
    }
  }
};
</script>