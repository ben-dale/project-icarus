<template>
  <div class="container">
    <div class="row pb-5 text-right">
      <div class="col-12">
        <select v-model="selectComponent">
          <option
            v-for="componentName in components"
            :value="componentName"
            :key="componentName"
          >{{componentName}}</option>
        </select>
      </div>
    </div>
    <div class="row" v-if="selectComponent == 'TextInput'">
      <div class="col-12">
        <TextInput buttonText="Enter" placeholder="Name" />
      </div>
    </div>
    <div class="row" v-if="selectComponent == 'ReadyButton'">
      <div class="col-12">
        <ReadyButton :isPlayerReady="true" />
      </div>
    </div>
    <div class="row" v-if="selectComponent == 'PlayerReadyBar'">
      <div class="col-12">
        <PlayerReadyBar :players="players" />
      </div>
    </div>
    <div class="row" v-if="selectComponent == 'RoleReveal'">
      <div class="col-12">
        <RoleReveal
          :players="players"
          team="GOOD"
          role="MERLIN"
          :metadata="['111', '222']"
          :settings="{}"
          :isPlayerReady="true"
        />
      </div>
    </div>
    <div class="row" v-if="selectComponent == 'Lobby'">
      <div class="col-12">
        <Lobby :players="players" :isPlayerReady="true" />
      </div>
    </div>

    <div class="row" v-if="selectComponent == 'Waiting'">
      <div class="col-12">
        <Waiting :lines="['waiting', 'here is another line']" :isPlayerReady="true" />
      </div>
    </div>
    <div class="row" v-if="selectComponent == 'RoomClosed'">
      <div class="col-12">
        <RoomClosed />
      </div>
    </div>
    <div class="row" v-if="selectComponent == 'PlayerSelection'">
      <div class="col-12">
        <PlayerSelection
          :body="['player selection', 'here is another line']"
          :players="players"
          :requiredPlayers="2"
          :isPlayerReady="true"
          :proposedPlayerIds="['111']"
        />
      </div>
    </div>
    <div class="row" v-if="selectComponent == 'QuestResultReveal'">
      <div class="col-12">
        <QuestResultReveal
          :playerIsOrganiser="true"
          organiserName="Ben"
          :results="[{choice: 'SABOTAGE', revealed: true},{choice: 'SUCCEED', revealed: true},{choice: 'SABOTAGE', revealed: false}]"
          questResult
          :isPlayerReady="true"
        />
      </div>
    </div>
    <div class="row" v-if="selectComponent == 'QuestProposalVoteResult'">
      <div class="col-12">
        <QuestProposalVoteResult :players="players" :isPlayerReady="true" />
      </div>
    </div>
    <div class="row" v-if="selectComponent == 'QuestProposalVoteInput'">
      <div class="col-12">
        <QuestProposalVoteInput
          organiser="Sidd"
          :names="['Ben', 'Sam']"
          :isPlayerReady="true"
        />
      </div>
    </div>
    <div class="row" v-if="selectComponent == 'QuestOutcomeVoteInput'">
      <div class="col-12">
        <QuestOutcomeVoteInput
          :isEvil="true"
          vote="SABOTAGE"
          :names="['Ben', 'Sam']"
          :isPlayerReady="true"
        />
      </div>
    </div>
    <div class="row" v-if="selectComponent == 'Outcome'">
      <div class="col-12">
        <Outcome
          winner="GOOD"
          buttonText="Play Again"
          outcome="Good has taken the win!"
          :isPlayerReady="true"
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
    Outcome,
  },
  data() {
    return {
      players: [
        { id: "111", name: "Ben", ready: true, vote: "APPROVE" },
        { id: "222", name: "Sam", ready: false, vote: "APPROVE" },
        { id: "333", name: "Adam", ready: true, vote: "REJECT" },
        { id: "444", name: "Rodney", ready: false, vote: "APPROVE" },
        { id: "555", name: "Sidd", ready: false, vote: "APPROVE" },
        { id: "666", name: "Jim", ready: false, vote: "REJECT" },
      ],
      selectComponent: "Waiting",
      components: [
        "Waiting",
        "TextInput",
        "RoomClosed",
        "ReadyButton",
        "PlayerSelection",
        "PlayerReadyBar",
        "Lobby",
        "RoleReveal",
        "QuestResultReveal",
        "QuestProposalVoteResult",
        "QuestProposalVoteInput",
        "QuestOutcomeVoteInput",
        "Outcome",
      ],
    };
  }
};
</script>
