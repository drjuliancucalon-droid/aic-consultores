import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const env = (locals as any).runtime?.env;
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());

  if (!env?.DB) {
    return redirect('/admin/legal?message=DB%20no%20configurada');
  }

  await env.DB.prepare('INSERT INTO draft_revisions (scope, payload_json) VALUES (?, ?)')
    .bind('legal_content', JSON.stringify(payload))
    .run();

  return redirect('/admin/legal?message=Vista%20previa%20guardada');
};
