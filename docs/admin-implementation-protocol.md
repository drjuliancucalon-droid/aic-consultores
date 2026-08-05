# Protocolo de implementación — Admin CMS con D1

## Objetivo
Crear un panel `/admin` privado para edición de contenido y configuración del sitio, manteniendo el sitio público abierto y estático para visitantes.

## Decisiones cerradas
- Autenticación: usuario + contraseña única
- Base de datos: Cloudflare D1
- Acceso público del sitio: se mantiene abierto
- Acciones separadas: Vista previa y Publicar
- Alcance editable: configuración general, equipo, legales, FAQs, pilares, proceso, servicios, soluciones, recursos y secciones futuras

## Arquitectura recomendada
- Sitio público: Astro estático/híbrido
- Panel admin: rutas protegidas por middleware
- Persistencia: D1 con tablas normalizadas
- Borradores: guardados en D1
- Publicación: deploy hook de Cloudflare Pages

## Fases
1. Esquema D1 y utilidades servidor
2. Autenticación admin y sesión segura
3. CRUD de configuración central
4. Vista previa y publicación
5. Expansión a colecciones (servicios, soluciones, recursos)
6. Refactor del sitio público para leer configuración centralizada

## Bloqueadores pendientes del negocio
- WhatsApp real
- URL de agenda real
- Razón social y NIT
- Credenciales/matrículas del equipo
- Proveedor real para formulario/CRM
