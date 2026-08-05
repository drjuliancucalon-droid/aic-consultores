import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime?.env as any;
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());

  if (!env?.DB) {
    return new Response('DB no configurada', { status: 500 });
  }

  await env.DB.prepare('INSERT INTO draft_revisions (scope, payload_json) VALUES (?, ?)')
    .bind('site_settings', JSON.stringify(payload))
    .run();

  return new Response(JSON.stringify({ ok: true, mode: 'preview' }), {
    headers: { 'content-type': 'application/json' },
  });
};
