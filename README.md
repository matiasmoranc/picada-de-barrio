# Picada de Barrio

Carrera online de autitos en 3D, con física de choques en tiempo real y controles táctiles para celular.

## Cómo jugar

Abrí el enlace de GitHub Pages y compartilo. No hace falta cuenta ni instalar nada.

- **Cómo se juega:** con el celular parado y vista desde arriba, centrado en las físicas de manejo. En Jugar elegís Circuito, Derrape, Práctica o Multijugador. En el Garaje todos los autos son gratis y se ven en 3D; las piezas se compran con la plata de las carreras.
- **Teclado:** flechas o WASD. Espacio es el freno de mano, N el nitro, C mira atrás, R te devuelve a la pista.
- **Partidas:** al entrar ves las partidas abiertas y te unís con un toque. También podés crear la tuya o entrar con un código o un enlace.
- **Progreso:** arrancás con tres autos. Las picadas y los puntos de derrape dan plata y reputación; la reputación sube tu nivel y desbloquea autos, y el estilo de tu auto suma un bono a los premios. Todo se guarda en cada dispositivo.
- **Controles:** elegí volante o flechas con el botón ⚙ y movelos o cambiales el tamaño en «Ajustar controles».

Hay diecisiete pistas sobre pasto, desierto, hielo, noche y ciudad. Quien crea la partida elige la pista y larga la carrera; si se va, pasa al que lleva más tiempo.

También hay diecisiete autos con física propia: Puma, Rayo, Cóndor y Cometa son los más veloces, y Zorro, Lince y Patrón están hechos para doblar de costado. Cada uno cambia velocidad, pique, frenos, agarre, derrape y peso, y tres vienen gratis, y el peso también influye en los choques.

## Cómo funciona

Es un sitio estático, sin servidor propio. Los jugadores se conectan directo entre sí por WebRTC, y el servicio público de [PeerJS](https://peerjs.com/) solo los ayuda a encontrarse. Cada navegador simula su propio auto y predice dónde están los demás según la latencia.

Algunas redes, sobre todo datos móviles o redes corporativas, pueden bloquear la conexión directa entre dos jugadores. En ese caso, los demás jugadores les retransmiten la señal.

## Publicar en GitHub Pages

En **Settings → Pages**, elegí la rama `main` y la carpeta `/ (root)`.

Para regenerar `index.html` desde el juego: `node armar-pagina.js ruta/a/picada.html`.

## Circuitos

Hay dos grupos: 17 pistas propias y 24 que siguen los trazados del calendario 2026 de Fórmula 1, adaptados a escala y al ancho de pista del juego. No es un producto oficial ni tiene relación con Formula 1.

Datos de trazados: [bacinger/f1-circuits](https://github.com/bacinger/f1-circuits), licencia MIT, Copyright (c) 2019-2025 Tomislav Bacinger.
