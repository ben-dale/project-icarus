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
    >
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-3 mb-3" v-for="(val, key) in members" :key="key">
            <div class="card">
              <div class="card-body">
                <div class="card-text">
                  <span v-if="!val.ready" v-html="userIcon" class="mr-2"></span>
                  <span v-if="val.ready" v-html="userReadyIcon" class="mr-2"></span>
                  {{val.name}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-md-3 offset-md-3">
            <button type="button" class="btn btn-success btn-lg btn-block">Ready up</button>
          </div>
          <div class="col-md-3">
            <button type="button" class="btn btn-danger btn-lg btn-block">Leave</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import feather from "feather-icons";
import NameInput from "@/components/avalon/NameInput.vue";

export default {
  name: "App",
  components: { NameInput },
  props: {
    socket: {
      type: Object,
      default: function() {
        let socket = null;
        if (process.env.NODE_ENV == "development") {
          socket = io.connect("http://localhost:3000", {
            upgrade: false,
            transports: ["websocket"]
          });
        } else {
          socket = io.connect({ upgrade: false, transports: ["websocket"] });
        }
        return socket;
      }
    },
    roomId: String
  },
  computed: {
    userIcon: () => feather.icons["user"].toSvg(),
    userReadyIcon: () => feather.icons["user-check"].toSvg()
  },
  created() {
    this.socket.on("member-joined", memberData => {
      this.members = memberData.members;
    });
  },
  data: function() {
    return {
      name: "",
      screen: "nameInputScreen",
      members: {}
    };
  },
  methods: {
    joinSession: function(name) {
      this.name = name;
      this.screen = "lobbyScreen";
      this.socket.emit("join-room", { name: this.name, roomId: this.roomId });
    }
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