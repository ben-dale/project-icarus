(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d65a0aa"],{7921:function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container",attrs:{id:"app"}},[s("div",{staticClass:"row",class:{visible:"nameInputScreen"==t.screen,hidden:"nameInputScreen"!=t.screen}},[s("NameInput",{attrs:{buttonText:"Join"},on:{submit:t.joinSession}})],1),s("div",{staticClass:"row",class:{visible:"lobbyScreen"===t.screen,hidden:"lobbyScreen"!==t.screen}},[s("Lobby",{attrs:{socket:t.socket,roomId:t.roomId}})],1)])},a=[],r=(s("b0c0"),s("8055")),i=s.n(r),c=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-md-4 offset-md-4"},[s("div",{staticClass:"input-group input-group-lg"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Name","aria-label":"Name","aria-describedby":"button-start",maxlength:"10",required:""},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}}),s("div",{staticClass:"input-group-append"},[s("button",{staticClass:"btn btn-dark",attrs:{type:"button",id:"button-start"},on:{click:t.submit}},[t._v(t._s(t.buttonText))])])])])},o=[],l={name:"NameInput",props:{buttonText:String},data:function(){return{name:""}},methods:{submit:function(){this.$emit("submit",this.name)}}},d=l,u=s("2877"),m=Object(u["a"])(d,c,o,!1,null,null,null),b=m.exports,p=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-12"},[t._m(0),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12 mb-3"},[s("div",{staticClass:"card"},[s("h5",{staticClass:"card-header"},[t._v("Game settings")]),s("div",{staticClass:"card-body"},[t._m(1),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-4 mb-3"},[s("button",{class:["btn","btn-block",t.percivalSelected?"btn-info":"btn-outline-info"],attrs:{type:"button"},on:{click:function(e){return t.selectPercival()}}},[s("h5",[t._v("Percival")]),t._v("Knows Merlin's identity ")])]),s("div",{staticClass:"col-md-4 mb-3"},[s("button",{class:["btn","btn-block",t.morganaSelected?"btn-danger":"btn-outline-danger"],attrs:{type:"button"},on:{click:function(e){return t.selectMorgana()}}},[s("h5",[t._v("Morgana")]),t._v("Shows as a second Merlin to Percival ")])]),s("div",{staticClass:"col-md-4"},[s("button",{class:["btn","btn-block",t.oberonSelected?"btn-danger":"btn-outline-danger"],attrs:{type:"button"},on:{click:function(e){return t.selectOberon()}}},[s("h5",[t._v("Oberon")]),t._v("Is only known to Merlin ")])])])])])])]),s("div",{staticClass:"row mt-5 text-center"},[s("div",{staticClass:"col-12"},[t.playersStillNeeded()>0?s("p",{staticClass:"lead"},[t._v("Waiting for "+t._s(t.playersStillNeeded())+" more "+t._s(1==t.playersStillNeeded()?"player":"players")+"...")]):t._e(),0==t.playersStillNeeded()?s("p",{staticClass:"lead"},[t._v(" Waiting for all players to click "),s("span",{staticClass:"text-success"},[t._v("Ready")]),t._v(". ")]):t._e()])]),s("div",{staticClass:"row"},t._l(t.members,(function(e){return s("div",{key:e.id,staticClass:"col-6 col-md-4 mb-3 text-truncate text-center"},[e.empty?t._e():s("div",{class:[e.ready?t.readyClasses:"card"]},[s("div",{staticClass:"card-body"},[s("div",{staticClass:"card-text lead"},[t._v(t._s(e.name))])])]),e.empty?s("div",{staticClass:"card"},[s("div",{staticClass:"card-body"},[s("div",{staticClass:"card-text lead text-muted text-center"},[t._v(t._s(e.name))])])]):t._e()])})),0),s("div",{staticClass:"row mt-5"},[s("div",{staticClass:"col-md-4 offset-md-2 mb-3"},[t.playerReady()?t._e():s("button",{staticClass:"btn btn-success btn-lg btn-block",attrs:{type:"button"},on:{click:function(e){return t.readyUp()}}},[t._v("Ready up")]),t.playerReady()?s("button",{staticClass:"btn btn-warning btn-lg btn-block",attrs:{type:"button"},on:{click:function(e){return t.notReady()}}},[t._v("Cancel")]):t._e()]),s("div",{staticClass:"col-md-4"},[s("button",{staticClass:"btn btn-danger btn-lg btn-block",attrs:{type:"button"},on:{click:function(e){return t.leave()}}},[t._v("Leave")])])])])},v=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row mb-5"},[s("div",{staticClass:"col-md-12 text-center"},[s("h1",{staticClass:"display-4 pb-5"},[t._v("The Resistance: Avalon")]),s("p",{staticClass:"lead"},[t._v("The following screen will reveal which team you are in and which role you will play.")]),s("p",{staticClass:"lead"},[t._v("Further instruction and explanation will be provided as you play through the game.")]),s("p",{staticClass:"lead"},[t._v("The game will start when every one is ready.")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6 mb-3"},[s("button",{staticClass:"btn btn-info btn-block",attrs:{type:"button",disabled:""}},[s("h5",[t._v("Merlin")]),t._v("Can see all players in Good ")])]),s("div",{staticClass:"col-md-6 mb-3"},[s("button",{staticClass:"btn btn-danger btn-block",attrs:{type:"button",disabled:""}},[s("h5",[t._v("Assassin")]),t._v("Has an opportunity to steal the win after three successful quests ")])])])}],h=(s("ac1f"),s("5319"),{props:{socket:Object,roomId:String},data:function(){return{name:"",ownerSocketId:"",minPlayers:5,maxPlayers:10,members:[],currentMemberCount:0,readyClasses:"card bg-success text-white",currentPlayer:{},percivalSelected:!1,morganaSelected:!1,oberonSelected:!1}},created:function(){var t=this;this.socket.on("room-updated",(function(e){for(var s in t.percivalSelected=e.settings.percivalSelected,t.morganaSelected=e.settings.morganaSelected,t.oberonSelected=e.settings.oberonSelected,t.ownerSocketId=e.owner,t.members=[],e.members){var n={id:s,name:e.members[s].name,ready:e.members[s].ready};t.socket.id==s&&(t.currentPlayer=n),t.members.push(n)}t.currentMemberCount=t.members.length;for(var a=t.playersStillNeeded(),r=t.maxPlayers-(t.members.length+a),i=0;i<a;i++)t.members.push({id:i,name:"Required",empty:!0});for(var c=0;c<r;c++)t.members.push({id:c+100,name:"Optional",empty:!0})}))},methods:{selectPercival:function(){this.percivalSelected?this.percivalSelected=!1:this.percivalSelected=!0,this.emitSettingsChange()},selectMorgana:function(){this.morganaSelected?this.morganaSelected=!1:this.morganaSelected=!0,this.emitSettingsChange()},selectOberon:function(){this.oberonSelected?this.oberonSelected=!1:this.oberonSelected=!0,this.emitSettingsChange()},emitSettingsChange:function(){this.socket.emit("update-settings",{roomId:this.roomId,settings:{oberonSelected:this.oberonSelected,morganaSelected:this.morganaSelected,percivalSelected:this.percivalSelected}})},playersStillNeeded:function(){return this.currentMemberCount>=this.minPlayers?0:this.minPlayers-this.currentMemberCount},readyUp:function(){this.socket.emit("player-ready",{roomId:this.roomId})},notReady:function(){this.socket.emit("player-not-ready",{roomId:this.roomId})},playerReady:function(){return this.currentPlayer.ready},leave:function(){this.socket.disconnect(),this.$router.replace({name:"Avalon"})}}}),y=h,f=Object(u["a"])(y,p,v,!1,null,"0a7f0156",null),g=f.exports,C={name:"App",components:{NameInput:b,Lobby:g},props:{socket:{type:Object,default:function(){var t=null;return t=i.a.connect({upgrade:!1,transports:["websocket"]}),t}},roomId:String},data:function(){return{name:"",screen:"nameInputScreen"}},methods:{joinSession:function(t){this.name=t,this.screen="lobbyScreen",this.socket.emit("player-join",{name:this.name,roomId:this.roomId})}}},S=C,_=(s("e90e"),Object(u["a"])(S,n,a,!1,null,"c71ef26a",null));e["default"]=_.exports},"7d71":function(t,e,s){},b0c0:function(t,e,s){var n=s("83ab"),a=s("9bf2").f,r=Function.prototype,i=r.toString,c=/^\s*function ([^ (]*)/,o="name";n&&!(o in r)&&a(r,o,{configurable:!0,get:function(){try{return i.call(this).match(c)[1]}catch(t){return""}}})},e90e:function(t,e,s){"use strict";var n=s("7d71"),a=s.n(n);a.a}}]);
//# sourceMappingURL=chunk-4d65a0aa.56fddd56.js.map