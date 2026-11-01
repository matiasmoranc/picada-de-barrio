// Partidas sin servidor propio: cada jugador ocupa un lugar numerado y se conecta directo con los demás por WebRTC.
// PeerJS se usa solo para que los navegadores se encuentren. Si dos jugadores no logran verse directo,
// los demás les retransmiten la señal.
(()=>{
  const MAX=16,CADUCA=6000,ABRE=5000;
  const q=new URLSearchParams(location.search).get('sala')||'';
  window.__salaUrl=q.toLowerCase().replace(/[^a-z0-9-]/g,'').slice(0,24);
  window.__enlace=c=>location.origin+location.pathname+'?sala='+c;

  function abrir(nombre){
    const PRE='picada-barrio-v2-'+nombre+'-';
    const yo=Array.from(crypto.getRandomValues(new Uint8Array(8)),b=>b.toString(16).padStart(2,'0')).join('');
    const oyentes=[],peers=new Map(),conns=new Map(),ultimo=new Map(),vio=new Map(),enlaces=new Map();
    let peer=null,lugar=-1,mio={},pendiente=false,n=0,cerrada=false;

    const hacerPeer=(id,presence)=>({peer:id,sameTab:id===yo,presence,updatedAt:Date.now()});
    const avisar=c=>{const lista=[...peers.values()];for(const f of oyentes)f({peers:lista,joined:c.joined||[],updated:c.updated||[],left:c.left||[]})};
    peers.set(yo,hacerPeer(yo,mio));

    const directos=()=>[...conns.values()].filter(c=>c.open&&c.jugador).map(c=>c.jugador);
    function soltar(c){
      if(conns.get(c.peer)===c)conns.delete(c.peer);
      try{c.close()}catch{}
    }
    function recibir(c,d){
      if(!d||typeof d.i!=='string'||d.i.length!==16||d.i===yo||typeof d.p!=='object'||d.p===null||Array.isArray(d.p)||typeof d.n!=='number')return;
      if(!d.h)c.jugador=d.i;
      c.visto=Date.now();
      if(Array.isArray(d.v))enlaces.set(d.i,new Set(d.v));
      if(d.n<=(ultimo.get(d.i)||0))return;
      ultimo.set(d.i,d.n);vio.set(d.i,Date.now());
      const nuevo=hacerPeer(d.i,d.p),existia=peers.has(d.i);
      peers.set(d.i,nuevo);
      avisar(existia?{updated:[nuevo]}:{joined:[nuevo]});
      // Retransmite a quien no tiene conexión directa con este jugador
      const salto=(d.h||0)+1;
      if(salto>2)return;
      for(const o of conns.values()){
        if(o===c||!o.open||!o.jugador||o.jugador===d.i)continue;
        const de=enlaces.get(o.jugador);
        if(de&&de.has(d.i))continue;
        try{o.send({...d,h:salto})}catch{}
      }
    }
    function cablear(c){
      c.visto=Date.now();
      conns.set(c.peer,c);
      c.on('open',()=>{c.visto=Date.now();enviar()});
      c.on('data',d=>recibir(c,d));
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
    function ocupar(k){
      if(cerrada||k>=MAX)return;
      const p=new Peer(PRE+k,{debug:0});
      p.on('open',()=>{if(cerrada){p.destroy();return}peer=p;lugar=k;buscar();enviar()});
      p.on('connection',cablear);
      p.on('disconnected',()=>{if(peer===p&&!p.destroyed&&!cerrada)p.reconnect()});
      p.on('error',e=>{
        if(peer===p)return;
        p.destroy();
        if(e.type==='unavailable-id')ocupar(k+1);
        else setTimeout(()=>ocupar(k),3000);
      });
    }
    function enviar(){
      if(pendiente)return;
      pendiente=true;
      setTimeout(()=>{
        pendiente=false;n++;
        const d={i:yo,n,p:mio};
        if(n%20===1)d.v=directos();
        for(const c of conns.values())if(c.open)try{c.send(d)}catch{}
      },30);
    }
    const ciclo=setInterval(()=>{
      const ahora=Date.now();
      for(const c of [...conns.values()])if(ahora-c.visto>(c.open?CADUCA:ABRE))soltar(c);
      for(const [id,t] of vio)if(ahora-t>CADUCA){
        vio.delete(id);ultimo.delete(id);enlaces.delete(id);
        const p=peers.get(id);if(p){peers.delete(id);avisar({left:[p]})}
      }
      buscar();enviar();
    },1500);
    const alSalir=()=>{if(peer)peer.destroy()};
    addEventListener('pagehide',alSalir);
    ocupar(0);

    return {
      name:nombre,
      presence(patch){
        for(const k in patch){if(patch[k]===null)delete mio[k];else mio[k]=patch[k]}
        enviar();return Promise.resolve();
      },
      onPeers(f){
        oyentes.push(f);
        setTimeout(()=>f({peers:[...peers.values()],joined:[...peers.values()],updated:[],left:[]}),0);
        return()=>{oyentes.splice(oyentes.indexOf(f),1)};
      },
      leave(){
        cerrada=true;clearInterval(ciclo);removeEventListener('pagehide',alSalir);
        if(peer)peer.destroy();
        oyentes.length=0;return Promise.resolve();
      }
    };
  }
  const base=window.Peer?{join:n=>Promise.resolve(abrir(n))}:null;
  window.claude={use:n=>Promise.resolve(n==='room'?base:null)};
})();
