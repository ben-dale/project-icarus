<template>
  <div class="container">
    <div class="row mb-5">
      <Title />
    </div>
    <div class="row">
      <div class="col-12 col-lg-6 mb-4">
        <GameOption
          name="The Resistance: Avalon"
          description="Avalon pits the forces of Good and Evil in a battle to control the future of civilization."
          :minPlayers="5"
          :maxPlayers="10"
          :teams="2"
          @play="initAvalon"
        />
      </div>
      <div class="col-12 col-lg-6 mb-4">
        <GameOption
          name="The Resistance"
          description="The Empire must fall. Our mission must succeed. By destroying their key bases, we will shatter Imperial strength and liberate our people."
          :minPlayers="5"
          :maxPlayers="10"
          :teams="2"
          @play="initResistance"
          :comingSoon="true"
        />
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-12 col-lg-6 mb-5">
        <GameOption
          name="Secret Hitler"
          description="In pre-WW2 Germany, Liberals and Fascists square off in an intrigue-filled parliament."
          :minPlayers="5"
          :maxPlayers="10"
          :teams="2"
          @play="initResistance"
          :comingSoon="true"
        />
      </div>
      <div class="col-12 col-lg-6 mb-5">
        <GameOption
          name="Skull"
          description="Does the token hide a flower or skull? Bid, bluff and laugh with striking components."
          :minPlayers="3"
          :maxPlayers="6"
          :teams="0"
          @play="initResistance"
          :comingSoon="true"
        />
      </div>
    </div>

    <div class="row">
      <Footer />
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import GameOption from "@/components/index/GameOption.vue";
import Footer from '@/components/common/Footer.vue'
import Title from "@/components/index/Title.vue";

export default {
  name: "App",
  components: {
    GameOption,
    Footer,
    Title
  },
  methods: {
    initAvalon() {
      this.socket.emit("connect-avalon");
      this.socket.emit("init-avalon");
    },
    initResistance() {
      this.socket.emit("connect-resistance");
      this.socket.emit("init-resistance");
    },
    inDevMode() {
      return process.env.NODE_ENV == "development";
    }
  },
  data: function() {
    let socket = null;
    if (this.inDevMode()) {
      socket = io.connect("http://localhost:3000", {
        upgrade: false,
        transports: ["websocket"]
      });
    } else {
      socket = io.connect({ upgrade: false, transports: ["websocket"] });
    }
    socket.on("avalon-created", roomId => {
      this.$router.replace({ name: `AvalonGame`, params: { socket, roomId } });
    });
    socket.on("resistance-created", roomId => {
      this.$router.replace({ name: `ResistanceGame`, params: { socket, roomId } });
    })
    return { socket };
  }
};
</script>

