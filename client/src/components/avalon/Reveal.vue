<template>
  <div class="col-12">
    <!-- <div class="row mb-4">
      <div class="col-12">
        <div class="card">
          <div class="card-header bg-light">How the game works</div>
          <div class="card-body">
            <p
              class="card-text"
            >The goal of Good is to complete three quests and help Merlin to keep their identity hidden.</p>
            <p class="card-text">The goal of Evil is to disrupt the flow of the game.</p>
            <p
              class="card-text"
            >There are five quests to complete. Each quest has a nominated player that acts as the quest's leader. The quest leader proposes a team to head out on the quest.</p>
            <p
              class="card-text"
            >All players then vote to 'Approve' or 'Reject' the team proposal. This is a majority vote.</p>
            <p
              class="card-text"
            >If the proposal is not accepted the quest restarts with a new quest leader.</p>
            <p
              class="card-text"
            >The quest will begin once a proposal is accepted. Players on the quest will then vote on how they would like the quest to turn out.</p>
            <p class="card-text">Good team members may only choose 'Success' as the outcome.</p>
            <p class="card-text">Evil members may choose 'Success' or 'Sabotage' as the outcome.</p>
            <p class="card-text">The quest is a 'Success' if all players vote 'Success'.</p>
            <p class="card-text">The quest is a 'Fail' if one or more players vote 'Sabotage'.</p>
            <p
              class="card-text"
            >The next quest starts with a new quest leader after the current quest leader shares the result of the quest.</p>
            <p
              class="card-text"
            >After three successful quests Evil team members are exposed and the Assassin will have an opportunity to identify Merlin.</p>
            <p
              class="card-text"
            >Good will take the win if the Assassin does not manage to identify Merlin.</p>
            <p class="card-text">Evil will take the win if the Assassin manages to identify Merlin.</p>
            <p class="card-text">Evil will take the win if they sabotage three quests.</p>
            <p
              class="card-text"
            >Evil will take the win if players reject five team proposals for the same quest.</p>
            <p
              class="card-text"
            >Don't worry if this is your first time playing. Instruction and explanation is provided as you play.</p>
          </div>
        </div>
      </div>
    </div>-->
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
            >You know who is in Evil. Evil will win if they can identify you.</p>
            <p
              v-if="team == 'GOOD' && role !== 'MERLIN'"
              class="card-text"
            >Your goal is to complete three quests.</p>
            <p
              v-if="team == 'EVIL' && role === 'ASSASSIN'"
              class="card-text"
            >You will be given an opportunity to assassinate Merlin after three successful quests.</p>
            <p
              v-if="team == 'EVIL' && role !== 'ASSASSIN'"
              class="card-text"
            >Your goal is to disrupt the flow of the game.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-4" v-if="role != 'GUARD'">
      <div class="col-6 offset-3">
        <div class="card bg-dark text-light">
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
    <!-- <div class="row mb-4">
      <div class="col-12">
        <div class="card">
          <div class="card-header bg-light">Who knows what?</div>
          <div class="card-body">
            <p
              class="card-text"
            >Some players have access to important information about the other players on their screens now.</p>
            <p class="card-text">All players know which team they are in.</p>
            <p class="card-text">Evil team members know which players are in Evil.</p>
            <p class="card-text">Merlin knows which players are in Evil.</p>
            <p class="card-text">Guards do not know anything about any other player.</p>
            <p v-if="settings.oberonEnabled" class="card-text">Oberon is only visible to Merlin.</p>
            <p v-if="settings.percivalEnabled" class="card-text">Percival knows who Merlin is.</p>
            <p
              v-if="settings.morganaEnabled"
              class="card-text"
            >Morgana confuses Percival by appearing as a second Merlin.</p>
          </div>
        </div>
      </div>
    </div>-->
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
  name: "Reveal",
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