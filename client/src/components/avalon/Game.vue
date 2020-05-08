<template>
  <div class="col-md-12">
    <div class="row">
      <QuestLog :questLog="game.questLogs" :players="players" />
    </div>
    <div class="row mb-3">
      <PlayerReadyBar :players="players" />
    </div>
    <div v-if="game.state == 'QUEST_PROPOSING' && !playerIsOrganiser" class="row">
      <QuestWaiting
        header="Team proposal"
        :line1="currentOrganiser.name + ' is proposing a team.'"
        line2="Players will vote on the team proposal when it has been drafted and everyone is ready."
        :questId="game.currentQuest.id"
        :isPlayerReady="isPlayerReady"
        v-on="$listeners"
      />
    </div>
    <div v-if="game.state == 'QUEST_PROPOSING' && playerIsOrganiser" class="row">
      <QuestProposalInput
        :questId="game.currentQuest.id"
        :players="players"
        :proposedPlayerIds="game.currentQuest.proposedPlayerIds"
        :requiredPlayers="game.currentQuest.requiredPlayers"
        :isPlayerReady="isPlayerReady"
        v-on="$listeners"
      />
    </div>
    <div v-if="game.state == 'QUEST_PROPOSAL'" class="row">
      <QuestProposalVoteInput
        :questId="game.currentQuest.id"
        :organiser="currentOrganiser.name"
        :names="proposedQuestMemberNames"
        :isPlayerReady="isPlayerReady"
        v-on="$listeners"
      />
    </div>
    <div v-if="game.state == 'QUEST_PROPOSAL_RESULT'" class="row">
      <QuestProposalVoteResult
        :players="players"
        :proposalAccepted="game.currentQuest.proposalAccepted"
        :questId="game.currentQuest.id"
        :isPlayerReady="isPlayerReady"
        v-on="$listeners"
      />
    </div>

    <div
      class="row"
      v-if="game.state == 'QUEST_STARTED' && !game.currentQuest.proposedPlayerIds.includes(playerId)"
    >
      <QuestWaiting
        header="Quest underway"
        line1="The quest is underway!"
        line2="The result of the quest will be revealed when the quest has been completed and everyone is ready."
        :questId="game.currentQuest.id"
        :isPlayerReady="isPlayerReady"
        v-on="$listeners"
      />
    </div>

    <div
      class="row"
      v-if="game.state == 'QUEST_STARTED' && game.currentQuest.proposedPlayerIds.includes(playerId)"
    >
      <QuestOutcomeVoteInput
        :players="proposedQuestPlayers"
        :questId="game.currentQuest.id"
        :isEvil="team == 'EVIL'"
        :isPlayerReady="isPlayerReady"
        v-on="$listeners"
      />
    </div>

    <div v-if="game.state == 'QUEST_RESULT_REVEAL'" class="row mb-3">
      <QuestResultReveal
        :organiserName="currentOrganiser.name"
        :playerIsOrganiser="playerIsOrganiser"
        :results="game.currentQuest.votes"
        :questId="game.currentQuest.id"
        :questResult="game.currentQuest.result"
        v-on="$listeners"
      />
    </div>

    <div v-if="game.state == 'MERLIN_ID' && this.role == 'ASSASSIN'" class="row">
      <MerlinIdentificationInput
        :requiredPlayers="1"
        :players="players.filter(p => p.team === 'GOOD')"
        v-on="$listeners"
      />
    </div>
    <div v-if="game.state == 'MERLIN_ID' && this.role != 'ASSASSIN'" class="row">
      <QuestWaiting
        header="Assassination attempt"
        :line1="this.players.filter(p => p.team == 'EVIL').map(p => p.name).join(', ') + ' are in Evil and now may openly discuss who they believe Merlin is.'"
        :line2="this.players.find(p => p.role == 'ASSASSIN').name + ' is the Assassin. Their choice will be revealed shortly...'"
        :questId="game.currentQuest.id"
      />
    </div>

    <div v-if="game.state == 'GAME_OVER'" class="row">
      <Outcome winner="EVIL" outcome="Evil have taken the win!" buttonText="Play Again" />
    </div>
    <div v-if="game.state == 'GAME_OVER'" class="row">
      <Outcome
        winner="GOOD"
        outcome="The Assassin was not able to identify Merlin. Good have taken the win!"
        buttonText="Play Again"
      />
    </div>
  </div>
</template>

<script>
import QuestLog from "@/components/avalon/QuestLog.vue";
import QuestResultReveal from "@/components/avalon/QuestResultReveal.vue";
import QuestProposalVoteInput from "@/components/avalon/QuestProposalVoteInput.vue";
import QuestOutcomeVoteInput from "@/components/avalon/QuestOutcomeVoteInput.vue";
import Outcome from "@/components/avalon/Outcome.vue";
import QuestProposalVoteResult from "@/components/avalon/QuestProposalVoteResult.vue";
import QuestProposalInput from "@/components/avalon/QuestProposalInput.vue";
import PlayerReadyBar from "@/components/common/PlayerReadyBar.vue";
import QuestWaiting from "@/components/avalon/QuestWaiting.vue";
import MerlinIdentificationInput from "@/components/avalon/MerlinIdentificationInput.vue";

export default {
  components: {
    QuestLog,
    QuestResultReveal,
    QuestProposalVoteInput,
    QuestOutcomeVoteInput,
    Outcome,
    QuestProposalVoteResult,
    QuestProposalInput,
    QuestWaiting,
    PlayerReadyBar,
    MerlinIdentificationInput
  },
  props: {
    game: Object,
    players: Array,
    playerId: String,
    team: String,
    role: String,
    isPlayerReady: Boolean
  },
  computed: {
    playerIsOrganiser: function() {
      return this.playerId == this.game.currentQuest.organiserId;
    },
    currentOrganiser: function() {
      return this.players.find(o => o.id == this.game.currentQuest.organiserId);
    },
    proposedQuestPlayers: function() {
      let members = [];
      for (
        let i = 0;
        i < this.game.currentQuest.proposedPlayerIds.length;
        i++
      ) {
        members.push(
          this.getPlayerNameById(this.game.currentQuest.proposedPlayerIds[i])
        );
      }
      return members;
    },
    proposedQuestMemberNames: function() {
      return this.game.currentQuest.proposedPlayerIds.map(id =>
        this.getPlayerNameById(id)
      );
    }
  },
  methods: {
    getPlayerById: function(id) {
      return this.players.find(o => o.id == id);
    },
    getPlayerNameById: function(id) {
      let player = this.players.find(o => o.id == id);
      return player && player.name ? player.name : "";
    },
    revealQuestResult: function(id) {
      this.$emit("reveal-quest-result", id);
    },

  }
};
</script>