export interface Env {
  DB: D1Database;
  ADMIN_USERNAME: string;
  ADMIN_PASSWORD_HASH: string;
  ADMIN_SESSION_SECRET: string;
  PREVIEW_TOKEN: string;
  CLOUDFLARE_DEPLOY_HOOK?: string;
  PUBLIC_SITE_URL?: string;
  PUBLIC_CONTACT_EMAIL?: string;
  PUBLIC_WHATSAPP_NUMBER?: string;
  PUBLIC_WHATSAPP_MENSAJE?: string;
  PUBLIC_AGENDA_URL?: string;
  PUBLIC_FORM_ENDPOINT?: string;
  PUBLIC_GTM_ID?: string;
}
