// Sala sin servidor propio: cada jugador ocupa un lugar numerado y se conecta directo con los demás por WebRTC.
// PeerJS se usa solo para que los navegadores se encuentren; la partida viaja entre jugadores.
(()=>{
  const sala=(new URLSearchParams(location.search).get('sala')||'calle').toLowerCase().replace(/[^a-z0-9-]/g,'').slice(0,24)||'calle';
  const PRE='picada-barrio-v1-'+sala+'-',MAX=16,CADUCA=6000;
  const yo=Array.from(crypto.getRandomValues(new Uint8Array(8)),b=>b.toString(16).padStart(2,'0')).join('');
  const oyentes=[],peers=new Map(),conns=new Map();
  let peer=null,lugar=-1,mio={},pendiente=false;

  const hacerPeer=(id,presence)=>({peer:id,sameTab:id===yo,presence,updatedAt:Date.now()});
  const avisar=c=>{const lista=[...peers.values()];for(const f of oyentes)f({peers:lista,joined:c.joined||[],updated:c.updated||[],left:c.left||[]})};
  peers.set(yo,hacerPeer(yo,mio));

  function soltar(c){
    if(conns.get(c.peer)===c)conns.delete(c.peer);
    const id=c.jugador;
    try{c.close()}catch{}
    if(id&&peers.has(id)&&![...conns.values()].some(o=>o.jugador===id)){
      const p=peers.get(id);peers.delete(id);avisar({left:[p]});
    }
  }
  function cablear(c){
    c.visto=Date.now();
    conns.set(c.peer,c);
    c.on('open',()=>{c.abierta=true;c.visto=Date.now()});
    c.on('data',d=>{
      if(!d||typeof d.i!=='string'||d.i.length!==16||typeof d.p!=='object'||d.p===null||Array.isArray(d.p))return;
      c.visto=Date.now();c.abierta=true;c.jugador=d.i;
      const nuevo=hacerPeer(d.i,d.p),existia=peers.has(d.i);
      peers.set(d.i,nuevo);
      avisar(existia?{updated:[nuevo]}:{joined:[nuevo]});
    });
    c.on('close',()=>soltar(c));
    c.on('error',()=>soltar(c));
  }
  function buscar(){
    if(!peer||peer.disconnected||lugar<0)return;
    for(let s=0;s<lugar;s++){
      const id=PRE+s;
      if(!conns.has(id))cablear(peer.connect(id,{reliable:false,serialization:'json'}));
    }
  }
  function ocupar(n){
    if(n>=MAX)return;
    const p=new Peer(PRE+n,{debug:0});
    p.on('open',()=>{peer=p;lugar=n;buscar();enviar()});
    p.on('connection',cablear);
    p.on('disconnected',()=>{if(peer===p&&!p.destroyed)p.reconnect()});
    p.on('error',e=>{
      if(peer===p)return;
      p.destroy();
      if(e.type==='unavailable-id')ocupar(n+1);
      else setTimeout(()=>ocupar(n),3000);
    });
  }
  function enviar(){
    if(pendiente)return;
    pendiente=true;
    setTimeout(()=>{
      pendiente=false;
      const d={i:yo,p:mio};
      for(const c of conns.values())if(c.open)try{c.send(d)}catch{}
    },33);
  }
  setInterval(()=>{
    const ahora=Date.now();
    for(const c of [...conns.values()])if(ahora-c.visto>CADUCA)soltar(c);
    buscar();
    enviar();
  },2000);
  addEventListener('pagehide',()=>{if(peer)peer.destroy()});

  const room={
    presence(patch){
      for(const k in patch){if(patch[k]===null)delete mio[k];else mio[k]=patch[k]}
      enviar();return Promise.resolve();
    },
    onPeers(f){
      oyentes.push(f);
      setTimeout(()=>f({peers:[...peers.values()],joined:[...peers.values()],updated:[],left:[]}),0);
      return()=>{oyentes.splice(oyentes.indexOf(f),1)};
    }
  };
  window.claude={use:n=>Promise.resolve(n==='room'?room:null)};
  if(window.Peer)ocupar(0);
})();
