// Genera el bloque SEO de index.html, sitemap.xml y robots.txt.
// Uso: node scripts/build-seo.js   (correr también build-blog.js si cambian artículos)
// Si cambia el dominio definitivo, cambiá SITE y volvé a correr ambos scripts.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const { faq, blog } = require('../assets/js/data.js?v=1794229065');
const SITE = require('./site.json').url; // p. ej. https://procourier.com.ar
global.window = {}; require('../cotizador/amba.js');
const Z = window.AMBA.features.map(f => f.properties).filter(p => p.enRed);
const zonas = {
  caba: Z.filter(p => p.region === 'CABA').map(p => p.nombre),
  c1: Z.filter(p => p.region === 'GBA' && p.banda === 1).map(p => p.nombre),
  c2: Z.filter(p => p.region === 'GBA' && p.banda === 2).map(p => p.nombre),
  c3: Z.filter(p => p.region === 'GBA' && p.banda === 3).map(p => p.nombre)
};
const todas = [].concat(zonas.caba, zonas.c1, zonas.c2, zonas.c3);

const title = 'Procourrier | Envíos en el día CABA y GBA · Mercado Envíos Flex y Fulfillment';
const desc = 'Logística para e-commerce: entregas en el día en CABA y GBA, Mercado Envíos Flex (Partner Certificado), fulfillment, logística inversa, colectas y tracking en tiempo real. Cotizá por WhatsApp.';
const og = SITE + '/assets/img/og-procourrier.jpg';

