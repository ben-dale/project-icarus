<template>
  <div class="col-12">
    <div class="card bg-primary text-light">
      <div class="card-body py-4 bg-dark">
        <div class="row">
          <div class="col-12 text-center">
            <p v-for="(line, index) in body" :key="index">{{line}}</p>
          </div>
        </div>
        <div class="row">
          <div
            v-for="(player, index) in players"
            :key="index"
            :class="['col-6 mt-3']"
          >
            <button
              v-if="!proposedPlayerIds.includes(player.id)"
              :class="['sim-select-player-button-' + index, 'btn border-secondary text-white btn-block']"
              v-on:click="onPlayerSelected(player.id)"
              :disabled="isPlayerReady || requiredPlayers == proposedPlayerIds.length"
            >{{player.name}}</button>
            <button
              v-if="proposedPlayerIds.includes(player.id)"
              :class="['sim-select-player-button-' + index, 'btn btn-info btn-block']"
              v-on:click="onPlayerDeselected(player.id)"
              :disabled="isPlayerReady"
            >{{player.name}}</button>
          </div>
        </div>
      </div>
      <div class="card-footer d-none d-lg-block">
        <ReadyButton
          :isPlayerReady="isPlayerReady"
          :disabled="requiredPlayers != proposedPlayerIds.length"
          v-on="$listeners"
        />
      </div>
    </div>
    <div class="fixed-bottom">
      <div class="card bg-primary rounded-0 d-none d-block d-lg-none">
        <div class="card-body pb-5">
          <ReadyButton
            :isPlayerReady="isPlayerReady"
            :disabled="requiredPlayers != proposedPlayerIds.length"
            v-on="$listeners"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReadyButton from "@/components/common/ReadyButton.vue";

export default {
  name: "PlayerSelection",
  components: { ReadyButton },
  props: {
    body: Array,
    players: Array,
    requiredPlayers: Number,
    isPlayerReady: Boolean,
    proposedPlayerIds: Array,
    onPlayerSelected: Function,
    onPlayerDeselected: Function
  }
};
</script>