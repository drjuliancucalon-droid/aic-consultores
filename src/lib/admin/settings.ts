import type { Env } from '../env';

export type SiteSettings = {
  nombre_corto: string;
  nombre_largo: string;
  eslogan: string;
  ciudad: string;
  departamento: string;
  pais: string;
  direccion: string;
  correo_contacto: string;
  whatsapp_numero: string;
  whatsapp_mensaje: string;
  agenda_url: string;
  form_endpoint: string;
  public_site_url: string;
  public_gtm_id: string;
  linkedin_url: string;
  instagram_url: string;
};

export async function getSiteSettings(env: Env) {
  const result = await env.DB.prepare('SELECT * FROM site_settings WHERE id = 1').first<SiteSettings>();
  return result;
}

export async function updateSiteSettings(env: Env, payload: SiteSettings) {
  await env.DB.prepare(`
    UPDATE site_settings SET
      nombre_corto = ?,
      nombre_largo = ?,
      eslogan = ?,
      ciudad = ?,
      departamento = ?,
      pais = ?,
      direccion = ?,
      correo_contacto = ?,
      whatsapp_numero = ?,
      whatsapp_mensaje = ?,
      agenda_url = ?,
      form_endpoint = ?,
      public_site_url = ?,
      public_gtm_id = ?,
      linkedin_url = ?,
      instagram_url = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = 1
  `)
    .bind(
      payload.nombre_corto,
      payload.nombre_largo,
      payload.eslogan,
      payload.ciudad,
      payload.departamento,
      payload.pais,
      payload.direccion,
      payload.correo_contacto,
      payload.whatsapp_numero,
      payload.whatsapp_mensaje,
      payload.agenda_url,
      payload.form_endpoint,
      payload.public_site_url,
      payload.public_gtm_id,
      payload.linkedin_url,
      payload.instagram_url,
    )
    .run();
}
