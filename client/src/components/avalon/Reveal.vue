<template>
  <div class="col-12">
    <div class="row mb-4">
      <div class="col-12">
        <div class="card">
          <div class="card-body text-center">
            <h3 v-if="role == 'GUARD'" class="card-title">You are a guard</h3>
            <h3 v-if="role == 'MERLIN'" class="card-title">You are Merlin</h3>
            <h3 v-if="role == 'OBERON'" class="card-title">You are Oberon</h3>
            <h3 v-if="role == 'PERCIVAL'" class="card-title">You are Percival</h3>
            <h3 v-if="role == 'ASSASSIN'" class="card-title">You are the Assassin</h3>
            <h3 v-if="role == 'MINION'" class="card-title">You are a minion</h3>
            <h3 v-if="role == 'MORGANA'" class="card-title">You are Morgana</h3>

            <p v-if="team == 'EVIL'" class="card-text">You are in Evil</p>
            <p v-if="team == 'GOOD'" class="card-text">You are in Good</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-12">
        <div class="card">
          <h5 class="card-header">Things you need to know about your team</h5>
          <h5
            v-if="team == 'EVIL' || role == 'MERLIN'"
            class="card-title text-center pt-3"
          >Members of Evil</h5>
          <h4 v-if="team == 'EVIL' || role == 'MERLIN'" class="card-text text-center">
            <span
              v-for="(playerId, index) in metadata"
              :key="index"
              class="badge badge-pill badge-danger mx-2"
            >{{findPlayerName(playerId)}}</span>
          </h4>
          <h5 v-if="role == 'PERCIVAL'" class="card-title text-center pt-3">Merlin is</h5>
          <h4 v-if="role == 'PERCIVAL'" class="card-text text-center">
            <span class="badge badge-pill badge-info mx-2">{{findPlayerName(metadata[0])}}</span>
            <span v-if="metadata.length == 2">or</span>
            <span
              v-if="metadata.length == 2"
              class="badge badge-pill badge-info mx-2"
            >{{findPlayerName(metadata[1])}}</span>
          </h4>

          <div v-if="team == 'GOOD' && role != 'MERLIN'" class="card-body">
            <p
              v-if="role == 'PERCIVAL' && settings.morganaEnabled"
              class="card-text"
            >As Percival you are given the identity of Merlin, however Morgana is also disguised as Merlin.</p>
            <p
              v-if="role == 'PERCIVAL' && !settings.morganaEnabled"
              class="card-text"
            >As Percival you are given the identity of Merlin.</p>
            <p
              v-if="role == 'GUARD'"
              class="card-text"
            >You do not know the identity of anyone else, or what team they are in.</p>
          </div>
          <div v-if="role == 'MERLIN'" class="card-body">
            <p
              class="card-text"
            >As Merlin you are told who is in Evil. Evil team members also know who is in Evil.</p>
            <p
              class="card-text"
            >Evil will take the win if you are successfully identified by the Assassin after three successful quests.</p>
          </div>
          <div v-if="team == 'EVIL'" class="card-body">
            <p
              v-if="role == 'MORGANA'"
              class="card-text"
            >As Morgana you are disguised as Merlin, which confuses Percival.</p>
            <p
              v-if="role == 'OBERON'"
              class="card-text"
            >As Oberon your identity is hidden to all players except Merlin. Evil members do not know that you are in Evil.</p>
            <p
              v-if="role == 'ASSASSIN'"
              class="card-text"
            >As the Assassin you will have a chance to identify Merlin if three quests are successfully completed. If you are successful Evil will take the win.</p>
            <p
              class="card-text"
            >As an Evil team member you are told who is in Evil. You also have the option to sabotage quests that you are sent on.</p>
            <p class="card-text">Disclosing who you are could cost you the game.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-12">
        <div class="card">
          <h5 class="card-header">Things you need to know about the game</h5>
          <div class="card-body">
            <p
              class="card-text"
            >The goal of Good is to successfully complete three out of five quests and help Merlin avoid identification by the Assassin.</p>
            <p
              class="card-text"
            >The goal of Evil is to disrupt the flow of the game by sabotaging as many quests as they can without exposing their identity.</p>
            <p
              class="card-text"
            >There are five quests that can be completed. Each turn a player will be nominated as the quest's leader and will propose a team.</p>
            <p class="card-text">All players will vote to agree or disagree with the team proposal.</p>
            <p
              class="card-text"
            >If the proposal is not accepted the quest is not started and a new quest leader is chosen.</p>
            <p
              class="card-text"
            >If the proposal is accepted the quest will begin and the quest members will be asked for the outcome they would like.</p>
            <p
              class="card-text"
            >Good members on the quest may only choose 'Success' as the outcome, however Evil members can choose to 'Sabotage' the quest.</p>
            <p
              class="card-text"
            >If all players choose 'Success' the quest will be completed successfully and the play moves to the next quest with a new quest leader.</p>
            <p
              class="card-text"
            >If an Evil team member is on the quest and they choose to 'Sabotage' the quest, the quest will fail and the play moves to the next quest with a new quest leader.</p>
            <p
              class="card-text"
            >At the start of the game Evil team members are told which players are in Evil.</p>
            <p
              class="card-text"
            >At the start of the game Guards are told that they are in Good and are given no other information.</p>
            <p class="card-text">At the start of the game Merlin is told which players are in Evil.</p>
            <p
              v-if="settings.percivalEnabled && settings.morganaEnabled"
              class="card-text"
            >At the start of the game Percival is told the identity of Merlin, however Morgana is also disguised as Merlin.</p>
            <p
              v-if="settings.percivalEnabled && !settings.morganaEnabled"
              class="card-text"
            >At the start of the game Percival is told the identity of Merlin.</p>
            <p
              v-if="settings.oberonEnabled"
              class="card-text"
            >Oberon is not revealed to Evil players but is revealed to Merlin.</p>
            <p
              class="card-text"
            >After three successful quests the Assassin will have an opportunity to identify Merlin.</p>
            <p
              class="card-text"
            >Good will take the win if the Assassin does not manage to successfully identify Merlin.</p>
            <p
              class="card-text"
            >Evil will take the win if the Assassin manages to successfully identify Merlin.</p>
            <p
              class="card-text"
            >Evil will take the win if three out of the five quests are sabotaged.</p>
            <p
              class="card-text"
            >Evil will take the win if five team proposals are rejected for a single quest.</p>
            <p
              class="card-text"
            >Don't worry if this is your first time playing. Instructions and explanation will be provided to you as you play.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <PlayerReadyBar :players="players" />
    </div>
    <div class="row">
      <div class="col-6 offset-3">
        <ReadyButton :large="true" :isPlayerReady="isPlayerReady" v-on="$listeners" />
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
    }
  }
};
</script>