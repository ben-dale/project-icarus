<template>
  <div class="col-md-12">
    <div class="row mb-3">
      <QuestLog />
    </div>
    <div class="row">
      <QuestProposalVoteInput />
    </div>
    <div class="row">
      <QuestProposalVoteResult />
    </div>
    <div class="row">
      <Outcome winner="evil" outcome="Evil have taken the win!" buttonText="Play Again" />
    </div>
    <div class="row">
      <Outcome winner="good" outcome="The Assassin was not able to identify Merlin. Good have taken the win!" buttonText="Play Again" />
    </div>
    <div class="row mb-3">
      <QuestResultReveal />
    </div>
    <div class="row">
      <PlainOutput line="The results of the quest will be revealed shortly." />
    </div>

    <div class="row">
      <PlainOutput line="The quest was a success!" />
    </div>

    <div class="row">
      <PlainOutput line="Ben is deciding on who be on the next quest..." />
    </div>

    <div class="row">
      <PlainOutput line="Evil sabotaged the quest! The quest was a failure." />
    </div>

    <div class="row">
      <QuestOutcomeVoteInput />
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

export default {
  components: {
    QuestLog,
    QuestResultReveal,
    QuestProposalVoteInput,
    PlainOutput,
    QuestOutcomeVoteInput,
    Outcome,
    QuestProposalVoteResult
  }
};
</script>