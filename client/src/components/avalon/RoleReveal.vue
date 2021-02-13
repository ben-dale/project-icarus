<template>
  <div class="col-12">    
    <div class="row pt-3">
      <div class="col-md-12 col-lg-6 offset-lg-3">
        <div class="card bg-dark border-primary text-center">
          <h5 v-if="role == 'GUARD'" class="sim-role sim-role-good text-white bg-info card-header">You are a Royal Guard</h5>
          <h5 v-if="role == 'MERLIN'" class="sim-role sim-role-good text-white bg-info card-header">You are Merlin</h5>
          <h5 v-if="role == 'PERCIVAL'" class="sim-role sim-role-good text-white bg-info card-header">You are Percival</h5>
          <h5 v-if="role == 'ASSASSIN'" class="sim-role sim-role-bad text-white bg-danger card-header">You are the Assassin</h5>
          <h5 v-if="role == 'MINION'" class="sim-role sim-role-bad text-white bg-danger card-header">You are a Minion</h5>
          <h5 v-if="role == 'MORGANA'" class="sim-role sim-role-bad text-white bg-danger card-header">You are Morgana</h5>
          <h5 v-if="role == 'OBERON'" class="sim-role sim-role-bad text-white bg-danger card-header">You are Oberon</h5>
          <div class="card-body text-white">
            <p v-if="team == 'GOOD' && role === 'MERLIN'" class="card-text">
              Your goal is to successfully complete three quests. The Assassin will have an opportunity to identify you after three successful quests. Evil will win if the Assassin can identify you.
              <br />
              <br />Evil players know who their teammates are.
              <br />All players know that the Evil team has been revealed to you.
              <br />
              {{settings.percivalEnabled ? (settings.morganaEnabled ? 'Morgana is confusing Percival by disguising as a second Merlin.' : 'Percival knows your identity.') : 'Nobody knows your identity.'}}
            </p>
            <p
              v-if="team == 'GOOD' && role === 'PERCIVAL' && !settings.morganaEnabled"
              class="card-text"
            >
              Your goal is to successfully complete three quests.
              <br />
              <br />You know who Merlin is. Merlin knows which players are in Evil. Evil players know who their teammates are.
            </p>
            <p
              v-if="team == 'GOOD' && role === 'PERCIVAL' && settings.morganaEnabled"
              class="card-text"
            >
              Your goal is to successfully complete three quests.
              <br />
              <br />Merlin knows which players are in Evil. Morgana is confusing you by disguising as a second Merlin. Merlin knows that Morgana is confusing you. Evil players know who their teammates are.
            </p>
            <p v-if="team == 'GOOD' && role === 'GUARD'" class="card-text">
              Your goal is to successfully complete three quests.
              <br />
              <br />Evil players know who their teammates are. >Merlin knows which players are in Evil.
            </p>
            <p v-if="team == 'EVIL' && role === 'ASSASSIN'" class="card-text">
              Your goal is to disrupt the flow of the game and stay undercover. You will be given an opportunity to identify Merlin after three successful quests. Evil steal will win if you can successfully identify Merlin.
              <br />
              <br />The other Evil players know that you are in Evil. Merlin knows which players are in Evil.
            </p>
            <p v-if="team == 'EVIL' && role === 'MINION'" class="card-text">
              Your goal is to disrupt the flow of the game and stay undercover.
              <br />
              <br />The other Evil players know that you are in Evil. Merlin knows which players are in Evil.
            </p>
            <p v-if="team == 'EVIL' && role === 'MORGANA'" class="card-text">
              Your goal is to disrupt the flow of the game and stay undercover. You are disguised as Merlin which confuses Percival.
              <br />
              <br />The other Evil players know that you are in Evil. Merlin knows which players are in Evil.
            </p>
            <p v-if="team == 'EVIL' && role === 'OBERON'" class="card-text">
              Your goal is to disrupt the flow of the game and stay undercover.
              <br />
              <br />Evil players do not know that you are in Evil. Merlin knows which players are in Evil.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3" v-if="role != 'GUARD'">
      <div class="col-md-12 col-lg-6 offset-lg-3">
        <div class="card bg-dark border border-primary text-light">
          <h5
            v-if="team == 'EVIL' || role == 'MERLIN'"
            class="card-header border-primary text-center"
          >Evil Team</h5>
          <div class="card-body" v-if="team == 'EVIL' || role == 'MERLIN'">
            <div class="row">
              <div v-for="(playerId, index) in metadata" :key="index" class="col-6">
                <p class="sim-team-mate text-center card-text bg-danger py-1">{{findPlayerName(playerId)}}</p>
              </div>
            </div>
          </div>
          <h5 v-if="role == 'PERCIVAL'" class="card-header border-primary text-center">Merlin</h5>
          <div class="card-body" v-if="role == 'PERCIVAL'">
            <div class="row">
              <div
                v-for="(playerId, index) in metadata"
                :key="index"
                :class="['col-6', (metadata.length == 1 ? 'offset-3': '')]"
              >
                <p class="text-center card-text bg-info py-1">{{findPlayerName(playerId)}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3 mb-2">
      <div class="col-md-12 col-lg-6 offset-lg-3">
        <div class="card bg-dark border border-primary">
          <div class="card-body pb-1">
            <PlayerReadyBar :nameColSpan="4" :players="players" />
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3 d-none d-lg-block">
      <div class="col-6 offset-3">
        <ReadyButton :isPlayerReady="isPlayerReady" v-on="$listeners" />
      </div>
    </div>

    <div class="fixed-bottom">
      <div class="card bg-primary rounded-0 d-none d-block d-lg-none">
        <div class="card-body pb-5">
          <ReadyButton :isPlayerReady="isPlayerReady" v-on="$listeners" />
        </div>
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
    metadata: Array,
    players: Array,
    isPlayerReady: Boolean
  },
  methods: {
    findPlayerName: function(id) {
      return this.players.find(p => p.id == id).name;
    }
  }
};
</script>