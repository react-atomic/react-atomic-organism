if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,l)=>{const b=e||("document"in self?document.currentScript.src:"")||location.href;if(s[b])return;let u={};const r=e=>n(e,b),i={module:{uri:b},exports:u,require:r};s[b]=Promise.all(a.map((e=>i[e]||r(e)))).then((e=>(l(...e),u)))}}define(["./workbox-5a7dec10"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"./assets/0.8a482c8ea57574bbab4e.bundle.js",revision:null},{url:"./assets/1.8a482c8ea57574bbab4e.bundle.js",revision:null},{url:"./assets/10.8a482c8ea57574bbab4e.bundle.js",revision:null},{url:"./assets/11.8a482c8ea57574bbab4e.bundle.js",revision:null},{url:"./assets/12.8a482c8ea57574bbab4e.bundle.js",revision:null},{url:"./assets/13.8a482c8ea57574bbab4e.bundle.js",revision:null},{url:"./assets/14.8a482c8ea57574bbab4e.bundle.js",revision:null},{url:"./assets/15.8a482c8ea57574bbab4e.bundle.js",revision:null},{url:"./assets/16.8a482c8ea57574bbab4e.bundle.js",revision:null},{url:"./assets/2.8a482c8ea57574bbab4e.bundle.js",revision:null},{url:"./assets/3.8a482c8ea57574bbab4e.bundle.js",revision:null},{url:"./assets/4.8a482c8ea57574bbab4e.bundle.js",revision:null},{url:"./assets/5.8a482c8ea57574bbab4e.bundle.js",revision:null},{url:"./assets/6.8a482c8ea57574bbab4e.bundle.js",revision:null},{url:"./assets/7.8a482c8ea57574bbab4e.bundle.js",revision:null},{url:"./assets/8.8a482c8ea57574bbab4e.bundle.js",revision:null},{url:"./assets/9.8a482c8ea57574bbab4e.bundle.js",revision:null},{url:"./assets/main.bundle.js",revision:"efe23f91b095ad5a78de3c635a929538"},{url:"./assets/vendor.bundle.js",revision:"9e8c0a5930ba37add2ef0edb3b0a489b"},{url:"./assets/worker.bundle.worker.js",revision:"fd42a5809cb3b148f804d618ce4dc6f7"}],{ignoreURLParametersMatching:[/.*/]}),e.registerRoute(/^(http)(s)?(\:\/\/).*\.(?:css)$/,new e.CacheFirst({cacheName:"css",plugins:[new e.ExpirationPlugin({maxEntries:10})]}),"GET"),e.registerRoute(/^(http)(s)?(\:\/\/).*\.(?:env|md|json|adoc)/,new e.CacheFirst({cacheName:"data",plugins:[new e.ExpirationPlugin({maxEntries:5})]}),"GET"),e.registerRoute(/^(http)(s)?(\:\/\/).*\/(?:env)/,new e.CacheFirst({cacheName:"env",plugins:[new e.ExpirationPlugin({maxEntries:5})]}),"GET")}));
