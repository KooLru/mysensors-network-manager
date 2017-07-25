webpackJsonp([2],{372:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=t(0),o=t.n(r),a=t(6),i=(t.n(a),t(437)),s=t(45),c=t(389),u=t(46),f={container:t.i(a.css)({width:350,minWidth:"90%"})};e.default=function(n){var e=n.network,r=n.format,l=void 0===r?"arduino":r,p=l,m=function(n){return p=n},d=function(n){t.i(i.a)(e,p),t.i(u.d)()};return o.a.createElement("div",{className:f.container},o.a.createElement("h1",null,"Create a backup"),o.a.createElement("div",{className:t.i(a.css)({textAlign:"center"})},o.a.createElement("p",null,"Preferred IDE:"),o.a.createElement(c.a,{format:p,onChange:m})),o.a.createElement("footer",null,o.a.createElement(s.a,{onClick:d},"Download")))}},389:function(n,e,t){"use strict";function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function o(n,e){if(!n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==typeof e&&"function"!==typeof e?n:e}function a(n,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);n.prototype=Object.create(e&&e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(n,e):n.__proto__=e)}var i=t(0),s=t.n(i),c=t(88),u=t(45),f=t(20),l=t(6),p=(t.n(l),function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}()),m={switcherContainer:t.i(l.css)(c.a,{"& li":t.i(l.css)(c.b,{"& span, & button":{padding:"7px 10px 5px",display:"flex",alignItems:"center",textDecoration:"none",fontSize:13,"&:hover":{textDecoration:"none"},"& svg":{marginRight:5}},"&.selected":c.c})})},d=function(n){function e(n){r(this,e);var t=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n));return t.state={format:n.format||"arduino"},t}return a(e,n),p(e,[{key:"_onChange",value:function(n){this.setState({format:n}),(this.props.onChange||function(){})(n)}},{key:"render",value:function(){var n=this;return s.a.createElement("ul",{className:m.switcherContainer},s.a.createElement("li",{className:"arduino"===this.state.format&&"selected"},"arduino"===this.state.format?s.a.createElement("span",null,s.a.createElement(f.i,{height:18})," Arduino"):s.a.createElement(u.b,{onClick:function(e){return n._onChange("arduino")}},s.a.createElement(f.i,{height:18})," Arduino")),s.a.createElement("li",{className:"pio"===this.state.format&&"selected"},"pio"===this.state.format?s.a.createElement("span",null,s.a.createElement(f.j,{size:18})," PlatformIO"):s.a.createElement(u.b,{onClick:function(e){return n._onChange("pio")}},s.a.createElement(f.j,{size:18})," PlatformIO")))}}]),e}(i.Component);e.a=d},390:function(n,e,t){"use strict";function r(n){if(Array.isArray(n)){for(var e=0,t=Array(n.length);e<n.length;e++)t[e]=n[e];return t}return Array.from(n)}t.d(e,"a",function(){return u}),t.d(e,"b",function(){return f});var o=t(9),a=t(391),i=t(161),s=function(n){var e=n.key;return JSON.parse(window.localStorage.getItem(e)).text},c="\nInstructions to flash your node:\n\ntl;dr:\n* Flash the SecurityPersonalizer to your node first.\n* Then flash the main sketch next.\n\nDetails:\nFlashing the SecurityPersonalizer sketch to your node prepares it for signing\nand encryption. It writes the necessary security keys to your node's EEPROM\n(in case of software signing) or to the ATSHA204 (in case you are using the\nATSHA204 chip). This ensures that your sensor data isn't visible to your\nneighbours, and that snoopers can't snoop.\n".trim(),u=function(n){var e=n.network.nodes.find(function(e){return e.id===n.nodeId}).name.trim();return[{path:e+"/README.md",contents:c}].concat(r(o.a.map(function(r){return{path:e+"/SecurityPersonalizer/"+r.name,contents:"sp-ino"===r.key?t.i(a.a)(n,s(r)):s(r)}})),r(o.b.map(function(n){return{path:e+"/"+e+"/"+n.name,contents:s(n)}})),r(t.i(i.a)(n,e).map(function(n){return{path:e+"/"+e+"/"+n.name,contents:n.contents}})))},f=function(n){var e=n.network.nodes.find(function(e){return e.id===n.nodeId}).name.trim();return[{path:e+"/README.md",contents:c}].concat(r(o.a.map(function(r){return{path:e+"/SecurityPersonalizer/src/"+r.name,contents:"sp-ino"===r.key?t.i(a.a)(n,s(r)):s(r)}})),[{path:e+"/SecurityPersonalizer/platformio.ini",contents:t.i(a.b)()}],r(o.b.map(function(n){return{path:e+"/"+e+"/src/"+n.name,contents:s(n)}})),r(t.i(i.a)(n,e).map(function(n){return{path:e+"/"+e+"/src/"+n.name,contents:n.contents}})),[{path:e+"/"+e+"/platformio.ini",contents:t.i(i.b)(n)}])}},391:function(n,e,t){"use strict";t.d(e,"b",function(){return o});var r=function(n){return n.match(/.{2}/g).map(function(n){return"0x"+n}).join()};e.a=function(n,e){var t=n.network,o=n.nodeId,a=t.nodes.find(function(n){return n.id===o});return e.split("\n").map(function(n){return n.trim().startsWith("#define MY_HMAC_KEY")?"#define MY_HMAC_KEY "+r(t.hmac):n.trim().startsWith("#define MY_AES_KEY")?"#define MY_AES_KEY "+r(t.aes):n.trim().startsWith("#define MY_SOFT_SERIAL")?"#define MY_SOFT_SERIAL "+r(a.key):"//#define PERSONALIZE_SOFT"===n.trim()&&"software"===a.signing?"#define PERSONALIZE_SOFT":"//#define PERSONALIZE_ATSHA204A"===n.trim()&&"atsha204"===a.signing?"#define PERSONALIZE_ATSHA204A":n}).join("\n")};var o=function(){return"\n; PlatformIO Project Configuration File\n;\n;   Build options: build flags, source filter, extra scripting\n;   Upload options: custom port, speed and extra flags\n;   Library options: dependencies, extra library storages\n;\n; Please visit documentation for the other options and examples\n; http://docs.platformio.org/en/stable/projectconf.html\n\n[env:pro8MHzatmega328]\nplatform = atmelavr\nframework = arduino\nboard = pro8MHzatmega328\nlib_deps = https://github.com/mysensors/MySensors#development\n"}},437:function(n,e,t){"use strict";function r(n){if(Array.isArray(n)){for(var e=0,t=Array(n.length);e<n.length;e++)t[e]=n[e];return t}return Array.from(n)}t.d(e,"a",function(){return a});var o=t(390),a=function(n,e){var a="arduino"===e?o.a:o.b,i="Network-"+n.id;return t.e(3).then(t.bind(null,405)).then(function(e){var t=e.JSZip,o=e.saveAs,s=new t;return n.nodes.reduce(function(e,t){return[].concat(r(e),r(a({network:n,nodeId:t.id}).map(function(n){var e=n.path,t=n.contents;return{path:i+"/"+e,contents:t}})))},[{path:i+"/network.json",contents:JSON.stringify(n,null,2)}]).forEach(function(n){var e=n.path,t=n.contents;return s.file(e,t)}),s.generateAsync({type:"blob"}).then(function(n){return o(n,""+i)})})}}});
//# sourceMappingURL=2.58393ddb.chunk.js.map