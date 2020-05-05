<template>
  <div class="col-12">
    <div class="card">
      <div class="card-body">
        <div class="row mt-3 mb-3">
          <div class="col-12 text-center">
            <p
              class="card-text"
            >Your identity has been revealed to all players. You may now discuss openly with your team members who you believe Merlin is.</p>
            <p
              class="card-text"
            >If you manage to successfully identify Merlin you will steal the win.</p>
          </div>
        </div>
        <div class="row mb-5">
          <div v-for="(player, index) in selectedToDisplay" class="col-2 offset-5" :key="index">
            <button v-if="player.id == -1" class="btn btn-light btn-sm btn-block" disabled>Required</button>
            <button
              v-if="player.id != -1"
              @click="unselect(index)"
              class="btn btn-info btn-sm btn-block"
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
              v-on:click="select(index)"
            >{{player.name}}</button>

            <button v-if="player.id == -1" class="btn btn-light btn-sm btn-block" disabled>-</button>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-4 offset-4">
            <button
              class="btn btn-dark btn-block btn-sm"
              :disabled="selected.length != requiredPlayers"
            >Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MerlinIdentificationInput",
  props: {
    players: Array,
    requiredPlayers: Number
  },
  data: function() {
    return {
      selected: [],
      notSelected: []
    };
  },
  created() {
    this.notSelected = this.players.slice();
  },
  computed: {
    selectedToDisplay: function() {
      let selectedToDisplay = this.selected.slice();
      for (let i = 0; i < 1 - this.selected.length; i++) {
        selectedToDisplay.push({ id: -1, name: "Required" });
      }
      return selectedToDisplay;
    },
    unselectedToDisplay: function() {
      let unselectedToDisplay = this.notSelected.slice();
      for (let i = 0; i < this.selected.length; i++) {
        unselectedToDisplay.push({ id: -1, name: "" });
      }
      return unselectedToDisplay;
    }
  },
  methods: {
    select: function(i) {
      if (this.selected.length < this.requiredPlayers) {
        this.selected.push(this.notSelected.splice(i, 1)[0]);
      }
    },
    unselect: function(i) {
      this.notSelected.push(this.selected.splice(i, 1)[0]);
    },
    submit: function() {
      let ids = [];
      for (let i = 0; i < this.selected.length; i++) {
        ids.push(this.selected[i].id);
      }
      this.$emit("proposeTeam", ids);
    }
  }
};
</script>