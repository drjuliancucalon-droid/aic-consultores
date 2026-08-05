# Admin CMS para AIC Consultores

Se agregó la base del panel `/admin` para edición privada del sitio manteniendo el frontend público abierto.

## Incluye
- Middleware para proteger `/admin`
- Login con usuario/contraseña única
- Esquema inicial D1
- Módulos base: configuración, legales, equipo, contenido
- Endpoints: login, logout, settings, preview, publish
- `output: 'hybrid'` para soportar rutas admin dinámicas

## Antes de usar
1. Ejecutar la migración `migrations/0001_admin_cms.sql` en Cloudflare D1.
2. Configurar variables privadas en Cloudflare Pages.
3. Generar `ADMIN_PASSWORD_HASH` con el helper `src/lib/admin/auth.ts`.
4. Configurar `CLOUDFLARE_DEPLOY_HOOK` para publicación.

## Advertencia honesta
Esto NO está terminado funcionalmente al 100% como CMS completo. Está implementada la base arquitectónica correcta. Falta conectar lectura/escritura completa del resto de módulos (legales, equipo, contenido) y refactorizar el sitio público para leer desde D1 en build/publicación.
