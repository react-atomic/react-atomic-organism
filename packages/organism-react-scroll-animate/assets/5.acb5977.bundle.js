"use strict";(self.webpackChunkorganism_react_scroll_animate=self.webpackChunkorganism_react_scroll_animate||[]).push([[5],{60(d,b,c){function a(b){if(!(this instanceof a))return new a(b);b=b||{},this.setName(b.name),this.setLevel(b.level),this.setSize(b.size)}c.r(b),c.d(b,{default:()=>e}),a.prototype.setName=function(a){return this.name=a||"DLOG",this.name},a.prototype.setLevel=function(a){return this.level=a&&this.level_map[a]?a:"info",this.level_no=this.level_map[this.level],this.level},a.prototype.setSize=function(a){return this.size=a||14,this.size},a.prototype.level_map={trace:1,debug:2,info:3,warn:4,error:5,silent:6},a.prototype.color_map={name:"cyan",trace:"black",debug:"green",info:"blue",warn:"orange",error:"red"},a.prototype.getCSS=function(a){return this.color_map[a]||(a="info"),a?"font-size: "+this.size+"px;color: "+this.color_map[a]:"font-size: "+this.size+"px"},a.prototype.log=function(a,b){"silent"!==a&&this.level_map[a]>=this.level_no&&this.show(a,b)},a.prototype.show=function(a,b){var c=function(a){return Object.keys(a=a||{})};console.info("%c [%s] %c %s %c %s:",this.getCSS(),new Date().toJSON(),this.getCSS("name"),this.name,this.getCSS(a),a.toUpperCase()),console[a]||(a="info"),"trace"===a?a="debug":"debug"===a&&(a="log"),b[0]=function(a){if("string"!=typeof a)return a;try{return JSON.parse(a,function(d,a){if(a&&"object"==typeof a){var b=Object.create(null);return c(a).forEach(function(c){b[c]=a[c]}),b}return a})}catch(b){return a}}(b[0]),function(b){for(var e=c(b),d=0,f=e.length;d<f;d++){var a=e[d];if(!a||isNaN(a)||"string"==typeof b[a]||!c(b[a]).length)return!1}return!0}(b[0])?console.table(b[0]):console[a].apply(console,b)},a.prototype.trace=function(){this.log("trace",arguments)},a.prototype.debug=function(){this.log("debug",arguments)},a.prototype.info=function(){this.log("info",arguments)},a.prototype.warn=function(){this.log("warn",arguments)},a.prototype.error=function(){this.log("error",arguments)};let e=a}}])