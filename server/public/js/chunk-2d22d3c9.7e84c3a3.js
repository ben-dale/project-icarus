(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22d3c9"],{f746:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container",attrs:{id:"app"}},[s("div",{staticClass:"row"},[s("Title")],1),e._m(0),e._m(1),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-8 offset-md-2"},[s("button",{staticClass:"btn btn-dark btn-lg btn-block",on:{click:function(t){return e.startNewGame(e.socket)}}},[e._v("Start a new game")])])]),e._m(2),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-8 offset-md-2"},[s("router-link",{staticClass:"btn btn-dark btn-lg btn-block",attrs:{to:"/avalon/thing"}},[e._v("Join an existing game")])],1)])])},o=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12"},[s("h4",[e._v("The plot")]),s("p",[e._v(" The Resistance: Avalon pits the forces of Good and Evil in a battle to control the future of civilization. Arthur represents the future of Britain, a promise of prosperity and honour, yet hidden among his brave warriors are Mordred's unscrupulous minions. These forces of evil are few but have knowledge of each other and remain hidden from all but one of Arthur's servants. Merlin alone knows the agents of evil, but he must speak of this only in riddles. If his true identity is discovered, all will be lost. ")])])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12"},[s("h4",[e._v("The play")]),s("p",[e._v(" There are two teams: Good and Evil. Each player is randomly assigned to either Good or Evil at the start of the game. Players in Good don't know the identity of anyone. Players in Evil know the identity of everyone in Evil, and thus can infer who is in Good. ")]),s("p",[e._v(" The aim of the game for Good is to succeed three quests. The aim of the game for Evil is to fail three quests. There are only five quests. ")]),s("p",[e._v(" Each round one player will be assigned to choose a number of players to set out on a quest. The quest will not start until it's proposed participants have been agreed by a majority of players. ")]),s("p",[e._v(' Once the quest proposal is agreed, the quest participants will vote on the outcome of the quest. Evil players on the quest can vote either "Succeed" or "Fail". Good players can vote only "Succeed". The quest will fail if a single Evil player on the quest votes "Fail". ')]),s("p",[e._v(" As well as being randomly assigned to a team at the start of the game, you are also assigned one of the following roles: "),s("ul",[s("li",[e._v("Merlin: One player on Good is assigned the role of Merlin. Merlin knows the identity of everyone in Good, and thus can infer who is in Evil.")]),s("li",[e._v("Assassin: One player on Evil is assigned the role of Assassin. If Good manages to succeed three quests the Assassin will be given the opportunity to assassinate Merlin. If they succeed in assassinating Merlin they will steal the win.")]),s("li",[e._v("Loyal servent of Arthur: standard Good player")]),s("li",[e._v("Servant of Mordred: standard Evil player")])])])])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"row py-2"},[s("div",{staticClass:"col-md-12 text-center"},[s("h5",[e._v("- or -")])])])}],n=(s("ac1f"),s("5319"),s("714d")),i=s("8055"),r=s.n(i),l={name:"App",components:{Title:n["a"]},methods:{startNewGame:function(e){e.emit("avalon-start-new-game")}},data:function(){var e=this,t=null;return t=r.a.connect({upgrade:!1,transports:["websocket"]}),t.on("avalon-room-created",(function(s){var a=s.id;e.$router.replace({name:"AvalonGame",params:{socket:t,roomId:a}})})),{socket:t}}},d=l,c=s("2877"),h=Object(c["a"])(d,a,o,!1,null,null,null);t["default"]=h.exports}}]);
//# sourceMappingURL=chunk-2d22d3c9.7e84c3a3.js.map