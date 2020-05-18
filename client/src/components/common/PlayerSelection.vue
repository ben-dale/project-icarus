<template>
  <div class="col-12">
    <div class="card bg-primary text-light">
      <div class="card-body py-5 bg-dark">
        <div class="row mb-4">
          <div class="col-12 text-center">
            <p v-for="(line, index) in body" :key="index">{{line}}</p>
          </div>
        </div>
        <div class="row">
          <div
            v-for="(player, index) in players"
            :key="index"
            :class="['col-6 col-md-3 col-lg-2 mb-3', (index % 5 === 0 ? 'offset-lg-1' : ''), (index % 3 === 0 && players.length == 3 ? 'offset-lg-3' : ''), (index % 4 === 0 && players.length == 4 ? 'offset-lg-2' : '')]"
          >
            <button
              v-if="!proposedPlayerIds.includes(player.id)"
              class="btn btn-secondary btn-block"
              v-on:click="onPlayerSelected(player.id)"
              :disabled="isPlayerReady || requiredPlayers == proposedPlayerIds.length"
            >{{player.name}}</button>
            <button
              v-if="proposedPlayerIds.includes(player.id)"
              class="btn btn-info btn-block"
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
        <div class="card-body">
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
    header: String,
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