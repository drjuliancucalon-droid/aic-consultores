import type { MiddlewareHandler } from 'astro';

const PUBLIC_ADMIN_PATHS = new Set(['/admin', '/admin/login']);

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { url, locals, request, cookies } = context;

  if (!url.pathname.startsWith('/admin')) {
    return next();
  }

  const sessionCookie = cookies.get('admin_session')?.value;
  const isLoginPath = PUBLIC_ADMIN_PATHS.has(url.pathname);

  if (!sessionCookie && !isLoginPath) {
    return context.redirect('/admin/login');
  }

  locals.adminAuthenticated = Boolean(sessionCookie);
  locals.runtime = { env: context.locals.runtime?.env ?? context.platform?.env ?? {} };

  return next();
};

declare module 'astro' {
  interface Locals {
    adminAuthenticated?: boolean;
    runtime?: {
      env: Record<string, any>;
    };
  }
}
