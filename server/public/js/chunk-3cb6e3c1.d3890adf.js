(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3cb6e3c1"],{"1dde":function(e,t,a){var s=a("d039"),r=a("b622"),n=a("2d00"),i=r("species");e.exports=function(e){return n>=51||!s((function(){var t=[],a=t.constructor={};return a[i]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},2532:function(e,t,a){"use strict";var s=a("23e7"),r=a("5a34"),n=a("1d80"),i=a("ab13");s({target:"String",proto:!0,forced:!i("includes")},{includes:function(e){return!!~String(n(this)).indexOf(r(e),arguments.length>1?arguments[1]:void 0)}})},"38d6":function(e,t,a){},"44e7":function(e,t,a){var s=a("861d"),r=a("c6b6"),n=a("b622"),i=n("match");e.exports=function(e){var t;return s(e)&&(void 0!==(t=e[i])?!!t:"RegExp"==r(e))}},"4de4":function(e,t,a){"use strict";var s=a("23e7"),r=a("b727").filter,n=a("1dde"),i=a("ae40"),o=n("filter"),l=i("filter");s({target:"Array",proto:!0,forced:!o||!l},{filter:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}})},"5a34":function(e,t,a){var s=a("44e7");e.exports=function(e){if(s(e))throw TypeError("The method doesn't accept regular expressions");return e}},"65f0":function(e,t,a){var s=a("861d"),r=a("e8b5"),n=a("b622"),i=n("species");e.exports=function(e,t){var a;return r(e)&&(a=e.constructor,"function"!=typeof a||a!==Array&&!r(a.prototype)?s(a)&&(a=a[i],null===a&&(a=void 0)):a=void 0),new(void 0===a?Array:a)(0===t?0:t)}},"66db":function(e,t,a){},"6aab":function(e,t,a){"use strict";var s=a("66db"),r=a.n(s);r.a},7921:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container",attrs:{id:"app"}},[a("div",{staticClass:"row",class:{visible:!e.room,hidden:e.room}},[a("NameInput",{attrs:{buttonText:"Join"},on:{submit:e.joinSession}})],1),e.room&&e.room.game.closed&&e.room.disconnectedPlayerIds.length>0?a("div",[a("h1",{staticClass:"text-white display-5 text-center pb-5"},[e._v("The game has been paused")]),e._l(e.getDisconnectedPlayers(),(function(t){return a("div",{key:t.id,staticClass:"card bg-primary"},[a("div",{staticClass:"card-body text-light text-center"},[a("p",{staticClass:"card-text"},[e._v(e._s(t.name)+" has disconnected from the game")]),a("p",{staticClass:"card-text"},[e._v("They may rejoin the game by visiting "+e._s(e.getPageUrl())+" and entering the name "+e._s(t.id))])])])}))],2):e._e(),e.room&&e.room.game&&e.room.game.closed&&!e.room.playerIds.includes(e.getPlayerId())?a("div",{staticClass:"row"},[a("RoomClosed")],1):e._e(),e.room&&e.room.game&&e.room.playerIds.includes(e.getPlayerId())&&"LOBBY"==e.room.game.screen?a("div",{staticClass:"row"},[a("Lobby",{attrs:{socket:e.socket,room:e.room,players:e.players,isPlayerReady:e.isPlayerReady},on:{"percival-enabled":e.percivalEnabled,"oberon-enabled":e.oberonEnabled,"morgana-enabled":e.morganaEnabled,"player-ready":e.readyUp,"player-not-ready":e.notReady}})],1):e._e(),e.room&&e.room.game&&e.room.playerIds.includes(e.getPlayerId())&&"ROLE_REVEAL"==e.room.game.screen&&0==e.room.disconnectedPlayerIds.length?a("div",{staticClass:"row"},[a("RoleReveal",{attrs:{players:e.players,isPlayerReady:e.isPlayerReady,team:e.team,role:e.role,settings:e.room.game.settings,metadata:e.metadata},on:{"player-ready":e.readyUp,"player-not-ready":e.notReady}})],1):e._e(),e.room&&e.room.game&&e.room.playerIds.includes(e.getPlayerId())&&"GAME"==e.room.game.screen&&0==e.room.disconnectedPlayerIds.length?a("div",{staticClass:"row"},[a("Game",{attrs:{game:e.room.game,players:e.players,team:e.team,role:e.role,playerId:e.getPlayerId(),isPlayerReady:e.isPlayerReady},on:{"reveal-quest-vote":e.revealQuestVote,"propose-player-for-quest":e.proposePlayerForQuest,"unpropose-player-for-quest":e.unproposePlayerForQuest,"select-merlin-for-id":e.selectMerlinForId,"unselect-merlin-for-id":e.unselectMerlinForId,"player-ready":e.readyUp,"player-not-ready":e.notReady,"player-approve-proposal":e.playerApproveVote,"player-succeed-quest":e.playerSucceedQuest}})],1):e._e(),a("div",{staticStyle:{"padding-bottom":"200px"}})])},r=[],n=(a("4de4"),a("7db0"),a("caad"),a("d81d"),a("fb6a"),a("b0c0"),a("2532"),a("8055")),i=a.n(n),o=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},l=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"col-12"},[a("div",{staticClass:"card bg-primary"},[a("div",{staticClass:"card-body text-light"},[a("div",{staticClass:"card-text text-center"},[e._v("Sorry! The game can no longer be joined.")])])])])}],c={name:"RoomClosed"},d=c,u=a("2877"),y=Object(u["a"])(d,o,l,!1,null,null,null),p=y.exports,m=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"col-md-4 offset-md-4"},[a("div",{staticClass:"input-group input-group-lg"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Name","aria-label":"Name","aria-describedby":"button-start",maxlength:"20",required:""},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}}),a("div",{staticClass:"input-group-append"},[a("button",{staticClass:"btn btn-primary",attrs:{type:"button",id:"button-start"},on:{click:e.submit}},[e._v(e._s(e.buttonText))])])])])},b=[],v={name:"NameInput",props:{buttonText:String},data:function(){return{name:""}},methods:{submit:function(){this.$emit("submit",this.name)}}},g=v,f=Object(u["a"])(g,m,b,!1,null,null,null),h=f.exports,_=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"col-12"},[a("div",{staticClass:"row mb-3"},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"card bg-primary text-light"},[a("p",{staticClass:"card-header"},[e._v("Game settings")]),a("div",{staticClass:"card-body"},[e._m(0),a("div",{staticClass:"row"},[a("div",{staticClass:"col-4"},[a("button",{class:["btn","border-secondary","btn-block",e.room&&e.room.game.settings.percivalEnabled?"btn-info":"btn-secondary",e.room&&e.room.game.settings.percivalEnabled?"border-info":"border"],attrs:{type:"button",disabled:!e.isRoomOwner},on:{click:function(t){return e.percivalEnabled(!e.room.game.settings.percivalEnabled)}}},[e._v(" Percival "),a("br"),e._v("Knows Merlin's identity ")])]),a("div",{staticClass:"col-4"},[a("button",{class:["btn","border-secondary","btn-block",e.room&&e.room.game.settings.morganaEnabled?"btn-danger":"btn-secondary",e.room&&e.room.game.settings.morganaEnabled?"border-danger":"border"],attrs:{type:"button",disabled:!e.isRoomOwner||e.room.game.settings.oberonEnabled&&e.players.length<7},on:{click:function(t){return e.morganaEnabled(!e.room.game.settings.morganaEnabled)}}},[e._v(" Morgana "),a("br"),e._v("Appears as a second Merlin to Percival ")])]),a("div",{staticClass:"col-4"},[a("button",{class:["btn","border-secondary","btn-block",e.room&&e.room.game.settings.oberonEnabled?"btn-danger":"btn-secondary",e.room&&e.room.game.settings.oberonEnabled?"border-danger":"border"],attrs:{type:"button",disabled:!e.isRoomOwner||e.room.game.settings.morganaEnabled&&e.players.length<7},on:{click:function(t){return e.oberonEnabled(!e.room.game.settings.oberonEnabled)}}},[e._v(" Oberon "),a("br"),e._v("Invisible to all but Merlin ")])])])])])])]),a("div",{staticClass:"row mb-3"},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"card bg-dark border border-primary text-center text-light"},[a("div",{staticClass:"card-body"},[a("p",{staticClass:"card-text"},[e._v("Further instruction and explanation will be provided as you play through The Resistance: Avalon.")]),a("p",{staticClass:"card-text"},[e._v("The next screen will reveal which team you are in and which role you will play.")]),e.playersStillNeeded>0?a("p",{staticClass:"card-text"},[e._v("We are still waiting for "+e._s(e.playersStillNeeded)+" more "+e._s(1==e.playersStillNeeded?"player":"players")+" to join the lobby.")]):e._e(),0==e.playersStillNeeded?a("p",{staticClass:"card-text"},[e._v(" Waiting for all players to click "),a("span",{staticClass:"badge badge-success"},[e._v("Ready")])]):e._e()])])])]),a("div",{staticClass:"row mb-5"},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"card bg-primary text-light"},[a("div",{staticClass:"card-body"},[a("div",{staticClass:"row text-center"},[e._l(e.players,(function(t){return a("div",{key:t.id,staticClass:"col-3"},[t.ready?a("p",{staticClass:"card-text bg-success text-white py-2 mb-3 border-success rounded"},[e._v(e._s(t.name))]):e._e(),t.ready?e._e():a("p",{staticClass:"card-text py-2 mb-3 text-dark rounded bg-secondary"},[e._v(e._s(t.name))])])})),e._l(e.playersStillNeeded,(function(t){return a("div",{key:t,staticClass:"col-3"},[a("p",{staticClass:"card-text text-light py-2 mb-3 border border-secondary rounded"},[e._v("Required")])])})),e._l(e.maxPlayers-(e.players.length+e.playersStillNeeded),(function(t){return a("div",{key:t+100,staticClass:"col-3"},[a("p",{staticClass:"card-text text-light border border-secondary rounded py-2"},[e._v("Optional")])])}))],2)]),a("div",{staticClass:"card-footer"},[a("ReadyButton",e._g({attrs:{isPlayerReady:e.isPlayerReady}},e.$listeners))],1)])])])])},C=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row mb-3"},[a("div",{staticClass:"col-6"},[a("button",{staticClass:"btn btn-info btn-block",attrs:{type:"button",disabled:""}},[e._v(" Merlin "),a("br"),e._v("Knows which team each player is a member of ")])]),a("div",{staticClass:"col-6"},[a("button",{staticClass:"btn btn-danger btn-block",attrs:{type:"button",disabled:""}},[e._v(" Assassin "),a("br"),e._v("Has an opportunity to steal the win after three successful quests ")])])])}],P=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("button",{class:["btn","btn-success","btn-block",e.large?"btn-lg":"",e.isPlayerReady?"btn-warning":"btn-success"],attrs:{type:"button",disabled:e.disabled},on:{click:e.click}},[e._v(e._s(e.isPlayerReady?"Not ready":"Ready"))])},R=[],w={name:"ReadyButton",props:{isPlayerReady:Boolean,large:Boolean,disabled:Boolean},methods:{click:function(){this.isPlayerReady?this.$emit("player-not-ready"):this.$emit("player-ready")}}},x=w,I=Object(u["a"])(x,P,R,!1,null,null,null),E=I.exports,S={name:"Lobby",components:{ReadyButton:E},props:{socket:Object,room:Object,players:Array,isPlayerReady:Boolean},data:function(){return{name:"",minPlayers:5,maxPlayers:10,currentMemberCount:0,readyClasses:"card bg-success text-white"}},computed:{isRoomOwner:function(){return this.room&&this.socket.id==this.room.ownerId},playersStillNeeded:function(){return this.players.length>=this.minPlayers?0:this.minPlayers-this.players.length}},methods:{percivalEnabled:function(e){this.$emit("percival-enabled",e)},morganaEnabled:function(e){this.$emit("morgana-enabled",e)},oberonEnabled:function(e){this.$emit("oberon-enabled",e)}}},k=S,O=Object(u["a"])(k,_,C,!1,null,"5920e06e",null),A=O.exports,Q=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"col-12"},[a("div",{staticClass:"row mb-5"},[a("div",{staticClass:"col-6 offset-3 text-center text-light"},[a("h2",{staticClass:"pt-2"},[a("span",{staticClass:"badge badge badge-info mx-2"},[e._v(e._s(e.goodPlayerCount()))]),e._v(" vs "),a("span",{staticClass:"badge badge badge-danger mx-2"},[e._v(e._s(e.players.length-e.goodPlayerCount()))])])])]),a("div",{staticClass:"row mb-4"},[a("div",{staticClass:"col-6 offset-3"},[a("div",{class:["card","text-center","EVIL"==e.team?"bg-danger":"bg-info"]},[a("div",{staticClass:"card-body text-white"},["GUARD"==e.role?a("h3",{staticClass:"card-title"},[e._v("You are a Royal Guard")]):e._e(),"MERLIN"==e.role?a("h3",{staticClass:"card-title"},[e._v("You are Merlin")]):e._e(),"OBERON"==e.role?a("h3",{staticClass:"card-title"},[e._v("You are Oberon")]):e._e(),"PERCIVAL"==e.role?a("h3",{staticClass:"card-title"},[e._v("You are Percival")]):e._e(),"ASSASSIN"==e.role?a("h3",{staticClass:"card-title"},[e._v("You are the Assassin")]):e._e(),"MINION"==e.role?a("h3",{staticClass:"card-title"},[e._v("You are a Minion")]):e._e(),"MORGANA"==e.role?a("h3",{staticClass:"card-title"},[e._v("You are Morgana")]):e._e(),"GOOD"==e.team&&"MERLIN"===e.role?a("p",{staticClass:"card-text"},[e._v("Your goal is to complete three quests. You know who is in Evil. The Assassin will have an opportunity to identify you after three successful quests. If the Assassin can identify you Evil will win.")]):e._e(),"GOOD"==e.team&&"PERCIVAL"===e.role&&1==e.metadata.length?a("p",{staticClass:"card-text"},[e._v("Your goal is to complete three quests. You know who Merlin is.")]):e._e(),"GOOD"==e.team&&"PERCIVAL"===e.role&&2==e.metadata.length?a("p",{staticClass:"card-text"},[e._v("Your goal is to complete three quests. You know who Merlin is but Morgana is appearing as a second Merlin which confuses you.")]):e._e(),"GOOD"==e.team&&"MERLIN"!==e.role&&"PERCIVAL"!==e.role?a("p",{staticClass:"card-text"},[e._v("Your goal is to complete three quests.")]):e._e(),"EVIL"==e.team&&"ASSASSIN"===e.role?a("p",{staticClass:"card-text"},[e._v("Your goal is to disrupt the flow of the game and stay undercover. You will be given an opportunity to identify Merlin after three successful quests. If you successfully identify Merlin you will steal the win.")]):e._e(),"EVIL"==e.team&&"ASSASSIN"!==e.role?a("p",{staticClass:"card-text"},[e._v("Your goal is to disrupt the flow of the game and stay undercover.")]):e._e()])])])]),"GUARD"!=e.role?a("div",{staticClass:"row mb-4"},[a("div",{staticClass:"col-6 offset-3"},[a("div",{staticClass:"card bg-dark border border-primary text-light"},["EVIL"==e.team||"MERLIN"==e.role?a("h5",{staticClass:"card-title text-center pt-3"},[e._v("Evil Team")]):e._e(),"EVIL"==e.team||"MERLIN"==e.role?a("h5",{staticClass:"card-text text-center mb-4"},e._l(e.metadata,(function(t,s){return a("span",{key:s,staticClass:"badge badge badge-danger mx-2"},[e._v(e._s(e.findPlayerName(t)))])})),0):e._e(),"PERCIVAL"==e.role?a("h5",{staticClass:"card-title text-center pt-3"},[e._v("Merlin is")]):e._e(),"PERCIVAL"==e.role?a("h5",{staticClass:"card-text pb-4 text-center"},[a("span",{staticClass:"badge badge-info mx-2"},[e._v(e._s(e.findPlayerName(e.metadata[0])))]),2==e.metadata.length?a("span",[e._v("or")]):e._e(),2==e.metadata.length?a("span",{staticClass:"badge badge-info mx-2"},[e._v(e._s(e.findPlayerName(e.metadata[1])))]):e._e()]):e._e()])])]):e._e(),a("div",{staticClass:"row mb-4"},[a("PlayerReadyBar",{attrs:{width:6,namesPerRow:2,players:e.players}})],1),a("div",{staticClass:"row"},[a("div",{staticClass:"col-6 offset-3"},[a("ReadyButton",e._g({attrs:{isPlayerReady:e.isPlayerReady}},e.$listeners))],1)])])},q=[],N=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{class:["col-"+e.width,"offset-"+e.getCardOffset()]},[a("div",{staticClass:"card bg-dark border border-primary"},[a("div",{staticClass:"card-body"},[a("div",{staticClass:"row text-center"},e._l(e.players,(function(t){return a("div",{key:t.id,class:["col-"+e.getNameWidth()]},[a("button",{class:[t.ready?"btn-success":"btn-primary border-primary","mb-3","btn btn-sm btn-block"],attrs:{disabled:""}},[e._v(e._s(t.name))])])})),0)])])])},$=[],B=(a("a9e3"),{name:"PlayerReadyBar",props:{players:Array,width:{type:Number,default:12},namesPerRow:{type:Number,default:6}},methods:{getNameWidth:function(){switch(this.namesPerRow){case 1:return 12;case 2:return 6;case 3:return 4;case 4:return 3;case 6:return 2}},getCardOffset:function(){switch(this.width){case 12:return 0;case 8:return 2;case 6:return 3}}}}),T=B,L=(a("ca42"),Object(u["a"])(T,N,$,!1,null,"2d300ea0",null)),M=L.exports,j={name:"RoleReveal",components:{PlayerReadyBar:M,ReadyButton:E},props:{team:String,role:String,settings:Object,ready:Boolean,socket:Object,metadata:Array,players:Array,isPlayerReady:Boolean},methods:{findPlayerName:function(e){return this.players.find((function(t){return t.id==e})).name},goodPlayerCount:function(){switch(this.players.length){case 5:return 3;case 6:return 4;case 7:return 4;case 8:return 5;case 9:return 6;case 10:return 6}}}},V=j,Y=Object(u["a"])(V,Q,q,!1,null,null,null),G=Y.exports,U=function(){var e=this,t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"row"},[s("QuestLog",{attrs:{questLog:t.game.questLogs,players:t.players,disagreements:t.game.currentQuest.disagreements}})],1),s("div",{staticClass:"row mb-3"},[s("PlayerReadyBar",{attrs:{players:t.players}})],1),"QUEST_PROPOSING"!=t.game.state||t.playerIsOrganiser?t._e():s("div",{staticClass:"row"},[s("Waiting",t._g({attrs:{header:"Team proposal",lines:["There are five quests to complete. Each quest has a nominated player that acts as the quest's leader.","Evil players sent on a quest have the option to 'Sabotage' the quest. If any 'Sabotage' votes are cast the quest will fail.",t.currentOrganiser.name+" is the current quest leader and is choosing a team for Quest "+t.game.currentQuest.id+"."],questId:t.game.currentQuest.id,isPlayerReady:t.isPlayerReady}},t.$listeners))],1),"QUEST_PROPOSING"==t.game.state&&t.playerIsOrganiser?s("div",{staticClass:"row"},[s("PlayerSelection",t._g({attrs:{header:"Quest "+t.game.currentQuest.id+" - Team proposal",body:["You are tasked with proposing a team for Quest "+t.game.currentQuest.id+". All players will vote to either 'Accept' or 'Reject' your proposal.","Evil players sent on a quest have the option to 'Sabotage' the quest. If any 'Sabotage' votes are cast the quest will fail.",t.game.currentQuest.requiredPlayers+" players are required for this quest. Click on the players you wish to nominate."],players:t.players,proposedPlayerIds:t.game.currentQuest.proposedPlayerIds,requiredPlayers:t.game.currentQuest.requiredPlayers,isPlayerReady:t.isPlayerReady,onPlayerSelected:function(t){return e.$emit("propose-player-for-quest",t)},onPlayerDeselected:function(t){return e.$emit("unpropose-player-for-quest",t)}}},t.$listeners))],1):t._e(),"QUEST_PROPOSAL"==t.game.state?s("div",{staticClass:"row"},[s("QuestProposalVoteInput",t._g({attrs:{questId:t.game.currentQuest.id,organiser:t.currentOrganiser.name,names:t.proposedQuestMemberNames,isPlayerReady:t.isPlayerReady}},t.$listeners))],1):t._e(),"QUEST_PROPOSAL_RESULT"==t.game.state?s("div",{staticClass:"row"},[s("QuestProposalVoteResult",t._g({attrs:{players:t.players,names:t.proposedQuestMemberNames,proposalAccepted:t.game.currentQuest.proposalAccepted,questId:t.game.currentQuest.id,isPlayerReady:t.isPlayerReady}},t.$listeners))],1):t._e(),"QUEST_STARTED"!=t.game.state||t.game.currentQuest.proposedPlayerIds.includes(t.playerId)?t._e():s("div",{staticClass:"row"},[s("Waiting",t._g({attrs:{header:"Quest underway",lines:["The quest is underway!","The result of the quest will be revealed when the quest has been completed and everyone is ready."],questId:t.game.currentQuest.id,isPlayerReady:t.isPlayerReady}},t.$listeners))],1),"QUEST_STARTED"==t.game.state&&t.game.currentQuest.proposedPlayerIds.includes(t.playerId)?s("div",{staticClass:"row"},[s("QuestOutcomeVoteInput",t._g({attrs:{players:t.proposedQuestPlayers,questId:t.game.currentQuest.id,isEvil:"EVIL"==t.team,isPlayerReady:t.isPlayerReady}},t.$listeners))],1):t._e(),"QUEST_RESULT_REVEAL"==t.game.state?s("div",{staticClass:"row mb-3"},[s("QuestResultReveal",t._g({attrs:{organiserName:t.currentOrganiser.name,playerIsOrganiser:t.playerIsOrganiser,results:t.game.currentQuest.votes,questId:t.game.currentQuest.id,questResult:t.game.currentQuest.result,isPlayerReady:t.isPlayerReady}},t.$listeners))],1):t._e(),"MERLIN_ID"==t.game.state&&"ASSASSIN"==this.role?s("div",{staticClass:"row"},[s("PlayerSelection",t._g({attrs:{header:"Quest "+t.game.currentQuest.id+" - Assassination attempt",body:["Your identity has been revealed to all players. You may now discuss openly with your team members who you believe Merlin is.","If you manage to successfully identify Merlin you will steal the win."],players:t.players.filter((function(e){return"GOOD"===e.team})),proposedPlayerIds:t.game.currentQuest.proposedPlayerIds,requiredPlayers:1,isPlayerReady:t.isPlayerReady,onPlayerSelected:function(t){return e.$emit("select-merlin-for-id",t)},onPlayerDeselected:function(t){return e.$emit("unselect-merlin-for-id",t)}}},t.$listeners))],1):t._e(),"MERLIN_ID"==t.game.state&&"ASSASSIN"!=this.role?s("div",{staticClass:"row"},[s("Waiting",t._g({attrs:{header:"Assassination attempt",lines:[this.players.filter((function(e){return"EVIL"==e.team})).map((function(e){return e.name})).join(", ")+" are in Evil and now may openly discuss who they believe Merlin is.",this.players.find((function(e){return"ASSASSIN"==e.role})).name+" is the Assassin. Their choice will be visible when everyone is ready."],questId:t.game.currentQuest.id,isPlayerReady:t.isPlayerReady}},t.$listeners))],1):t._e(),"GAME_OVER"==t.game.state&&"EVIL"==t.game.result?s("div",{staticClass:"row"},[s("Outcome",t._g({attrs:{winner:"EVIL",outcome:"Evil has taken the win!",buttonText:"Play Again",isPlayerReady:t.isPlayerReady}},t.$listeners))],1):t._e(),"GAME_OVER"==t.game.state&&"GOOD"==t.game.result?s("div",{staticClass:"row"},[s("Outcome",t._g({attrs:{winner:"GOOD",outcome:"The Assassin was not able to identify Merlin. Good has taken the win!",buttonText:"Play Again",isPlayerReady:t.isPlayerReady}},t.$listeners))],1):t._e()])},D=[],F=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"col-12"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("table",{staticClass:"table table-dark table-bordered bg-dark text-center text-light table-sm"},[e._m(0),a("tbody",e._l(e.questLog,(function(t){return a("tr",{key:t.id},[a("th",{class:{"bg-info text-white":"SUCCEED"===t.result,"bg-danger text-white":"FAIL"===t.result},attrs:{scope:"row"}},[e._v(e._s(t.id))]),a("td",[e._v(e._s(t.requiredPlayers))]),a("td",[e._v(e._s(e.getPlayerNameById(t.organiserId)))]),e._l(t.playerIds,(function(s,r){return a("td",{key:r*t.id},[e._v(e._s(e.getPlayerNameById(s)))])}))],2)})),0)])])]),a("div",{staticClass:"row mb-3"},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"card bg-dark border border-primary"},[a("div",{staticClass:"card-body text-light"},[e.disagreements<5?a("div",{staticClass:"card-text text-center"},[e._v("Evil will steal the win after "+e._s(5-e.disagreements)+" "+e._s(5-e.disagreements==5?"":"more")+" proposal "+e._s(5-e.disagreements==1?"rejection":"rejections")+".")]):e._e(),e.disagreements>=5?a("div",{staticClass:"card-text text-center"},[e._v("Players could not agree on who should go on the quest. The game is now over.")]):e._e()])])])])])},W=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("thead",{staticClass:"thead bg-primary"},[a("tr",[a("th",{attrs:{scope:"col"}},[e._v("Quest")]),a("th",{attrs:{scope:"col"}},[e._v("Players required")]),a("th",{attrs:{scope:"col"}},[e._v("Organiser")]),a("th",{staticClass:"text-center",attrs:{scope:"col",colspan:"5"}},[e._v("Members")])])])}],J={props:{players:Array,questLog:Array,disagreements:Number},methods:{getPlayerNameById:function(e){var t=this.players.find((function(t){return t.id==e}));return t&&t.name?t.name:""}}},H=J,K=(a("ad49"),Object(u["a"])(H,F,W,!1,null,"383ab256",null)),z=K.exports,X=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"card bg-primary text-light"},[a("div",{staticClass:"card-header"},[e._v("Quest "+e._s(e.questId)+" - Result")]),a("div",{staticClass:"card-body bg-dark text-center"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[e.playerIsOrganiser?e._e():a("p",[e._v(e._s(e.organiserName)+" is revealing the results...")]),e.playerIsOrganiser?a("p",[e._v("Reveal the results of the quest by clicking 'Reveal' under each result.")]):e._e()])]),a("div",{staticClass:"row"},e._l(e.results,(function(t,s){return a("div",{key:s,class:["col-2",0===s?"offset-"+e.resultOffset():""]},[t.revealed&&"SUCCEED"===t.choice?a("div",{staticClass:"py-5 bg-info border border-info rounded text-center text-white"},[e._v("Succeed")]):e._e(),t.revealed&&"SABOTAGE"===t.choice?a("div",{staticClass:"py-5 bg-danger border border-danger rounded text-center text-white"},[e._v("Sabotage")]):e._e(),t.revealed?e._e():a("div",{staticClass:"py-5 bg-transparent border rounded text-center"},[e._v(" Result ")])])})),0),e.playerIsOrganiser?a("div",{staticClass:"row"},e._l(e.results,(function(t,s){return a("div",{key:s,class:["col-2 mt-2",0===s?"offset-"+e.resultOffset():""]},[a("button",{staticClass:"btn btn-secondary btn-sm btn-block",attrs:{disabled:t.revealed},on:{click:function(t){return e.revealQuestVote(s)}}},[e._v("Reveal")])])})),0):e._e()]),a("div",{staticClass:"card-footer"},[a("ReadyButton",e._g({attrs:{isPlayerReady:e.isPlayerReady,disabled:""==e.questResult}},e.$listeners))],1)])])},Z=[],ee={name:"QuestResultReveal",components:{ReadyButton:E},props:{playerIsOrganiser:Boolean,organiserName:String,results:Array,questId:Number,questResult:String,isPlayerReady:Boolean},methods:{revealQuestVote:function(e){this.$emit("reveal-quest-vote",e)},resultOffset:function(){switch(this.results.length){case 2:return 4;case 3:return 3;case 4:return 2;case 5:return 1}}}},te=ee,ae=Object(u["a"])(te,X,Z,!1,null,null,null),se=ae.exports,re=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"col-12"},[a("div",{staticClass:"card bg-primary text-light"},[a("div",{staticClass:"card-header"},[e._v("Quest "+e._s(e.questId)+" - Proposal vote")]),a("div",{staticClass:"card-body bg-dark text-center"},[a("p",{staticClass:"card-text"},[e._v(e._s(e.organiser)+" has proposed the following team:")]),a("h5",{staticClass:"card-text mb-4"},e._l(e.names,(function(t,s){return a("span",{key:s,staticClass:"badge badge-info mx-2"},[e._v(e._s(t))])})),0),a("p",{staticClass:"card-text"},[e._v("Your vote will be seen by the other players. This is a majority vote.")])]),a("div",{staticClass:"card-footer"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-6"},[a("button",{staticClass:"btn btn-secondary btn-sm btn-block",attrs:{disabled:e.isPlayerReady},on:{click:function(t){return e.approve(!0)}}},[e._v("Approve")])]),a("div",{staticClass:"col-6"},[a("button",{staticClass:"btn btn-secondary btn-sm btn-block",attrs:{disabled:e.isPlayerReady},on:{click:function(t){return e.approve(!1)}}},[e._v("Reject")])])])])])])},ne=[],ie={props:{questId:Number,organiser:String,names:Array,isPlayerReady:Boolean},methods:{approve:function(e){this.$emit("player-approve-proposal",e)}}},oe=ie,le=Object(u["a"])(oe,re,ne,!1,null,null,null),ce=le.exports,de=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"card bg-primary text-light"},[a("div",{staticClass:"card-header"},[e._v("Quest "+e._s(e.questId)+" - Quest underway")]),a("div",{staticClass:"card-body bg-dark text-center"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("p",{staticClass:"card-text"},[e._v("This quest contains the following players:")]),a("h5",{staticClass:"card-text mb-5"},e._l(e.players,(function(t,s){return a("span",{key:s,staticClass:"badge badge-info mx-2"},[e._v(e._s(t))])})),0),e.isEvil?e._e():a("p",{staticClass:"card-text"},[e._v("You are in Good and can only vote 'Succeed'. Evil players on this quest may vote either 'Succeed' or 'Sabotage'.")]),e.isEvil?a("p",{staticClass:"card-text"},[e._v("You are in Evil and may vote either 'Succeed' or 'Sabotage'. Good players on this quest can only vote 'Succeed'.")]):e._e(),a("p",{staticClass:"card-text"},[e._v("How would you like to proceed? Your decision will be kept anonymous.")])])])]),a("div",{staticClass:"card-footer"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-6"},[a("button",{staticClass:"btn btn-sm btn-info btn-block",attrs:{disabled:e.isPlayerReady},on:{click:function(t){return e.succeed(!0)}}},[e._v("Succeed")])]),a("div",{staticClass:"col-6"},[a("button",{class:["btn","btn-sm",e.isEvil?"btn-danger":"btn-secondary","btn-block"],attrs:{disabled:!e.isEvil||e.isPlayerReady},on:{click:function(t){return e.succeed(!1)}}},[e._v("Sabotage")])])])])])])},ue=[],ye={props:{isEvil:Boolean,players:Array,questId:Number,isPlayerReady:Boolean},methods:{succeed:function(e){this.$emit("player-succeed-quest",e)}}},pe=ye,me=Object(u["a"])(pe,de,ue,!1,null,null,null),be=me.exports,ve=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"col-md-12"},[a("div",{class:["card","EVIL"==e.winner?"bg-danger":"bg-info"]},[a("div",{staticClass:"card-body text-center py-5"},[a("h4",{staticClass:"card-title text-white"},[e._v(e._s(e.outcome))])]),a("div",{staticClass:"card-footer"},[a("button",{staticClass:"btn btn-secondary btn-block",attrs:{disabled:e.isPlayerReady},on:{click:e.ready}},[e._v(e._s(e.buttonText))])])])])},ge=[],fe={props:{winner:String,outcome:String,buttonText:String,isPlayerReady:Boolean},methods:{ready:function(){this.$emit("player-ready")}}},he=fe,_e=Object(u["a"])(he,ve,ge,!1,null,null,null),Ce=_e.exports,Pe=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"card bg-primary text-light"},[a("div",{staticClass:"card-header"},[e._v("Quest "+e._s(e.questId)+" - Proposal result")]),a("div",{staticClass:"card-body bg-dark text-center"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-5 offset-1"},[a("h5",[e._v("Approve")]),a("hr",{staticClass:"border border-primary"}),a("h5",e._l(e.players.filter((function(e){return"APPROVE"==e.vote})),(function(t,s){return a("span",{key:s,staticClass:"badge badge-info mx-2 my-2"},[e._v(e._s(t.name))])})),0)]),a("div",{staticClass:"col-5"},[a("h5",[e._v("Reject")]),a("hr",{staticClass:"border border-primary"}),a("h5",e._l(e.players.filter((function(e){return"REJECT"==e.vote})),(function(t,s){return a("span",{key:s,staticClass:"badge badge-info mx-2 my-2"},[e._v(e._s(t.name))])})),0)])])]),a("div",{staticClass:"card-footer"},[a("ReadyButton",e._g({attrs:{isPlayerReady:e.isPlayerReady}},e.$listeners))],1)])])},Re=[],we={components:{ReadyButton:E},props:{players:Array,proposalAccepted:Boolean,questId:Number,isPlayerReady:Boolean}},xe=we,Ie=Object(u["a"])(xe,Pe,Re,!1,null,null,null),Ee=Ie.exports,Se=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"col-12"},[a("div",{staticClass:"card bg-primary text-light"},[a("div",{staticClass:"card-header"},[e._v("Quest "+e._s(e.questId)+" - "+e._s(e.header))]),a("div",{staticClass:"card-body bg-dark text-center"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},e._l(e.lines,(function(t,s){return a("p",{key:s,staticClass:"card-text"},[e._v(e._s(t))])})),0)])]),a("div",{staticClass:"card-footer"},[a("ReadyButton",e._g({attrs:{isPlayerReady:e.isPlayerReady}},e.$listeners))],1)])])},ke=[],Oe={name:"Waiting",components:{ReadyButton:E},props:{questId:Number,organiserName:String,lines:Array,header:String,isPlayerReady:Boolean}},Ae=Oe,Qe=Object(u["a"])(Ae,Se,ke,!1,null,null,null),qe=Qe.exports,Ne=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"col-12"},[a("div",{staticClass:"card bg-primary text-light"},[a("div",{staticClass:"card-header"},[e._v(e._s(e.header))]),a("div",{staticClass:"card-body bg-dark"},[a("div",{staticClass:"row mb-4"},[a("div",{staticClass:"col-12 text-center"},e._l(e.body,(function(t,s){return a("p",{key:s},[e._v(e._s(t))])})),0)]),a("div",{staticClass:"row mb-4"},e._l(e.players,(function(t,s){return a("div",{key:s,class:["col-2 mb-2",s%5===0?"offset-1":"",s%3===0&&3==e.players.length?"offset-3":""]},[e.proposedPlayerIds.includes(t.id)?e._e():a("button",{staticClass:"btn btn-secondary btn-sm btn-block",attrs:{disabled:e.isPlayerReady||e.requiredPlayers==e.proposedPlayerIds.length},on:{click:function(a){return e.onPlayerSelected(t.id)}}},[e._v(e._s(t.name))]),e.proposedPlayerIds.includes(t.id)?a("button",{staticClass:"btn btn-info btn-sm btn-block",attrs:{disabled:e.isPlayerReady},on:{click:function(a){return e.onPlayerDeselected(t.id)}}},[e._v(e._s(t.name))]):e._e()])})),0)]),a("div",{staticClass:"card-footer"},[a("ReadyButton",e._g({attrs:{isPlayerReady:e.isPlayerReady,disabled:e.requiredPlayers!=e.proposedPlayerIds.length}},e.$listeners))],1)])])},$e=[],Be={name:"PlayerSelection",components:{ReadyButton:E},props:{header:String,body:Array,players:Array,requiredPlayers:Number,isPlayerReady:Boolean,proposedPlayerIds:Array,onPlayerSelected:Function,onPlayerDeselected:Function}},Te=Be,Le=Object(u["a"])(Te,Ne,$e,!1,null,null,null),Me=Le.exports,je={components:{QuestLog:z,QuestResultReveal:se,QuestProposalVoteInput:ce,QuestOutcomeVoteInput:be,Outcome:Ce,QuestProposalVoteResult:Ee,Waiting:qe,PlayerReadyBar:M,PlayerSelection:Me},props:{game:Object,players:Array,playerId:String,team:String,role:String,isPlayerReady:Boolean},computed:{playerIsOrganiser:function(){return this.playerId==this.game.currentQuest.organiserId},currentOrganiser:function(){var e=this;return this.players.find((function(t){return t.id==e.game.currentQuest.organiserId}))},proposedQuestPlayers:function(){for(var e=[],t=0;t<this.game.currentQuest.proposedPlayerIds.length;t++)e.push(this.getPlayerNameById(this.game.currentQuest.proposedPlayerIds[t]));return e},proposedQuestMemberNames:function(){var e=this;return this.game.currentQuest.proposedPlayerIds.map((function(t){return e.getPlayerNameById(t)}))}},methods:{getPlayerById:function(e){return this.players.find((function(t){return t.id==e}))},getPlayerNameById:function(e){var t=this.players.find((function(t){return t.id==e}));return t&&t.name?t.name:""},revealQuestResult:function(e){this.$emit("reveal-quest-result",e)}}},Ve=je,Ye=Object(u["a"])(Ve,U,D,!1,null,null,null),Ge=Ye.exports,Ue={name:"AvalonGame",components:{NameInput:h,Lobby:A,RoleReveal:G,Game:Ge,RoomClosed:p},props:{socket:{type:Object,default:function(){var e=null;return e=i.a.connect({upgrade:!1,transports:["websocket"]}),e}},roomId:String},data:function(){return{room:null,players:[],team:null,role:null,metadata:[]}},computed:{isPlayerReady:function(){var e=this,t=this.players.find((function(t){return t.id==e.getPlayerId()}));return t&&t.ready}},created:function(){var e=this;this.socket.on("players-updated",(function(t){e.players=t})),this.socket.on("player-updated",(function(t){var a=e.players.find((function(e){return e.id==t.id}));a.ready=t.ready})),this.socket.on("player-assigned",(function(t){e.team=t.team,e.role=t.role,e.metadata=t.metadata.slice()})),this.socket.on("room-updated",(function(t){e.room=t}))},methods:{getPageUrl:function(){return window.location.href},getDisconnectedPlayers:function(){var e=this;return this.room.disconnectedPlayerIds.filter((function(t){return e.room.playerIds.includes(t)})).map((function(t){return e.getPlayerById(t)})).filter((function(e){return e}))},getPlayerById:function(e){return this.players.find((function(t){return t.id==e}))},percivalEnabled:function(e){this.socket.emit("room-updated",{game:{settings:{percivalEnabled:e}}})},getPlayerId:function(){return this.socket.id},morganaEnabled:function(e){this.socket.emit("room-updated",{game:{settings:{morganaEnabled:e}}})},oberonEnabled:function(e){this.socket.emit("room-updated",{game:{settings:{oberonEnabled:e}}})},proposePlayerForQuest:function(e){this.socket.emit("room-updated",{game:{currentQuest:{playerIdToPropose:e}}})},revealQuestVote:function(e){this.socket.emit("room-updated",{game:{currentQuest:{voteToReveal:e}}})},unproposePlayerForQuest:function(e){this.socket.emit("room-updated",{game:{currentQuest:{playerIdToUnpropose:e}}})},selectMerlinForId:function(e){this.socket.emit("room-updated",{game:{currentQuest:{merlinIdToPropose:e}}})},unselectMerlinForId:function(e){this.socket.emit("room-updated",{game:{currentQuest:{merlinIdToUnpropose:e}}})},joinSession:function(e){this.name=e,this.socket.emit("player-joined",{name:this.name,roomId:this.roomId})},playerApproveVote:function(e){this.socket.emit("player-updated",{ready:!0,approveProposal:e})},playerSucceedQuest:function(e){this.socket.emit("player-updated",{ready:!0,succeedQuest:e})},readyUp:function(){this.socket.emit("player-updated",{ready:!0})},readyUpWithVote:function(e){this.socket.emit("player-updated",{ready:!0,vote:e})},notReady:function(){this.socket.emit("player-updated",{ready:!1})}}},De=Ue,Fe=(a("6aab"),Object(u["a"])(De,s,r,!1,null,"0b09aad1",null));t["default"]=Fe.exports},"7db0":function(e,t,a){"use strict";var s=a("23e7"),r=a("b727").find,n=a("44d2"),i=a("ae40"),o="find",l=!0,c=i(o);o in[]&&Array(1)[o]((function(){l=!1})),s({target:"Array",proto:!0,forced:l||!c},{find:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}}),n(o)},8418:function(e,t,a){"use strict";var s=a("c04e"),r=a("9bf2"),n=a("5c6c");e.exports=function(e,t,a){var i=s(t);i in e?r.f(e,i,n(0,a)):e[i]=a}},a6ad:function(e,t,a){},ab13:function(e,t,a){var s=a("b622"),r=s("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(a){try{return t[r]=!1,"/./"[e](t)}catch(s){}}return!1}},ad49:function(e,t,a){"use strict";var s=a("a6ad"),r=a.n(s);r.a},ae40:function(e,t,a){var s=a("83ab"),r=a("d039"),n=a("5135"),i=Object.defineProperty,o={},l=function(e){throw e};e.exports=function(e,t){if(n(o,e))return o[e];t||(t={});var a=[][e],c=!!n(t,"ACCESSORS")&&t.ACCESSORS,d=n(t,0)?t[0]:l,u=n(t,1)?t[1]:void 0;return o[e]=!!a&&!r((function(){if(c&&!s)return!0;var e={length:-1};c?i(e,1,{enumerable:!0,get:l}):e[1]=1,a.call(e,d,u)}))}},b0c0:function(e,t,a){var s=a("83ab"),r=a("9bf2").f,n=Function.prototype,i=n.toString,o=/^\s*function ([^ (]*)/,l="name";s&&!(l in n)&&r(n,l,{configurable:!0,get:function(){try{return i.call(this).match(o)[1]}catch(e){return""}}})},b727:function(e,t,a){var s=a("0366"),r=a("44ad"),n=a("7b0b"),i=a("50c4"),o=a("65f0"),l=[].push,c=function(e){var t=1==e,a=2==e,c=3==e,d=4==e,u=6==e,y=5==e||u;return function(p,m,b,v){for(var g,f,h=n(p),_=r(h),C=s(m,b,3),P=i(_.length),R=0,w=v||o,x=t?w(p,P):a?w(p,0):void 0;P>R;R++)if((y||R in _)&&(g=_[R],f=C(g,R,h),e))if(t)x[R]=f;else if(f)switch(e){case 3:return!0;case 5:return g;case 6:return R;case 2:l.call(x,g)}else if(d)return!1;return u?-1:c||d?d:x}};e.exports={forEach:c(0),map:c(1),filter:c(2),some:c(3),every:c(4),find:c(5),findIndex:c(6)}},ca42:function(e,t,a){"use strict";var s=a("38d6"),r=a.n(s);r.a},caad:function(e,t,a){"use strict";var s=a("23e7"),r=a("4d64").includes,n=a("44d2"),i=a("ae40"),o=i("indexOf",{ACCESSORS:!0,1:0});s({target:"Array",proto:!0,forced:!o},{includes:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}}),n("includes")},d81d:function(e,t,a){"use strict";var s=a("23e7"),r=a("b727").map,n=a("1dde"),i=a("ae40"),o=n("map"),l=i("map");s({target:"Array",proto:!0,forced:!o||!l},{map:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}})},e8b5:function(e,t,a){var s=a("c6b6");e.exports=Array.isArray||function(e){return"Array"==s(e)}},fb6a:function(e,t,a){"use strict";var s=a("23e7"),r=a("861d"),n=a("e8b5"),i=a("23cb"),o=a("50c4"),l=a("fc6a"),c=a("8418"),d=a("b622"),u=a("1dde"),y=a("ae40"),p=u("slice"),m=y("slice",{ACCESSORS:!0,0:0,1:2}),b=d("species"),v=[].slice,g=Math.max;s({target:"Array",proto:!0,forced:!p||!m},{slice:function(e,t){var a,s,d,u=l(this),y=o(u.length),p=i(e,y),m=i(void 0===t?y:t,y);if(n(u)&&(a=u.constructor,"function"!=typeof a||a!==Array&&!n(a.prototype)?r(a)&&(a=a[b],null===a&&(a=void 0)):a=void 0,a===Array||void 0===a))return v.call(u,p,m);for(s=new(void 0===a?Array:a)(g(m-p,0)),d=0;p<m;p++,d++)p in u&&c(s,d,u[p]);return s.length=d,s}})}}]);
//# sourceMappingURL=chunk-3cb6e3c1.d3890adf.js.map