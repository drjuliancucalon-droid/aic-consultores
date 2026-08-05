import type { Env } from '../env';

export type TeamMember = {
  id?: number;
  slug: string;
  nombre: string;
  cargo: string;
  matricula: string;
  resumen: string;
  bio_md: string;
  foto_url: string;
  orden: number;
  publicado: number;
};

export async function listTeamMembers(env: Env) {
  const result = await env.DB.prepare('SELECT * FROM team_members ORDER BY orden ASC, id ASC').all<TeamMember>();
  return result.results ?? [];
}

export async function upsertTeamMember(env: Env, payload: TeamMember) {
  await env.DB.prepare(`
    INSERT INTO team_members (slug, nombre, cargo, matricula, resumen, bio_md, foto_url, orden, publicado)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(slug) DO UPDATE SET
      nombre = excluded.nombre,
      cargo = excluded.cargo,
      matricula = excluded.matricula,
      resumen = excluded.resumen,
      bio_md = excluded.bio_md,
      foto_url = excluded.foto_url,
      orden = excluded.orden,
      publicado = excluded.publicado,
      updated_at = CURRENT_TIMESTAMP
  `)
    .bind(
      payload.slug,
      payload.nombre,
      payload.cargo,
      payload.matricula,
      payload.resumen,
      payload.bio_md,
      payload.foto_url,
      payload.orden,
      payload.publicado,
    )
    .run();
}

export async function deleteTeamMember(env: Env, slug: string) {
  await env.DB.prepare('DELETE FROM team_members WHERE slug = ?').bind(slug).run();
}
