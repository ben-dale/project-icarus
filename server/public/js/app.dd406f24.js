(function(e){function t(t){for(var r,a,s=t[0],c=t[1],l=t[2],u=0,p=[];u<s.length;u++)a=s[u],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&p.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);m&&m(t);while(p.length)p.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,a=1;a<n.length;a++){var s=n[a];0!==o[s]&&(r=!1)}r&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={app:0},o={app:0},i=[];function s(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-769007e2":"2cfbdbe1","chunk-1735700a":"0f082f7a","chunk-6004f43b":"9841be1a"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-1735700a":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-769007e2":"31d6cfe0","chunk-1735700a":"00b500dc","chunk-6004f43b":"31d6cfe0"}[e]+".css",o=c.p+r,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var l=i[s],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===r||u===o))return t()}var p=document.getElementsByTagName("style");for(s=0;s<p.length;s++){l=p[s],u=l.getAttribute("data-href");if(u===r||u===o)return t()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=t,m.onerror=function(t){var r=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete a[e],m.parentNode.removeChild(m),n(i)},m.href=o;var d=document.getElementsByTagName("head")[0];d.appendChild(m)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=i);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=s(e);var p=new Error;l=function(t){u.onerror=u.onload=null,clearTimeout(m);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;p.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",p.name="ChunkLoadError",p.type=r,p.request=a,n[1](p)}o[e]=void 0}};var m=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var p=0;p<l.length;p++)t(l[p]);var m=u;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[e._m(0),n("router-view")],1)},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("nav",{staticClass:"navbar navbar-dark bg-primary mb-5"},[n("a",{staticClass:"navbar-brand",attrs:{href:"/"}},[e._v("Project Icarus")])])}],i=(n("5c64"),n("2877")),s={},c=Object(i["a"])(s,a,o,!1,null,null,null),l=c.exports,u=(n("d3b7"),n("8c4f")),p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container",attrs:{id:"app"}},[n("div",{staticClass:"row mb-5"},[n("Title")],1),n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-4 pb-4"},[n("GameOption",{attrs:{name:"The Resistance: Avalon",description:"Avalon pits the forces of Good and Evil in a battle to control the future of civilization.",minPlayers:5,maxPlayers:10,teams:2,linkTo:"/avalon",image:"avalon.jpeg"}})],1),n("div",{staticClass:"col-md-4 pb-4"},[n("GameOption",{attrs:{name:"Coming Soon",description:"More games are on the way!",image:"coming-soon.jpeg"}})],1),n("div",{staticClass:"col-md-4 pb-4"},[n("GameOption",{attrs:{name:"Coming Soon",description:"More games are on the way!",image:"coming-soon.jpeg"}})],1)])])},m=[],d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"card bg-primary text-light"},[n("h5",{staticClass:"card-header text-center"},[e._v(e._s(e.name))]),n("div",{staticClass:"card-body text-center bg-dark"},[e.description?n("p",{staticClass:"card-text"},[e._v(e._s(e.description))]):e._e(),e.minPlayers&&e.maxPlayers&&e.teams?n("p",{staticClass:"card-subtitle"},[e._v(e._s(e.minPlayers)+" - "+e._s(e.maxPlayers)+" players, "+e._s(e.teams)+" teams")]):e._e()]),e.linkTo?n("div",{staticClass:"card-footer"},[e.linkTo?n("router-link",{staticClass:"btn btn-sm btn-secondary btn-block",attrs:{to:e.linkTo}},[e._v("Play")]):e._e()],1):e._e()])},f=[],v=(n("a9e3"),{name:"GameOption",props:{name:String,description:String,minPlayers:Number,maxPlayers:Number,teams:Number,linkTo:String,image:String}}),h=v,b=Object(i["a"])(h,d,f,!1,null,null,null),g=b.exports,y=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},_=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"col-md-12 py-5 text-light text-center"},[n("h1",{staticClass:"display-5"},[e._v("Project Icarus")])])}],C={name:"Title"},k=C,w=Object(i["a"])(k,y,_,!1,null,"4a09af2a",null),P=w.exports,x={name:"App",components:{GameOption:g,Title:P}},O=x,j=Object(i["a"])(O,p,m,!1,null,null,null),E=j.exports,T=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},S=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container",attrs:{id:"app"}},[n("div",{staticClass:"row"},[e._v(" Coming soon ")])])}],A={name:"Donate"},$=A,N=Object(i["a"])($,T,S,!1,null,null,null),G=N.exports;r["a"].use(u["a"]);var M=[{path:"/",name:"Home",component:E},{path:"/avalon",name:"Avalon",component:function(){return Promise.all([n.e("chunk-769007e2"),n.e("chunk-6004f43b")]).then(n.bind(null,"f746"))}},{path:"/avalon/:roomId",name:"AvalonGame",component:function(){return Promise.all([n.e("chunk-769007e2"),n.e("chunk-1735700a")]).then(n.bind(null,"7921"))},props:!0},{path:"/donate",name:"Donate",component:G}],L=new u["a"]({mode:"history",base:"/",routes:M}),D=L;n("4989");r["a"].config.productionTip=!1,new r["a"]({router:D,render:function(e){return e(l)}}).$mount("#app")},"5c64":function(e,t,n){"use strict";var r=n("d32a"),a=n.n(r);a.a},d32a:function(e,t,n){}});
//# sourceMappingURL=app.dd406f24.js.map