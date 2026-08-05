import type { APIRoute } from 'astro';
import { upsertFaqItem } from '../../../../lib/admin/content';

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

  const revision = await env.DB.prepare(
    'INSERT INTO draft_revisions (scope, payload_json, published_at) VALUES (?, ?, CURRENT_TIMESTAMP) RETURNING id',
  )
    .bind('faq_items', JSON.stringify(payload))
    .first();

  await env.DB.prepare('INSERT INTO publish_jobs (revision_id, status, message) VALUES (?, ?, ?)')
    .bind(revision?.id ?? null, 'pending', 'Publicación de FAQ solicitada')
    .run();

  if (env.CLOUDFLARE_DEPLOY_HOOK) {
    await fetch(env.CLOUDFLARE_DEPLOY_HOOK, { method: 'POST' });
  }

  return redirect('/admin/content?message=FAQ%20publicada');
};
