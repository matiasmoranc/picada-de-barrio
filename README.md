# Picada de Barrio

Carrera online de autitos en 3D, con física de choques en tiempo real y controles táctiles para celular.

## Cómo jugar

Abrí el enlace de GitHub Pages y compartilo. No hace falta cuenta ni instalar nada.

- **Celular:** dedo izquierdo para doblar, botones de la derecha para acelerar y frenar.
- **Teclado:** flechas o WASD. La tecla R te devuelve a la pista.
- **Salas:** todos entran a la misma sala. Para una privada, agregá `?sala=amigos` al enlace.

Hay cuatro circuitos: El Poroto, El Óvalo, La Serpentina y La Costanera.

También hay diez autos con física propia: Rural, Flecha, Picudo, Crucero, Pegote, Bólido, Tanque, Pluma, Clavado y Deriva. Cada uno cambia velocidad, pique, frenos, agarre y peso, y el peso también influye en los choques.

## Cómo funciona

Es un sitio estático, sin servidor propio. Los jugadores se conectan directo entre sí por WebRTC, y el servicio público de [PeerJS](https://peerjs.com/) solo los ayuda a encontrarse. Cada navegador simula su propio auto y predice dónde están los demás según la latencia.

Algunas redes, sobre todo datos móviles o redes corporativas, pueden bloquear la conexión directa. En ese caso se juega contra autos de práctica.

## Publicar en GitHub Pages

En **Settings → Pages**, elegí la rama `main` y la carpeta `/ (root)`.

Para regenerar `index.html` desde el juego: `node armar-pagina.js ruta/a/picada.html`.
