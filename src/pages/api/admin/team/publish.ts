import type { APIRoute } from 'astro';
import { upsertTeamMember } from '../../../../lib/admin/team';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const env = (locals as any).runtime?.env;
  const formData = await request.formData();
  const payload = {
    slug: String(formData.get('slug') || ''),
    nombre: String(formData.get('nombre') || ''),
    cargo: String(formData.get('cargo') || ''),
    matricula: String(formData.get('matricula') || ''),
    resumen: String(formData.get('resumen') || ''),
    bio_md: String(formData.get('bio_md') || ''),
    foto_url: String(formData.get('foto_url') || ''),
    orden: Number(formData.get('orden') || 0),
    publicado: formData.get('publicado') ? 1 : 0,
  };

  if (!env?.DB) {
    return redirect('/admin/team?message=DB%20no%20configurada');
  }

  await upsertTeamMember(env, payload);

  const revision = await env.DB.prepare(
    'INSERT INTO draft_revisions (scope, payload_json, published_at) VALUES (?, ?, CURRENT_TIMESTAMP) RETURNING id',
  )
    .bind('team_members', JSON.stringify(payload))
    .first();

  await env.DB.prepare('INSERT INTO publish_jobs (revision_id, status, message) VALUES (?, ?, ?)')
    .bind(revision?.id ?? null, 'pending', 'Publicación de equipo solicitada')
    .run();

  if (env.CLOUDFLARE_DEPLOY_HOOK) {
    await fetch(env.CLOUDFLARE_DEPLOY_HOOK, { method: 'POST' });
  }

  return redirect('/admin/team?message=Publicado');
};
