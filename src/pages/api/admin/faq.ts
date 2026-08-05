import type { APIRoute } from 'astro';
import { upsertFaqItem } from '../../../lib/admin/content';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const env = (locals as any).runtime?.env;
  const formData = await request.formData();
  const payload = {
    seccion: 'inicio',
    pregunta: String(formData.get('pregunta') || ''),
    respuesta: String(formData.get('respuesta') || ''),
    orden: Number(formData.get('orden') || 0),
    publicado: 1,
  };

  if (!env?.DB) {
    return redirect('/admin/content?message=DB%20no%20configurada');
  }

  await upsertFaqItem(env, payload);
  return redirect('/admin/content?message=FAQ%20guardada');
};
