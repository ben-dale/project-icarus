(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6004f43b"],{"14c3":function(e,t,n){var r=n("c6b6"),a=n("9263");e.exports=function(e,t){var n=e.exec;if("function"===typeof n){var o=n.call(e,t);if("object"!==typeof o)throw TypeError("RegExp exec method returned something other than an Object or null");return o}if("RegExp"!==r(e))throw TypeError("RegExp#exec called on incompatible receiver");return a.call(e,t)}},5319:function(e,t,n){"use strict";var r=n("d784"),a=n("825a"),o=n("7b0b"),i=n("50c4"),s=n("a691"),l=n("1d80"),c=n("8aa5"),u=n("14c3"),d=Math.max,f=Math.min,v=Math.floor,h=/\$([$&'`]|\d\d?|<[^>]*>)/g,p=/\$([$&'`]|\d\d?)/g,g=function(e){return void 0===e?e:String(e)};r("replace",2,(function(e,t,n,r){var E=r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,m=r.REPLACE_KEEPS_$0,y=E?"$":"$0";return[function(n,r){var a=l(this),o=void 0==n?void 0:n[e];return void 0!==o?o.call(n,a,r):t.call(String(a),n,r)},function(e,r){if(!E&&m||"string"===typeof r&&-1===r.indexOf(y)){var o=n(t,e,this,r);if(o.done)return o.value}var l=a(e),v=String(this),h="function"===typeof r;h||(r=String(r));var p=l.global;if(p){var b=l.unicode;l.lastIndex=0}var w=[];while(1){var _=u(l,v);if(null===_)break;if(w.push(_),!p)break;var A=String(_[0]);""===A&&(l.lastIndex=c(v,i(l.lastIndex),b))}for(var T="",C=0,R=0;R<w.length;R++){_=w[R];for(var S=String(_[0]),k=d(f(s(_.index),v.length),0),I=[],$=1;$<_.length;$++)I.push(g(_[$]));var G=_.groups;if(h){var P=[S].concat(I,k,v);void 0!==G&&P.push(G);var q=String(r.apply(void 0,P))}else q=x(S,v,k,I,G,r);k>=C&&(T+=v.slice(C,k)+q,C=k+S.length)}return T+v.slice(C)}];function x(e,n,r,a,i,s){var l=r+e.length,c=a.length,u=p;return void 0!==i&&(i=o(i),u=h),t.call(s,u,(function(t,o){var s;switch(o.charAt(0)){case"$":return"$";case"&":return e;case"`":return n.slice(0,r);case"'":return n.slice(l);case"<":s=i[o.slice(1,-1)];break;default:var u=+o;if(0===u)return t;if(u>c){var d=v(u/10);return 0===d?t:d<=c?void 0===a[d-1]?o.charAt(1):a[d-1]+o.charAt(1):t}s=a[u-1]}return void 0===s?"":s}))}}))},6547:function(e,t,n){var r=n("a691"),a=n("1d80"),o=function(e){return function(t,n){var o,i,s=String(a(t)),l=r(n),c=s.length;return l<0||l>=c?e?"":void 0:(o=s.charCodeAt(l),o<55296||o>56319||l+1===c||(i=s.charCodeAt(l+1))<56320||i>57343?e?s.charAt(l):o:e?s.slice(l,l+2):i-56320+(o-55296<<10)+65536)}};e.exports={codeAt:o(!1),charAt:o(!0)}},"8aa5":function(e,t,n){"use strict";var r=n("6547").charAt;e.exports=function(e,t,n){return t+(n?r(e,t).length:1)}},9263:function(e,t,n){"use strict";var r=n("ad6d"),a=n("9f7f"),o=RegExp.prototype.exec,i=String.prototype.replace,s=o,l=function(){var e=/a/,t=/b*/g;return o.call(e,"a"),o.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),c=a.UNSUPPORTED_Y||a.BROKEN_CARET,u=void 0!==/()??/.exec("")[1],d=l||u||c;d&&(s=function(e){var t,n,a,s,d=this,f=c&&d.sticky,v=r.call(d),h=d.source,p=0,g=e;return f&&(v=v.replace("y",""),-1===v.indexOf("g")&&(v+="g"),g=String(e).slice(d.lastIndex),d.lastIndex>0&&(!d.multiline||d.multiline&&"\n"!==e[d.lastIndex-1])&&(h="(?: "+h+")",g=" "+g,p++),n=new RegExp("^(?:"+h+")",v)),u&&(n=new RegExp("^"+h+"$(?!\\s)",v)),l&&(t=d.lastIndex),a=o.call(f?n:d,g),f?a?(a.input=a.input.slice(p),a[0]=a[0].slice(p),a.index=d.lastIndex,d.lastIndex+=a[0].length):d.lastIndex=0:l&&a&&(d.lastIndex=d.global?a.index+a[0].length:t),u&&a&&a.length>1&&i.call(a[0],n,(function(){for(s=1;s<arguments.length-2;s++)void 0===arguments[s]&&(a[s]=void 0)})),a}),e.exports=s},"9f7f":function(e,t,n){"use strict";var r=n("d039");function a(e,t){return RegExp(e,t)}t.UNSUPPORTED_Y=r((function(){var e=a("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=r((function(){var e=a("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},ac1f:function(e,t,n){"use strict";var r=n("23e7"),a=n("9263");r({target:"RegExp",proto:!0,forced:/./.exec!==a},{exec:a})},ad6d:function(e,t,n){"use strict";var r=n("825a");e.exports=function(){var e=r(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},d784:function(e,t,n){"use strict";n("ac1f");var r=n("6eeb"),a=n("d039"),o=n("b622"),i=n("9263"),s=n("9112"),l=o("species"),c=!a((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),u=function(){return"$0"==="a".replace(/./,"$0")}(),d=o("replace"),f=function(){return!!/./[d]&&""===/./[d]("a","$0")}(),v=!a((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));e.exports=function(e,t,n,d){var h=o(e),p=!a((function(){var t={};return t[h]=function(){return 7},7!=""[e](t)})),g=p&&!a((function(){var t=!1,n=/a/;return"split"===e&&(n={},n.constructor={},n.constructor[l]=function(){return n},n.flags="",n[h]=/./[h]),n.exec=function(){return t=!0,null},n[h](""),!t}));if(!p||!g||"replace"===e&&(!c||!u||f)||"split"===e&&!v){var E=/./[h],m=n(h,""[e],(function(e,t,n,r,a){return t.exec===i?p&&!a?{done:!0,value:E.call(t,n,r)}:{done:!0,value:e.call(n,t,r)}:{done:!1}}),{REPLACE_KEEPS_$0:u,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:f}),y=m[0],x=m[1];r(String.prototype,e,y),r(RegExp.prototype,h,2==t?function(e,t){return x.call(e,this,t)}:function(e){return x.call(e,this)})}d&&s(RegExp.prototype[h],"sham",!0)}},f746:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container",attrs:{id:"app"}},[n("div",{staticClass:"row"},[n("Title")],1),e._m(0),e._m(1),n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-8 offset-md-2"},[n("button",{staticClass:"btn btn-dark btn-lg btn-block",on:{click:function(t){return e.startNewGame(e.socket)}}},[e._v("Start a new game")])])]),e._m(2),n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-8 offset-md-2"},[n("router-link",{staticClass:"btn btn-dark btn-lg btn-block",attrs:{to:"/avalon/thing"}},[e._v("Join an existing game")])],1)])])},a=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-12"},[n("h4",[e._v("The plot")]),n("p",[e._v(" The Resistance: Avalon pits the forces of Good and Evil in a battle to control the future of civilization. Arthur represents the future of Britain, a promise of prosperity and honour, yet hidden among his brave warriors are Mordred's unscrupulous minions. These forces of evil are few but have knowledge of each other and remain hidden from all but one of Arthur's servants. Merlin alone knows the agents of evil, but he must speak of this only in riddles. If his true identity is discovered, all will be lost. ")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-12"},[n("h4",[e._v("The play")]),n("p",[e._v(" There are two teams: Good and Evil. Each player is randomly assigned to either Good or Evil at the start of the game. Players in Good don't know the identity of anyone. Players in Evil know the identity of everyone in Evil, and thus can infer who is in Good. ")]),n("p",[e._v(" The aim of the game for Good is to succeed three quests. The aim of the game for Evil is to fail three quests. There are only five quests. ")]),n("p",[e._v(" Each round one player will be assigned to choose a number of players to set out on a quest. The quest will not start until it's proposed participants have been agreed by a majority of players. ")]),n("p",[e._v(' Once the quest proposal is agreed, the quest participants will vote on the outcome of the quest. Evil players on the quest can vote either "Succeed" or "Fail". Good players can vote only "Succeed". The quest will fail if a single Evil player on the quest votes "Fail". ')]),n("p",[e._v(" As well as being randomly assigned to a team at the start of the game, you are also assigned one of the following roles: "),n("ul",[n("li",[e._v("Merlin: One player on Good is assigned the role of Merlin. Merlin knows the identity of everyone in Good, and thus can infer who is in Evil.")]),n("li",[e._v("Assassin: One player on Evil is assigned the role of Assassin. If Good manages to succeed three quests the Assassin will be given the opportunity to assassinate Merlin. If they succeed in assassinating Merlin they will steal the win.")]),n("li",[e._v("Loyal servent of Arthur: standard Good player")]),n("li",[e._v("Servant of Mordred: standard Evil player")])])])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row py-2"},[n("div",{staticClass:"col-md-12 text-center"},[n("h5",[e._v("- or -")])])])}],o=(n("ac1f"),n("5319"),n("714d")),i=n("8055"),s=n.n(i),l={name:"App",components:{Title:o["a"]},methods:{startNewGame:function(e){e.emit("avalon-start-new-game")}},data:function(){var e=this,t=null;return t=s.a.connect({upgrade:!1,transports:["websocket"]}),t.on("avalon-room-created",(function(n){var r=n.id;e.$router.replace({name:"AvalonGame",params:{socket:t,roomId:r}})})),{socket:t}}},c=l,u=n("2877"),d=Object(u["a"])(c,r,a,!1,null,null,null);t["default"]=d.exports}}]);
//# sourceMappingURL=chunk-6004f43b.fa80fe1f.js.map