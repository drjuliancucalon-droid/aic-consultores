import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime?.env as any;
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());

  if (!env?.DB) {
    return new Response('DB no configurada', { status: 500 });
  }

  const revision = await env.DB.prepare('INSERT INTO draft_revisions (scope, payload_json, published_at) VALUES (?, ?, CURRENT_TIMESTAMP) RETURNING id')
    .bind('site_settings', JSON.stringify(payload))
    .first();

  await env.DB.prepare('INSERT INTO publish_jobs (revision_id, status, message) VALUES (?, ?, ?)')
    .bind(revision?.id ?? null, 'pending', 'Publicación solicitada desde panel admin')
    .run();

  if (env.CLOUDFLARE_DEPLOY_HOOK) {
    await fetch(env.CLOUDFLARE_DEPLOY_HOOK, { method: 'POST' });
  }

  return new Response(JSON.stringify({ ok: true, mode: 'publish' }), {
    headers: { 'content-type': 'application/json' },
  });
};
