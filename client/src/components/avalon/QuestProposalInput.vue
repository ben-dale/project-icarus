<template>
  <div class="col-12">
    <div class="card">
      <h5 class="card-header bg-light">Quest {{questId}} - Team proposal</h5>
      <div class="card-body">
        <div class="row mt-3 mb-5">
          <div class="col-12 text-center">
            <h5>You are tasked with proposing a team for Quest {{questId}}.</h5>
            <h5>Your proposal will be voted on by the other players.</h5>
          </div>
        </div>
        <div class="row mb-5">
          <div
            v-for="(player, index) in selectedToDisplay"
            :class="['col-2', (index == 0 ? 'offset-' + resultOffset() : '')]"
            :key="index"
          >
            <div
              v-if="player.id == -1"
              class="text-center text-secondary bg-transparent pt-2 pb-1 border rounded"
            >
              <span>{{player.name}}</span>
            </div>
            <button
              v-if="player.id != -1"
              @click="unselect(index)"
              class="btn btn-info btn-block"
            >{{player.name}}</button>
          </div>
        </div>
        <div class="row mb-5">
          <div
            v-for="(player, index) in unselectedToDisplay"
            :key="index"
            :class="['col-2 mb-2', index % 5 === 0 ? 'offset-1' : '']"
          >
          <div
              v-if="player.id == -1"
              class="text-center text-secondary bg-transparent pt-2 pb-1 border rounded"
            >
              <span><wbr /></span>
            </div>
            <button v-if="player.id != -1" class="btn btn-info btn-block" v-on:click="select(index)">{{player.name}}</button>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-4 offset-4">
            <button class="btn btn-dark btn-block" :disabled="selected.length != requiredPlayers">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestProposalInput",
  props: {
    players: Array,
    requiredPlayers: Number,
    questId: Number,
    isPlayerReady: Boolean
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
      for (let i = 0; i < this.requiredPlayers - this.selected.length; i++) {
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