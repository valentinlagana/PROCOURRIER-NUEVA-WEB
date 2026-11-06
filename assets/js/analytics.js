/* Procourrier · Métricas
   ------------------------------------------------------------------
   CONFIGURACIÓN: completá GA4_ID con tu ID de medición de Google
   Analytics 4 (formato G-XXXXXXXXXX). Si queda vacío, GA4 no se carga.
   Vercel Web Analytics funciona sin ID: solo hay que activarlo en el
   panel de Vercel (proyecto > Analytics > Enable).
   ------------------------------------------------------------------ */
(function () {
  'use strict';
  var GA4_ID = '';            // ← ej.: 'G-ABC123XYZ9'
  var DEBUG = /[?&]debug_metrics=1/.test(location.search);

  /* ---- Vercel Web Analytics + Speed Insights ---- */
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  function addScript(src, attrs) {
    var s = document.createElement('script'); s.defer = true; s.src = src;
    for (var k in (attrs || {})) s.setAttribute(k, attrs[k]);
    document.head.appendChild(s);
  }
  if (!/^(localhost|127\.)/.test(location.hostname)) {
    addScript('/_vercel/insights/script.js');
    addScript('/_vercel/speed-insights/script.js');
  }

  /* ---- Google Analytics 4 ---- */
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  if (GA4_ID) {
    addScript('https://www.googletagmanager.com/gtag/js?id=' + GA4_ID, { async: '' });
    gtag('js', new Date());
    gtag('config', GA4_ID, { anonymize_ip: true });
  }

  /* ---- API única de eventos ---- */
  function track(name, props) {
    props = props || {};
    props.page = location.pathname;
    try { window.va('event', { name: name, data: props }); } catch (e) {}
    try { if (GA4_ID) gtag('event', name, props); } catch (e) {}
    if (DEBUG) console.log('[métrica]', name, props);
  }
  window.PCtrack = track;

  function sectionOf(el) {
    var s = el.closest && el.closest('section[id], header, footer, .wa-widget');
    if (!s) return 'otro';
    if (s.id) return s.id;
    if (s.classList.contains('wa-widget')) return 'widget';
    return s.tagName.toLowerCase();
  }

  /* ---- Clics relevantes (delegado, sirve para todas las páginas) ---- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var where = sectionOf(a);
    var label = (a.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60);
    if (/wa\.me|api\.whatsapp|whatsapp\.com/.test(href)) track('whatsapp_click', { ubicacion: where, texto: label });
    else if (/^mailto:/.test(href)) track('email_click', { ubicacion: where });
    else if (/^tel:/.test(href)) track('telefono_click', { ubicacion: where });
    else if (/cotizador/.test(href)) track('cotizador_abrir', { ubicacion: where, texto: label });
    else if (/blog\/.+\.html/.test(href)) track('blog_abrir', { articulo: href.split('/').pop().replace('.html', '') });
    else if (/instagram|facebook|linkedin/.test(href)) track('red_social_click', { red: (href.match(/instagram|facebook|linkedin/) || [''])[0] });
    else if (a.hostname && a.hostname !== location.hostname) track('enlace_externo', { url: a.hostname });
  }, true);

  /* ---- Cotizador: la propuesta abre WhatsApp con window.open ---- */
  var _open = window.open;
  window.open = function (url) {
    try {
      if (/wa\.me|whatsapp/.test(String(url)) && /cotizador/.test(location.pathname)) track('cotizador_propuesta_enviada');
    } catch (e) {}
    return _open.apply(window, arguments);
  };

  /* ---- Profundidad de scroll (25/50/75/100) ---- */
  var marks = [25, 50, 75, 100], sent = {};
  window.addEventListener('scroll', function () {
    var h = document.documentElement.scrollHeight - innerHeight; if (h <= 0) return;
    var pct = Math.round(scrollY / h * 100);
    marks.forEach(function (m) { if (pct >= m && !sent[m]) { sent[m] = 1; track('scroll_' + m); } });
  }, { passive: true });

  /* ---- Secciones vistas (una vez por sesión de página) ---- */
  if ('IntersectionObserver' in window) {
    var seen = {};
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting && !seen[en.target.id]) { seen[en.target.id] = 1; track('seccion_vista', { seccion: en.target.id }); }
      });
    }, { threshold: .4 });
    document.addEventListener('DOMContentLoaded', function () {
      document.querySelectorAll('main > section[id]').forEach(function (s) { io.observe(s); });
    });
  }
})();
