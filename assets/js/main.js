(function () {
  'use strict';
  var PC = window.PC || {};
  var WA = PC.WA || '5491124064020';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var icon = function (id, cls) { return '<svg aria-hidden="true"' + (cls ? ' class="' + cls + '"' : '') + '><use href="assets/icons.svg#' + id + '"/></svg>'; };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var waLink = function (text) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text); };

  /* ---------- Header / nav ---------- */
  var header = $('.site-header');
  var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 20); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var toggle = $('.menu-toggle');
  var closeMenu = function () { document.body.classList.remove('nav-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menú'); };
  toggle.addEventListener('click', function () {
    var open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  $$('.has-dd > button').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var li = b.parentElement, open = !li.classList.contains('open');
      $$('.has-dd').forEach(function (o) { o.classList.remove('open'); $('button', o).setAttribute('aria-expanded', 'false'); });
      li.classList.toggle('open', open); b.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', function () { $$('.has-dd').forEach(function (o) { o.classList.remove('open'); $('button', o).setAttribute('aria-expanded', 'false'); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    $$('.has-dd.open').forEach(function (o) { o.classList.remove('open'); $('button', o).setAttribute('aria-expanded', 'false'); });
    closeMenu(); closeWa();
  });
  $$('.nav-links a').forEach(function (a) { a.addEventListener('click', closeMenu); });

  // active link on scroll
  var navMap = { integraciones: 'integraciones', fulfillment: 'fulfillment', operacion: 'operacion' };
  if ('IntersectionObserver' in window) {
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        $$('.nav-links > li > a').forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + (navMap[en.target.id] || '__')); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main > section').forEach(function (s) { secObs.observe(s); });
  }

  /* ---------- Reveal ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); ro.unobserve(en.target); } });
    }, { threshold: 0.12 });
    $$('.reveal').forEach(function (el) { ro.observe(el); });
  } else { $$('.reveal').forEach(function (el) { el.classList.add('in'); }); }

  /* ---------- Services detail ---------- */
  var detail = $('#service-detail');
  var showService = function (key, focus) {
    var s = PC.services && PC.services[key]; if (!s) return;
    detail.innerHTML = '<h3>' + esc(s.title) + '</h3><p>' + esc(s.lead) + '</p><ul>' + s.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>' +
      '<div style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn btn-primary" target="_blank" rel="noopener" href="' + waLink('Hola Procourrier. ' + s.msg) + '">' + icon('whatsapp') + ' Consultar por WhatsApp</a>' +
      '<a class="btn btn-ghost" href="#contacto" data-prefill="' + esc(s.msg) + '">Pedir cotización ' + icon('chev-right') + '</a></div>';
    detail.classList.add('show');
    $$('#service-cards .card-img').forEach(function (c) { c.setAttribute('aria-expanded', String(c.dataset.service === key)); });
    if (focus) detail.focus({ preventScroll: true });
  };
  $$('#service-cards .card-img').forEach(function (c) {
    c.setAttribute('aria-expanded', 'false');
    c.addEventListener('click', function () { showService(c.dataset.service, true); detail.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' }); });
  });
  $$('a[data-service]').forEach(function (a) { a.addEventListener('click', function () { showService(a.dataset.service); }); });

  /* ---------- Prefill contact message ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-prefill]'); if (!a) return;
    var m = $('#c-msg'); if (m && !m.value) m.value = a.dataset.prefill;
  });

  /* ---------- Video ---------- */
  var frame = $('#video-frame'), video = $('#op-video');
  if (video) {
    $('.video-play', frame).addEventListener('click', function () { var p = video.play(); if (p && p.catch) p.catch(function () {}); });
    video.addEventListener('play', function () { frame.classList.add('playing'); });
    video.addEventListener('pause', function () { if (video.currentTime === 0) frame.classList.remove('playing'); });
    var src = $('source', video);
    src.addEventListener('error', function () {
      frame.classList.add('playing');
      var n = document.createElement('p'); n.className = 'video-missing';
      n.textContent = 'Video pendiente: agregá el archivo original en assets/video/operacion-real.mp4';
      frame.appendChild(n);
    });
  }

  /* ---------- FAQ ---------- */
  var list = $('#faq-list'), search = $('#faq-q'), tabs = $$('.faq-tab');
  var labels = { servicios: 'Servicios', operacion: 'Operación', confianza: 'Confianza', comercial: 'Comercial' };
  var current = 'servicios', uid = 0;
  var norm = function (s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); };
  var renderFaq = function () {
    var q = norm(search.value.trim()), items = [];
    Object.keys(PC.faq || {}).forEach(function (cat) {
      PC.faq[cat].forEach(function (p) {
        if (q ? norm(p[0] + ' ' + p[1]).indexOf(q) > -1 : cat === current) items.push({ cat: cat, q: p[0], a: p[1] });
      });
    });
    list.classList.toggle('searching', !!q);
    if (!items.length) { list.innerHTML = '<p class="faq-empty">No encontramos preguntas para “' + esc(search.value) + '”. <a class="accent" target="_blank" rel="noopener" href="' + waLink('Hola, tengo una consulta: ' + search.value) + '">Escribinos por WhatsApp</a>.</p>'; return; }
    list.innerHTML = items.map(function (it, i) {
      var id = 'faq-' + (++uid), open = !q && i === 0;
      return '<div class="faq-item' + (open ? ' open' : '') + '"><h3 style="margin:0;font:inherit"><button class="faq-q" type="button" aria-expanded="' + open + '" aria-controls="' + id + '">' + esc(it.q) + icon('chev-down') + '</button></h3>' +
        '<div class="faq-a" id="' + id + '" role="region"><div><p class="faq-cat">' + labels[it.cat] + '</p><p>' + esc(it.a) + '</p></div></div></div>';
    }).join('');
  };
  list.addEventListener('click', function (e) {
    var b = e.target.closest('.faq-q'); if (!b) return;
    var item = b.closest('.faq-item'), open = !item.classList.contains('open');
    item.classList.toggle('open', open); b.setAttribute('aria-expanded', String(open));
  });
  var selectTab = function (t) {
    current = t.dataset.cat; search.value = '';
    tabs.forEach(function (x) { var s = x === t; x.setAttribute('aria-selected', String(s)); x.tabIndex = s ? 0 : -1; });
    list.setAttribute('aria-labelledby', t.id); renderFaq();
  };
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectTab(t); });
    t.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!d) return;
      var n = tabs[(i + d + tabs.length) % tabs.length]; n.focus(); selectTab(n);
    });
  });
  search.addEventListener('input', renderFaq);
  renderFaq();

  /* ---------- Blog cards ---------- */
  var grid = $('#blog-grid');
  if (grid && PC.blog) {
    grid.innerHTML = PC.blog.map(function (p) {
      return '<a class="blog-card reveal in" href="blog/' + p.slug + '.html"><div class="thumb"><img src="assets/img/' + p.img + '.webp" alt="" loading="lazy"></div><div class="body">' +
        '<span class="cat-ico">' + icon(p.icon) + '</span><h3>' + esc(p.title) + '</h3><span class="read-time">' + icon('clock') + p.min + ' min<span class="sr-only"> de lectura</span></span>' +
        '<div class="foot"><ul>' + p.bullets.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('') + '</ul><span class="read-more">Leer artículo ' + icon('arrow') + '</span></div></div></a>';
    }).join('');
  }

  /* ---------- Custom select ---------- */
  $$('.select').forEach(function (sel) {
    var btn = $('.select-btn', sel), ul = $('.select-list', sel), opts = $$('li', ul), hidden = $('input[type=hidden]', sel), val = $('span', btn), idx = -1;
    var setActive = function (i) { opts.forEach(function (o, j) { o.classList.toggle('active', j === i); }); idx = i; };
    var open = function () { sel.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); setActive(Math.max(0, opts.findIndex(function (o) { return o.getAttribute('aria-selected') === 'true'; }))); ul.focus(); };
    var close = function (f) { sel.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); if (f) btn.focus(); };
    var choose = function (o) {
      opts.forEach(function (x) { x.setAttribute('aria-selected', String(x === o)); });
      hidden.value = o.dataset.value; val.textContent = o.dataset.value; close(true);
      sel.closest('.field').classList.remove('invalid');
    };
    btn.addEventListener('click', function (e) { e.stopPropagation(); sel.classList.contains('open') ? close() : open(); });
    btn.addEventListener('keydown', function (e) { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); open(); } });
    opts.forEach(function (o) { o.addEventListener('click', function (e) { e.stopPropagation(); choose(o); }); });
    ul.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(opts.length - 1, idx + 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(0, idx - 1)); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(opts[idx]); }
      else if (e.key === 'Escape' || e.key === 'Tab') { close(e.key === 'Escape'); }
    });
    document.addEventListener('click', function () { close(); });
  });

  /* ---------- Forms → WhatsApp ---------- */
  var validate = function (form) {
    var ok = true, first = null;
    $$('.field', form).forEach(function (f) {
      var bad = false;
      $$('input,textarea', f).forEach(function (inp) {
        if (inp.type === 'radio') { if (inp.required && !form.querySelector('input[name="' + inp.name + '"]:checked')) bad = true; }
        else if (inp.required && inp.value.trim().length < (inp.minLength > 0 ? inp.minLength : 1)) bad = true;
      });
      f.classList.toggle('invalid', bad);
      $$('input:not([type=hidden]),textarea', f).forEach(function (i) { if (i.type !== 'radio') i.setAttribute('aria-invalid', String(bad)); });
      if (bad) { ok = false; first = first || f; }
    });
    if (first) { var t = first.querySelector('input:not([type=hidden]),button,textarea'); t && t.focus(); }
    return ok;
  };
  var bindForm = function (form, build) {
    if (!form) return;
    form.addEventListener('input', function (e) { var f = e.target.closest('.field'); if (f && f.classList.contains('invalid')) validate(form); });
    form.addEventListener('change', function (e) { var f = e.target.closest('.field'); if (f) f.classList.remove('invalid'); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = $('.form-status', form);
      if (!validate(form)) { status.className = 'form-status show'; status.textContent = 'Revisá los campos marcados para continuar.'; return; }
      var url = waLink(build(new FormData(form)));
      status.className = 'form-status show';
      status.innerHTML = 'Preparamos tu mensaje. Si WhatsApp no se abrió, <a href="' + url + '" target="_blank" rel="noopener">tocá acá para abrirlo</a>. Revisalo y envialo desde WhatsApp.';
      window.open(url, '_blank', 'noopener');
    });
  };
  bindForm($('#driver-form'), function (d) {
    return 'Hola Procourrier, quiero repartir con ustedes.\n' +
      '• Nombre y apellido: ' + d.get('nombre').trim() + '\n• Vehículo: ' + d.get('vehiculo') + '\n• Localidad: ' + d.get('localidad').trim() + '\n• Experiencia en Mercado Libre Flex: ' + d.get('experiencia');
  });
  bindForm($('#contact-form'), function (d) {
    var m = (d.get('mensaje') || '').trim();
    return 'Hola Procourrier, quiero hacer una consulta.\n' +
      '• Nombre: ' + d.get('nombre').trim() + '\n• Negocio: ' + d.get('negocio').trim() + '\n• Tamaño del paquete: ' + d.get('tamano') +
      '\n• Trabaja con Mercado Envíos Flex: ' + d.get('flex') + '\n• Zona: ' + d.get('zona') + '\n• Volumen diario: ' + d.get('volumen') + (m ? '\n• Mensaje: ' + m : '');
  });

  /* ---------- WhatsApp widget ---------- */
  var wa = $('#wa-widget'), fab = $('.wa-fab', wa);
  function closeWa() { wa.classList.remove('open'); fab.setAttribute('aria-expanded', 'false'); }
  fab.addEventListener('click', function (e) { e.stopPropagation(); var o = wa.classList.toggle('open'); fab.setAttribute('aria-expanded', String(o)); });
  wa.addEventListener('click', function (e) { e.stopPropagation(); });
  document.addEventListener('click', closeWa);

  var y = $('#year'); if (y) y.textContent = new Date().getFullYear();
})();
