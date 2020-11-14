<template>
  <div class="col-12">
    <div class="row pb-2">
      <div class="col-12">
        <div class="border-bottom mb-2 border-primary">
          <PlayerReadyBar :nameColSpan="2" :players="players" />
        </div>
      </div>
    </div>
    <div class="row">
      <QuestLog
        :questLog="game.questLogs"
        :players="players"
        :disagreements="game.currentQuest.disagreements"
      />
    </div>
    <hr class="border border-primary" />
    <div v-if="game.state == 'QUEST_PROPOSING' && !playerIsOrganiser" class="row">
      <Waiting
        header="Team proposal"
        :lines="['There are five quests to complete. Each quest has a nominated player that acts as the quest\'s leader.', currentOrganiser.name + ' is the current quest leader and is choosing a team for Quest ' + game.currentQuest.id +  '.']"
        :questId="game.currentQuest.id"
        :isPlayerReady="isPlayerReady"
        v-on="$listeners"
      />
    </div>
    <div v-if="game.state == 'QUEST_PROPOSING' && playerIsOrganiser" class="row">
      <PlayerSelection
        :header="'Quest ' + game.currentQuest.id + ' - Team proposal'"
        :body="[
          'There are five quests to complete. You are tasked with proposing a team for Quest ' +game.currentQuest.id+'.',
          'Your proposal will be put to a majority vote when everyone is ready.',
          'Select ' + game.currentQuest.requiredPlayers + ' players to send on Quest ' +game.currentQuest.id+'.'
        ]"
        :players="players"
        :proposedPlayerIds="game.currentQuest.proposedPlayerIds"
        :requiredPlayers="game.currentQuest.requiredPlayers"
        :isPlayerReady="isPlayerReady"
        :onPlayerSelected="(playerId) => this.$emit('propose-player-for-quest', playerId)"
        :onPlayerDeselected="(playerId) => this.$emit('unpropose-player-for-quest', playerId)"
        v-on="$listeners"
      />
    </div>
    <div v-if="game.state == 'QUEST_PROPOSAL'" class="row">
      <QuestProposalVoteInput
        :questId="game.currentQuest.id"
        :organiser="currentOrganiser.name"
        :names="proposedQuestMemberNames"
        :isPlayerReady="isPlayerReady"
        :vote="vote"
        v-on="$listeners"
      />
    </div>
    <div v-if="game.state == 'QUEST_PROPOSAL_RESULT'" class="row">
      <QuestProposalVoteResult
        :players="players"
        :names="proposedQuestMemberNames"
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
      <Waiting
        header="Quest underway"
        :lines="['The quest is underway!', 'The result of the quest will be revealed when the quest has been completed and everyone is ready.']"
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
        :names="proposedQuestPlayerNames"
        :questId="game.currentQuest.id"
        :isEvil="team == 'EVIL'"
        :isPlayerReady="isPlayerReady"
        :vote="vote"
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
        :isPlayerReady="isPlayerReady"
        v-on="$listeners"
      />
    </div>

    <div v-if="game.state == 'MERLIN_ID' && this.role == 'ASSASSIN'" class="row">
      <PlayerSelection
        :header="'Quest ' + game.currentQuest.id + ' - Assassination attempt'"
        :body="[
          'Your identity has been revealed to all players. You may now discuss openly with your team members who you believe Merlin is.', 
          'If you manage to successfully identify Merlin you will steal the win.'
        ]"
        :players="players.filter(p => p.team === 'GOOD')"
        :proposedPlayerIds="game.currentQuest.proposedPlayerIds"
        :requiredPlayers="1"
        :isPlayerReady="isPlayerReady"
        :onPlayerSelected="(playerId) => this.$emit('select-merlin-for-id', playerId)"
        :onPlayerDeselected="(playerId) => this.$emit('unselect-merlin-for-id', playerId)"
        v-on="$listeners"
      />
    </div>
    <div v-if="game.state == 'MERLIN_ID' && this.role != 'ASSASSIN'" class="row">
      <Waiting
        header="Assassination attempt"
        :lines="[this.players.filter(p => p.team == 'EVIL').map(p => p.name).join(', ') + ' are in Evil and now may openly discuss who they believe Merlin is.', this.players.find(p => p.role == 'ASSASSIN').name + ' is the Assassin. Their choice will be visible when everyone is ready.']"
        :questId="game.currentQuest.id"
        :isPlayerReady="isPlayerReady"
        v-on="$listeners"
      />
    </div>

    <div v-if="game.state == 'GAME_OVER' && game.result == 'EVIL'" class="row">
      <Outcome
        winner="EVIL"
        outcome="Evil has taken the win!"
        buttonText="Play Again"
        :isPlayerReady="isPlayerReady"
        v-on="$listeners"
      />
    </div>
    <div v-if="game.state == 'GAME_OVER' && game.result == 'GOOD'" class="row">
      <Outcome
        winner="GOOD"
        outcome="The Assassin was not able to identify Merlin. Good has taken the win!"
        buttonText="Play Again"
        :isPlayerReady="isPlayerReady"
        v-on="$listeners"
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
import PlayerReadyBar from "@/components/common/PlayerReadyBar.vue";
import Waiting from "@/components/common/Waiting.vue";
import PlayerSelection from "@/components/common/PlayerSelection.vue";

export default {
  components: {
    QuestLog,
    QuestResultReveal,
    QuestProposalVoteInput,
    QuestOutcomeVoteInput,
    Outcome,
    QuestProposalVoteResult,
    Waiting,
    PlayerReadyBar,
    PlayerSelection
  },
  props: {
    game: Object,
    players: Array,
    playerId: String,
    team: String,
    role: String,
    vote: String,
    isPlayerReady: Boolean
  },
  computed: {
    playerIsOrganiser: function() {
      return this.playerId == this.game.currentQuest.organiserId;
    },
    currentOrganiser: function() {
      return this.players.find(o => o.id == this.game.currentQuest.organiserId);
    },
    proposedQuestPlayerNames: function() {
      let names = [];
      for (let i = 0; i < this.game.currentQuest.proposedPlayerIds.length; i++) {
        names.push(
          this.getPlayerNameById(this.game.currentQuest.proposedPlayerIds[i])
        );
      }
      return names;
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
    }
  }
};
</script>