import type { Env } from '../env';

export type ContentEntry = {
  id?: number;
  collection: 'servicios' | 'soluciones' | 'recursos';
  slug: string;
  title: string;
  description: string;
  body_md: string;
  meta_json: string;
  orden: number;
  publicado: number;
};

export async function listContentEntries(env: Env, collection: string) {
  const result = await env.DB.prepare(
    'SELECT * FROM content_entries WHERE collection = ? ORDER BY orden ASC, id ASC',
  )
    .bind(collection)
    .all<ContentEntry>();
  return result.results ?? [];
}

export async function upsertContentEntry(env: Env, payload: ContentEntry) {
  await env.DB.prepare(`
    INSERT INTO content_entries (collection, slug, title, description, body_md, meta_json, orden, publicado)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(collection, slug) DO UPDATE SET
      title = excluded.title,
      description = excluded.description,
      body_md = excluded.body_md,
      meta_json = excluded.meta_json,
      orden = excluded.orden,
      publicado = excluded.publicado,
      updated_at = CURRENT_TIMESTAMP
  `)
    .bind(
      payload.collection,
      payload.slug,
      payload.title,
      payload.description,
      payload.body_md,
      payload.meta_json,
      payload.orden,
      payload.publicado,
    )
    .run();
}

export async function deleteContentEntry(env: Env, collection: string, slug: string) {
  await env.DB.prepare('DELETE FROM content_entries WHERE collection = ? AND slug = ?')
    .bind(collection, slug)
    .run();
}

export type FaqItem = {
  id?: number;
  seccion: string;
  pregunta: string;
  respuesta: string;
  orden: number;
  publicado: number;
};

export async function listFaqItems(env: Env, seccion = 'inicio') {
  const result = await env.DB.prepare(
    'SELECT * FROM faq_items WHERE seccion = ? ORDER BY orden ASC, id ASC',
  )
    .bind(seccion)
    .all<FaqItem>();
  return result.results ?? [];
}

export async function upsertFaqItem(env: Env, payload: FaqItem) {
  if (payload.id) {
    await env.DB.prepare(`
      UPDATE faq_items SET seccion = ?, pregunta = ?, respuesta = ?, orden = ?, publicado = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `)
      .bind(payload.seccion, payload.pregunta, payload.respuesta, payload.orden, payload.publicado, payload.id)
      .run();
    return;
  }
  await env.DB.prepare(`
    INSERT INTO faq_items (seccion, pregunta, respuesta, orden, publicado) VALUES (?, ?, ?, ?, ?)
  `)
    .bind(payload.seccion, payload.pregunta, payload.respuesta, payload.orden, payload.publicado)
    .run();
}

export async function deleteFaqItem(env: Env, id: number) {
  await env.DB.prepare('DELETE FROM faq_items WHERE id = ?').bind(id).run();
}
