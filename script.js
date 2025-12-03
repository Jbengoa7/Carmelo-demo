// --- Datos de ejemplo: productos (para catálogo y presupuestos) ---

const products = [
  {
    id: "p1",
    name: "Tornillo DIN 84 M6 x 20",
    material: "Acero 8.8",
    family: "Tornillería cilíndrica",
    basePricePer100: 14.5,
    lots: [100, 500, 1000],
    image:
      "https://m.media-amazon.com/images/I/71zcCQW-1sL._AC_UF894,1000_QL80_.jpg"
  },
  {
    id: "p2",
    name: "Varilla roscada M10",
    material: "Acero 8.8",
    family: "Varilla roscada",
    basePricePer100: 29.9,
    lots: [50, 100, 300],
    image:
      "https://assets2.wovar.io/cdn-cgi/image/width=1000,quality=100/public-assets/WV011084/082_draadstukje_din_976a_7.jpg"
  },
  {
    id: "p3",
    name: "Remache avellanado DIN 663 Ø4 x 12",
    material: "Acero cincado",
    family: "Remaches",
    basePricePer100: 9.8,
    lots: [100, 500, 2000],
    image:
      "https://image.made-in-china.com/2f0j00fhmcYpDGYnku/M2-M2-5-M3-M4-M5-M6-Aluminum-Countersunk-Head-Solid-Rivet-GB868-2-10mm-Diameter-Stainless-Steel-Carbon-Steel-Rivet.webp"
  }
];

// --- Datos de ejemplo: lotes para trazabilidad ---

const lotsDB = [
  {
    code: "L-2025-001",
    product: "Tornillo DIN 84 M6 x 20 · Acero 8.8",
    manufactureDate: "2025-10-03",
    machine: "Prensa fría 2",
    material: "Acero 8.8",
    responsible: "Turno mañana · Operario A",
    qualityRecord: "En producción · Control dimensional inicial correcto · Sin incidencias.",
    status: "En producción"
  },
  {
    code: "L-2025-002",
    product: "Varilla roscada M10 · Acero 8.8",
    manufactureDate: "2025-09-15",
    machine: "Línea laminado 1",
    material: "Acero 8.8",
    responsible: "Turno tarde · Operario B",
    qualityRecord:
      "Terminado · Ensayos de tracción dentro de tolerancias · Lote liberado para expedición.",
    status: "Terminado"
  },
  {
    code: "L-2025-003",
    product: "Remache avellanado DIN 663 Ø4 x 12 · Acero cincado",
    manufactureDate: "2025-10-20",
    machine: "Prensa fría 3",
    material: "Acero cincado",
    responsible: "Turno noche · Operario C",
    qualityRecord:
      "En control de calidad · Se ha detectado ligera variación en recubrimiento, pendiente de decisión.",
    status: "En control de calidad"
  }
];

// --- Datos de ejemplo: pedidos para seguimiento ---

const ordersDB = [
  {
    code: "PED-2025-001",
    customer: "Cliente industrial A",
    productSummary: "Tornillo DIN 84 M6 x 20 · 500 uds (L-2025-001)",
    orderDate: "2025-10-05",
    estimatedDelivery: "2025-10-12",
    status: "En preparación",
    steps: [
      {
        title: "Pedido recibido",
        date: "2025-10-05",
        detail: "Pedido registrado en el sistema y enviado a planificación."
      },
      {
        title: "En preparación",
        date: "2025-10-06",
        detail: "Reserva del lote L-2025-001 y preparación en almacén."
      }
    ]
  },
  {
    code: "PED-2025-002",
    customer: "Cliente industrial B",
    productSummary: "Varilla roscada M10 · 100 uds (L-2025-002)",
    orderDate: "2025-09-18",
    estimatedDelivery: "2025-09-25",
    status: "En tránsito",
    steps: [
      {
        title: "Pedido recibido",
        date: "2025-09-18",
        detail: "Confirmación automática enviada al cliente."
      },
      {
        title: "Preparado para envío",
        date: "2025-09-20",
        detail: "Paletizado y etiquetado en almacén central."
      },
      {
        title: "En tránsito",
        date: "2025-09-21",
        detail: "Transportista externo ha recogido la mercancía."
      }
    ]
  },
  {
    code: "PED-2025-003",
    customer: "Cliente industrial C",
    productSummary: "Remache DIN 663 Ø4 x 12 · 2000 uds (L-2025-003)",
    orderDate: "2025-10-10",
    estimatedDelivery: "2025-10-16",
    status: "Entregado",
    steps: [
      {
        title: "Pedido recibido",
        date: "2025-10-10",
        detail: "Pedido registrado y enviado a producción."
      },
      {
        title: "Preparado para envío",
        date: "2025-10-12",
        detail: "Control de calidad final completado."
      },
      {
        title: "En tránsito",
        date: "2025-10-13",
        detail: "Salida de almacén dirección cliente."
      },
      {
        title: "Entregado",
        date: "2025-10-15",
        detail: "Recepción confirmada por el cliente sin incidencias."
      }
    ]
  }
];


