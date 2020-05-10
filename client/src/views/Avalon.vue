<template>
  <div id="app" class="container">
    <div class="row">
      <Title />
    </div>
    <div class="row pb-5 text-light">
      <div class="col-md-10 offset-md-1">
        <p>
          The Resistance: Avalon pits the forces of Good and Evil in a battle to control the future of civilization. Arthur represents the future of Britain, a promise of prosperity and honour, yet hidden among his brave warriors are Mordred's unscrupulous minions. These forces of evil are few but have knowledge of each other and remain hidden from all but one of Arthur's servants. Merlin alone knows the agents of evil, but he must speak of this only in riddles. If his true identity is discovered, all will be lost.
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <button v-on:click="startNewGame(socket)" class="btn btn-dark btn-block">Start a new game</button>
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
        socket.emit('init-avalon');
      }
    },
    data: function() {
      let socket = null;
      if (process.env.NODE_ENV == "development") {
        socket = io.connect("http://localhost:3000", {upgrade: false,transports: ["websocket"]});
      } else {
        socket = io.connect({upgrade: false,transports: ["websocket"]});
      }
      socket.on("avalon-created", roomId => {
        this.$router.replace({ name: `AvalonGame`, params: { socket, roomId } });
      });
      return { socket }
    }
  }
</script>
