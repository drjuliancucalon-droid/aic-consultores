import type { APIRoute } from 'astro';
import { upsertTeamMember } from '../../../lib/admin/team';

export const prerender = false;

function extractPayload(formData: FormData) {
  return {
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
}

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const env = (locals as any).runtime?.env;
  const formData = await request.formData();
  const payload = extractPayload(formData);

  if (!env?.DB) {
    return redirect('/admin/team?message=DB%20no%20configurada');
  }

  await upsertTeamMember(env, payload);
  return redirect('/admin/team?message=Guardado');
};
