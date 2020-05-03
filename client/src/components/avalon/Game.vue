<template>
  <div class="col-md-12">
    <div class="row mb-3">
      <QuestLog :questLog="game.questLogs" :players="players" />
    </div>
    <div class="row mb-3">
      <Players :players="players" />
    </div>
    <div v-if="game.state == 'QUEST_PROPOSING' && !playerIsOrganiser" class="row">
      <PlainOutput
        :header="'Quest ' + game.currentQuest.id + ' - Team proposal'"
        :line="playerIsOrganisingTeamText"
        :isPlayerReady="isPlayerReady"
        @ready-up="readyUp"
        @not-ready="notReady"
      />
    </div>
    <div v-if="game.state == 'QUEST_PROPOSING' && playerIsOrganiser" class="row">
      <QuestProposalInput :questId="game.currentQuest.id" :players="players" @propose-team="proposeTeam" />
      <!-- todo quest size limitations! -->
    </div>
    <div v-if="game.state == 'QUEST_PROPOSAL'" class="row">
      <QuestProposalVoteInput :organiser="currentOrganiser.name" :names="proposedQuestMemberNames" />
    </div>
    <div v-if="game.state == 'QUEST_PROPOSAL_RESULT'" class="row">
      <QuestProposalVoteResult
        :players="players"
        :proposalAccepted="game.currentQuest.proposalAccepted"
      />
    </div>

    <div
      class="row"
      v-if="game.state == 'QUEST_STARTED' && !game.currentQuest.proposedPlayerIds.includes(playerId)"
    >
      <PlainOutput line="The results of the quest will be revealed shortly." />
    </div>

    <div
      class="row"
      v-if="game.state == 'QUEST_STARTED' && game.currentQuest.proposedPlayerIds.includes(playerId)"
    >
      <QuestOutcomeVoteInput :members="proposedQuestMembers" :isEvil="team == 'EVIL'" />
    </div>

    <div v-if="game.state == 'QUEST_RESULT_REVEAL'" class="row mb-3">
      <QuestResultReveal
        :organiserName="currentOrganiser.name"
        :playerIsOrganiser="playerIsOrganiser"
        :results="game.currentQuest.votes"
        @reveal-quest-result="revealQuestResult"
      />
    </div>

    <div v-if="game.state == 'QUEST_RESULT'" class="row mb-3">
      <Outcome result="FAIL" outcome="The quest was sabotaged" buttonText="Ready" />
    </div>
    <div v-if="game.state == 'QUEST_RESULT'" class="row mb-3">
      <Outcome result="SUCCEED" outcome="The quest was completed successfully" buttonText="Ready" />
    </div>
    <!-- 
    <div v-if="game.state == 'GAME_OVER'" class="row">
      <Outcome winner="evil" outcome="Evil have taken the win!" buttonText="Play Again" />
    </div>
    <div v-if="game.state == 'GAME_OVER'" class="row">
      <Outcome
        winner="good"
        outcome="The Assassin was not able to identify Merlin. Good have taken the win!"
        buttonText="Play Again"
      />
    </div>-->
  </div>
</template>

<script>
import QuestLog from "@/components/avalon/QuestLog.vue";
import QuestResultReveal from "@/components/avalon/QuestResultReveal.vue";
import QuestProposalVoteInput from "@/components/avalon/QuestProposalVoteInput.vue";
import PlainOutput from "@/components/avalon/PlainOutput.vue";
import QuestOutcomeVoteInput from "@/components/avalon/QuestOutcomeVoteInput.vue";
import Outcome from "@/components/avalon/Outcome.vue";
import QuestProposalVoteResult from "@/components/avalon/QuestProposalVoteResult.vue";
import QuestProposalInput from "@/components/avalon/QuestProposalInput.vue";
import Players from "@/components/avalon/Players.vue";

export default {
  components: {
    QuestLog,
    QuestResultReveal,
    QuestProposalVoteInput,
    PlainOutput,
    QuestOutcomeVoteInput,
    Outcome,
    QuestProposalVoteResult,
    QuestProposalInput,
    Players
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
    playerIsOrganisingTeamText: function() {
      return this.currentOrganiser.name + " is currently organising a team. The proposal will be voted on by all players shortly.";
    },
    proposedQuestMembers: function() {
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
    proposeTeam: function(memberIds) {
      this.$emit("propose-team", memberIds);
    },
    readyUp: function() {
      this.$emit("ready-up");
    },
    notReady: function() {
      this.$emit("not-ready");
    }
  }
};
</script>