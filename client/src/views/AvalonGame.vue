<template>
  <div id="app" class="container">
    <div
      class="row"
      v-bind:class="{ 'visible': screen == 'nameInputScreen', 'hidden': screen != 'nameInputScreen' }"
    >
      <NameInput buttonText="Join" @submit="joinSession" />
    </div>
    <div
      class="row"
      v-bind:class="{ 'visible': screen === 'lobbyScreen', 'hidden': screen !== 'lobbyScreen' }"
    >{{members}}</div>

  </div>
</template>

<script>
import io from "socket.io-client";
import NameInput from "@/components/avalon/NameInput.vue";

export default {
  name: "App",
  components: { NameInput },
  props: {
    socket: {
      type: Object,
      default: function() {
        let socket = io.connect("http://localhost:3000", {
          upgrade: false,
          transports: ["websocket"]
        });
        return socket;
      }
    },
    roomId: String
  },
  created() {
    this.socket.on('member-joined', (memberData) => {
      this.members = memberData.members;
    });
  },
  data: function() {
    return {
      name: "",
      screen: "nameInputScreen",
      members: []
    };
  },
  methods: {
    joinSession: function(name) {
      this.name = name;
      this.screen = "lobbyScreen"
      this.socket.emit('join-room', { name: this.name, roomId: this.roomId });
    },
  }
};
</script>
<style scoped>
.hidden {
  display: none;
}
.visible {
  display: flex;
}
</style>