// --- Utilidades generales ---

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("es-ES");
}

// --- Render de Productos (solo en productos.html) ---

let currentProductId = null;
let currentLotSize = null;
let currentCalculatedPrice = null;

function renderProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = "";
  products.forEach((p) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="card-content">
        <div class="pill">${p.family}</div>
        <div style="margin:0.4rem 0;">
          <img src="${p.image}" alt="${p.name}" style="width:100%;border-radius:12px;max-height:140px;object-fit:cover;margin-bottom:0.4rem;">
        </div>
        <div class="product-name">${p.name}</div>
        <div class="product-meta">${p.material}</div>
        <div class="product-meta">Lotes estándar: ${p.lots.join(" · ")} uds</div>
        <div class="price">Desde ${p.basePricePer100.toFixed(2)} € / 100 uds</div>
        <div class="card-actions">
          <button class="btn btn-primary" onclick="openModal('${p.id}')">Comprar lote</button>
          <button class="btn btn-outline" onclick="openChatWithHint('${p.name}')">Pedir presupuesto</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function openModal(productId) {
  currentProductId = productId;
  const product = products.find((p) => p.id === productId);
  const backdrop = document.getElementById("modalBackdrop");
  const titleEl = document.getElementById("modalTitle");
  const bodyEl = document.getElementById("modalBody");
  if (!product || !backdrop || !titleEl || !bodyEl) return;

  titleEl.textContent = "Comprar lote · " + product.name;
  const lotOptions = product.lots
    .map((lot) => `<option value="${lot}">${lot} unidades</option>`)
    .join("");

  bodyEl.innerHTML = `
    <div class="modal-row">
      <div style="font-size:0.8rem;color:#555;">Material: ${product.material}</div>
      <div style="font-size:0.8rem;color:#555;">Familia: ${product.family}</div>
    </div>
    <div class="modal-row">
      <label style="font-size:0.8rem;font-weight:600;">Selecciona tamaño de lote:</label>
      <select id="lotSelect" onchange="recalculatePrice()">
        ${lotOptions}
      </select>
    </div>
    <div class="modal-row" id="priceRow" style="margin-top:0.5rem;font-size:0.9rem;"></div>
  `;

  backdrop.style.display = "flex";
  setTimeout(recalculatePrice, 0);
}

function closeModal() {
  const backdrop = document.getElementById("modalBackdrop");
  if (!backdrop) return;
  backdrop.style.display = "none";
  currentProductId = null;
  currentLotSize = null;
  currentCalculatedPrice = null;
}

function recalculatePrice() {
  const select = document.getElementById("lotSelect");
  if (!select || !currentProductId) return;
  const lotSize = parseInt(select.value, 10);
  const product = products.find((p) => p.id === currentProductId);
  if (!product) return;

  currentLotSize = lotSize;

  let factor = 1;
  if (lotSize >= 500 && lotSize < 1000) factor = 0.94;
  if (lotSize >= 1000) factor = 0.88;

  const pricePer100 = product.basePricePer100 * factor;
  const totalPrice = (lotSize / 100) * pricePer100;
  currentCalculatedPrice = totalPrice;

  const row = document.getElementById("priceRow");
  if (!row) return;
  row.innerHTML = `
    Precio por 100 uds (con descuento): <strong>${pricePer100.toFixed(2)} €</strong><br>
    Total para <strong>${lotSize}</strong> unidades: <strong>${totalPrice.toFixed(
    2
  )} €</strong> (sin IVA)
  `;
}

function confirmOrder() {
  if (!currentProductId || !currentLotSize || !currentCalculatedPrice) return;
  const product = products.find((p) => p.id === currentProductId);
  alert(
    `Pedido simulado:\n\nProducto: ${product.name}\nLote: ${currentLotSize} uds\nImporte estimado: ${currentCalculatedPrice.toFixed(
      2
    )} € (sin IVA)\n\nEn un entorno real, este pedido iría al ERP/CRM y al departamento comercial.`
  );
  closeModal();
}

// --- Trazabilidad (solo en trazabilidad.html) ---

function lookupLot() {
  const input = document.getElementById("loteInput");
  const container = document.getElementById("traceInfo");
  if (!input || !container) return;

  const code = input.value.trim().toUpperCase();
  if (!code) {
    container.innerHTML =
      '<div class="trace-empty">Introduce un número de lote válido.</div>';
    return;
  }

  const lot = lotsDB.find((l) => l.code.toUpperCase() === code);
  if (!lot) {
    container.innerHTML = `
      <div class="trace-empty">
        No se ha encontrado el lote <strong>${code}</strong> en la base de datos de ejemplo.
        En un sistema real aquí aparecería también el historial de lotes rechazados o fuera de especificación.
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="trace-grid">
      <div>
        <span class="trace-label">Número de lote / serie</span><br>
        <span class="trace-value"><strong>${lot.code}</strong></span>
      </div>
      <div>
        <span class="trace-label">Producto</span><br>
        <span class="trace-value">${lot.product}</span>
      </div>
      <div>
        <span class="trace-label">Fecha de fabricación</span><br>
        <span class="trace-value">${formatDate(lot.manufactureDate)}</span>
      </div>
      <div>
        <span class="trace-label">Máquina utilizada</span><br>
        <span class="trace-value">${lot.machine}</span>
      </div>
      <div>
        <span class="trace-label">Material</span><br>
        <span class="trace-value">${lot.material}</span>
      </div>
      <div>
        <span class="trace-label">Responsable</span><br>
        <span class="trace-value">${lot.responsible}</span>
      </div>
      <div>
        <span class="trace-label">Registro de calidad</span><br>
        <span class="trace-value">${lot.qualityRecord}</span>
      </div>
      <div>
        <span class="trace-label">Estado</span><br>
        <span class="trace-status-pill">● ${lot.status}</span>
      </div>
    </div>
    <p style="margin-top:0.8rem;font-size:0.8rem;color:#666;">
      Nota académica: esta ficha podría ampliarse con resultados de ensayos, decisiones sobre
      no conformidades y vínculos a reclamaciones de clientes.
    </p>
  `;
}

function quickLot(code) {
  const input = document.getElementById("loteInput");
  if (!input) return;
  input.value = code;
  lookupLot();
}

// --- Seguimiento de pedidos (solo en pedidos.html) ---

function lookupOrder() {
  const input = document.getElementById("pedidoInput");
  const container = document.getElementById("orderInfo");
  if (!input || !container) return;

  const code = input.value.trim().toUpperCase();
  if (!code) {
    container.innerHTML =
      '<div class="trace-empty">Introduce un número de pedido válido.</div>';
    return;
  }

  const order = ordersDB.find((o) => o.code.toUpperCase() === code);
  if (!order) {
    container.innerHTML = `
      <div class="trace-empty">
        No se ha encontrado el pedido <strong>${code}</strong> en la base de datos de ejemplo.
        En un sistema real aquí se mostrarían también pedidos cancelados o pendientes de pago.
      </div>
    `;
    return;
  }

  const stepsHtml = order.steps
    .map(
      (s) => `
      <div class="order-step">
        <div class="order-step-dot"></div>
        <div class="order-step-text">
          <div class="order-step-title">${s.title}</div>
          <div class="order-step-date">${formatDate(s.date)}</div>
          <div>${s.detail}</div>
        </div>
      </div>
    `
    )
    .join("");

  container.innerHTML = `
    <div class="order-header">
      <div class="order-code">Pedido: <strong>${order.code}</strong></div>
      <div class="order-meta">Cliente: ${order.customer}</div>
      <div class="order-meta">Resumen: ${order.productSummary}</div>
      <div class="order-meta">Fecha de pedido: ${formatDate(order.orderDate)}</div>
      <div class="order-meta">Entrega estimada: ${formatDate(order.estimatedDelivery)}</div>
      <div class="order-status-pill">● ${order.status}</div>
    </div>
    <div class="order-timeline">
      ${stepsHtml}
    </div>
    <p style="margin-top:0.8rem;font-size:0.8rem;color:#666;">
      Nota académica: este módulo podría integrarse con el sistema de gestión de almacén (WMS)
      y con el transportista para actualizar automáticamente cada estado del pedido.
    </p>
  `;
}

function quickOrder(code) {
  const input = document.getElementById("pedidoInput");
  if (!input) return;
  input.value = code;
  lookupOrder();
}


// --- Chatbot multipropósito ---

let chatInitialized = false;

function addChatBubble(text, from = "bot") {
  const body = document.getElementById("chatBody");
  if (!body) return;

  const bubble = document.createElement("div");
  bubble.className = "chat-bubble " + from;

  if (from === "bot") {
    // Permitimos HTML en las respuestas del bot (br, strong, etc.)
    bubble.innerHTML = text;
  } else {
    // Lo que escribe el usuario se muestra como texto normal (seguro)
    bubble.textContent = text;
  }

  body.appendChild(bubble);
  body.scrollTop = body.scrollHeight;
}


function initialChatMessage() {
  addChatBubble(
    "Hola, soy el asistente de la demo. Puedo ayudarte a generar presupuestos, resolver dudas técnicas básicas y simular atención al cliente."
  );
  addChatBubble(
    "Ejemplos:\n- \"Presupuesto 500 uds tornillo M6\"\n- \"¿Qué material me recomiendas para exterior?\"\n- \"Tengo un problema con un lote entregado\""
  );
}

function parseChatMessage(message) {
  const msg = message.toLowerCase();

  // 1) Intento detectar si es algo de saludo
  if (/(hola|buenas|qué tal)/.test(msg)) {
    return "¡Hola! Cuéntame si necesitas un presupuesto, una aclaración técnica o ayuda con un pedido.";
  }

  // 2) Detección de intención "presupuesto"
  if (/(presupuesto|oferta|precio|cuánto cuesta|cuanto cuesta)/.test(msg)) {
    return handleBudgetIntent(msg);
  }

  // 3) Dudas técnicas (palabras clave muy simples)
  if (
    /(material|acero|inoxidable|corrosión|corrosion|resistencia|torque|par de apriete|par de apriete)/.test(
      msg
    )
  ) {
    return handleTechnicalIntent(msg);
  }

  // 4) Atención al cliente genérica
  if (/(reclama|incidencia|problema|defecto|lote)/.test(msg)) {
    return handleSupportIntent(msg);
  }

  // ---- Contacto ----
  if (
    msg.includes("contact") ||
    msg.includes("telefono") ||
    msg.includes("teléfono") ||
    msg.includes("mail") ||
    msg.includes("correo") ||
    msg.includes("email")
  ) {
    return handleContactIntent();
  }


  // Por defecto
  return "Puedo ayudarte con presupuestos de lotes estándar, dudas técnicas sencillas sobre materiales o simulación de atención al cliente. Prueba a pedirme, por ejemplo, un \"presupuesto 1000 uds varilla M10\".";
}

function handleContactIntent() {
  return `
    Aquí tienes los datos de contacto de Carmelo Mendizabal:<br><br>
    📞 <strong>Teléfono:</strong> +34 943 75 13 37<br>
    ✉️ <strong>Email:</strong> info@carmelomendizabal.com<br>
    📍 <strong>Dirección:</strong> Bº Txurruka 1, Ctra. Bergara, 20590 Soraluze, Gipuzkoa (Spain)<br><br>
    Si quieres, también puedo ayudarte con presupuestos, trazabilidad o seguimiento de pedidos.
  `;
}


function handleBudgetIntent(msg) {
  let matchedProduct = null;

  if (msg.includes("m6")) {
    matchedProduct = products[0];
  } else if (msg.includes("varilla") || msg.includes("m10")) {
    matchedProduct = products[1];
  } else if (msg.includes("remache") || msg.includes("663")) {
    matchedProduct = products[2];
  }

  // Cantidad aproximada
  let qty = null;
  const qtyMatch = msg.match(/\b(\d{2,5})\b/);
  if (qtyMatch) {
    qty = parseInt(qtyMatch[1], 10);
  }

  if (!matchedProduct && !qty) {
    return "Para generar un presupuesto necesito que me digas el producto (por ejemplo, tornillo M6, varilla M10 o remache 663) y una cantidad aproximada.";
  }

  if (!matchedProduct) {
    return "No identifico bien el producto. Menciona, por ejemplo, tornillo M6, varilla M10 o remache 663.";
  }

  if (!qty) {
    return `Para ${matchedProduct.name} solemos trabajar con lotes de ${
      matchedProduct.lots[0]
    }, ${matchedProduct.lots[1]} o ${matchedProduct.lots[2]} unidades. Por ejemplo, el precio base es ${matchedProduct.basePricePer100.toFixed(
      2
    )} € por cada 100 uds (sin aplicar descuentos por volumen).`;
  }

  let factor = 1;
  if (qty >= 500 && qty < 1000) factor = 0.94;
  if (qty >= 1000) factor = 0.88;

  const pricePer100 = matchedProduct.basePricePer100 * factor;
  const totalPrice = (qty / 100) * pricePer100;

  return `Para ~${qty} unidades de ${matchedProduct.name} la estimación es de ${totalPrice.toFixed(
    2
  )} € (sin IVA). Es un presupuesto automático basado en tarifas estándar; el departamento comercial podría ajustarlo según condiciones reales.`;
}

function handleTechnicalIntent(msg) {
  if (/(exterior|fuera|intemperie|corrosión|corrosion|agua|humedad)/.test(msg)) {
    return "Para aplicaciones en exterior o ambientes húmedos es habitual utilizar acero inoxidable o recubrimientos anticorrosión (por ejemplo, cincado caliente). En este prototipo no entramos al detalle de normas, pero en la empresa real se definirían según la aplicación.";
  }

  if (/(par de apriete|torque)/.test(msg)) {
    return "El par de apriete recomendado depende del diámetro, del paso de rosca, del material y de si hay lubricación. La empresa podría disponer de una tabla interna o fichas técnicas por producto. Este chatbot podría consultar esas tablas para darte un valor orientativo.";
  }

  return "Como orientación general: la elección del material (por ejemplo, acero 8.8, 10.9 o inoxidable) depende de la resistencia mecánica y las condiciones ambientales. En un sistema real, el chatbot consultaría fichas técnicas para responder con datos exactos.";
}

function handleSupportIntent(msg) {
  return "Para una incidencia con un lote, en un sistema real te pediría el número de lote (por ejemplo, L-2025-001), comprobaría su trazabilidad (máquina, responsable, controles de calidad) y generaría un aviso interno para calidad/comercial. Aquí puedes probar esa parte en la sección de Trazabilidad QR.";
}

function sendChat() {
  const input = document.getElementById("chatInput");
  const text = input ? input.value.trim() : "";
  if (!text) return;

  addChatBubble(text, "user");
  input.value = "";

  setTimeout(() => {
    const answer = parseChatMessage(text);
    addChatBubble(answer, "bot");
  }, 200);
}

function toggleChat() {
  const chatWindow = document.getElementById("chatWindow");
  if (!chatWindow) return;
  const isOpen = chatWindow.style.display === "flex";
  chatWindow.style.display = isOpen ? "none" : "flex";

  if (!isOpen && !chatInitialized) {
    initialChatMessage();
    chatInitialized = true;
  }
}

function openChatWithHint(productName) {
  const chatWindow = document.getElementById("chatWindow");
  if (!chatWindow) return;
  chatWindow.style.display = "flex";
  if (!chatInitialized) {
    initialChatMessage();
    chatInitialized = true;
  }
  addChatBubble(`Quiero un presupuesto para ${productName}`, "user");
  setTimeout(() => {
    const fakeMsg = `presupuesto ${productName}`;
    const answer = parseChatMessage(fakeMsg.toLowerCase());
    addChatBubble(answer, "bot");
  }, 200);
}

// --- Inicialización global en cada página ---

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.getAttribute("data-page");

  // Catálogo
  if (page === "productos") {
    renderProducts();
  }

  // Trazabilidad: leer ?lote= de la URL si existe
  if (page === "trazabilidad") {
    const params = new URLSearchParams(window.location.search);
    const loteParam = params.get("lote");
    if (loteParam) {
      const input = document.getElementById("loteInput");
      if (input) {
        input.value = loteParam;
        lookupLot();
      }
    }
  }

  // Seguimiento de pedidos: leer ?pedido= de la URL si quieres usar también QR para pedidos
  if (page === "pedidos") {
    const params = new URLSearchParams(window.location.search);
    const pedidoParam = params.get("pedido");
    if (pedidoParam) {
      const input = document.getElementById("pedidoInput");
      if (input) {
        input.value = pedidoParam;
        lookupOrder();
      }
    }
  }

  // Chat: enviar con Enter
  const chatInput = document.getElementById("chatInput");
  if (chatInput) {
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        sendChat();
      }
    });
  }

  const chatToggle = document.getElementById("chatToggle");
  if (chatToggle) {
    chatToggle.addEventListener("click", toggleChat);
  }
});


