if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>a(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/10-7f365fec31ada5ea.js",revision:"7f365fec31ada5ea"},{url:"/_next/static/chunks/203.a92547a29ded5f08.js",revision:"a92547a29ded5f08"},{url:"/_next/static/chunks/24-471a9fb9026e5af5.js",revision:"471a9fb9026e5af5"},{url:"/_next/static/chunks/396-191b488403dea7a3.js",revision:"191b488403dea7a3"},{url:"/_next/static/chunks/454-f0a2828c64aa715d.js",revision:"f0a2828c64aa715d"},{url:"/_next/static/chunks/894.8b3e79a97f1244f1.js",revision:"8b3e79a97f1244f1"},{url:"/_next/static/chunks/framework-2c79e2a64abdb08b.js",revision:"2c79e2a64abdb08b"},{url:"/_next/static/chunks/main-764e319ec6ea64ca.js",revision:"764e319ec6ea64ca"},{url:"/_next/static/chunks/pages/_app-32d2acae3158656b.js",revision:"32d2acae3158656b"},{url:"/_next/static/chunks/pages/_error-47e526b08b70a03d.js",revision:"47e526b08b70a03d"},{url:"/_next/static/chunks/pages/fcl/authn-8ee27951b9802cb6.js",revision:"8ee27951b9802cb6"},{url:"/_next/static/chunks/pages/fcl/authn-refresh-caef9455274da56c.js",revision:"caef9455274da56c"},{url:"/_next/static/chunks/pages/fcl/authz-a0ede8e4c2bc73a9.js",revision:"a0ede8e4c2bc73a9"},{url:"/_next/static/chunks/pages/fcl/user-sig-b5311906b095ccdd.js",revision:"b5311906b095ccdd"},{url:"/_next/static/chunks/pages/index-fbae851273b0d307.js",revision:"fbae851273b0d307"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-60bcf09fb489fef1.js",revision:"60bcf09fb489fef1"},{url:"/_next/static/css/32014b948bf19a94.css",revision:"32014b948bf19a94"},{url:"/_next/static/yE3QawZ1BrSNQdH6Qqa68/_buildManifest.js",revision:"ea17f347902f0e0777f5025f76fef523"},{url:"/_next/static/yE3QawZ1BrSNQdH6Qqa68/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/back-arrow.svg",revision:"6ea396df9a89529cf2ff2ca6bd1aac73"},{url:"/collapse.svg",revision:"d851355d36543b28ec2b3d56c602bbb8"},{url:"/expand.svg",revision:"5f71cb08a24d15834a9273c1e94882b4"},{url:"/external-link.svg",revision:"77f211d0a2f050a561c26a97967c938c"},{url:"/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/flow-logo.svg",revision:"35a874a5d7e69d57bfe7b354929dcd13"},{url:"/fonts/bebas-neue-v2-latin/bebas-neue-v2-latin-regular.woff2",revision:"e2b2c0d01e61f177b020ff2381008139"},{url:"/fonts/overpass/overpass-bold.woff2",revision:"dffd48e0aa3330117b632d224604f62c"},{url:"/fonts/overpass/overpass-mono-regular.woff2",revision:"052fe015624572a027b61fae5a1693eb"},{url:"/fonts/overpass/overpass-regular.woff2",revision:"eac886103b9ccf166055ec55f40ef709"},{url:"/fonts/overpass/overpass-semibold.woff2",revision:"d4e57438efacaba9cee06d1f30a19a6b"},{url:"/icon-192x192.png",revision:"11564aa73867be6ae269c139dad9caf4"},{url:"/icon-256x256.png",revision:"a5a3151b8f39cec988fddc74106322dc"},{url:"/icon-384x384.png",revision:"44dcf95c711848f9d458fc4af7474c43"},{url:"/icon-512x512.png",revision:"09b089810fe53729028307c57c3ad50a"},{url:"/manifest.json",revision:"bb650a0f6ee20cc23cae488e0cc8bad7"},{url:"/missing-app-icon.svg",revision:"b0ee20f7cd203ddb1068a4260cc9cace"},{url:"/missing-avatar-icon.svg",revision:"7dd054fb1b8d9eac72d8de1eb4583ea7"},{url:"/plus-icon.svg",revision:"659ab65cf9395d27fe96fdc9d443b398"},{url:"/settings.svg",revision:"d5196e76109e32d105f041c6adbc3b32"},{url:"/transaction.svg",revision:"a37ec6b1d4ed23724b702dd342350a95"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"},{url:"/x-icon.svg",revision:"9b7779f6286c398e628626d36c3a8568"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
