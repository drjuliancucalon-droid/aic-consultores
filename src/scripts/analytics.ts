// Capa ligera de analítica de eventos.
//
// No incluye ningún proveedor de analítica por defecto: solo empuja los
// eventos a `window.dataLayer`, el formato estándar que usan Google Tag
// Manager y Google Analytics 4. Si PUBLIC_GTM_ID está configurado, GTM
// recibirá estos eventos automáticamente. Si prefiere otra herramienta
// (Plausible, Matomo, Fathom, etc.), puede leer window.dataLayer o
// modificar `trackEvent` para llamar directamente a esa herramienta.
//
// Eventos que ya están conectados en el sitio:
//   - clic_whatsapp        (header, menú móvil, barra flotante)
//   - clic_agendar         (botones "Agendar diagnóstico inicial")
//   - envio_formulario     (formulario de contacto)
//   - descarga_recurso     (tarjetas de la sección Recursos)

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function trackEvent(nombre: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: nombre, ...params });
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', nombre, params);
  }
}

export function bindDeclarativeEvents(root: ParentNode = document) {
  root.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement)?.closest<HTMLElement>('[data-analytics-event]');
    if (!target) return;
    const nombre = target.dataset.analyticsEvent;
    if (!nombre) return;
    const { analyticsEvent, ...rest } = target.dataset;
    trackEvent(nombre, rest);
  });
}
