# Picada de Barrio

Carrera online de autitos en 3D, con física de choques en tiempo real y controles táctiles para celular.

## Cómo jugar

Abrí el enlace de GitHub Pages y compartilo. No hace falta cuenta ni instalar nada.

- **Celular:** se juega acostado. Elegí volante o flechas en la pestaña Controles y tocá «Ajustar controles» para mover, agrandar o achicar cada botón y cambiar la sensibilidad.
- **Teclado:** flechas o WASD. Espacio es el freno de mano, C mira atrás y R te devuelve a la pista.
- **Partidas:** al entrar ves las partidas abiertas y te unís con un toque. También podés crear la tuya o entrar con un código o un enlace.
- **Plata:** arrancás con tres autos. Cada carrera paga según tu posición (1º $1.000, 2º $700, 3º $500, 4º $350, 5º o peor $200; contra la máquina, la mitad). Con esa plata comprás autos en la pestaña Auto y los mejorás en el Taller. Queda guardada en cada dispositivo.

Hay diecisiete pistas sobre pasto, desierto, hielo, noche y ciudad. Quien crea la partida elige la pista y larga la carrera; si se va, pasa al que lleva más tiempo.

También hay diecisiete autos con física propia: Puma, Rayo, Cóndor y Cometa son los más veloces, y Zorro, Lince y Patrón están hechos para doblar de costado. Cada uno cambia velocidad, pique, frenos, agarre, derrape y peso, y tres vienen gratis, y el peso también influye en los choques.

## Cómo funciona

Es un sitio estático, sin servidor propio. Los jugadores se conectan directo entre sí por WebRTC, y el servicio público de [PeerJS](https://peerjs.com/) solo los ayuda a encontrarse. Cada navegador simula su propio auto y predice dónde están los demás según la latencia.

Algunas redes, sobre todo datos móviles o redes corporativas, pueden bloquear la conexión directa entre dos jugadores. En ese caso, los demás jugadores les retransmiten la señal.

## Publicar en GitHub Pages

En **Settings → Pages**, elegí la rama `main` y la carpeta `/ (root)`.

Para regenerar `index.html` desde el juego: `node armar-pagina.js ruta/a/picada.html`.
