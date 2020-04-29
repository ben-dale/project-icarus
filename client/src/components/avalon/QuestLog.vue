<template>
  <div class="col-md-12">
    <div class="card">
      <h5 class="card-header">Quest log</h5>
      <div class="card-body">
        <div class="row">
          <div class="col-md-12">
            <table class="table text-center table-bordered table-sm">
              <thead>
                <tr>
                  <th scope="col">Quest</th>
                  <th scope="col">Required</th>
                  <th scope="col">Organiser</th>
                  <th scope="col" colspan="5" class="text-center">Members</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="log in questLog.logs" :key="log.id">
                  <th
                    scope="row"
                    :class="{ 'bg-info text-white': log.result === 'succeed', 'bg-danger text-white': log.result === 'fail' }"
                  >{{log.id}}{{ log.requiresDoubleFail ? '*' : '' }}</th>
                  <td>{{log.required}}</td>
                  <td>{{getPlayerNameById(log.organiser)}}</td>
                  <td
                    v-for="(member, index) in log.members"
                    :key="index * log.id"
                  >{{getPlayerNameById(member)}}</td>
                </tr>
              </tbody>
            </table>
            <p
              v-if="questContainsDoubleFails"
              class="text-left"
            ><b>*</b> Quest requires two sabotage votes to fail</p>
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
    questLog: {
      type: Object,
      default: function() {
        return {
          logs: [
            {
              id: 1,
              requiresDoubleFail: false,
              organiser: "Ben",
              members: ["Adam", "Ben"],
              result: "succeed"
            },
            {
              id: 2,
              requiresDoubleFail: false,
              organiser: "Ben",
              members: ["Adam", "Ben", "Sidd"],
              result: "fail"
            },
            {
              id: 3,
              requiresDoubleFail: false,
              organiser: "Ben",
              members: ["Adam", "Ben", "Sam", "Jim", "Rodney"],
              result: "succeed"
            },
            {
              id: 4,
              requiresDoubleFail: true,
              organiser: "Ben",
              members: ["Adam", "Ben", "Sidd"],
              result: "succeed"
            },
            { id: 5, organiser: "", members: ["", "", "", "", ""], result: "" }
          ]
        };
      }
    }
  },
  computed: {
    questContainsDoubleFails: function() {
      return (
        this.questLog.logs.filter(log => log.requiresDoubleFail).length > 0
      );
    }
  },
  methods: {
    getPlayerNameById: function(id) {
      let player = this.players.find(o => o.id == id);
      return player && player.name ? player.name : "";
    }
  }
};
</script>