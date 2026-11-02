# Procourrier — nueva web (rediseño)

Sitio estático (HTML + CSS + JS, sin dependencias).

## Ejecutar localmente
```bash
npx serve -l 3000 .
```
Abrir http://localhost:3000

## Estructura
- `index.html` — 10 secciones: Hero, Servicios, Plataforma propia, Integraciones, Fulfillment, Operación real, Preguntas frecuentes, Blog, Repartí con nosotros, Contacto.
- `assets/js/data.js` — contenido editable: detalle de servicios, 26 preguntas frecuentes y artículos del blog.
- `scripts/build-blog.js` — regenera `/blog/*.html` desde `data.js` (`npm run build:blog`).
- `assets/ref/` — imágenes de referencia originales (no se modifican).
- `assets/img/` — recortes fotográficos obtenidos de las referencias.
- `assets/video/operacion-real.mp4` — **colocar aquí el video original** de “Logística que se ve en cada entrega”.
