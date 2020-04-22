<template>
  <div>
    <p>hello</p>
    <button v-on:click="test">test</button>
  </div>
</template>

<script>
  import io from "socket.io-client";

  export default {
    name: 'App',
    components: {
     
    },
    props: {
      socket: {
        type: Object,
        default: function() {
          return io.connect("http://localhost:3000", { upgrade: false, transports: ['websocket'] });
        }
      },
      gameId: String
    },
    methods: {
      test: function() {
        console.log(this.socket.id);
      }
    }
  }
</script>
