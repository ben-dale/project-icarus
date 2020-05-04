(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4257076e"],{"1dde":function(e,t,s){var a=s("d039"),r=s("b622"),i=s("2d00"),l=r("species");e.exports=function(e){return i>=51||!a((function(){var t=[],s=t.constructor={};return s[l]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"65f0":function(e,t,s){var a=s("861d"),r=s("e8b5"),i=s("b622"),l=i("species");e.exports=function(e,t){var s;return r(e)&&(s=e.constructor,"function"!=typeof s||s!==Array&&!r(s.prototype)?a(s)&&(s=s[l],null===s&&(s=void 0)):s=void 0),new(void 0===s?Array:s)(0===t?0:t)}},7921:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container",attrs:{id:"app"}},[s("div",{staticClass:"row",class:{visible:!e.room,hidden:e.room}},[s("NameInput",{attrs:{buttonText:"Join"},on:{submit:e.joinSession}})],1),s("div",{staticClass:"row",class:{visible:e.room&&"LOBBY"===e.room.game.screen,hidden:!e.room||"LOBBY"!==e.room.game.screen}},[s("Lobby",{attrs:{socket:e.socket,room:e.room,players:e.players,isPlayerReady:e.isPlayerReady},on:{"percival-enabled":e.percivalEnabled,"oberon-enabled":e.oberonEnabled,"morgana-enabled":e.morganaEnabled,"player-ready":e.readyUp,"player-not-ready":e.notReady}})],1),s("div",{staticClass:"row",class:{visible:e.room&&"ROLE_REVEAL"===e.room.game.screen,hidden:!e.room||"ROLE_REVEAL"!==e.room.game.screen}},[s("Reveal",{attrs:{players:e.players,isPlayerReady:e.isPlayerReady,team:e.team,role:e.role,settings:e.room&&e.room.game?e.room.game.settings:{},metadata:e.metadata},on:{"player-ready":e.readyUp,"player-not-ready":e.notReady}})],1),s("div",{staticClass:"row",class:{visible:e.room&&"GAME"===e.room.game.screen,hidden:!e.room||"GAME"!==e.room.game.screen}},[s("Game",{attrs:{game:e.room&&e.room.game?e.room.game:{},players:e.players,team:e.team,role:e.role,playerId:e.getPlayerId(),isPlayerReady:e.isPlayerReady},on:{"reveal-quest-result":e.revealQuestResult,"propose-team":e.proposeTeam,"player-ready":e.readyUp,"player-not-ready":e.notReady}})],1)])},r=[],i=(s("7db0"),s("fb6a"),s("b0c0"),s("8055")),l=s.n(i),n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col-md-4 offset-md-4"},[s("div",{staticClass:"input-group input-group-lg"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Name","aria-label":"Name","aria-describedby":"button-start",maxlength:"10",required:""},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}}),s("div",{staticClass:"input-group-append"},[s("button",{staticClass:"btn btn-dark",attrs:{type:"button",id:"button-start"},on:{click:e.submit}},[e._v(e._s(e.buttonText))])])])])},o=[],c={name:"NameInput",props:{buttonText:String},data:function(){return{name:""}},methods:{submit:function(){this.$emit("submit",this.name)}}},d=c,u=s("2877"),p=Object(u["a"])(d,n,o,!1,null,null,null),m=p.exports,v=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col-12"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"card"},[s("h5",{staticClass:"card-header text-center"},[e._v("Game settings")]),s("div",{staticClass:"card-body"},[e._m(0),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-4 mb-3"},[s("button",{class:["btn","btn-block",e.room&&e.room.game.settings.percivalEnabled?"btn-info":"btn-light",e.room&&e.room.game.settings.percivalEnabled?"border-info":"border"],attrs:{type:"button",disabled:!e.isRoomOwner},on:{click:function(t){return e.percivalEnabled(!e.room.game.settings.percivalEnabled)}}},[s("h5",[e._v("Percival")]),e._v("Knows Merlin's identity ")])]),s("div",{staticClass:"col-md-4 mb-3"},[s("button",{class:["btn","btn-block",e.room&&e.room.game.settings.morganaEnabled?"btn-danger":"btn-light",e.room&&e.room.game.settings.morganaEnabled?"border-danger":"border"],attrs:{type:"button",disabled:!e.isRoomOwner},on:{click:function(t){return e.morganaEnabled(!e.room.game.settings.morganaEnabled)}}},[s("h5",[e._v("Morgana")]),e._v("Appears as a second Merlin to Percival ")])]),s("div",{staticClass:"col-md-4"},[s("button",{class:["btn","btn-block",e.room&&e.room.game.settings.oberonEnabled?"btn-danger":"btn-light",e.room&&e.room.game.settings.oberonEnabled?"border-danger":"border"],attrs:{type:"button",disabled:!e.isRoomOwner},on:{click:function(t){return e.oberonEnabled(!e.room.game.settings.oberonEnabled)}}},[s("h5",[e._v("Oberon")]),e._v("Invisible to all but Merlin ")])])])])])])]),s("div",{staticClass:"row pt-4 pb-3"},[s("div",{staticClass:"col-md-12 text-center"},[s("p",{staticClass:"lead"},[e._v("Further instruction and explanation will be provided as you play through The Resistance: Avalon.")]),s("p",{staticClass:"lead"},[e._v("The next screen will reveal which team you are in and which role you will play.")]),e.playersStillNeeded>0?s("p",{staticClass:"lead"},[e._v("We are still waiting for "+e._s(e.playersStillNeeded)+" more "+e._s(1==e.playersStillNeeded?"player":"players")+" to join the lobby.")]):e._e(),0==e.playersStillNeeded?s("p",{staticClass:"lead"},[e._v(" Waiting for all players to click "),s("span",{staticClass:"badge badge-success"},[e._v("Ready")])]):e._e()])]),s("div",{staticClass:"row mb-5"},[s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body"},[s("div",{staticClass:"row text-center"},[e._l(e.players,(function(t){return s("div",{key:t.id,staticClass:"col-md-3"},[t.ready?s("div",{staticClass:"bg-success text-white pt-2 pb-1 mb-3 border border-success rounded"},[s("h5",[e._v(e._s(t.name))])]):e._e(),t.ready?e._e():s("div",{staticClass:"text-dark pt-2 pb-1 mb-3 border bg-light rounded"},[s("h5",[e._v(e._s(t.name))])])])})),e._l(e.playersStillNeeded,(function(t){return s("div",{key:t,staticClass:"col-md-3"},[e._m(1,!0)])})),e._l(e.maxPlayers-(e.players.length+e.playersStillNeeded),(function(t){return s("div",{key:t+100,staticClass:"col-md-3"},[e._m(2,!0)])}))],2)])])])]),s("div",{staticClass:"row mb-5"},[s("div",{staticClass:"col-md-6 offset-md-3"},[s("ReadyButton",e._g({attrs:{large:!0,isPlayerReady:e.isPlayerReady}},e.$listeners))],1)])])},b=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6 mb-3"},[s("button",{staticClass:"btn btn-info btn-block",attrs:{type:"button",disabled:""}},[s("h5",[e._v("Merlin")]),e._v("Knows which team each player is a member of ")])]),s("div",{staticClass:"col-md-6 mb-3"},[s("button",{staticClass:"btn btn-danger btn-block",attrs:{type:"button",disabled:""}},[s("h5",[e._v("Assassin")]),e._v("Has an opportunity to steal the win after three successful quests ")])])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"text-secondary pt-2 pb-1 mb-3 border rounded"},[s("h5",[e._v("Required")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"text-secondary pt-2 pb-1 mb-3 border rounded"},[s("h5",[e._v("Optional")])])}],y=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("button",{class:["btn","btn-success","btn-block",e.large?"btn-lg":"",e.isPlayerReady?"btn-warning":"btn-success"],attrs:{type:"button"},on:{click:e.click}},[e._v(e._s(e.isPlayerReady?"Not ready":"Ready"))])},h=[],f={name:"ReadyButton",props:{isPlayerReady:Boolean,large:Boolean},methods:{click:function(){this.isPlayerReady?this.$emit("player-not-ready"):this.$emit("player-ready")}}},g=f,_=Object(u["a"])(g,y,h,!1,null,null,null),C=_.exports,w={name:"Lobby",components:{ReadyButton:C},props:{socket:Object,room:Object,players:{type:Array,default:function(){return[]}},isPlayerReady:Boolean},data:function(){return{name:"",minPlayers:5,maxPlayers:10,currentMemberCount:0,readyClasses:"card bg-success text-white"}},computed:{isRoomOwner:function(){return this.room&&this.socket.id==this.room.ownerId},playersStillNeeded:function(){return this.players.length>=this.minPlayers?0:this.minPlayers-this.players.length}},methods:{percivalEnabled:function(e){this.$emit("percival-enabled",e)},morganaEnabled:function(e){this.$emit("morgana-enabled",e)},oberonEnabled:function(e){this.$emit("oberon-enabled",e)}}},E=w,x=Object(u["a"])(E,v,b,!1,null,"4b203a4f",null),R=x.exports,P=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col-12"},[s("div",{staticClass:"row mb-4"},[s("div",{staticClass:"col-12"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body text-center"},["GUARD"==e.role?s("h3",{staticClass:"card-title"},[e._v("You are a guard")]):e._e(),"MERLIN"==e.role?s("h3",{staticClass:"card-title"},[e._v("You are Merlin")]):e._e(),"OBERON"==e.role?s("h3",{staticClass:"card-title"},[e._v("You are Oberon")]):e._e(),"PERCIVAL"==e.role?s("h3",{staticClass:"card-title"},[e._v("You are Percival")]):e._e(),"ASSASSIN"==e.role?s("h3",{staticClass:"card-title"},[e._v("You are the Assassin")]):e._e(),"MINION"==e.role?s("h3",{staticClass:"card-title"},[e._v("You are a minion")]):e._e(),"MORGANA"==e.role?s("h3",{staticClass:"card-title"},[e._v("You are Morgana")]):e._e(),"EVIL"==e.team?s("p",{staticClass:"card-text"},[e._v("You are in Evil")]):e._e(),"GOOD"==e.team?s("p",{staticClass:"card-text"},[e._v("You are in Good")]):e._e()])])])]),s("div",{staticClass:"row mb-4"},[s("div",{staticClass:"col-12"},[s("div",{staticClass:"card"},[s("h5",{staticClass:"card-header"},[e._v("Things you need to know about your team")]),"EVIL"==e.team||"MERLIN"==e.role?s("h5",{staticClass:"card-title text-center pt-3"},[e._v("Members of Evil")]):e._e(),"EVIL"==e.team||"MERLIN"==e.role?s("h4",{staticClass:"card-text text-center"},e._l(e.metadata,(function(t,a){return s("span",{key:a,staticClass:"badge badge-pill badge-danger mx-2"},[e._v(e._s(e.findPlayerName(t)))])})),0):e._e(),"PERCIVAL"==e.role?s("h5",{staticClass:"card-title text-center pt-3"},[e._v("Merlin is")]):e._e(),"PERCIVAL"==e.role?s("h4",{staticClass:"card-text text-center"},[s("span",{staticClass:"badge badge-pill badge-info mx-2"},[e._v(e._s(e.findPlayerName(e.metadata[0])))]),2==e.metadata.length?s("span",[e._v("or")]):e._e(),2==e.metadata.length?s("span",{staticClass:"badge badge-pill badge-info mx-2"},[e._v(e._s(e.findPlayerName(e.metadata[1])))]):e._e()]):e._e(),"GOOD"==e.team&&"MERLIN"!=e.role?s("div",{staticClass:"card-body"},["PERCIVAL"==e.role&&e.settings.morganaEnabled?s("p",{staticClass:"card-text"},[e._v("As Percival you are given the identity of Merlin, however Morgana is also disguised as Merlin.")]):e._e(),"PERCIVAL"!=e.role||e.settings.morganaEnabled?e._e():s("p",{staticClass:"card-text"},[e._v("As Percival you are given the identity of Merlin.")]),"GUARD"==e.role?s("p",{staticClass:"card-text"},[e._v("You do not know the identity of anyone else, or what team they are in.")]):e._e()]):e._e(),"MERLIN"==e.role?s("div",{staticClass:"card-body"},[s("p",{staticClass:"card-text"},[e._v("As Merlin you are told who is in Evil. Evil team members also know who is in Evil.")]),s("p",{staticClass:"card-text"},[e._v("Evil will take the win if you are successfully identified by the Assassin after three successful quests.")])]):e._e(),"EVIL"==e.team?s("div",{staticClass:"card-body"},["MORGANA"==e.role?s("p",{staticClass:"card-text"},[e._v("As Morgana you are disguised as Merlin, which confuses Percival.")]):e._e(),"OBERON"==e.role?s("p",{staticClass:"card-text"},[e._v("As Oberon your identity is hidden to all players except Merlin. Evil members do not know that you are in Evil.")]):e._e(),"ASSASSIN"==e.role?s("p",{staticClass:"card-text"},[e._v("As the Assassin you will have a chance to identify Merlin if three quests are successfully completed. If you are successful Evil will take the win.")]):e._e(),s("p",{staticClass:"card-text"},[e._v("As an Evil team member you are told who is in Evil. You also have the option to sabotage quests that you are sent on.")]),s("p",{staticClass:"card-text"},[e._v("Disclosing who you are could cost you the game.")])]):e._e()])])]),s("div",{staticClass:"row mb-4"},[s("div",{staticClass:"col-12"},[s("div",{staticClass:"card"},[s("h5",{staticClass:"card-header"},[e._v("Things you need to know about the game")]),s("div",{staticClass:"card-body"},[s("p",{staticClass:"card-text"},[e._v("The goal of Good is to successfully complete three out of five quests and help Merlin avoid identification by the Assassin.")]),s("p",{staticClass:"card-text"},[e._v("The goal of Evil is to disrupt the flow of the game by sabotaging as many quests as they can without exposing their identity.")]),s("p",{staticClass:"card-text"},[e._v("There are five quests that can be completed. Each turn a player will be nominated as the quest's leader and will propose a team.")]),s("p",{staticClass:"card-text"},[e._v("All players will vote to agree or disagree with the team proposal.")]),s("p",{staticClass:"card-text"},[e._v("If the proposal is not accepted the quest is not started and a new quest leader is chosen.")]),s("p",{staticClass:"card-text"},[e._v("If the proposal is accepted the quest will begin and the quest members will be asked for the outcome they would like.")]),s("p",{staticClass:"card-text"},[e._v("Good members on the quest may only choose 'Success' as the outcome, however Evil members can choose to 'Sabotage' the quest.")]),s("p",{staticClass:"card-text"},[e._v("If all players choose 'Success' the quest will be completed successfully and the play moves to the next quest with a new quest leader.")]),s("p",{staticClass:"card-text"},[e._v("If an Evil team member is on the quest and they choose to 'Sabotage' the quest, the quest will fail and the play moves to the next quest with a new quest leader.")]),s("p",{staticClass:"card-text"},[e._v("At the start of the game Evil team members are told which players are in Evil.")]),s("p",{staticClass:"card-text"},[e._v("At the start of the game Guards are told that they are in Good and are given no other information.")]),s("p",{staticClass:"card-text"},[e._v("At the start of the game Merlin is told which players are in Evil.")]),e.settings.percivalEnabled&&e.settings.morganaEnabled?s("p",{staticClass:"card-text"},[e._v("At the start of the game Percival is told the identity of Merlin, however Morgana is also disguised as Merlin.")]):e._e(),e.settings.percivalEnabled&&!e.settings.morganaEnabled?s("p",{staticClass:"card-text"},[e._v("At the start of the game Percival is told the identity of Merlin.")]):e._e(),e.settings.oberonEnabled?s("p",{staticClass:"card-text"},[e._v("Oberon is not revealed to Evil players but is revealed to Merlin.")]):e._e(),s("p",{staticClass:"card-text"},[e._v("After three successful quests the Assassin will have an opportunity to identify Merlin.")]),s("p",{staticClass:"card-text"},[e._v("Good will take the win if the Assassin does not manage to successfully identify Merlin.")]),s("p",{staticClass:"card-text"},[e._v("Evil will take the win if the Assassin manages to successfully identify Merlin.")]),s("p",{staticClass:"card-text"},[e._v("Evil will take the win if three out of the five quests are sabotaged.")]),s("p",{staticClass:"card-text"},[e._v("Evil will take the win if five team proposals are rejected for a single quest.")]),s("p",{staticClass:"card-text"},[e._v("Don't worry if this is your first time playing. Instructions and explanation will be provided to you as you play.")])])])])]),s("div",{staticClass:"row mb-4"},[s("PlayerReadyBar",{attrs:{players:e.players}})],1),s("div",{staticClass:"row"},[s("div",{staticClass:"col-6 offset-3"},[s("ReadyButton",e._g({attrs:{large:!0,isPlayerReady:e.isPlayerReady}},e.$listeners))],1)])])},k=[],A=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col-12"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body"},[s("div",{staticClass:"row text-center"},e._l(e.players,(function(t,a){return s("div",{key:t.id,staticClass:"col-2"},[s("div",{class:[t.ready?"bg-success text-white":"text-dark bg-light",a>5?"mt-3":"","pt-2","pb-2","border","rounded"]},[s("span",[e._v(e._s(t.name))])])])})),0)])])])},O=[],I={name:"PlayerReadyBar",props:{players:Array}},S=I,q=Object(u["a"])(S,A,O,!1,null,null,null),T=q.exports,Q={name:"Reveal",components:{PlayerReadyBar:T,ReadyButton:C},props:{team:String,role:String,settings:Object,ready:Boolean,socket:Object,metadata:Array,players:Array,isPlayerReady:Boolean},methods:{findPlayerName:function(e){return this.players.find((function(t){return t.id==e})).name}}},N=Q,M=Object(u["a"])(N,P,k,!1,null,null,null),L=M.exports,$=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"row mb-3"},[s("QuestLog",{attrs:{questLog:e.game.questLogs,players:e.players}})],1),s("div",{staticClass:"row mb-3"},[s("PlayerReadyBar",{attrs:{players:e.players}})],1),"QUEST_PROPOSING"!=e.game.state||e.playerIsOrganiser?e._e():s("div",{staticClass:"row"},[s("QuestProposalWaiting",e._g({attrs:{questId:e.game.currentQuest.id,organiserName:e.currentOrganiser.name,isPlayerReady:e.isPlayerReady}},e.$listeners))],1),"QUEST_PROPOSING"==e.game.state&&e.playerIsOrganiser?s("div",{staticClass:"row"},[s("QuestProposalInput",{attrs:{questId:e.game.currentQuest.id,players:e.players,requiredPlayers:e.requiredPlayers,isPlayerReady:e.isPlayerReady},on:{"propose-team":e.proposeTeam}})],1):e._e(),"QUEST_PROPOSAL"==e.game.state?s("div",{staticClass:"row"},[s("QuestProposalVoteInput",{attrs:{organiser:e.currentOrganiser.name,names:e.proposedQuestMemberNames}})],1):e._e(),"QUEST_PROPOSAL_RESULT"==e.game.state?s("div",{staticClass:"row"},[s("QuestProposalVoteResult",{attrs:{players:e.players,proposalAccepted:e.game.currentQuest.proposalAccepted}})],1):e._e(),"QUEST_STARTED"!=e.game.state||e.game.currentQuest.proposedPlayerIds.includes(e.playerId)?e._e():s("div",{staticClass:"row"},[s("PlainOutput",{attrs:{line:"The results of the quest will be revealed shortly."}})],1),"QUEST_STARTED"==e.game.state&&e.game.currentQuest.proposedPlayerIds.includes(e.playerId)?s("div",{staticClass:"row"},[s("QuestOutcomeVoteInput",{attrs:{members:e.proposedQuestMembers,isEvil:"EVIL"==e.team}})],1):e._e(),"QUEST_RESULT_REVEAL"==e.game.state?s("div",{staticClass:"row mb-3"},[s("QuestResultReveal",{attrs:{organiserName:e.currentOrganiser.name,playerIsOrganiser:e.playerIsOrganiser,results:e.game.currentQuest.votes},on:{"reveal-quest-result":e.revealQuestResult}})],1):e._e(),"QUEST_RESULT"==e.game.state?s("div",{staticClass:"row mb-3"},[s("Outcome",{attrs:{result:"FAIL",outcome:"The quest was sabotaged",buttonText:"Ready"}})],1):e._e(),"QUEST_RESULT"==e.game.state?s("div",{staticClass:"row mb-3"},[s("Outcome",{attrs:{result:"SUCCEED",outcome:"The quest was completed successfully",buttonText:"Ready"}})],1):e._e()])},B=[],j=(s("d81d"),function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"card"},[s("h5",{staticClass:"card-header bg-light"},[e._v("Quest log")]),s("div",{staticClass:"card-body"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12"},[s("table",{staticClass:"table text-center table-bordered table-sm"},[e._m(0),s("tbody",e._l(e.questLog,(function(t){return s("tr",{key:t.id},[s("th",{class:{"bg-info text-white":"SUCCEED"===t.result,"bg-danger text-white":"FAIL"===t.result},attrs:{scope:"row"}},[e._v(e._s(t.id))]),s("td",[e._v(e._s(t.requiredPlayers))]),s("td",[e._v(e._s(e.getPlayerNameById(t.organiserId)))]),e._l(t.playerIds,(function(a,r){return s("td",{key:r*t.id},[e._v(e._s(e.getPlayerNameById(a)))])}))],2)})),0)])])])])])])}),U=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("thead",[s("tr",[s("th",{attrs:{scope:"col"}},[e._v("Quest")]),s("th",{attrs:{scope:"col"}},[e._v("Players required")]),s("th",{attrs:{scope:"col"}},[e._v("Organiser")]),s("th",{staticClass:"text-center",attrs:{scope:"col",colspan:"5"}},[e._v("Members")])])])}],G={props:{players:Array,questLog:Array},methods:{getPlayerNameById:function(e){var t=this.players.find((function(t){return t.id==e}));return t&&t.name?t.name:""}}},V=G,Y=Object(u["a"])(V,j,U,!1,null,null,null),D=Y.exports,W=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body text-center"},[s("div",{staticClass:"row mb-3"},e._l(e.results,(function(t,a){return s("div",{key:a,class:["col-2",0===a?"offset-"+e.resultOffset():""]},[t.revealed&&"SUCCEED"===t.choice?s("div",{staticClass:"py-5 bg-info border border-info rounded text-center text-white"},[s("h5",[e._v("Succeed")])]):e._e(),t.revealed&&"SABOTAGE"===t.choice?s("div",{staticClass:"py-5 bg-danger border border-danger rounded text-center text-white"},[s("h5",[e._v("Sabotage")])]):e._e(),t.revealed?e._e():s("div",{staticClass:"py-5 bg-light border rounded text-center"},[s("h5",[e._v("Result")])])])})),0),!e.playerIsOrganiser&&e.results.filter((function(e){return!e.revealed})).length>0?s("div",{staticClass:"row"},[s("div",{staticClass:"col-12"},[e._v(e._s(e.organiserName)+" is revealing the results.")])]):e._e(),e.playerIsOrganiser&&e.results.filter((function(e){return!e.revealed})).length>0?s("div",{staticClass:"row"},e._l(e.results,(function(t,a){return s("div",{key:a,class:["col-2",0===a?"offset-"+e.resultOffset():""]},[s("button",{staticClass:"btn btn-dark btn-block",attrs:{disabled:t.revealed},on:{click:function(t){return e.reveal(a)}}},[e._v("Reveal")])])})),0):e._e(),0==e.results.filter((function(e){return!e.revealed})).length?s("div",{staticClass:"row"},[s("div",{staticClass:"col-4 offset-4"},[s("button",{staticClass:"btn btn-dark btn-block",on:{click:function(t){return e.ready()}}},[e._v("Ready")])])]):e._e()])])])},F=[],J={name:"QuestResultReveal",props:{playerIsOrganiser:Boolean,organiserName:String,results:Array},methods:{resultOffset:function(){switch(this.results.length){case 2:return 4;case 3:return 3;case 4:return 2;case 5:return 1}},reveal:function(e){this.$emit("reveal-quest-result",e)},ready:function(){this.$emit("ready-up")}}},K=J,H=Object(u["a"])(K,W,F,!1,null,null,null),z=H.exports,X=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body text-center"},[s("div",{staticClass:"row py-5"},[s("div",{staticClass:"col-12"},[s("h4",{staticClass:"card-title"},[e._v(e._s(e.organiser)+" has proposed the following team:")]),s("h3",{staticClass:"card-title pb-5"},e._l(e.names,(function(t,a){return s("span",{key:a,staticClass:"badge badge-pill badge-dark mx-2"},[e._v(e._s(t))])})),0),s("h4",{staticClass:"card-title"},[e._v("What do you think? Your vote will be seen by the other players.")])])]),e._m(0)])])])},Z=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"row pb-5"},[s("div",{staticClass:"col-4 offset-2"},[s("button",{staticClass:"btn btn-dark btn-lg btn-block"},[e._v("Approve")])]),s("div",{staticClass:"col-4"},[s("button",{staticClass:"btn btn-dark btn-lg btn-block"},[e._v("Reject")])])])}],ee={props:{organiser:String,names:Array}},te=ee,se=Object(u["a"])(te,X,Z,!1,null,null,null),ae=se.exports,re=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"card"},[s("h5",{staticClass:"card-header"},[e._v(e._s(e.header))]),s("div",{staticClass:"card-body text-center"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-12 pt-5"},[s("h5",{staticClass:"card-title"},[e._v(e._s(e.line))])])]),s("div",{staticClass:"row py-5"},[s("div",{staticClass:"col-md-4 offset-md-4"},[e.isPlayerReady?e._e():s("button",{staticClass:"btn btn-success  btn-block",attrs:{type:"button"},on:{click:function(t){return e.readyUp()}}},[e._v("Ready")]),e.isPlayerReady?s("button",{staticClass:"btn btn-warning btn-block",attrs:{type:"button"},on:{click:function(t){return e.notReady()}}},[e._v("Cancel")]):e._e()])])])])])},ie=[],le={props:{header:String,line:String,isPlayerReady:Boolean},methods:{readyUp:function(){this.$emit("ready-up")},notReady:function(){this.$emit("not-ready")}}},ne=le,oe=Object(u["a"])(ne,re,ie,!1,null,null,null),ce=oe.exports,de=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body text-center"},[s("div",{staticClass:"row py-5"},[s("div",{staticClass:"col-12"},[s("h4",{staticClass:"card-title"},[e._v("You are on a quest with the following members:")]),s("h3",{staticClass:"card-title pb-5"},e._l(e.members,(function(t,a){return s("span",{key:a,staticClass:"badge badge-pill badge-dark mx-2"},[e._v(e._s(t))])})),0),s("h4",{staticClass:"card-title"},[e._v("How would you like to proceed?")]),s("h4",{staticClass:"card-title"},[e._v("Your decision will be kept anonymous.")])])]),s("div",{staticClass:"row pb-5"},[e._m(0),s("div",{staticClass:"col-4"},[s("button",{staticClass:"btn btn-danger btn-block",attrs:{disabled:!e.isEvil}},[e._v("Sabotage")])])])])])])},ue=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col-4 offset-2"},[s("button",{staticClass:"btn btn-info btn-block"},[e._v("Succeed")])])}],pe={props:{isEvil:Boolean,members:Array}},me=pe,ve=Object(u["a"])(me,de,ue,!1,null,null,null),be=ve.exports,ye=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col-md-12"},[s("div",{class:["card","FAIL"===e.result?"bg-danger":"bg-info"]},[s("div",{staticClass:"card-body text-center"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"row py-5"},[s("div",{staticClass:"col-12"},[s("h3",{staticClass:"card-title text-white"},[e._v(e._s(e.outcome))])])])])]),s("div",{staticClass:"row pb-5"},[s("div",{staticClass:"col-4 offset-4"},[s("button",{staticClass:"btn btn-dark btn-lg btn-block"},[e._v(e._s(e.buttonText))])])])])])])},he=[],fe={props:{result:String,outcome:String,buttonText:String}},ge=fe,_e=Object(u["a"])(ge,ye,he,!1,null,null,null),Ce=_e.exports,we=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body text-center"},[s("div",{staticClass:"row py-5"},[s("div",{staticClass:"col-5 offset-1"},[s("h3",{staticClass:"card-title"},[e._v("Approve")]),s("h3",{staticClass:"card-title"},e._l(e.players.filter((function(e){return"APPROVE"==e.vote})),(function(t,a){return s("span",{key:a,staticClass:"badge badge-pill badge-dark mx-2 my-2"},[e._v(e._s(t.name))])})),0)]),s("div",{staticClass:"col-5"},[s("h3",{staticClass:"card-title"},[e._v("Reject")]),s("h3",{staticClass:"card-title"},e._l(e.players.filter((function(e){return"REJECT"==e.vote})),(function(t,a){return s("span",{key:a,staticClass:"badge badge-pill badge-dark mx-2 my-2"},[e._v(e._s(t.name))])})),0)])]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-4 offset-4"},[e.proposalAccepted?s("p",[e._v("The team proposal has been approved.")]):e._e(),e.proposalAccepted?e._e():s("p",[e._v("The team proposal has been rejected.")])])]),e._m(0)])])])},Ee=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"row py-5"},[s("div",{staticClass:"col-4 offset-4"},[s("button",{staticClass:"btn btn-dark btn-block"},[e._v("OK")])])])}],xe={props:{players:Array,proposalAccepted:Boolean}},Re=xe,Pe=Object(u["a"])(Re,we,Ee,!1,null,null,null),ke=Pe.exports,Ae=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col-12"},[s("div",{staticClass:"card"},[s("h5",{staticClass:"card-header bg-light"},[e._v("Quest "+e._s(e.questId)+" - Team proposal")]),s("div",{staticClass:"card-body"},[s("div",{staticClass:"row mt-3 mb-5"},[s("div",{staticClass:"col-12 text-center"},[s("h5",[e._v("You are tasked with proposing a team for Quest "+e._s(e.questId)+".")]),s("h5",[e._v("Your proposal will be voted on by the other players.")])])]),s("div",{staticClass:"row mb-5"},e._l(e.selectedToDisplay,(function(t,a){return s("div",{key:a,class:["col-2",0==a?"offset-"+e.resultOffset():""]},[-1==t.id?s("div",{staticClass:"text-center text-secondary bg-transparent pt-2 pb-1 border rounded"},[s("span",[e._v(e._s(t.name))])]):e._e(),-1!=t.id?s("button",{staticClass:"btn btn-dark btn-block",on:{click:function(t){return e.unselect(a)}}},[e._v(e._s(t.name))]):e._e()])})),0),s("div",{staticClass:"row mb-5"},e._l(e.unselectedToDisplay,(function(t,a){return s("div",{key:a,class:["col-2 mb-2",a%5===0?"offset-1":""]},[-1==t.id?s("div",{staticClass:"text-center text-secondary bg-transparent pt-2 pb-1 border rounded"},[e._m(0,!0)]):e._e(),-1!=t.id?s("button",{staticClass:"btn btn-light border btn-block",on:{click:function(t){return e.select(a)}}},[e._v(e._s(t.name))]):e._e()])})),0),s("div",{staticClass:"row mb-3"},[s("div",{staticClass:"col-4 offset-4"},[s("button",{staticClass:"btn btn-dark btn-block",attrs:{disabled:e.selected.length!=e.requiredPlayers}},[e._v("Submit")])])])])])])},Oe=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",[s("wbr")])}],Ie=(s("a434"),s("a9e3"),{name:"QuestProposalInput",props:{players:Array,requiredPlayers:Number,questId:Number,isPlayerReady:Boolean},data:function(){return{selected:[],notSelected:[]}},created:function(){this.notSelected=this.players.slice()},computed:{selectedToDisplay:function(){for(var e=this.selected.slice(),t=0;t<this.requiredPlayers-this.selected.length;t++)e.push({id:-1,name:"Required"});return e},unselectedToDisplay:function(){for(var e=this.notSelected.slice(),t=0;t<this.selected.length;t++)e.push({id:-1,name:""});return e}},methods:{resultOffset:function(){switch(this.requiredPlayers){case 2:return 4;case 3:return 3;case 4:return 2;case 5:return 1}},select:function(e){this.selected.length<this.requiredPlayers&&this.selected.push(this.notSelected.splice(e,1)[0])},unselect:function(e){this.notSelected.push(this.selected.splice(e,1)[0])},submit:function(){for(var e=[],t=0;t<this.selected.length;t++)e.push(this.selected[t].id);this.$emit("proposeTeam",e)}}}),Se=Ie,qe=Object(u["a"])(Se,Ae,Oe,!1,null,null,null),Te=qe.exports,Qe=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col-12"},[s("div",{staticClass:"card"},[s("h5",{staticClass:"card-header bg-light"},[e._v("Quest "+e._s(e.questId)+" - Team Proposal")]),s("div",{staticClass:"card-body text-center"},[s("div",{staticClass:"row my-4"},[s("div",{staticClass:"col-12"},[s("h5",[s("span",{staticClass:"badge badge-dark"},[e._v(e._s(e.organiserName))]),e._v(" is currently putting together a team proposal. ")]),s("h5",[e._v("All players will vote on the propsal shortly...")])])])])])])},Ne=[],Me={name:"QuestProposalWaiting",props:{questId:Number,organiserName:String,isPlayerReady:Boolean}},Le=Me,$e=Object(u["a"])(Le,Qe,Ne,!1,null,null,null),Be=$e.exports,je={components:{QuestLog:D,QuestResultReveal:z,QuestProposalVoteInput:ae,PlainOutput:ce,QuestOutcomeVoteInput:be,Outcome:Ce,QuestProposalVoteResult:ke,QuestProposalInput:Te,QuestProposalWaiting:Be,PlayerReadyBar:T},props:{game:Object,players:Array,playerId:String,team:String,role:String,isPlayerReady:Boolean},computed:{playerIsOrganiser:function(){return this.playerId==this.game.currentQuest.organiserId},requiredPlayers:function(){var e=this;return this.game.questLogs.find((function(t){return t.id==e.game.currentQuest.id})).requiredPlayers},currentOrganiser:function(){var e=this;return this.players.find((function(t){return t.id==e.game.currentQuest.organiserId}))},playerIsOrganisingTeamText:function(){return this.currentOrganiser.name+" is currently putting together a team proposal. The proposal will be voted on by all players shortly."},proposedQuestMembers:function(){for(var e=[],t=0;t<this.game.currentQuest.proposedPlayerIds.length;t++)e.push(this.getPlayerNameById(this.game.currentQuest.proposedPlayerIds[t]));return e},proposedQuestMemberNames:function(){var e=this;return this.game.currentQuest.proposedPlayerIds.map((function(t){return e.getPlayerNameById(t)}))}},methods:{getPlayerById:function(e){return this.players.find((function(t){return t.id==e}))},getPlayerNameById:function(e){var t=this.players.find((function(t){return t.id==e}));return t&&t.name?t.name:""},revealQuestResult:function(e){this.$emit("reveal-quest-result",e)},proposeTeam:function(e){this.$emit("propose-team",e)}}},Ue=je,Ge=Object(u["a"])(Ue,$,B,!1,null,null,null),Ve=Ge.exports,Ye={name:"AvalonGame",components:{NameInput:m,Lobby:R,Reveal:L,Game:Ve},props:{socket:{type:Object,default:function(){var e=null;return e=l.a.connect({upgrade:!1,transports:["websocket"]}),e}},roomId:String},data:function(){return{room:null,players:[],team:null,role:null,metadata:[]}},computed:{isPlayerReady:function(){var e=this,t=this.players.find((function(t){return t.id==e.getPlayerId()}));return t&&t.ready}},created:function(){var e=this;this.socket.on("players-updated",(function(t){console.log(t),e.players=t})),this.socket.on("player-updated",(function(t){console.log(t);var s=e.players.find((function(e){return e.id==t.id}));for(var a in s)s[a]=t[a]})),this.socket.on("player-assigned",(function(t){console.log(t),e.team=t.team,e.role=t.role,e.metadata=t.metadata.slice()})),this.socket.on("room-updated",(function(t){console.log(t),e.room=t}))},methods:{percivalEnabled:function(e){this.socket.emit("room-updated",{game:{settings:{percivalEnabled:e}}})},getPlayerId:function(){return this.socket.id},morganaEnabled:function(e){this.socket.emit("room-updated",{game:{settings:{morganaEnabled:e}}})},oberonEnabled:function(e){this.socket.emit("room-updated",{game:{settings:{oberonEnabled:e}}})},proposeTeam:function(e){this.socket.emit("room-updated",{game:{currentQuest:{proposedPlayerIds:e}}})},joinSession:function(e){this.name=e,this.socket.emit("player-joined",{name:this.name,roomId:this.roomId})},readyUp:function(){this.socket.emit("player-updated",{ready:!0})},readyUpWithVote:function(e){this.socket.emit("player-updated",{ready:!0,vote:e})},notReady:function(){this.socket.emit("player-updated",{ready:!1})},revealQuestResult:function(e){console.log(e)}}},De=Ye,We=(s("a5aa"),Object(u["a"])(De,a,r,!1,null,"f27155c2",null));t["default"]=We.exports},"7db0":function(e,t,s){"use strict";var a=s("23e7"),r=s("b727").find,i=s("44d2"),l=s("ae40"),n="find",o=!0,c=l(n);n in[]&&Array(1)[n]((function(){o=!1})),a({target:"Array",proto:!0,forced:o||!c},{find:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}}),i(n)},8418:function(e,t,s){"use strict";var a=s("c04e"),r=s("9bf2"),i=s("5c6c");e.exports=function(e,t,s){var l=a(t);l in e?r.f(e,l,i(0,s)):e[l]=s}},a434:function(e,t,s){"use strict";var a=s("23e7"),r=s("23cb"),i=s("a691"),l=s("50c4"),n=s("7b0b"),o=s("65f0"),c=s("8418"),d=s("1dde"),u=s("ae40"),p=d("splice"),m=u("splice",{ACCESSORS:!0,0:0,1:2}),v=Math.max,b=Math.min,y=9007199254740991,h="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!p||!m},{splice:function(e,t){var s,a,d,u,p,m,f=n(this),g=l(f.length),_=r(e,g),C=arguments.length;if(0===C?s=a=0:1===C?(s=0,a=g-_):(s=C-2,a=b(v(i(t),0),g-_)),g+s-a>y)throw TypeError(h);for(d=o(f,a),u=0;u<a;u++)p=_+u,p in f&&c(d,u,f[p]);if(d.length=a,s<a){for(u=_;u<g-a;u++)p=u+a,m=u+s,p in f?f[m]=f[p]:delete f[m];for(u=g;u>g-a+s;u--)delete f[u-1]}else if(s>a)for(u=g-a;u>_;u--)p=u+a-1,m=u+s-1,p in f?f[m]=f[p]:delete f[m];for(u=0;u<s;u++)f[u+_]=arguments[u+2];return f.length=g-a+s,d}})},a5aa:function(e,t,s){"use strict";var a=s("d4a1"),r=s.n(a);r.a},ae40:function(e,t,s){var a=s("83ab"),r=s("d039"),i=s("5135"),l=Object.defineProperty,n={},o=function(e){throw e};e.exports=function(e,t){if(i(n,e))return n[e];t||(t={});var s=[][e],c=!!i(t,"ACCESSORS")&&t.ACCESSORS,d=i(t,0)?t[0]:o,u=i(t,1)?t[1]:void 0;return n[e]=!!s&&!r((function(){if(c&&!a)return!0;var e={length:-1};c?l(e,1,{enumerable:!0,get:o}):e[1]=1,s.call(e,d,u)}))}},b0c0:function(e,t,s){var a=s("83ab"),r=s("9bf2").f,i=Function.prototype,l=i.toString,n=/^\s*function ([^ (]*)/,o="name";a&&!(o in i)&&r(i,o,{configurable:!0,get:function(){try{return l.call(this).match(n)[1]}catch(e){return""}}})},b727:function(e,t,s){var a=s("0366"),r=s("44ad"),i=s("7b0b"),l=s("50c4"),n=s("65f0"),o=[].push,c=function(e){var t=1==e,s=2==e,c=3==e,d=4==e,u=6==e,p=5==e||u;return function(m,v,b,y){for(var h,f,g=i(m),_=r(g),C=a(v,b,3),w=l(_.length),E=0,x=y||n,R=t?x(m,w):s?x(m,0):void 0;w>E;E++)if((p||E in _)&&(h=_[E],f=C(h,E,g),e))if(t)R[E]=f;else if(f)switch(e){case 3:return!0;case 5:return h;case 6:return E;case 2:o.call(R,h)}else if(d)return!1;return u?-1:c||d?d:R}};e.exports={forEach:c(0),map:c(1),filter:c(2),some:c(3),every:c(4),find:c(5),findIndex:c(6)}},d4a1:function(e,t,s){},d81d:function(e,t,s){"use strict";var a=s("23e7"),r=s("b727").map,i=s("1dde"),l=s("ae40"),n=i("map"),o=l("map");a({target:"Array",proto:!0,forced:!n||!o},{map:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}})},e8b5:function(e,t,s){var a=s("c6b6");e.exports=Array.isArray||function(e){return"Array"==a(e)}},fb6a:function(e,t,s){"use strict";var a=s("23e7"),r=s("861d"),i=s("e8b5"),l=s("23cb"),n=s("50c4"),o=s("fc6a"),c=s("8418"),d=s("b622"),u=s("1dde"),p=s("ae40"),m=u("slice"),v=p("slice",{ACCESSORS:!0,0:0,1:2}),b=d("species"),y=[].slice,h=Math.max;a({target:"Array",proto:!0,forced:!m||!v},{slice:function(e,t){var s,a,d,u=o(this),p=n(u.length),m=l(e,p),v=l(void 0===t?p:t,p);if(i(u)&&(s=u.constructor,"function"!=typeof s||s!==Array&&!i(s.prototype)?r(s)&&(s=s[b],null===s&&(s=void 0)):s=void 0,s===Array||void 0===s))return y.call(u,m,v);for(a=new(void 0===s?Array:s)(h(v-m,0)),d=0;m<v;m++,d++)m in u&&c(a,d,u[m]);return a.length=d,a}})}}]);
//# sourceMappingURL=chunk-4257076e.57812141.js.map