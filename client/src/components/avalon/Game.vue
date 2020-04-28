<template>
  <div class="col-md-12">
    <div class="row mb-3">
      <QuestLog :questLog="game.questLog" :players="players" />
    </div>
    <div class="row mb-3">
      <Players :players="players" />
    </div>
    <div v-if="game.state == 'questProposing' && !playerIsOrganiser" class="row">
      <PlainOutput :line="playerIsOrganisingTeamText" />
    </div>
    <div v-if="game.state == 'questProposing' && playerIsOrganiser" class="row">
      <QuestProposalInput />
    </div>
    <div v-if="game.state == 'questProposal'" class="row">
      <QuestProposalVoteInput :organiser="currentOrganiser.name" :members="proposedQuestMembers" />
    </div>
    <div v-if="game.state == 'questProposalResult'" class="row">
      <QuestProposalVoteResult />
    </div>
    <div v-if="game.state == 'questStarted'" class="row">
      <PlainOutput line="The results of the quest will be revealed shortly." />
    </div>
    <div v-if="game.state == 'questStarted'" class="row">
      <QuestOutcomeVoteInput />
    </div>
    <div v-if="game.state == 'questResultReveal'" class="row mb-3">
      <QuestResultReveal />
    </div>
    <div v-if="game.state == 'questResult'" class="row mb-3">
      <Outcome winner="evil" outcome="Evil have sabotaged the quest" buttonText="Play Again" />
    </div>
    <div v-if="game.state == 'questResult'" class="row mb-3">
      <Outcome winner="good" outcome="The quest has been succeeded" buttonText="Play Again" />
    </div>
    <div v-if="game.state == 'gameOver'" class="row">
      <Outcome winner="evil" outcome="Evil have taken the win!" buttonText="Play Again" />
    </div>
    <div v-if="game.state == 'gameOver'" class="row">
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
    playerId: String
  },
  computed: {
    playerIsOrganiser: function() {
      return this.playerId == this.game.activeQuest.organiser;
    },
    currentOrganiser: function() {
      return this.players.find(o => o.id == this.game.activeQuest.organiser);
    },
    playerIsOrganisingTeamText: function() {
      return this.currentOrganiser.name + " is currently organising a team...";
    },
    proposedQuestMembers: function() {
      let members = [];
      for (let i = 0; i < this.game.activeQuest.proposedMembers.length; i++) {
        members.push(this.getPlayerNameById(this.game.activeQuest.proposedMembers[i]))
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
    }
  }
};
</script>