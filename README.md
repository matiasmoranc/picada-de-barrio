# Picada de Barrio

Carrera online de autitos en 3D, con física de choques en tiempo real y controles táctiles para celular.

## Cómo jugar

Abrí el enlace de GitHub Pages y compartilo. No hace falta cuenta ni instalar nada.

- **Celular:** elegí volante fijo o flechas para doblar. A la derecha tenés acelerador, freno para bajar la velocidad y freno de mano para derrapar.
- **Teclado:** flechas o WASD. Espacio es el freno de mano y la tecla R te devuelve a la pista.
- **Partidas:** tocá «Crear partida» y pasá el código o el enlace. Los demás entran con «Unirme».

Hay diecisiete pistas sobre pasto, desierto, hielo, noche y ciudad. Quien crea la partida elige la pista y larga la carrera; si se va, pasa al que lleva más tiempo.

También hay diecisiete autos con física propia: Puma, Rayo, Cóndor y Cometa son los más veloces, y Zorro, Lince y Patrón están hechos para doblar de costado. Cada uno cambia velocidad, pique, frenos, agarre, derrape y peso, y el peso también influye en los choques.

## Cómo funciona

Es un sitio estático, sin servidor propio. Los jugadores se conectan directo entre sí por WebRTC, y el servicio público de [PeerJS](https://peerjs.com/) solo los ayuda a encontrarse. Cada navegador simula su propio auto y predice dónde están los demás según la latencia.

Algunas redes, sobre todo datos móviles o redes corporativas, pueden bloquear la conexión directa entre dos jugadores. En ese caso, los demás jugadores les retransmiten la señal.

## Publicar en GitHub Pages

En **Settings → Pages**, elegí la rama `main` y la carpeta `/ (root)`.

Para regenerar `index.html` desde el juego: `node armar-pagina.js ruta/a/picada.html`.
