const V='mk2-v2',CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==V).map(n=>caches.delete(n)))).then(()=>self.clients.claim()).then(()=>self.clients.matchAll({type:'window'})).then(cs=>cs.forEach(c=>{try{c.navigate(c.url)}catch(x){}})))});
const fresh=r=>fetch(r,{cache:'no-store'}).then(x=>{if(x&&x.ok){const c=x.clone();caches.open(V).then(h=>h.put(r,c))}return x});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url),same=u.origin===location.origin;
if(r.mode==='navigate'||same&&/\.(html|js|webmanifest)$/.test(u.pathname)||same&&u.pathname.endsWith('/')){e.respondWith(fresh(r).catch(()=>caches.match(r).then(h=>h||caches.match('index.html'))));return}
if(same){e.respondWith(caches.match(r).then(hit=>{const net=fetch(r).then(x=>{if(x&&x.ok)caches.open(V).then(h=>h.put(r,x.clone()));return x}).catch(()=>hit);return hit||net}));return}
e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(x=>{if(x&&(x.ok||x.type==='opaque'))caches.open(V).then(h=>h.put(r,x.clone()));return x})))});
