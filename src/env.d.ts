/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_WHATSAPP_NUMBER: string;
  readonly PUBLIC_WHATSAPP_MENSAJE: string;
  readonly PUBLIC_AGENDA_URL: string;
  readonly PUBLIC_CONTACT_EMAIL: string;
  readonly PUBLIC_FORM_ENDPOINT: string;
  readonly PUBLIC_GTM_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
