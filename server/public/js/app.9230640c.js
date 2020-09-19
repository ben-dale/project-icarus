(function(e){function t(t){for(var r,a,i=t[0],c=t[1],l=t[2],u=0,d=[];u<i.length;u++)a=i[u],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);m&&m(t);while(d.length)d.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],r=!0,a=1;a<n.length;a++){var i=n[a];0!==o[i]&&(r=!1)}r&&(s.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={app:0},o={app:0},s=[];function i(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-4a768eff":"78cd44ac","chunk-2d0d7d97":"fed344d4","chunk-2d0da90f":"b6db94f4"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-4a768eff":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-4a768eff":"30a24ac7","chunk-2d0d7d97":"31d6cfe0","chunk-2d0da90f":"31d6cfe0"}[e]+".css",o=c.p+r,s=document.getElementsByTagName("link"),i=0;i<s.length;i++){var l=s[i],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===r||u===o))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){l=d[i],u=l.getAttribute("data-href");if(u===r||u===o)return t()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=t,m.onerror=function(t){var r=t&&t.target&&t.target.src||o,s=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=r,delete a[e],m.parentNode.removeChild(m),n(s)},m.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(m)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var s=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=s);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=i(e);var d=new Error;l=function(t){u.onerror=u.onload=null,clearTimeout(m);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",d.name="ChunkLoadError",d.type=r,d.request=a,n[1](d)}o[e]=void 0}};var m=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var m=u;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},1:function(e,t){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[e._m(0),n("router-view")],1)},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("nav",{staticClass:"navbar navbar-dark bg-primary mb-5"},[n("a",{staticClass:"navbar-brand",attrs:{href:"/"}},[e._v("Project Icarus")])])}],s=(n("5c64"),n("2877")),i={},c=Object(s["a"])(i,a,o,!1,null,null,null),l=c.exports,u=(n("d3b7"),n("8c4f")),d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("div",{staticClass:"row mb-5"},[n("Title")],1),n("div",{staticClass:"row"},[n("div",{staticClass:"col-12 col-lg-6"},[n("GameOption",{attrs:{name:"The Resistance",description:"The Empire must fall. Our mission must succeed. By destroying their key bases, we will shatter Imperial strength and liberate our people.",minPlayers:5,maxPlayers:10,teams:2,comingSoon:!0},on:{play:e.initResistance}})],1),n("div",{staticClass:"col-12 col-lg-6"},[n("GameOption",{attrs:{name:"The Resistance: Avalon",description:"Avalon pits the forces of Good and Evil in a battle to control the future of civilization.",minPlayers:5,maxPlayers:10,teams:2},on:{play:e.initAvalon}})],1)])])},m=[],p=(n("ac1f"),n("5319"),n("8055")),f=n.n(p),h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"card bg-dark border-primary text-light"},[n("h5",{staticClass:"card-header border-primary text-center"},[e._v(e._s(e.name))]),n("div",{staticClass:"card-body text-center bg-dark"},[e.description?n("p",{staticClass:"card-text"},[e._v(e._s(e.description))]):e._e(),e.minPlayers&&e.maxPlayers&&e.teams?n("p",{staticClass:"card-subtitle"},[e._v(e._s(e.minPlayers)+" - "+e._s(e.maxPlayers)+" players, "+e._s(e.teams)+" teams")]):e._e()]),e.comingSoon?e._e():n("div",{staticClass:"card-footer bg-primary"},[n("button",{staticClass:"btn btn-sm btn-secondary btn-block",on:{click:function(t){return e.$emit("play")}}},[e._v("Start")])]),e.comingSoon?n("div",{staticClass:"card-footer bg-primary text-center"},[e._v(" Coming Soon! ")]):e._e()])},v=[],b=(n("a9e3"),{name:"GameOption",props:{name:String,description:String,minPlayers:Number,maxPlayers:Number,teams:Number,image:String,comingSoon:Boolean}}),g=b,y=Object(s["a"])(g,h,v,!1,null,null,null),_=y.exports,k=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},C=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"col-md-12 py-5 text-light text-center"},[n("h1",{staticClass:"display-5"},[e._v("Project Icarus")])])}],w={name:"Title"},x=w,P=Object(s["a"])(x,k,C,!1,null,"4a09af2a",null),O=P.exports,E={name:"App",components:{GameOption:_,Title:O},methods:{initAvalon:function(){this.socket.emit("connect-avalon"),this.socket.emit("init-avalon")},initResistance:function(){this.socket.emit("connect-resistance"),this.socket.emit("init-resistance")},inDevMode:function(){return!1}},data:function(){var e=this,t=null;return t=this.inDevMode()?f.a.connect("http://localhost:3000",{upgrade:!1,transports:["websocket"]}):f.a.connect({upgrade:!1,transports:["websocket"]}),t.on("avalon-created",(function(n){e.$router.replace({name:"AvalonGame",params:{socket:t,roomId:n}})})),t.on("resistance-created",(function(n){e.$router.replace({name:"ResistanceGame",params:{socket:t,roomId:n}})})),{socket:t}}},j=E,S=Object(s["a"])(j,d,m,!1,null,null,null),T=S.exports,A=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},$=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[e._v(" Coming soon ")])])}],G={name:"Donate"},I=G,N=Object(s["a"])(I,A,$,!1,null,null,null),D=N.exports;r["a"].use(u["a"]);var M=[{path:"/",name:"Home",component:T},{path:"/avalon/:roomId",name:"AvalonGame",component:function(){return Promise.all([n.e("chunk-4a768eff"),n.e("chunk-2d0d7d97")]).then(n.bind(null,"7921"))},props:!0},{path:"/resistance/:roomId",name:"ResistanceGame",component:function(){return Promise.all([n.e("chunk-4a768eff"),n.e("chunk-2d0da90f")]).then(n.bind(null,"6bc0"))},props:!0},{path:"/donate",name:"Donate",component:D}];var R=new u["a"]({mode:"history",base:"/",routes:M}),B=R;n("4989");r["a"].config.productionTip=!1,new r["a"]({router:B,render:function(e){return e(l)}}).$mount("#app")},"5c64":function(e,t,n){"use strict";var r=n("d32a"),a=n.n(r);a.a},d32a:function(e,t,n){}});
//# sourceMappingURL=app.9230640c.js.map