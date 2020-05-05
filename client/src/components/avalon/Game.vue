<template>
  <div class="col-md-12">
    <div class="row mb-3">
      <QuestLog :questLog="game.questLogs" :players="players" />
    </div>
    <div class="row mb-3">
      <PlayerReadyBar :players="players" />
    </div>
    <div v-if="game.state == 'QUEST_PROPOSING' && !playerIsOrganiser" class="row">
      <QuestWaiting
        header="Team proposal"
        line1="The team is being drafted."
        line2="All players will vote on the team proposal shortly..."
        :questId="game.currentQuest.id"
      />
    </div>
    <div v-if="game.state == 'QUEST_PROPOSING' && playerIsOrganiser" class="row">
      <QuestProposalInput
        :questId="game.currentQuest.id"
        :players="players"
        :requiredPlayers="requiredPlayers"
        :isPlayerReady="isPlayerReady"
        v-on="$listeners"
      />
    </div>
    <div v-if="game.state == 'QUEST_PROPOSAL'" class="row">
      <QuestProposalVoteInput
        :questId="game.currentQuest.id"
        :organiser="currentOrganiser.name"
        :names="proposedQuestMemberNames"
        v-on="$listeners"
      />
    </div>
    <div v-if="game.state == 'QUEST_PROPOSAL_RESULT'" class="row">
      <QuestProposalVoteResult
        :players="players"
        :proposalAccepted="game.currentQuest.proposalAccepted"
        :questId="game.currentQuest.id"
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
        line2="The result of the quest will be revealed shortly..."
        :questId="game.currentQuest.id"
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

    <div v-if="game.state == 'GAME_OVER'" class="row">
      <Outcome winner="evil" outcome="Evil have taken the win!" buttonText="Play Again" />
    </div>
    <div v-if="game.state == 'GAME_OVER'" class="row">
      <Outcome
        winner="good"
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
    PlayerReadyBar
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
    requiredPlayers: function() {
      return this.game.questLogs.find(ql => ql.id == this.game.currentQuest.id)
        .requiredPlayers;
    },
    currentOrganiser: function() {
      return this.players.find(o => o.id == this.game.currentQuest.organiserId);
    },
    playerIsOrganisingTeamText: function() {
      return (
        this.currentOrganiser.name +
        " is currently putting together a team proposal. The proposal will be voted on by all players shortly."
      );
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
    }
  }
};
</script>