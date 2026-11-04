// Genera index.html a partir del juego: node armar-pagina.js ../picada.html
const fs=require('fs'),path=require('path');
const juego=fs.readFileSync(process.argv[2],'utf8');
fs.writeFileSync(path.join(__dirname,'index.html'),`<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="TRAX">
<meta name="theme-color" content="#000000">
<script src="https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js"></script>
<script src="room.js?v=${Date.now().toString(36)}"></script>
</head>
<body>
${juego}
</body>
</html>
`);
