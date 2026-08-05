import type { APIRoute } from 'astro';
import { upsertContentEntry } from '../../../lib/admin/content';

export const prerender = false;

function extractPayload(formData: FormData) {
  return {
    collection: String(formData.get('collection') || 'servicios') as any,
    slug: String(formData.get('slug') || ''),
    title: String(formData.get('title') || ''),
    description: String(formData.get('description') || ''),
    body_md: String(formData.get('body_md') || ''),
    meta_json: '{}',
    orden: Number(formData.get('orden') || 0),
    publicado: 1,
  };
}

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const env = (locals as any).runtime?.env;
  const formData = await request.formData();
  const payload = extractPayload(formData);

  if (!env?.DB) {
    return redirect('/admin/content?message=DB%20no%20configurada');
  }

  await upsertContentEntry(env, payload);
  return redirect('/admin/content?message=Guardado');
};
