if(!self.define){let e,s={};const n=(n,l)=>(n=new URL(n+".js",l).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(l,b)=>{const u=e||("document"in self?document.currentScript.src:"")||location.href;if(s[u])return;let r={};const i=e=>n(e,u),t={module:{uri:u},exports:r,require:i};s[u]=Promise.all(l.map((e=>t[e]||i(e)))).then((e=>(b(...e),r)))}}define(["./workbox-e31792a0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"./assets/../index.html",revision:"bb959f6fae609f4434973439dce7fe7d"},{url:"./assets/10.b2fb5be.bundle.js",revision:null},{url:"./assets/11.b2fb5be.bundle.js",revision:null},{url:"./assets/12.b2fb5be.bundle.js",revision:null},{url:"./assets/13.b2fb5be.bundle.js",revision:null},{url:"./assets/14.b2fb5be.bundle.js",revision:null},{url:"./assets/15.b2fb5be.bundle.js",revision:null},{url:"./assets/16.b2fb5be.bundle.js",revision:null},{url:"./assets/17.b2fb5be.bundle.js",revision:null},{url:"./assets/18.b2fb5be.bundle.js",revision:null},{url:"./assets/19.b2fb5be.bundle.js",revision:null},{url:"./assets/3.b2fb5be.bundle.js",revision:null},{url:"./assets/4.b2fb5be.bundle.js",revision:null},{url:"./assets/5.b2fb5be.bundle.js",revision:null},{url:"./assets/6.b2fb5be.bundle.js",revision:null},{url:"./assets/7.b2fb5be.bundle.js",revision:null},{url:"./assets/8.b2fb5be.bundle.js",revision:null},{url:"./assets/9.b2fb5be.bundle.js",revision:null},{url:"./assets/lib.bundle.js",revision:"423843cfb080e906e236e10b5ff24970"},{url:"./assets/main.bundle.js",revision:"e474ec4a920f6b1778c62c897ed8b578"},{url:"./assets/vendor.bundle.js",revision:"f490dc1086cd2334425fa609f91bc23f"},{url:"./assets/worker.bundle.worker.js",revision:"21d1c3b5fd22412a9a9f0a22a09fb3e4"}],{ignoreURLParametersMatching:[/.*/]}),e.cleanupOutdatedCaches(),e.registerRoute(/^(http)(s)?(\:\/\/).*\.(?:css)$/,new e.CacheFirst({cacheName:"css",plugins:[new e.ExpirationPlugin({maxEntries:10})]}),"GET"),e.registerRoute(/^(http)(s)?(\:\/\/).*\.(?:env|md|json|adoc)/,new e.CacheFirst({cacheName:"data",plugins:[new e.ExpirationPlugin({maxEntries:5})]}),"GET"),e.registerRoute(/^(http)(s)?(\:\/\/).*\/(?:env)/,new e.CacheFirst({cacheName:"env",plugins:[new e.ExpirationPlugin({maxEntries:5})]}),"GET")}));
