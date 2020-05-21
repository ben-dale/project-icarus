(function(e){function t(t){for(var r,a,i=t[0],c=t[1],l=t[2],u=0,d=[];u<i.length;u++)a=i[u],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);f&&f(t);while(d.length)d.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],r=!0,a=1;a<n.length;a++){var i=n[a];0!==o[i]&&(r=!1)}r&&(s.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={app:0},o={app:0},s=[];function i(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-59da1ffe":"90b531de"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-59da1ffe":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-59da1ffe":"a8e0a36a"}[e]+".css",o=c.p+r,s=document.getElementsByTagName("link"),i=0;i<s.length;i++){var l=s[i],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===r||u===o))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){l=d[i],u=l.getAttribute("data-href");if(u===r||u===o)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||o,s=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=r,delete a[e],f.parentNode.removeChild(f),n(s)},f.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var s=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=s);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=i(e);var d=new Error;l=function(t){u.onerror=u.onload=null,clearTimeout(f);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",d.name="ChunkLoadError",d.type=r,d.request=a,n[1](d)}o[e]=void 0}};var f=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var f=u;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},1:function(e,t){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[e._m(0),n("router-view")],1)},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("nav",{staticClass:"navbar navbar-dark bg-primary mb-5"},[n("a",{staticClass:"navbar-brand",attrs:{href:"/"}},[e._v("Project Icarus")])])}],s=(n("5c64"),n("2877")),i={},c=Object(s["a"])(i,a,o,!1,null,null,null),l=c.exports,u=(n("d3b7"),n("8c4f")),d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("div",{staticClass:"row mb-5"},[n("Title")],1),n("div",{staticClass:"row"},[n("div",{staticClass:"col-12 col-lg-8 offset-lg-2 pb-4"},[n("GameOption",{attrs:{name:"The Resistance: Avalon",description:"Avalon pits the forces of Good and Evil in a battle to control the future of civilization.",minPlayers:5,maxPlayers:10,teams:2,image:"avalon.jpeg"},on:{play:e.initAvalon}})],1)])])},f=[],p=(n("ac1f"),n("5319"),n("8055")),m=n.n(p),v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"card bg-dark border-primary text-light"},[n("h5",{staticClass:"card-header border-primary text-center"},[e._v(e._s(e.name))]),n("div",{staticClass:"card-body text-center bg-dark"},[e.description?n("p",{staticClass:"card-text"},[e._v(e._s(e.description))]):e._e(),e.minPlayers&&e.maxPlayers&&e.teams?n("p",{staticClass:"card-subtitle"},[e._v(e._s(e.minPlayers)+" - "+e._s(e.maxPlayers)+" players, "+e._s(e.teams)+" teams")]):e._e()]),n("div",{staticClass:"card-footer bg-primary"},[n("button",{staticClass:"btn btn-sm btn-secondary btn-block",on:{click:function(t){return e.$emit("play")}}},[e._v("Start")])])])},h=[],b=(n("a9e3"),{name:"GameOption",props:{name:String,description:String,minPlayers:Number,maxPlayers:Number,teams:Number,image:String}}),g=b,y=Object(s["a"])(g,v,h,!1,null,null,null),_=y.exports,C=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},w=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"col-md-12 py-5 text-light text-center"},[n("h1",{staticClass:"display-5"},[e._v("Project Icarus")])])}],x={name:"Title"},k=x,O=Object(s["a"])(k,C,w,!1,null,"4a09af2a",null),P=O.exports,j={name:"App",components:{GameOption:_,Title:P},methods:{initAvalon:function(){this.socket.emit("init-avalon")}},data:function(){var e=this,t=null;return t=m.a.connect({upgrade:!1,transports:["websocket"]}),t.on("avalon-created",(function(n){e.$router.replace({name:"AvalonGame",params:{socket:t,roomId:n}})})),t.emit("connect-avalon"),{socket:t}}},E=j,A=Object(s["a"])(E,d,f,!1,null,null,null),S=A.exports,T=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},$=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[e._v(" Coming soon ")])])}],N={name:"Donate"},G=N,I=Object(s["a"])(G,T,$,!1,null,null,null),L=I.exports;r["a"].use(u["a"]);var D=[{path:"/",name:"Home",component:S},{path:"/avalon/:roomId",name:"AvalonGame",component:function(){return n.e("chunk-59da1ffe").then(n.bind(null,"7921"))},props:!0},{path:"/donate",name:"Donate",component:L}],M=new u["a"]({mode:"history",base:"/",routes:D}),B=M;n("4989");r["a"].config.productionTip=!1,new r["a"]({router:B,render:function(e){return e(l)}}).$mount("#app")},"5c64":function(e,t,n){"use strict";var r=n("d32a"),a=n.n(r);a.a},d32a:function(e,t,n){}});
//# sourceMappingURL=app.06bb19a1.js.map