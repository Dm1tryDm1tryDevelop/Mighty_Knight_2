const V='mk2-v1',CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==V).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
if(r.mode==='navigate'){e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(h=>h.put('index.html',c));return x}).catch(()=>caches.match('index.html')));return}
e.respondWith(caches.match(r).then(hit=>{const net=fetch(r).then(x=>{if(x&&(x.ok||x.type==='opaque'))caches.open(V).then(h=>h.put(r,x.clone()));return x}).catch(()=>hit);return hit||net}))});
