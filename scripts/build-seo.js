// Genera el bloque SEO de index.html, sitemap.xml y robots.txt.
// Uso: node scripts/build-seo.js   (correr también build-blog.js si cambian artículos)
// Si cambia el dominio definitivo, cambiá SITE y volvé a correr ambos scripts.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const { faq, blog } = require('../assets/js/data.js');
const SITE = require('./site.json').url; // p. ej. https://procourier.com.ar

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
  areaServed: [{ '@type': 'City', name: 'Ciudad Autónoma de Buenos Aires' }, { '@type': 'AdministrativeArea', name: 'Gran Buenos Aires' }],
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
<script src="/assets/js/analytics.js" defer></script>
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
