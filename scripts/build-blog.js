// Genera las páginas individuales del blog en /blog a partir de assets/js/data.js?v=1794229065
// Uso: node scripts/build-blog.js
const fs = require('fs'), path = require('path');
const { blog, WA } = require('../assets/js/data.js');
const SITE = require('./site.json').url;
const root = path.join(__dirname, '..');
const I = (id, s = '') => `<svg aria-hidden="true"${s}><use href="../assets/icons.svg?v=1794229065#${id}"/></svg>`;
const wa = t => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
blog.forEach((p, i) => {
  const related = blog.filter(b => b !== p).slice(0, 3);
  const html = `<!doctype html>
<html lang="es-AR">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${p.title} | Blog Procourrier</title>
<meta name="description" content="${p.desc}">
<meta name="theme-color" content="#0b0b0c">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${SITE}/blog/${p.slug}.html">
<meta property="og:type" content="article">
<meta property="og:locale" content="es_AR">
<meta property="og:site_name" content="Procourrier">
<meta property="og:url" content="${SITE}/blog/${p.slug}.html">
<meta property="og:title" content="${p.title}">
<meta property="og:description" content="${p.desc}">
<meta property="og:image" content="${SITE}/assets/img/og-procourrier.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'BlogPosting',headline:p.title,description:p.desc,inLanguage:'es-AR',image:SITE+'/assets/img/'+p.img+'.webp',mainEntityOfPage:SITE+'/blog/'+p.slug+'.html',timeRequired:'PT'+p.min+'M',author:{'@type':'Organization',name:'Procourrier'},publisher:{'@type':'Organization',name:'Procourrier',logo:{'@type':'ImageObject',url:SITE+'/assets/img/logo.webp'}}})}</script>
<script src="/assets/js/analytics.js?v=1794229065" defer></script>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/styles.css?v=1794229065">
</head>
<body>
<a class="skip" href="#main">Saltar al contenido</a>
<header class="site-header scrolled">
  <nav class="container nav" aria-label="Principal">
    <a class="brand" href="../index.html" aria-label="Procourrier, ir al inicio"><img src="../assets/img/logo.webp" alt="Procourrier Logística Profesional" width="310" height="90"></a>
    <ul class="nav-links" id="nav-links">
      <li><a href="../index.html#servicios">Soluciones</a></li>
      <li><a href="../index.html#integraciones">Integraciones</a></li>
      <li><a href="../index.html#fulfillment">Fulfillment</a></li>
      <li><a href="../index.html#operacion">Nosotros</a></li>
      <li><a href="../index.html#faq">Preguntas frecuentes</a></li>
      <li><a class="active" href="../index.html#blog">Blog</a></li>
    </ul>
    <a class="btn btn-primary nav-cta" href="../index.html#contacto">Contactanos ${I('arrow')}</a>
    <button class="menu-toggle" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav-links">${I('menu')}</button>
  </nav>
</header>
<main id="main">
  <section class="article-hero">
    <div class="container">
      <a class="back-link" href="../index.html#blog">← Volver al blog</a>
      <p class="eyebrow small line-before" style="margin-top:26px">Blog · Guías para vender y entregar mejor</p>
      <h1 class="h-md">${p.title}</h1>
      <div class="article-meta"><span class="read-time" style="margin:0">${I('clock')} ${p.min} min de lectura</span><span>${p.bullets.join(' · ')}</span></div>
      <img class="article-cover" src="../assets/img/${p.img}.webp" alt="">
    </div>
  </section>
  <article class="container article">
    ${p.body}
    <div class="article-cta">
      <h3>¿Listo para profesionalizar tu logística?</h3>
      <a class="btn btn-primary" href="../index.html#contacto">Hablemos</a>
    </div>
    <h2>Seguí leyendo</h2>
    <div class="related">${related.map(r => `<a href="${r.slug}.html"><span class="read-time">${I('clock')} ${r.min} min</span><strong>${r.title}</strong></a>`).join('')}</div>
  </article>
</main>
<footer class="site-footer">
  <div class="container footer-bottom" style="margin:0;border:0;padding:0"><span>© 2026 Procourrier · Logística Profesional.</span><span><a href="https://wa.me/${WA}" style="color:inherit">+54 9 11 2406-4020</a> · <a href="mailto:envios@procourier.com.ar" style="color:inherit">envios@procourier.com.ar</a></span></div>
</footer>
<div class="wa-widget" id="wa-widget">
  <div class="wa-panel" id="wa-panel" role="dialog" aria-label="Contacto por WhatsApp">
    <div class="wa-head"><strong>Procourrier</strong><span>¿En qué te podemos ayudar?</span></div>
    <div class="wa-options">
      <a href="${wa('Hola Procourrier, quiero pedir una cotización para mis envíos.')}" target="_blank" rel="noopener">${I('bars')}Quiero cotizar mis envíos</a>
      <a href="${wa('Hola Procourrier, quiero consultar el estado de mi envío. Número de seguimiento: ')}" target="_blank" rel="noopener">${I('pin')}Estado de mi envío</a>
      <a href="${wa('Hola Procourrier, tengo otra consulta: ')}" target="_blank" rel="noopener">${I('chat')}Otra consulta</a>
    </div>
  </div>
  <button class="wa-fab" type="button" aria-label="Abrir opciones de WhatsApp" aria-expanded="false" aria-controls="wa-panel">${I('whatsapp')}</button>
</div>
<script>
(function(){var t=document.querySelector('.menu-toggle'),w=document.getElementById('wa-widget'),f=w.querySelector('.wa-fab');
t.addEventListener('click',function(){var o=document.body.classList.toggle('nav-open');t.setAttribute('aria-expanded',o)});
f.addEventListener('click',function(e){e.stopPropagation();var o=w.classList.toggle('open');f.setAttribute('aria-expanded',o)});
w.addEventListener('click',function(e){e.stopPropagation()});
document.addEventListener('click',function(){w.classList.remove('open');f.setAttribute('aria-expanded','false')});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){w.classList.remove('open');document.body.classList.remove('nav-open')}});})();
</script>
</body>
</html>
`;
  fs.writeFileSync(path.join(root, 'blog', p.slug + '.html'), html);
});
console.log('Generadas', blog.length, 'páginas de blog');
