(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6004f43b"],{"14c3":function(t,e,n){var r=n("c6b6"),a=n("9263");t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var i=n.call(t,e);if("object"!==typeof i)throw TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==r(t))throw TypeError("RegExp#exec called on incompatible receiver");return a.call(t,e)}},5319:function(t,e,n){"use strict";var r=n("d784"),a=n("825a"),i=n("7b0b"),o=n("50c4"),c=n("a691"),l=n("1d80"),s=n("8aa5"),u=n("14c3"),f=Math.max,d=Math.min,v=Math.floor,p=/\$([$&'`]|\d\d?|<[^>]*>)/g,h=/\$([$&'`]|\d\d?)/g,g=function(t){return void 0===t?t:String(t)};r("replace",2,(function(t,e,n,r){var x=r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,E=r.REPLACE_KEEPS_$0,m=x?"$":"$0";return[function(n,r){var a=l(this),i=void 0==n?void 0:n[t];return void 0!==i?i.call(n,a,r):e.call(String(a),n,r)},function(t,r){if(!x&&E||"string"===typeof r&&-1===r.indexOf(m)){var i=n(e,t,this,r);if(i.done)return i.value}var l=a(t),v=String(this),p="function"===typeof r;p||(r=String(r));var h=l.global;if(h){var _=l.unicode;l.lastIndex=0}var y=[];while(1){var R=u(l,v);if(null===R)break;if(y.push(R),!h)break;var w=String(R[0]);""===w&&(l.lastIndex=s(v,o(l.lastIndex),_))}for(var A="",S=0,I=0;I<y.length;I++){R=y[I];for(var C=String(R[0]),T=f(d(c(R.index),v.length),0),$=[],k=1;k<R.length;k++)$.push(g(R[k]));var P=R.groups;if(p){var U=[C].concat($,T,v);void 0!==P&&U.push(P);var N=String(r.apply(void 0,U))}else N=b(C,v,T,$,P,r);T>=S&&(A+=v.slice(S,T)+N,S=T+C.length)}return A+v.slice(S)}];function b(t,n,r,a,o,c){var l=r+t.length,s=a.length,u=h;return void 0!==o&&(o=i(o),u=p),e.call(c,u,(function(e,i){var c;switch(i.charAt(0)){case"$":return"$";case"&":return t;case"`":return n.slice(0,r);case"'":return n.slice(l);case"<":c=o[i.slice(1,-1)];break;default:var u=+i;if(0===u)return e;if(u>s){var f=v(u/10);return 0===f?e:f<=s?void 0===a[f-1]?i.charAt(1):a[f-1]+i.charAt(1):e}c=a[u-1]}return void 0===c?"":c}))}}))},6547:function(t,e,n){var r=n("a691"),a=n("1d80"),i=function(t){return function(e,n){var i,o,c=String(a(e)),l=r(n),s=c.length;return l<0||l>=s?t?"":void 0:(i=c.charCodeAt(l),i<55296||i>56319||l+1===s||(o=c.charCodeAt(l+1))<56320||o>57343?t?c.charAt(l):i:t?c.slice(l,l+2):o-56320+(i-55296<<10)+65536)}};t.exports={codeAt:i(!1),charAt:i(!0)}},"8aa5":function(t,e,n){"use strict";var r=n("6547").charAt;t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},9263:function(t,e,n){"use strict";var r=n("ad6d"),a=n("9f7f"),i=RegExp.prototype.exec,o=String.prototype.replace,c=i,l=function(){var t=/a/,e=/b*/g;return i.call(t,"a"),i.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),s=a.UNSUPPORTED_Y||a.BROKEN_CARET,u=void 0!==/()??/.exec("")[1],f=l||u||s;f&&(c=function(t){var e,n,a,c,f=this,d=s&&f.sticky,v=r.call(f),p=f.source,h=0,g=t;return d&&(v=v.replace("y",""),-1===v.indexOf("g")&&(v+="g"),g=String(t).slice(f.lastIndex),f.lastIndex>0&&(!f.multiline||f.multiline&&"\n"!==t[f.lastIndex-1])&&(p="(?: "+p+")",g=" "+g,h++),n=new RegExp("^(?:"+p+")",v)),u&&(n=new RegExp("^"+p+"$(?!\\s)",v)),l&&(e=f.lastIndex),a=i.call(d?n:f,g),d?a?(a.input=a.input.slice(h),a[0]=a[0].slice(h),a.index=f.lastIndex,f.lastIndex+=a[0].length):f.lastIndex=0:l&&a&&(f.lastIndex=f.global?a.index+a[0].length:e),u&&a&&a.length>1&&o.call(a[0],n,(function(){for(c=1;c<arguments.length-2;c++)void 0===arguments[c]&&(a[c]=void 0)})),a}),t.exports=c},"9f7f":function(t,e,n){"use strict";var r=n("d039");function a(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=r((function(){var t=a("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=r((function(){var t=a("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},ac1f:function(t,e,n){"use strict";var r=n("23e7"),a=n("9263");r({target:"RegExp",proto:!0,forced:/./.exec!==a},{exec:a})},ad6d:function(t,e,n){"use strict";var r=n("825a");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},d784:function(t,e,n){"use strict";n("ac1f");var r=n("6eeb"),a=n("d039"),i=n("b622"),o=n("9263"),c=n("9112"),l=i("species"),s=!a((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),u=function(){return"$0"==="a".replace(/./,"$0")}(),f=i("replace"),d=function(){return!!/./[f]&&""===/./[f]("a","$0")}(),v=!a((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));t.exports=function(t,e,n,f){var p=i(t),h=!a((function(){var e={};return e[p]=function(){return 7},7!=""[t](e)})),g=h&&!a((function(){var e=!1,n=/a/;return"split"===t&&(n={},n.constructor={},n.constructor[l]=function(){return n},n.flags="",n[p]=/./[p]),n.exec=function(){return e=!0,null},n[p](""),!e}));if(!h||!g||"replace"===t&&(!s||!u||d)||"split"===t&&!v){var x=/./[p],E=n(p,""[t],(function(t,e,n,r,a){return e.exec===o?h&&!a?{done:!0,value:x.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}}),{REPLACE_KEEPS_$0:u,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:d}),m=E[0],b=E[1];r(String.prototype,t,m),r(RegExp.prototype,p,2==e?function(t,e){return b.call(t,this,e)}:function(t){return b.call(t,this)})}f&&c(RegExp.prototype[p],"sham",!0)}},f746:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container",attrs:{id:"app"}},[n("div",{staticClass:"row"},[n("Title")],1),t._m(0),n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-6 offset-md-3"},[n("button",{staticClass:"btn btn-primary btn-block",on:{click:function(e){return t.startNewGame(t.socket)}}},[t._v("Start a new game")])])])])},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row pb-5 text-light"},[n("div",{staticClass:"col-md-10 offset-md-1"},[n("p",[t._v(" The Resistance: Avalon pits the forces of Good and Evil in a battle to control the future of civilization. Arthur represents the future of Britain, a promise of prosperity and honour, yet hidden among his brave warriors are Mordred's unscrupulous minions. These forces of evil are few but have knowledge of each other and remain hidden from all but one of Arthur's servants. Merlin alone knows the agents of evil, but he must speak of this only in riddles. If his true identity is discovered, all will be lost. ")])])])}],i=(n("ac1f"),n("5319"),function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)}),o=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col-md-12 py-5 text-center"},[n("h1",{staticClass:"display-5 text-light"},[t._v("The Resistance: Avalon")])])}],c={name:"Title"},l=c,s=n("2877"),u=Object(s["a"])(l,i,o,!1,null,"1c02cf87",null),f=u.exports,d=n("8055"),v=n.n(d),p={name:"App",components:{Title:f},methods:{startNewGame:function(t){t.emit("init-avalon")}},data:function(){var t=this,e=null;return e=v.a.connect({upgrade:!1,transports:["websocket"]}),e.on("avalon-created",(function(n){t.$router.replace({name:"AvalonGame",params:{socket:e,roomId:n}})})),{socket:e}}},h=p,g=Object(s["a"])(h,r,a,!1,null,null,null);e["default"]=g.exports}}]);
//# sourceMappingURL=chunk-6004f43b.222a609e.js.map