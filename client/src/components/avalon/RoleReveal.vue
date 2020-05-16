<template>
  <div class="col-12">
    <div class="row mb-5">
      <div class="col-6 offset-3 text-center text-light">
        <h2 class="pt-2">
          <span class="badge badge badge-info mx-2">{{goodPlayerCount()}}</span> vs
          <span class="badge badge badge-danger mx-2">{{players.length - goodPlayerCount()}}</span>
        </h2>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-6 offset-3">
        <div :class="['card', 'text-center', team == 'EVIL' ? 'bg-danger' : 'bg-info']">
          <div class="card-body text-white">
            <h3 v-if="role == 'GUARD'" class="card-title">You are a Royal Guard</h3>
            <h3 v-if="role == 'MERLIN'" class="card-title">You are Merlin</h3>
            <h3 v-if="role == 'OBERON'" class="card-title">You are Oberon</h3>
            <h3 v-if="role == 'PERCIVAL'" class="card-title">You are Percival</h3>
            <h3 v-if="role == 'ASSASSIN'" class="card-title">You are the Assassin</h3>
            <h3 v-if="role == 'MINION'" class="card-title">You are a Minion</h3>
            <h3 v-if="role == 'MORGANA'" class="card-title">You are Morgana</h3>
            <p
              v-if="team == 'GOOD' && role === 'MERLIN'"
              class="card-text"
            >Your goal is to complete three quests. You know who is in Evil. The Assassin will have an opportunity to identify you after three successful quests. If the Assassin can identify you Evil will win.</p>
            <p
              v-if="team == 'GOOD' && role === 'PERCIVAL' && metadata.length == 1"
              class="card-text"
            >Your goal is to complete three quests. You know who Merlin is.</p>
            <p
              v-if="team == 'GOOD' && role === 'PERCIVAL' && metadata.length == 2"
              class="card-text"
            >Your goal is to complete three quests. You know who Merlin is but Morgana is appearing as a second Merlin which confuses you.</p>
            <p
              v-if="team == 'GOOD' && role !== 'MERLIN' && role !== 'PERCIVAL'"
              class="card-text"
            >Your goal is to complete three quests.</p>
            <p
              v-if="team == 'EVIL' && role === 'ASSASSIN'"
              class="card-text"
            >Your goal is to disrupt the flow of the game and stay undercover. You will be given an opportunity to identify Merlin after three successful quests. If you successfully identify Merlin you will steal the win.</p>
            <p
              v-if="team == 'EVIL' && role !== 'ASSASSIN'"
              class="card-text"
            >Your goal is to disrupt the flow of the game and stay undercover.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-4" v-if="role != 'GUARD'">
      <div class="col-6 offset-3">
        <div class="card bg-dark border border-primary text-light">
          <h5
            v-if="team == 'EVIL' || role == 'MERLIN'"
            class="card-title text-center pt-3"
          >Evil Team</h5>
          <h5 v-if="team == 'EVIL' || role == 'MERLIN'" class="card-text text-center mb-4">
            <span
              v-for="(playerId, index) in metadata"
              :key="index"
              class="badge badge badge-danger mx-2"
            >{{findPlayerName(playerId)}}</span>
          </h5>
          <h5 v-if="role == 'PERCIVAL'" class="card-title text-center pt-3">Merlin is</h5>
          <h5 v-if="role == 'PERCIVAL'" class="card-text pb-4 text-center">
            <span class="badge badge-info mx-2">{{findPlayerName(metadata[0])}}</span>
            <span v-if="metadata.length == 2">or</span>
            <span
              v-if="metadata.length == 2"
              class="badge badge-info mx-2"
            >{{findPlayerName(metadata[1])}}</span>
          </h5>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <PlayerReadyBar :width="6" :namesPerRow="2" :players="players" />
    </div>
    <div class="row">
      <div class="col-6 offset-3">
        <ReadyButton :isPlayerReady="isPlayerReady" v-on="$listeners" />
      </div>
    </div>
  </div>
</template>
<script>
import PlayerReadyBar from "@/components/common/PlayerReadyBar.vue";
import ReadyButton from "@/components/common/ReadyButton.vue";
export default {
  name: "RoleReveal",
  components: { PlayerReadyBar, ReadyButton },
  props: {
    team: String,
    role: String,
    settings: Object,
    ready: Boolean,
    socket: Object,
    metadata: Array,
    players: Array,
    isPlayerReady: Boolean
  },
  methods: {
    findPlayerName: function(id) {
      return this.players.find(p => p.id == id).name;
    },
    goodPlayerCount: function() {
      switch (this.players.length) {
        case 5:
          return 3;
        case 6:
          return 4;
        case 7:
          return 4;
        case 8:
          return 5;
        case 9:
          return 6;
        case 10:
          return 6;
      }
    }
  }
};
</script>