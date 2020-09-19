<template>
  <div class="container">
    <div class="row pb-5">
      <div class="col-12">
        <TextInput buttonText="Enter" placeholder="Name" />
      </div>
    </div>
    <div class="row pb-5">
      <div class="col-12">
        <ReadyButton :isPlayerReady="isPlayerReady" />
      </div>
    </div>
    <div class="row pb-5">
      <div class="col-12">
        <PlayerReadyBar :players="players" />
      </div>
    </div>
    <div class="row pb-5">
      <div class="col-12">
        <RoleReveal
          :players="players"
          team="GOOD"
          role="MERLIN"
          :metadata="['111', '222']"
          :settings="{}"
          :isPlayerReady="isPlayerReady"
        />
      </div>
    </div>
    <div class="row pb-5">
      <div class="col-12">
        <Lobby :players="players" :isPlayerReady="isPlayerReady" />
      </div>
    </div>

    <div class="row pb-5">
      <div class="col-12">
        <Waiting :lines="['waiting', 'here is another line']" :isPlayerReady="isPlayerReady" />
      </div>
    </div>
    <div class="row pb-5">
      <div class="col-12">
        <RoomClosed />
      </div>
    </div>
    <div class="row pb-5">
      <div class="col-12">
        <PlayerSelection
          :body="['player selection', 'here is another line']"
          :players="players"
          :requiredPlayers="2"
          :isPlayerReady="isPlayerReady"
          :proposedPlayerIds="['111']"
        />
      </div>
    </div>
    <div class="row pb-5">
      <div class="col-12">
        <QuestResultReveal
          :playerIsOrganiser="true"
          organiserName="Ben"
          :results="[{choice: 'SABOTAGE', revealed: true},{choice: 'SUCCEED', revealed: true},{choice: 'SABOTAGE', revealed: false}]"
          questResult
          :isPlayerReady="isPlayerReady"
        />
      </div>
    </div>
    <div class="row pb-5">
      <div class="col-12">
        <QuestProposalVoteResult :players="players" :isPlayerReady="isPlayerReady" />
      </div>
    </div>
    <div class="row pb-5">
      <div class="col-12">
        <QuestProposalVoteInput
          organiser="Sidd"
          :names="['Ben', 'Sam']"
          :isPlayerReady="isPlayerReady"
        />
      </div>
    </div>
    <div class="row pb-5">
      <div class="col-12">
        <QuestOutcomeVoteInput
          :isEvil="true"
          vote="SABOTAGE"
          :names="['Ben', 'Sam']"
          :isPlayerReady="isPlayerReady"
        />
      </div>
    </div>
    <div class="row pb-5">
      <div class="col-12">
        <Outcome
          winner="GOOD"
          buttonText="Play Again"
          outcome="Good has taken the win!"
          :isPlayerReady="isPlayerReady"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Waiting from "@/components/common/Waiting.vue";
import TextInput from "@/components/common/TextInput.vue";
import RoomClosed from "@/components/common/RoomClosed.vue";
import ReadyButton from "@/components/common/ReadyButton.vue";
import PlayerSelection from "@/components/common/PlayerSelection.vue";
import PlayerReadyBar from "@/components/common/PlayerReadyBar.vue";
import Lobby from "@/components/common/Lobby.vue";
import RoleReveal from "@/components/avalon/RoleReveal.vue";
import QuestResultReveal from "@/components/avalon/QuestResultReveal.vue";
import QuestProposalVoteResult from "@/components/avalon/QuestProposalVoteResult.vue";
import QuestProposalVoteInput from "@/components/avalon/QuestProposalVoteInput.vue";
import QuestOutcomeVoteInput from "@/components/avalon/QuestOutcomeVoteInput.vue";
import Outcome from "@/components/avalon/Outcome.vue";
export default {
  name: "Components",
  components: {
    Waiting,
    TextInput,
    RoomClosed,
    ReadyButton,
    PlayerSelection,
    PlayerReadyBar,
    Lobby,
    RoleReveal,
    QuestResultReveal,
    QuestProposalVoteResult,
    QuestProposalVoteInput,
    QuestOutcomeVoteInput,
    Outcome
  },
  data() {
    return {
      isPlayerReady: false,
      players: [
        { id: "111", name: "Ben", ready: true, vote: "APPROVE" },
        { id: "222", name: "Sam", ready: false, vote: "APPROVE" },
        { id: "333", name: "Adam", ready: false, vote: "REJECT" },
        { id: "444", name: "Rodney", ready: false, vote: "APPROVE" },
        { id: "555", name: "Sidd", ready: false, vote: "APPROVE" },
        { id: "666", name: "Jim", ready: false, vote: "REJECT" }
      ]
    };
  }
};
</script>
