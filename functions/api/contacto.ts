// Cloudflare Pages Function — se despliega automáticamente en /api/contacto
// junto con el sitio estático (no requiere configuración adicional en
// Cloudflare Pages: basta con que la carpeta /functions exista en la raíz
// del proyecto).
//
// Esta función SOLO valida la solicitud y responde. No envía correos ni
// guarda datos en ninguna base de datos todavía: eso requiere conectar un
// servicio real (Resend, SendGrid, HubSpot, Airtable, etc.) usando
// variables de entorno del lado servidor configuradas en Cloudflare Pages
// (Settings → Environment variables), NUNCA con claves escritas en el
// código. Busque los comentarios "TODO" más abajo.

interface SolicitudBase {
  tipo: 'contacto' | 'descarga-recurso';
  nombre?: string;
  correo?: string;
  consentimiento?: boolean | string;
}

interface SolicitudContacto extends SolicitudBase {
  tipo: 'contacto';
  empresa?: string;
  ciudad?: string;
  sector?: string;
  trabajadores?: string;
  servicio?: string;
  telefono?: string;
  mensaje?: string;
}

interface SolicitudDescarga extends SolicitudBase {
  tipo: 'descarga-recurso';
  recurso?: string;
}

type Env = {
  // TODO: agregar aquí las variables de entorno del lado servidor que use
  // su proveedor de correo/CRM, por ejemplo: RESEND_API_KEY, CRM_WEBHOOK_URL.
  // Configúrelas en Cloudflare Pages → Settings → Environment variables.
  // Nunca las escriba directamente en este archivo.
};

function jsonResponse(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request } = context;

  let data: SolicitudContacto | SolicitudDescarga;
  try {
    data = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: 'Cuerpo de la solicitud inválido.' }, 400);
  }

  if (!data.consentimiento) {
    return jsonResponse({ ok: false, error: 'Falta el consentimiento de tratamiento de datos.' }, 400);
  }
  if (!data.correo || !EMAIL_REGEX.test(data.correo)) {
    return jsonResponse({ ok: false, error: 'Correo electrónico inválido.' }, 400);
  }
  if (!data.nombre || data.nombre.trim().length < 2) {
    return jsonResponse({ ok: false, error: 'Falta el nombre.' }, 400);
  }

  if (data.tipo === 'contacto') {
    const requeridos: (keyof SolicitudContacto)[] = ['ciudad', 'sector', 'trabajadores', 'servicio', 'telefono'];
    const faltantes = requeridos.filter((campo) => !data[campo]);
    if (faltantes.length > 0) {
      return jsonResponse({ ok: false, error: `Faltan campos requeridos: ${faltantes.join(', ')}.` }, 400);
    }
  } else if (data.tipo === 'descarga-recurso') {
    if (!data.recurso) {
      return jsonResponse({ ok: false, error: 'Falta identificar el recurso solicitado.' }, 400);
    }
  } else {
    return jsonResponse({ ok: false, error: 'Tipo de solicitud no reconocido.' }, 400);
  }

  // TODO: conectar aquí el envío real, por ejemplo:
  //
  //   await fetch('https://api.resend.com/emails', {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       from: 'sitio@aicconsultores.co',
  //       to: 'contacto@aicconsultores.co',
  //       subject: data.tipo === 'contacto' ? 'Nueva solicitud de diagnóstico' : 'Nueva descarga de recurso',
  //       text: JSON.stringify(data, null, 2),
  //     }),
  //   });
  //
  // Mientras no se conecte un servicio real, esta función solo confirma
  // que los datos recibidos son válidos.

  return jsonResponse({ ok: true }, 200);
};

export const onRequestGet = async () =>
  jsonResponse({ ok: false, error: 'Este endpoint solo acepta solicitudes POST.' }, 405);
