/* Contenido del sitio Procourrier (servicios, FAQ y blog).
   Se usa en el navegador (window.PC) y en scripts/build-blog.js (Node). */
(function (root) {
  var WA = '5491124064020';

  var services = {
    flex: {
      title: 'Mercado Envíos Flex',
      lead: 'Entregas en el día para tus ventas de Mercado Libre, cuidando tu reputación en cada envío.',
      items: ['Colecta en tu domicilio o depósito todos los días hábiles.', 'Entregas el mismo día en CABA y GBA.', 'Seguimiento en tiempo real y prueba de entrega.', 'Somos Partner Certificado en Mercado Libre.'],
      msg: 'Quiero información sobre Mercado Envíos Flex.'
    },
    ecommerce: {
      title: 'Envíos E-commerce',
      lead: 'Same-day y next-day para tu tienda online, integrados con las principales plataformas.',
      items: ['Integración con Shopify, Tiendanube, VTEX, WooCommerce y Magento.', 'Entregas same-day y next-day en CABA y GBA.', 'Tracking para vos y para tu comprador.', 'Gestión de reintentos y novedades.'],
      msg: 'Quiero información sobre envíos para mi tienda online.'
    },
    larga: {
      title: 'Envíos Larga Distancia',
      lead: 'Mayor alcance dentro de CABA y GBA para llegar a todos tus compradores.',
      items: ['Cobertura de los cordones más alejados del conurbano.', 'Rutas planificadas para optimizar tiempos y costos.', 'Seguimiento de cada paquete hasta la entrega.'],
      msg: 'Quiero información sobre envíos de larga distancia.'
    },
    inversa: {
      title: 'Logística Inversa',
      lead: 'Devoluciones con seguimiento: retiramos el producto en el domicilio del comprador y lo llevamos de vuelta a tu negocio.',
      items: ['Retiro coordinado con el comprador.', 'Control del estado del paquete al retirar.', 'Trazabilidad completa del proceso de devolución.'],
      msg: 'Quiero información sobre logística inversa / devoluciones.'
    },
    colectas: {
      title: 'Colectas',
      lead: 'Retiros programados para tu operación, en el horario que necesites.',
      items: ['Retiros diarios o programados en tu domicilio o depósito.', 'Flota propia de utilitarios.', 'Control y escaneo de cada paquete al momento de la colecta.'],
      msg: 'Quiero información sobre colectas programadas.'
    },
    cambios: {
      title: 'Cambios con Retiro',
      lead: 'Entregamos el nuevo y retiramos el anterior en una sola visita.',
      items: ['Entrega y retiro en el mismo viaje.', 'Menos fricción para tu cliente y menos costos para vos.', 'Seguimiento de ambos paquetes.'],
      msg: 'Quiero información sobre cambios con retiro.'
    }
  };

  var faq = {
    servicios: [
      ['¿Qué servicios ofrecen?', 'Ofrecemos soluciones de última milla para empresas y tiendas online. Consultanos para encontrar la opción adecuada para tu operación.'],
      ['¿Trabajan solo con empresas?', 'Trabajamos con empresas, marcas y vendedores de e-commerce de todos los tamaños, desde emprendedores que están creciendo hasta operaciones con alto volumen diario.'],
      ['¿Ofrecen Mercado Envíos Flex?', 'Sí. Somos Partner Certificado en Mercado Libre y realizamos entregas Flex en el día en CABA y GBA, cuidando la reputación de tu cuenta.'],
      ['¿Tienen volumen mínimo?', 'Trabajamos a partir de 15 envíos diarios. Si tu volumen es variable, contanos cómo es tu operación y evaluamos la mejor alternativa.'],
      ['¿Qué zonas cubren?', 'Cubrimos CABA y GBA (zonas Sur, Norte y Oeste), con entregas en el día y servicios de mayor alcance dentro del conurbano.'],
      ['¿Cómo puedo cotizar?', 'Podés completar el formulario de contacto o escribirnos por WhatsApp al +54 9 11 2406-4020 con tu volumen diario, tamaño de paquete y zona. Te respondemos con una propuesta a medida.'],
      ['¿Hacen fulfillment?', 'Sí. Recibimos, almacenamos, organizamos, preparamos y despachamos tu mercadería desde nuestro depósito, con control de stock en tiempo real.']
    ],
    operacion: [
      ['¿Cómo funciona la colecta?', 'Pasamos a retirar los paquetes por tu domicilio o depósito en el horario acordado. Escaneamos cada envío al momento de la colecta para que tengas control desde el primer minuto.'],
      ['¿Hasta qué hora retiran para entregar en el día?', 'El horario de corte se define según tu zona y volumen. Lo coordinamos al iniciar la operación para garantizar la entrega en el día.'],
      ['¿Puedo seguir mis envíos en tiempo real?', 'Sí. Nuestra plataforma propia te permite ver el estado de cada envío, la ubicación de los choferes y la prueba de entrega.'],
      ['¿Qué pasa si el comprador no está?', 'El transportista registra la visita y nos comunicamos para coordinar un nuevo intento de entrega. Si no se concreta, el paquete vuelve a tu negocio.'],
      ['¿Qué tamaño de paquetes reciben?', 'Trabajamos con paquetes chicos (hasta 5 kg), medianos (5–15 kg) y grandes (+15 kg), además de operaciones con tamaños variados.'],
      ['¿Trabajan los sábados?', 'Sí. Operamos de lunes a sábado de 09 a 18 hs.'],
      ['¿Cómo se integra con mi tienda?', 'Nos integramos con Mercado Libre, Shopify, Tiendanube, VTEX, WooCommerce y Magento. Si usás otra plataforma, evaluamos la mejor alternativa.']
    ],
    confianza: [
      ['¿Cómo cuidan mi reputación en Mercado Libre?', 'Cumplimos los tiempos de entrega Flex, informamos cada novedad y tenemos atención al cliente dedicada para resolver cualquier incidencia rápidamente.'],
      ['¿Tienen flota y depósito propios?', 'Sí. Contamos con depósito propio y utilitarios propios para colectas y entregas, además de un equipo de transportistas en zona.'],
      ['¿Qué pasa si un paquete se daña o se pierde?', 'Cada envío tiene trazabilidad completa. Ante cualquier incidencia, la analizamos con vos y respondemos según las condiciones acordadas en el servicio.'],
      ['¿Tengo prueba de entrega?', 'Sí. Cada entrega queda registrada en la plataforma con fecha, hora y datos de quien recibe.'],
      ['¿Cuántos envíos realizan?', 'Gestionamos más de 100.000 envíos por mes.'],
      ['¿Tengo un contacto directo ante cualquier problema?', 'Sí. Tenés atención directa por WhatsApp y email (envios@procourier.com.ar) de lunes a sábado de 09 a 18 hs.']
    ],
    comercial: [
      ['¿Cómo se calcula el precio?', 'El precio depende del volumen diario, el tamaño de los paquetes y la zona de entrega. Te armamos una cotización a medida.'],
      ['¿Hay contrato de permanencia?', 'No trabajamos con permanencias forzosas. Buscamos relaciones a largo plazo basadas en la calidad del servicio.'],
      ['¿Cómo se factura el servicio?', 'Facturamos de forma periódica según los envíos realizados, con el detalle de cada operación disponible en la plataforma.'],
      ['¿Ofrecen precios por volumen?', 'Sí. A mayor volumen diario, mejores condiciones. Consultanos con tu proyección de envíos.'],
      ['¿Cuánto tarda en empezar el servicio?', 'Una vez acordada la propuesta, coordinamos la integración y la primera colecta en pocos días.'],
      ['¿Puedo sumarme como repartidor?', 'Sí. Completá el formulario “Repartí con nosotros” con tus datos y vehículo, y te contactamos.']
    ]
  };

  var blog = [
    {
      slug: 'mercado-envios-flex', icon: 'truck', img: 'blog-flex', min: 5,
      title: 'Mercado Envíos Flex: qué es y cómo aprovecharlo',
      bullets: ['Por qué Flex impacta en tus ventas', 'Claves para que funcione'],
      desc: 'Qué es Mercado Envíos Flex, por qué mejora tus ventas y qué necesitás para que funcione bien.',
      body: '<p><strong>Mercado Envíos Flex</strong> es la modalidad de Mercado Libre que te permite entregar tus ventas en el día con tu propia logística o con un operador como Procourrier. Es una de las herramientas que más impacto tienen en la conversión de tus publicaciones.</p>' +
        '<h2>Por qué Flex impacta en tus ventas</h2><ul><li><strong>Mejor posicionamiento:</strong> las publicaciones con entrega en el día ganan visibilidad.</li><li><strong>Más conversión:</strong> el comprador elige la opción que le llega antes.</li><li><strong>Diferencial frente a la competencia:</strong> ofrecer “Llega hoy” es un argumento de venta concreto.</li></ul>' +
        '<h2>Claves para que funcione</h2><ul><li><strong>Cumplir los horarios de corte:</strong> la promesa de entrega depende de que la colecta sea puntual.</li><li><strong>Elegir un operador confiable:</strong> los incumplimientos afectan directamente tu reputación.</li><li><strong>Tener trazabilidad:</strong> saber dónde está cada paquete te permite anticiparte a reclamos.</li><li><strong>Comunicación rápida:</strong> ante cualquier novedad, actuar a tiempo marca la diferencia.</li></ul>' +
        '<p>En Procourrier somos <strong>Partner Certificado en Mercado Libre</strong> y hacemos entregas Flex en el día en CABA y GBA con seguimiento en tiempo real.</p>'
    },
    {
      slug: 'fulfillment-cuando-conviene-delegar', icon: 'box', img: 'blog-fulfillment', min: 6,
      title: 'Fulfillment: cuándo conviene delegar',
      bullets: ['Señales para delegar', 'Qué ganás al tercerizar'],
      desc: 'Las señales de que tu negocio necesita fulfillment y todo lo que ganás al tercerizar tu logística.',
      body: '<p>El <strong>fulfillment</strong> es tercerizar todo el proceso logístico: recepción, almacenamiento, organización, control de stock, preparación y despacho de pedidos. Vos vendés; tu operador se ocupa del resto.</p>' +
        '<h2>Señales para delegar</h2><ul><li>Pasás más tiempo armando paquetes que vendiendo.</li><li>Te quedás sin espacio para el stock.</li><li>Aparecen errores de preparación o pedidos demorados.</li><li>Tus ventas crecen y tu operación no acompaña.</li></ul>' +
        '<h2>Qué ganás al tercerizar</h2><ul><li><strong>Tiempo:</strong> te enfocás en vender y hacer crecer tu negocio.</li><li><strong>Orden:</strong> stock controlado en un depósito seguro.</li><li><strong>Escalabilidad:</strong> la operación acompaña los picos de venta sin contratar personal.</li><li><strong>Menos errores:</strong> procesos estandarizados de picking y armado.</li></ul>' +
        '<p>En Procourrier recibimos, guardamos, organizamos y despachamos tu mercadería con seguimiento en tiempo real.</p>'
    },
    {
      slug: 'como-elegir-un-operador-logistico', icon: 'pin', img: 'blog-operador', min: 5,
      title: 'Cómo elegir un operador logístico',
      bullets: ['7 criterios clave'],
      desc: 'Siete criterios clave para elegir el operador logístico adecuado para tu e-commerce.',
      body: '<p>Elegir operador logístico es elegir quién va a representar a tu marca en el último contacto con el cliente. Estos son los <strong>7 criterios clave</strong> para decidir bien.</p>' +
        '<h2>7 criterios clave</h2><ol><li><strong>Cobertura:</strong> que llegue a las zonas donde están tus compradores.</li><li><strong>Cumplimiento de plazos:</strong> pedí indicadores reales de entregas en tiempo.</li><li><strong>Tecnología y tracking:</strong> trazabilidad en tiempo real para vos y tu comprador.</li><li><strong>Integraciones:</strong> que se conecte con tu plataforma de venta.</li><li><strong>Infraestructura propia:</strong> flota y depósito propios dan más control.</li><li><strong>Atención al cliente:</strong> un contacto directo que responda rápido.</li><li><strong>Escalabilidad:</strong> que acompañe tu crecimiento y tus picos de venta.</li></ol>' +
        '<p>En Procourrier combinamos flota y depósito propios, plataforma propia de tracking e integraciones con las principales plataformas.</p>'
    },
    {
      slug: 'como-reducir-reclamos-en-tus-envios', icon: 'chat', img: 'blog-reclamos', min: 4,
      title: 'Cómo reducir reclamos en tus envíos',
      bullets: ['Causas comunes', 'Cómo prevenirlos'],
      desc: 'Las causas más comunes de reclamos en los envíos y cómo prevenirlos para cuidar tu reputación.',
      body: '<p>Cada reclamo afecta tu reputación y tus ventas futuras. La buena noticia es que la mayoría se pueden prevenir.</p>' +
        '<h2>Causas comunes</h2><ul><li>Demoras respecto del plazo prometido.</li><li>Paquetes dañados por un embalaje insuficiente.</li><li>Falta de información sobre el estado del envío.</li><li>Direcciones incompletas o comprador ausente.</li></ul>' +
        '<h2>Cómo prevenirlos</h2><ul><li><strong>Prometé plazos que puedas cumplir</strong> y trabajá con un operador confiable.</li><li><strong>Embalá según el producto:</strong> protección interna y caja adecuada.</li><li><strong>Compartí el tracking</strong> para que el comprador sepa cuándo llega.</li><li><strong>Validá los datos de entrega</strong> antes de despachar.</li><li><strong>Respondé rápido</strong> ante cualquier novedad.</li></ul>'
    },
    {
      slug: 'ultima-milla-por-que-es-critica', icon: 'bike', img: 'blog-ultima-milla', min: 5,
      title: 'Última milla: por qué es crítica',
      bullets: ['Por qué es crítica', 'Qué hace a una buena última milla'],
      desc: 'Por qué la última milla define la experiencia de compra y qué hace a una buena operación de entrega.',
      body: '<p>La <strong>última milla</strong> es el tramo final del envío: desde el depósito hasta la puerta del comprador. Es la etapa más visible y, muchas veces, la más costosa.</p>' +
        '<h2>Por qué es crítica</h2><ul><li>Es el único momento de contacto físico entre tu marca y el cliente.</li><li>Concentra la mayor parte de los reclamos.</li><li>Define si el comprador vuelve a elegirte.</li></ul>' +
        '<h2>Qué hace a una buena última milla</h2><ul><li><strong>Planificación de rutas</strong> eficiente.</li><li><strong>Trazabilidad en tiempo real</strong> y prueba de entrega.</li><li><strong>Transportistas capacitados</strong> y en zona.</li><li><strong>Gestión de reintentos</strong> y comunicación con el comprador.</li></ul>'
    },
    {
      slug: 'logistica-para-e-commerce-escalar-sin-caos', icon: 'bars', img: 'blog-escalar', min: 6,
      title: 'Logística para e-commerce: escalar sin caos',
      bullets: ['Pilares de una operación sólida', 'Crecer sin caos'],
      desc: 'Los pilares de una operación logística sólida para que tu e-commerce crezca sin caos.',
      body: '<p>Vender más es el objetivo, pero si la logística no acompaña, el crecimiento se convierte en caos: demoras, errores y reclamos.</p>' +
        '<h2>Pilares de una operación sólida</h2><ul><li><strong>Stock ordenado y controlado.</strong></li><li><strong>Procesos estandarizados</strong> de preparación y despacho.</li><li><strong>Integración</strong> entre tu tienda y tu operador.</li><li><strong>Datos y métricas</strong> para tomar decisiones.</li></ul>' +
        '<h2>Crecer sin caos</h2><ul><li>Anticipá los picos de venta (Hot Sale, CyberMonday, fiestas).</li><li>Tercerizá lo que no es tu núcleo de negocio.</li><li>Elegí un socio logístico que escale con vos.</li></ul>' +
        '<p>En Procourrier gestionamos más de 100.000 envíos por mes con flota, depósito y plataforma propios.</p>'
    }
  ];

  var data = { WA: WA, services: services, faq: faq, blog: blog };
  if (typeof module !== 'undefined' && module.exports) module.exports = data;
  else root.PC = data;
})(this);
