import type { APIRoute } from 'astro';
import { updateSiteSettings } from '../../../lib/admin/settings';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const env = locals.runtime?.env as any;
  const formData = await request.formData();

  await updateSiteSettings(env, {
    nombre_corto: String(formData.get('nombre_corto') || ''),
    nombre_largo: String(formData.get('nombre_largo') || ''),
    eslogan: String(formData.get('eslogan') || ''),
    ciudad: String(formData.get('ciudad') || ''),
    departamento: String(formData.get('departamento') || ''),
    pais: String(formData.get('pais') || 'Colombia'),
    direccion: String(formData.get('direccion') || ''),
    correo_contacto: String(formData.get('correo_contacto') || ''),
    whatsapp_numero: String(formData.get('whatsapp_numero') || ''),
    whatsapp_mensaje: String(formData.get('whatsapp_mensaje') || ''),
    agenda_url: String(formData.get('agenda_url') || ''),
    form_endpoint: '/api/contacto',
    public_site_url: String(formData.get('public_site_url') || ''),
    public_gtm_id: String(formData.get('public_gtm_id') || ''),
    linkedin_url: String(formData.get('linkedin_url') || ''),
    instagram_url: String(formData.get('instagram_url') || ''),
  });

  return redirect('/admin/settings?message=Guardado');
};