const business = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': SITE + '/#empresa',
  name: 'Procourrier',
  alternateName: 'Procourrier Logística Profesional',
  description: desc,
  url: SITE + '/',
  logo: SITE + '/assets/img/logo.webp',
  image: og,
  telephone: '+54 9 11 2406-4020',
  email: 'envios@procourier.com.ar',
  priceRange: '$$',
  address: { '@type': 'PostalAddress', addressRegion: 'Buenos Aires', addressCountry: 'AR' },
  areaServed: [{ '@type': 'City', name: 'Ciudad Autónoma de Buenos Aires' }, { '@type': 'AdministrativeArea', name: 'Gran Buenos Aires' }]
    .concat(todas.map(n => ({ '@type': 'Place', name: n }))),
  knowsAbout: ['Mercado Envíos Flex', 'envíos en el día', 'última milla', 'mensajería', 'logística e-commerce', 'fulfillment', 'logística inversa', 'Tiendanube', 'Shopify', 'VTEX', 'WooCommerce', 'Magento'],
  sameAs: ['https://www.instagram.com/procourier.ar/', 'https://www.facebook.com/procourier.ar', 'https://www.linkedin.com/company/procourier/'],
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '18:00' }],
  contactPoint: [{ '@type': 'ContactPoint', telephone: '+54 9 11 2406-4020', contactType: 'customer service', areaServed: 'AR', availableLanguage: 'es' }],
  makesOffer: ['Mercado Envíos Flex', 'Envíos E-commerce same-day y next-day', 'Envíos Larga Distancia', 'Logística Inversa', 'Colectas', 'Cambios con Retiro', 'Fulfillment']
    .map(n => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: n, areaServed: 'CABA y GBA' } }))
};
const website = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Procourrier', url: SITE + '/', inLanguage: 'es-AR', publisher: { '@id': SITE + '/#empresa' } };
const faqLd = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: Object.values(faq).flat().map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
};
const ld = o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`;

const head = `<!-- SEO:START (generado por scripts/build-seo.js) -->
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${SITE}/">
<meta name="keywords" content="envíos en el día, envíos same day CABA, envíos Flex, Mercado Envíos Flex, logística Flex, operador Flex, partner Flex Mercado Libre, mensajería CABA, mensajería GBA, cadetería, última milla, envíos e-commerce, envíos Tiendanube, envíos Shopify, envíos VTEX, envíos WooCommerce, fulfillment Buenos Aires, depósito e-commerce, logística inversa, colectas, cambios con retiro, envíos AMBA, envíos conurbano, correo privado, empresa de logística CABA">
<meta name="geo.region" content="AR-C">
<meta name="geo.placename" content="Buenos Aires">
<meta name="geo.position" content="-34.6037;-58.3816">
<meta name="ICBM" content="-34.6037, -58.3816">
<meta name="author" content="Procourrier">
<meta name="publisher" content="Procourrier">
<meta name="format-detection" content="telephone=yes">
<link rel="alternate" hreflang="es-AR" href="${SITE}/">
<link rel="alternate" hreflang="x-default" href="${SITE}/">
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
<meta name="theme-color" content="#0a0a0a">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_AR">
<meta property="og:site_name" content="Procourrier">
<meta property="og:url" content="${SITE}/">
<meta property="og:title" content="Procourrier · Protegemos tu reputación, una entrega a la vez.">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Camioneta ploteada de Procourrier frente al depósito al atardecer">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Procourrier · Envíos en el día CABA y GBA">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${og}">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
${ld(business)}
${ld(website)}
${ld(faqLd)}
<script src="/assets/js/analytics.js?v=1794229065" defer></script>
<!-- SEO:END -->`;

// --- index.html: reemplaza el bloque entre marcadores (o las etiquetas viejas la primera vez)
const ip = path.join(root, 'index.html');
let html = fs.readFileSync(ip, 'utf8');
if (html.includes('<!-- SEO:START')) {
  html = html.replace(/<!-- SEO:START[\s\S]*?<!-- SEO:END -->/, head);
} else {
  html = html
    .replace(/<title>[\s\S]*?<\/title>\n/, '')
    .replace(/<meta name="description"[^>]*>\n/, '')
    .replace(/<meta name="theme-color"[^>]*>\n/, '')
    .replace(/<meta property="og:[^>]*>\n/g, '')
    .replace(/<link rel="icon"[^>]*>\n/, '')
    .replace('<meta name="viewport" content="width=device-width,initial-scale=1">\n', m => m + head + '\n');
}
const chips = a => a.map(n => `<li>${n}</li>`).join('');
const cob = `<!-- COBERTURA:START (generado por scripts/build-seo.js) -->
<section class="coverage" id="cobertura" aria-labelledby="cob-title">
  <div class="container">
    <div class="coverage-head reveal">
      <p class="eyebrow line-after">Cobertura</p>
      <h2 id="cob-title" class="h-lg">Envíos en el día en <span class="accent">CABA y GBA.</span></h2>
      <p class="lead">Hacemos Mercado Envíos Flex, envíos e-commerce y mensajería en ${todas.length} barrios y localidades del AMBA. Buscá la tuya:</p>
    </div>
    <div class="coverage-grid">
      <details class="cov-group reveal" open><summary>CABA · ${zonas.caba.length} barrios</summary><ul>${chips(zonas.caba)}</ul></details>
      <details class="cov-group reveal"><summary>GBA primer cordón · ${zonas.c1.length} localidades</summary><ul>${chips(zonas.c1)}</ul></details>
      <details class="cov-group reveal"><summary>GBA segundo cordón · ${zonas.c2.length} localidades</summary><ul>${chips(zonas.c2)}</ul></details>
      <details class="cov-group reveal"><summary>GBA tercer cordón · ${zonas.c3.length} localidades</summary><ul>${chips(zonas.c3)}</ul></details>
    </div>
    <p class="coverage-note reveal">¿No ves tu zona? <a href="/cotizador/">Consultala en el cotizador</a> o <a href="https://wa.me/5491124064020?text=Hola%2C%20quiero%20saber%20si%20llegan%20a%20mi%20zona" target="_blank" rel="noopener">escribinos por WhatsApp</a>.</p>
  </div>
</section>
<!-- COBERTURA:END -->`;
if (html.includes('<!-- COBERTURA:START')) html = html.replace(/<!-- COBERTURA:START[\s\S]*?<!-- COBERTURA:END -->/, cob);
else html = html.replace('<!-- COTIZADOR -->', cob + '\n\n<!-- COTIZADOR -->');
fs.writeFileSync(ip, html);

// --- sitemap.xml y robots.txt
const today = new Date().toISOString().slice(0, 10);
const urls = [[SITE + '/', '1.0'], [SITE + '/cotizador/', '0.9']].concat(blog.map(b => [`${SITE}/blog/${b.slug}.html`, '0.7']));
fs.writeFileSync(path.join(root, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(([u, p]) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod><priority>${p}</priority></url>`).join('\n') + '\n</urlset>\n');
fs.writeFileSync(path.join(root, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /assets/ref/\n\nSitemap: ${SITE}/sitemap.xml\n`);
fs.writeFileSync(path.join(root, 'site.webmanifest'), JSON.stringify({
  name: 'Procourrier · Logística profesional', short_name: 'Procourrier', start_url: '/', display: 'browser',
  background_color: '#0a0a0a', theme_color: '#0a0a0a',
  icons: [{ src: '/assets/img/favicon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }]
}, null, 2));
console.log('SEO listo para', SITE, '·', urls.length, 'URLs en sitemap');
