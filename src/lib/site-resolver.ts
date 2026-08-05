import type { Env } from '../env';
import { site as siteEstatico } from '../data/site';

export async function resolveSiteSettings(env: Env | undefined) {
  if (!env?.DB) return siteEstatico;

  const { getSiteSettings } = await import('./admin/settings');
  const settings = await getSiteSettings(env);

  if (!settings || !settings.whatsapp_numero) {
    return siteEstatico;
  }

  return {
    nombreCorto: settings.nombre_corto || siteEstatico.nombreCorto,
    nombreLargo: settings.nombre_largo || siteEstatico.nombreLargo,
    eslogan: settings.eslogan || siteEstatico.eslogan,
    ciudad: settings.ciudad || siteEstatico.ciudad,
    departamento: settings.departamento || siteEstatico.departamento,
    pais: settings.pais || siteEstatico.pais,
    direccion: settings.direccion || siteEstatico.direccion,
    correoContacto: settings.correo_contacto || siteEstatico.correoContacto,
    whatsappNumero: settings.whatsapp_numero || siteEstatico.whatsappNumero,
    whatsappMensaje: settings.whatsapp_mensaje || siteEstatico.whatsappMensaje,
    agendaUrl: settings.agenda_url || siteEstatico.agendaUrl,
    formEndpoint: settings.form_endpoint || siteEstatico.formEndpoint,
    redes: {
      linkedin: settings.linkedin_url || siteEstatico.redes.linkedin,
      instagram: settings.instagram_url || siteEstatico.redes.instagram,
    },
  };
}
