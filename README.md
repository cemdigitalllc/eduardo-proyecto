# Instituto Privado San Ramón

Proyecto de siete páginas con HTML, CSS y JavaScript básicos. Colores principales: café y mostaza. Sin plantillas ni dependencias externas.

Datos confirmados: «Honor, dignidad y cultura», Villanueva, Cortés. Los demás contenidos institucionales son ejemplos.

## Ejecutar

Desde `/workspace/eduardo-proyecto`:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

También puedes abrir `index.html` directamente. No necesita instalación ni compilación.

## Archivos

- `index.html`: bienvenida.
- `nosotros.html`: historia, misión, visión, fundadores y organización.
- `personal.html`: perfiles de ejemplo.
- `actividades.html`: ocho actividades, con selector de categoría.
- `oferta.html`: tabla de costos, servicios, audio y video.
- `opiniones.html`: ocho opiniones ficticias.
- `contacto.html`: ubicación y formulario.
- `styles.css`: diseño sencillo, colores y adaptación a celulares.
- `script.js`: filtro de actividades y preparación del correo.

El inicio usa un hero con nombre y lema centrados. Su fondo provisional está en `assets/hero-pendiente.svg`: cambia la imagen de `.hero` en `styles.css` cuando tengas la fotografía. El logo y el menú comparten una fila arriba. Las páginas tienen una transición breve de salida y entrada que respeta la preferencia de movimiento reducido.

## Completar antes de entregar

Reemplaza los placeholders por fotos autorizadas. Cada imagen está dentro de una caja `.foto`; cambia su `src`, describe la foto con `alt` y actualiza o quita el texto «Foto pendiente».

Confirma historia, personal, oferta, costos, opiniones, dirección exacta, teléfono y redes. El escudo es provisional.

Configura el correo oficial en `correoInstituto`, dentro de `script.js`. El formulario prepara un mensaje con `mailto:` para enviarlo desde una aplicación de correo. No envía ni guarda información automáticamente. La recepción automática requiere un servicio adicional.

## Comprobar

```sh
node --check script.js
python3 tools/check_site.py
```

La segunda comprobación revisa enlaces, recursos, ocho actividades y ocho opiniones. Prueba también el selector de categoría, audio, video y formulario en el navegador.
