<template>

  <!-- <div class="col-md-4">
        <div class="card">
          <img src="https://place-hold.it/200x100" class="card-img-top" />
          <div class="card-body text-center">
            <h5 class="card-title">You are Merlin</h5>
            <p class="card-text">You can see all players in Good.</p>
            <p
              class="card-text"
            >After three successful quests the Assassin will have an opportunity to identify you.</p>
            <p
              class="card-text"
            >If the Assassin manages to successfully identify you, Evil will take the win.</p>
            <p class="card-text">Keep your identity hidden at all costs.</p>
          </div>
        </div>
  </div>-->
  <!-- <div class="col-md-4">
        <div class="card">
          <img src="https://place-hold.it/200x100" class="card-img-top" />
          <div class="card-body text-center">
            <h5 class="card-title">You are Percival</h5>
            <p
              class="card-text"
            >Only you know the identity of Merlin, however Morgana is also disguised as Merlin!</p>
          </div>
        </div>
  </div>-->
  
  <div class="col-md-12">
    <div class="row mb-4">
      <div class="col-md-8 offset-md-2">
        <div class="card">
          <div class="card-body text-center">
            <h3 class="card-title">You are a guard</h3>
            <p class="card-text">You are in Good, and that's all you know.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-8 offset-md-2">
        <div class="card">
          <h5 class="card-header">Things you need to know about your team</h5>
          <div class="card-body">
            <p class="card-text">You are in Good, along with Percival, Merlin and two other guards.</p>
            <p class="card-text">You do not know the identity of anyone, or what team they are in.</p>
            <p
              class="card-text"
            >The goal of Good is to successfully complete three out of five quests and help Merlin avoid identification by the Assassin.</p>
            <p
              class="card-text"
            >You only have the option to succeed quests that you are sent on, however, Evil team members can choose to succeed or sabotage quests they are sent on.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-8 offset-md-2">
        <div class="card">
          <h5 class="card-header">Things you need to know about the game</h5>
          <div class="card-body">
            <p class="card-text">There are three minions in Evil, along with Morgana and Oberon.</p>
            <p
              class="card-text"
            >Evil team members know who is in Evil and the identity of the Assassin.</p>
            <p
              class="card-text"
            >Merlin knows which team each person is in, but does not know anyone's role.</p>
            <p
              class="card-text"
            >Percival knows the identity of Merlin, however Morgana is also disguised as Merlin.</p>
            <p class="card-text">Nobody knows the identity of Oberon.</p>

            <p
              class="card-text"
            >After three successful quests the Assassin will have an opportunity to identify Merlin.</p>
            <p
              class="card-text"
            >Evil will take the win if the Assassin manages to successfully identify Merlin.</p>
            <p
              class="card-text"
            >Evil will take the win if they manage to sabotage three out of five quests.</p>
            <p
              class="card-text"
            >Evil will take the win if five team proposals are rejected for a single quest.</p>
            <p
              class="card-text"
            >Don't worry if this is your first time playing, more instructions and explanation will be provided as you play.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-8 offset-md-2">
        <div class="card">
          <div class="card-body">
            <div class="row text-center">
              <div v-for="player in players" class="col-md-3" :key="player.id">
                <div v-if="player.ready" class="bg-success text-white pt-2 pb-1 mb-3 border border-success rounded">
                  <h5>{{player.name}}</h5>
                </div>
                <div v-if="!player.ready" class="text-dark pt-2 pb-1 mb-3 border rounded">
                  <h5>{{player.name}}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <button
          v-if="!isPlayerReady"
          v-on:click="readyUp()"
          type="button"
          class="btn btn-success btn-lg btn-block"
        >Ready</button>
        <button
          v-if="isPlayerReady"
          v-on:click="notReady()"
          type="button"
          class="btn btn-warning btn-lg btn-block"
        >Cancel</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    team: String,
    role: String,
    ready: Boolean,
    socket: Object,
    players: {
      type: Array,
      default: function() {
        return [{
          id: 1,
          name: "ben"
        },{
          id: 2,
          name: "ben"
        },{
          id: 3,
          name: "ben"
        },{
          id: 4,
          name: "ben"
        }];
      }
    },
    isPlayerReady: Boolean
  },
  methods: {
    readyUp: function() {
      this.$emit("readyUp");
    },
    notReady: function() {
      this.$emit("notReady");
    }
  }
};
</script>