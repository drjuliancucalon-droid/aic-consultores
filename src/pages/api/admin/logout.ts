import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete('admin_session', { path: '/' });
  return redirect('/admin/login?message=Sesi%C3%B3n%20cerrada');
};
