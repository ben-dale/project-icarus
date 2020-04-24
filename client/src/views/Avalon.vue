<template>
  <div id="app" class="container">
    <div class="row">
      <Title />
    </div>
    <div class="row">
      <div class="col-md-12">
        <h4>The plot</h4>
        <p>
          The Resistance: Avalon pits the forces of Good and Evil in a battle to control the future of civilization. Arthur represents the future of Britain, a promise of prosperity and honour, yet hidden among his brave warriors are Mordred's unscrupulous minions. These forces of evil are few but have knowledge of each other and remain hidden from all but one of Arthur's servants. Merlin alone knows the agents of evil, but he must speak of this only in riddles. If his true identity is discovered, all will be lost.
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <h4>The play</h4>
        <p>
          There are two teams: Good and Evil. Each player is randomly assigned to either Good or Evil at the start of the game. Players in Good don't know the identity of anyone. Players in Evil know the identity of everyone in Evil, and thus can infer who is in Good.
        </p>
        <p>
          The aim of the game for Good is to succeed three quests. The aim of the game for Evil is to fail three quests. There are only five quests.
        </p>
        <p>
          Each round one player will be assigned to choose a number of players to set out on a quest. The quest will not start until it's proposed participants have been agreed by a majority of players.
        </p>
        <p>
          Once the quest proposal is agreed, the quest participants will vote on the outcome of the quest. Evil players on the quest can vote either "Succeed" or "Fail". Good players can vote only "Succeed". The quest will fail if a single Evil player on the quest votes "Fail".
        </p>
        <p>
          As well as being randomly assigned to a team at the start of the game, you are also assigned one of the following roles:
          <ul>
            <li>Merlin: One player on Good is assigned the role of Merlin. Merlin knows the identity of everyone in Good, and thus can infer who is in Evil.</li>
            <li>Assassin: One player on Evil is assigned the role of Assassin. If Good manages to succeed three quests the Assassin will be given the opportunity to assassinate Merlin. If they succeed in assassinating Merlin they will steal the win.</li>
            <li>Loyal servent of Arthur: standard Good player</li>
            <li>Servant of Mordred: standard Evil player</li>
          </ul>
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <button v-on:click="startNewGame(socket)" class="btn btn-dark btn-lg btn-block">Start a new game</button>
      </div>
    </div>
    <div class="row py-2">
      <div class="col-md-12 text-center">
        <h5>- or -</h5>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 offset-md-2">
         <router-link to="/avalon/thing" class="btn btn-dark btn-lg btn-block">Join an existing game</router-link>
      </div>
    </div>
  </div>
</template>


<script>
  import Title from '@/components/avalon/Title.vue'
  import io from "socket.io-client";
  export default {
    name: 'App',
    components: {
      Title
    },
    methods: {
      startNewGame: function(socket) {
        socket.emit('avalon-start-new-game');
      }
    },
    data: function() {
      let socket = null;
      if (process.env.NODE_ENV == "development") {
        socket = io.connect("http://localhost:3000", {upgrade: false,transports: ["websocket"]});
      } else {
        socket = io.connect({upgrade: false,transports: ["websocket"]});
      }
      socket.on("avalon-room-created", roomData => {
        let roomId = roomData.id;
        this.$router.replace({ name: `AvalonGame`, params: { socket, roomId } });
      });
      return { socket }
    }
  }


</script>
