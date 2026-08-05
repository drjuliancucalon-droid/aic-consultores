import type { APIRoute } from 'astro';
import { updateLegalContent } from '../../../lib/admin/legal';

export const prerender = false;

function extractPayload(formData: FormData) {
  return {
    razon_social: String(formData.get('razon_social') || ''),
    nit: String(formData.get('nit') || ''),
    representante_legal: String(formData.get('representante_legal') || ''),
    correo_habeas_data: String(formData.get('correo_habeas_data') || ''),
    telefono_legal: String(formData.get('telefono_legal') || ''),
    direccion_legal: String(formData.get('direccion_legal') || ''),
    aviso_privacidad_md: String(formData.get('aviso_privacidad_md') || ''),
    politica_datos_md: String(formData.get('politica_datos_md') || ''),
    terminos_md: String(formData.get('terminos_md') || ''),
  };
}

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const env = (locals as any).runtime?.env;
  const formData = await request.formData();
  const payload = extractPayload(formData);

  if (!env?.DB) {
    return redirect('/admin/legal?message=DB%20no%20configurada');
  }

  await updateLegalContent(env, payload);
  return redirect('/admin/legal?message=Guardado');
};
