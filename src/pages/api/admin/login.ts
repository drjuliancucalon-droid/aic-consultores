import type { APIRoute } from 'astro';
import { verifyPassword, signSession } from '../../../lib/admin/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, locals, redirect }) => {
  const env = locals.runtime?.env as any;
  const formData = await request.formData();
  const username = String(formData.get('username') || '');
  const password = String(formData.get('password') || '');

  if (!env?.ADMIN_USERNAME || !env?.ADMIN_PASSWORD_HASH || !env?.ADMIN_SESSION_SECRET) {
    return new Response('Configuración admin incompleta', { status: 500 });
  }

  if (username !== env.ADMIN_USERNAME) {
    return redirect('/admin/login?message=Credenciales%20inv%C3%A1lidas');
  }

  const ok = await verifyPassword(password, env.ADMIN_PASSWORD_HASH);
  if (!ok) {
    return redirect('/admin/login?message=Credenciales%20inv%C3%A1lidas');
  }

  const token = await signSession(`${username}:${Date.now()}`, env.ADMIN_SESSION_SECRET);
  cookies.set('admin_session', token, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 8,
  });

  return redirect('/admin');
};
