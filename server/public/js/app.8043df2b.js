(function(e){function t(t){for(var a,r,s=t[0],c=t[1],l=t[2],u=0,m=[];u<s.length;u++)r=s[u],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&m.push(o[r][0]),o[r]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);p&&p(t);while(m.length)m.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,r=1;r<n.length;r++){var s=n[r];0!==o[s]&&(a=!1)}a&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var a={},r={app:0},o={app:0},i=[];function s(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-769007e2":"2cfbdbe1","chunk-6004f43b":"6267c279","chunk-9ebbeff6":"7bcaeee4"}[e]+".js"}function c(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-9ebbeff6":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-769007e2":"31d6cfe0","chunk-6004f43b":"31d6cfe0","chunk-9ebbeff6":"cf7bcafa"}[e]+".css",o=c.p+a,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var l=i[s],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===a||u===o))return t()}var m=document.getElementsByTagName("style");for(s=0;s<m.length;s++){l=m[s],u=l.getAttribute("data-href");if(u===a||u===o)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var a=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=a,delete r[e],p.parentNode.removeChild(p),n(i)},p.href=o;var d=document.getElementsByTagName("head")[0];d.appendChild(p)})).then((function(){r[e]=0})));var a=o[e];if(0!==a)if(a)t.push(a[2]);else{var i=new Promise((function(t,n){a=o[e]=[t,n]}));t.push(a[2]=i);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=s(e);var m=new Error;l=function(t){u.onerror=u.onload=null,clearTimeout(p);var n=o[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;m.message="Loading chunk "+e+" failed.\n("+a+": "+r+")",m.name="ChunkLoadError",m.type=a,m.request=r,n[1](m)}o[e]=void 0}};var p=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(t)},c.m=e,c.c=a,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(n,a,function(t){return e[t]}.bind(null,a));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var m=0;m<l.length;m++)t(l[m]);var p=u;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[e._m(0),n("router-view")],1)},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("nav",{staticClass:"navbar navbar-dark bg-dark mb-5"},[n("a",{staticClass:"navbar-brand",attrs:{href:"/"}},[e._v("Project Icarus")])])}],i=(n("5c64"),n("2877")),s={},c=Object(i["a"])(s,r,o,!1,null,null,null),l=c.exports,u=(n("d3b7"),n("8c4f")),m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container",attrs:{id:"app"}},[n("div",{staticClass:"row mb-5"},[n("Title")],1),n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-4 pb-4"},[n("GameOption",{attrs:{name:"The Resistance: Avalon",description:"Avalon pits the forces of Good and Evil in a battle to control the future of civilization.",minPlayers:5,maxPlayers:10,teams:2,linkTo:"/avalon",image:"avalon.jpeg"}})],1),n("div",{staticClass:"col-md-4 pb-4"},[n("GameOption",{attrs:{name:"Coming Soon",description:"More games are on the way!",image:"coming-soon.jpeg"}})],1),n("div",{staticClass:"col-md-4 pb-4"},[n("GameOption",{attrs:{name:"Coming Soon",description:"More games are on the way!",image:"coming-soon.jpeg"}})],1)]),n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-4 pb-4"},[n("GameOption",{attrs:{name:"Coming Soon",description:"More games are on the way!",image:"coming-soon.jpeg"}})],1),n("div",{staticClass:"col-md-4 pb-4"},[n("GameOption",{attrs:{name:"Coming Soon",description:"More games are on the way!",image:"coming-soon.jpeg"}})],1),n("div",{staticClass:"col-md-4 pb-4"},[n("GameOption",{attrs:{name:"Coming Soon",description:"More games are on the way!",image:"coming-soon.jpeg"}})],1)]),n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-4 pb-4"},[n("GameOption",{attrs:{name:"Coming Soon",description:"More games are on the way!",image:"coming-soon.jpeg"}})],1),n("div",{staticClass:"col-md-4 pb-4"},[n("GameOption",{attrs:{name:"Coming Soon",description:"More games are on the way!",image:"coming-soon.jpeg"}})],1),n("div",{staticClass:"col-md-4 pb-4"},[n("GameOption",{attrs:{name:"Coming Soon",description:"More games are on the way!",image:"coming-soon.jpeg"}})],1)])])},p=[],d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"card bg-dark text-light rounded-0"},[n("div",{staticClass:"card-header"},[e._v(e._s(e.name))]),n("div",{staticClass:"card-body text-center"},[e.minPlayers&&e.maxPlayers&&e.teams?n("h6",{staticClass:"card-subtitle pb-2"},[e._v(e._s(e.minPlayers)+" - "+e._s(e.maxPlayers)+" players, "+e._s(e.teams)+" teams")]):e._e(),e.description?n("p",{staticClass:"card-text"},[e._v(e._s(e.description))]):e._e(),e.linkTo?n("router-link",{staticClass:"btn btn-sm btn-secondary btn-block",attrs:{to:e.linkTo}},[e._v("Play")]):e._e()],1)])},f=[],v=(n("a9e3"),{name:"GameOption",props:{name:String,description:String,minPlayers:Number,maxPlayers:Number,teams:Number,linkTo:String,image:String}}),g=v,h=Object(i["a"])(g,d,f,!1,null,"360e5bcf",null),b=h.exports,y=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},_=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"col-md-12 py-5 text-light text-center"},[n("h1",{staticClass:"display-5"},[e._v("Project Icarus")])])}],C={name:"Title"},w=C,k=Object(i["a"])(w,y,_,!1,null,"4a09af2a",null),O=k.exports,j={name:"App",components:{GameOption:b,Title:O}},P=j,x=Object(i["a"])(P,m,p,!1,null,null,null),S=x.exports,E=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},T=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container",attrs:{id:"app"}},[n("div",{staticClass:"row"},[e._v(" Coming soon ")])])}],G={name:"Donate"},M=G,A=Object(i["a"])(M,E,T,!1,null,null,null),$=A.exports;a["a"].use(u["a"]);var N=[{path:"/",name:"Home",component:S},{path:"/avalon",name:"Avalon",component:function(){return Promise.all([n.e("chunk-769007e2"),n.e("chunk-6004f43b")]).then(n.bind(null,"f746"))}},{path:"/avalon/:roomId",name:"AvalonGame",component:function(){return Promise.all([n.e("chunk-769007e2"),n.e("chunk-9ebbeff6")]).then(n.bind(null,"7921"))},props:!0},{path:"/donate",name:"Donate",component:$}],L=new u["a"]({mode:"history",base:"/",routes:N}),D=L;n("4989");a["a"].config.productionTip=!1,new a["a"]({router:D,render:function(e){return e(l)}}).$mount("#app")},"5c64":function(e,t,n){"use strict";var a=n("d32a"),r=n.n(a);r.a},d32a:function(e,t,n){}});
//# sourceMappingURL=app.8043df2b.js.map