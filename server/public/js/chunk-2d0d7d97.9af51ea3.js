(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d7d97"],{7921:function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"container"},[e.room&&e.room.game&&!e.room.game.closed&&!e.room.playerIds.includes(e.socket.id)?o("div",{staticClass:"row"},[o("div",{staticClass:"col-12"},[e._m(0),o("div",{staticClass:"row"},[o("TextInput",{attrs:{buttonText:"Join",placeholder:"Name",length:8},on:{submit:e.joinSession}})],1)])]):e._e(),e.room&&e.room.game&&e.room.game.closed&&!e.room.playerIds.includes(e.socket.id)&&e.room.disconnectedPlayerIds.length>0?o("div",{staticClass:"row"},[o("div",{staticClass:"col-12"},[e._m(1),o("div",{staticClass:"row"},[o("TextInput",{attrs:{buttonText:"Rejoin",placeholder:"Code"},on:{submit:e.rejoinSession}})],1)])]):e._e(),e.room&&e.room.game&&e.room.game.closed&&!e.room.playerIds.includes(e.socket.id)&&0==e.room.disconnectedPlayerIds.length?o("div",{staticClass:"row"},[o("RoomClosed")],1):e._e(),e.room&&e.room.game.closed&&e.room.disconnectedPlayerIds.length>0&&e.room.playerIds.includes(e.getPlayerId())?o("div",e._l(e.getDisconnectedPlayers(),(function(t){return o("div",{key:t.id,staticClass:"row"},[o("div",{staticClass:"col-12"},[o("div",{staticClass:"card bg-dark border border-primary mb-5"},[o("div",{staticClass:"card-body text-light text-center py-5"},[o("p",{staticClass:"card-text"},[e._v(e._s(t.name)+" has left the game.")]),o("p",{staticClass:"card-text"},[e._v("The game will resume when "+e._s(t.name)+" rejoins the game.")]),o("p",{staticClass:"card-text"},[e._v(" They may rejoin the game using the code "),o("span",{staticClass:"bg-primary px-2 py-1"},[e._v(e._s(t.id))])])]),o("div",{staticClass:"card-footer bg-primary"},[o("button",{staticClass:"btn btn-secondary btn-block",attrs:{id:"copyLinkAndCodeButton"+t.id},on:{click:function(o){return e.copyLinkAndCode(t.id,t.name)}}},[e._v("Copy link + code")])])])])])})),0):e._e(),e.room&&e.room.game&&e.room.playerIds.includes(e.getPlayerId())&&"LOBBY"==e.room.game.screen?o("div",{staticClass:"row"},[o("Lobby",{attrs:{socket:e.socket,room:e.room,players:e.players,isPlayerReady:e.isPlayerReady,minPlayers:5},on:{"percival-enabled":e.percivalEnabled,"oberon-enabled":e.oberonEnabled,"morgana-enabled":e.morganaEnabled,"player-ready":e.readyUp,"player-not-ready":e.notReady}})],1):e._e(),e.room&&e.room.game&&e.room.playerIds.includes(e.getPlayerId())&&"ROLE_REVEAL"==e.room.game.screen&&0==e.room.disconnectedPlayerIds.length?o("div",{staticClass:"row"},[o("RoleReveal",{attrs:{players:e.players,isPlayerReady:e.isPlayerReady,team:e.team,role:e.role,settings:e.room.game.settings,metadata:e.metadata},on:{"player-ready":e.readyUp,"player-not-ready":e.notReady}})],1):e._e(),e.room&&e.room.game&&e.room.playerIds.includes(e.getPlayerId())&&"GAME"==e.room.game.screen&&0==e.room.disconnectedPlayerIds.length?o("div",{staticClass:"row"},[o("Game",{attrs:{game:e.room.game,players:e.players,team:e.team,role:e.role,vote:e.vote,playerId:e.getPlayerId(),isPlayerReady:e.isPlayerReady},on:{"reveal-quest-vote":e.revealQuestVote,"propose-player-for-quest":e.proposePlayerForQuest,"unpropose-player-for-quest":e.unproposePlayerForQuest,"select-merlin-for-id":e.selectMerlinForId,"unselect-merlin-for-id":e.unselectMerlinForId,"player-ready":e.readyUp,"player-not-ready":e.notReady,"player-approve-proposal":e.playerApproveVote,"player-succeed-quest":e.playerSucceedQuest}})],1):e._e(),o("div",{staticStyle:{"padding-bottom":"200px"}})])},a=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"row mb-3"},[o("div",{staticClass:"col-12 col-lg-8 offset-lg-2 text-center"},[o("h5",{staticClass:"text-light"},[e._v("Enter your name")])])])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"row mb-3"},[o("div",{staticClass:"col-12 col-lg-8 offset-lg-2 text-center"},[o("h5",{staticClass:"text-light"},[e._v("Enter your code")])])])}],s=(o("4de4"),o("7db0"),o("caad"),o("d81d"),o("fb6a"),o("2532"),o("8055")),n=o.n(s),i=o("3392"),d=o("8c2a"),l=o("c66c"),c=o("459e"),m=o("88c0"),u={name:"AvalonGame",components:{TextInput:d["a"],Lobby:l["a"],RoleReveal:c["a"],Game:m["a"],RoomClosed:i["a"]},props:{socket:{type:Object,default:function(){var e=null;return e=n.a.connect({upgrade:!1,transports:["websocket"]}),e.emit("connect-avalon"),e}},roomId:String},data:function(){return{room:null,players:[],team:null,role:null,vote:null,metadata:[]}},computed:{isPlayerReady:function(){var e=this,t=this.players.find((function(t){return t.id==e.getPlayerId()}));return t&&t.ready}},created:function(){var e=this;this.socket.on("players-updated",(function(t){e.players=t})),this.socket.on("player-updated",(function(t){var o=e.players.find((function(e){return e.id==t.id}));o.ready=t.ready})),this.socket.on("player-assigned",(function(t){e.team=t.team,e.role=t.role,e.vote=t.vote,e.metadata=t.metadata.slice()})),this.socket.on("room-updated",(function(t){e.room=t})),this.socket.emit("get-room",{roomId:this.roomId})},beforeRouteLeave:function(e,t,o){this.socket.close(),o()},methods:{getPageUrl:function(){return window.location.href},getDisconnectedPlayers:function(){var e=this;return this.room.disconnectedPlayerIds.filter((function(t){return e.room.playerIds.includes(t)})).map((function(t){return e.getPlayerById(t)})).filter((function(e){return e}))},getPlayerById:function(e){return this.players.find((function(t){return t.id==e}))},percivalEnabled:function(e){this.socket.emit("room-updated",{game:{settings:{percivalEnabled:e}}})},getPlayerId:function(){return this.socket.id},morganaEnabled:function(e){this.socket.emit("room-updated",{game:{settings:{morganaEnabled:e}}})},oberonEnabled:function(e){this.socket.emit("room-updated",{game:{settings:{oberonEnabled:e}}})},proposePlayerForQuest:function(e){this.socket.emit("room-updated",{game:{currentQuest:{playerIdToPropose:e}}})},revealQuestVote:function(e){this.socket.emit("room-updated",{game:{currentQuest:{voteToReveal:e}}})},unproposePlayerForQuest:function(e){this.socket.emit("room-updated",{game:{currentQuest:{playerIdToUnpropose:e}}})},selectMerlinForId:function(e){this.socket.emit("room-updated",{game:{currentQuest:{merlinIdToPropose:e}}})},unselectMerlinForId:function(e){this.socket.emit("room-updated",{game:{currentQuest:{merlinIdToUnpropose:e}}})},joinSession:function(e){this.socket.emit("player-joined",{name:e,roomId:this.roomId})},rejoinSession:function(e){this.socket.emit("player-rejoined",{id:e,roomId:this.roomId})},playerApproveVote:function(e){this.socket.emit("player-updated",{approveProposal:e})},playerSucceedQuest:function(e){this.socket.emit("player-updated",{succeedQuest:e})},readyUp:function(){this.socket.emit("player-updated",{ready:!0})},readyUpWithVote:function(e){this.socket.emit("player-updated",{ready:!0,vote:e})},notReady:function(){this.socket.emit("player-updated",{ready:!1})},copyLinkAndCode:function(e,t){navigator.clipboard.writeText("Hey, "+t+"! It looks like you left the game. Follow this link: "+window.location.href+" and enter the code: "+e);var o="copyLinkAndCodeButton"+e;document.getElementById(o).classList.remove("btn-secondary"),document.getElementById(o).classList.add("btn-primary"),document.getElementById(o).innerHTML="Copied!",setTimeout((function(){document.getElementById(o).classList.add("btn-secondary"),document.getElementById(o).classList.remove("btn-primary"),document.getElementById(o).innerHTML="Copy link + code"}),400)}}},p=u,y=o("2877"),g=Object(y["a"])(p,r,a,!1,null,null,null);t["default"]=g.exports}}]);
//# sourceMappingURL=chunk-2d0d7d97.9af51ea3.js.map