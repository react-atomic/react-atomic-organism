if(!self.define){let s,e={};const n=(n,l)=>(n=new URL(n+".js",l).href,e[n]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=e,document.head.appendChild(s)}else s=n,importScripts(n),e()})).then((()=>{let s=e[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(l,b)=>{const u=s||("document"in self?document.currentScript.src:"")||location.href;if(e[u])return;let r={};const i=s=>n(s,u),c={module:{uri:u},exports:r,require:i};e[u]=Promise.all(l.map((s=>c[s]||i(s)))).then((s=>(b(...s),r)))}}define(["./workbox-5a7dec10"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"./assets/0.2b5c50b0330afc27498b.bundle.js",revision:null},{url:"./assets/1.2b5c50b0330afc27498b.bundle.js",revision:null},{url:"./assets/10.2b5c50b0330afc27498b.bundle.js",revision:null},{url:"./assets/11.2b5c50b0330afc27498b.bundle.js",revision:null},{url:"./assets/12.2b5c50b0330afc27498b.bundle.js",revision:null},{url:"./assets/13.2b5c50b0330afc27498b.bundle.js",revision:null},{url:"./assets/14.2b5c50b0330afc27498b.bundle.js",revision:null},{url:"./assets/15.2b5c50b0330afc27498b.bundle.js",revision:null},{url:"./assets/16.2b5c50b0330afc27498b.bundle.js",revision:null},{url:"./assets/2.2b5c50b0330afc27498b.bundle.js",revision:null},{url:"./assets/3.2b5c50b0330afc27498b.bundle.js",revision:null},{url:"./assets/4.2b5c50b0330afc27498b.bundle.js",revision:null},{url:"./assets/5.2b5c50b0330afc27498b.bundle.js",revision:null},{url:"./assets/6.2b5c50b0330afc27498b.bundle.js",revision:null},{url:"./assets/7.2b5c50b0330afc27498b.bundle.js",revision:null},{url:"./assets/8.2b5c50b0330afc27498b.bundle.js",revision:null},{url:"./assets/9.2b5c50b0330afc27498b.bundle.js",revision:null},{url:"./assets/main.bundle.js",revision:"d900b96ed891f4cee83b3fb98638706e"},{url:"./assets/vendor.bundle.js",revision:"9e8c0a5930ba37add2ef0edb3b0a489b"},{url:"./assets/worker.bundle.worker.js",revision:"fd42a5809cb3b148f804d618ce4dc6f7"}],{ignoreURLParametersMatching:[/.*/]}),s.registerRoute(/^(http)(s)?(\:\/\/).*\.(?:css)$/,new s.CacheFirst({cacheName:"css",plugins:[new s.ExpirationPlugin({maxEntries:10})]}),"GET"),s.registerRoute(/^(http)(s)?(\:\/\/).*\.(?:env|md|json|adoc)/,new s.CacheFirst({cacheName:"data",plugins:[new s.ExpirationPlugin({maxEntries:5})]}),"GET"),s.registerRoute(/^(http)(s)?(\:\/\/).*\/(?:env)/,new s.CacheFirst({cacheName:"env",plugins:[new s.ExpirationPlugin({maxEntries:5})]}),"GET")}));
