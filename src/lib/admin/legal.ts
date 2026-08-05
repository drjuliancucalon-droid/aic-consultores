import type { Env } from '../env';

export type LegalContent = {
  razon_social: string;
  nit: string;
  representante_legal: string;
  correo_habeas_data: string;
  telefono_legal: string;
  direccion_legal: string;
  aviso_privacidad_md: string;
  politica_datos_md: string;
  terminos_md: string;
};

export async function getLegalContent(env: Env) {
  return env.DB.prepare('SELECT * FROM legal_content WHERE id = 1').first<LegalContent>();
}

export async function updateLegalContent(env: Env, payload: LegalContent) {
  await env.DB.prepare(`
    UPDATE legal_content SET
      razon_social = ?,
      nit = ?,
      representante_legal = ?,
      correo_habeas_data = ?,
      telefono_legal = ?,
      direccion_legal = ?,
      aviso_privacidad_md = ?,
      politica_datos_md = ?,
      terminos_md = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = 1
  `)
    .bind(
      payload.razon_social,
      payload.nit,
      payload.representante_legal,
      payload.correo_habeas_data,
      payload.telefono_legal,
      payload.direccion_legal,
      payload.aviso_privacidad_md,
      payload.politica_datos_md,
      payload.terminos_md,
    )
    .run();
}
