<template>
  <div class="col-md-12">
    <div class="card">
      <h5 class="card-header">Quest {{questId}} - Team proposal</h5>
      <div class="card-body text-center">
        <div class="row py-5">
          <div
            v-for="(member, index) in selected"
            :key="index"
            :class="['col-md-2 mb-2', index % 5 === 0 ? 'offset-md-1' : '']"
          >
            <button
              class="btn btn-dark btn-lg btn-block"
              v-on:click="unselect(index)"
            >{{member.name}}</button>
          </div>
        </div>
        <div class="row py-5">
          <div
            v-for="(member, index) in notSelected"
            :key="index"
            :class="['col-md-2 mb-2', index % 5 === 0 ? 'offset-md-1' : '']"
          >
            <button class="btn btn-dark btn-lg btn-block" v-on:click="select(index)">{{member.name}}</button>
          </div>
        </div>
        <div class="row py-5">
          <div class="col-4 offset-4">
            <button v-on:click="submit" class="btn btn-dark btn-lg btn-block">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    players: Array,
    questId: Number
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
  methods: {
    select: function(i) {
      this.selected.push(this.notSelected.splice(i, 1)[0]);
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