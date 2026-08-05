import { defineCollection, z } from 'astro:content';

const servicios = defineCollection({
  type: 'content',
  schema: z.object({
    titulo: z.string(),
    categoria: z.enum(['contable-tributario', 'sgsst', 'psicosocial', 'especializado']),
    resumen: z.string().max(220),
    queResuelve: z.string(),
    incluye: z.array(z.string()),
    noIncluye: z.array(z.string()),
    responsable: z.string(),
    modalidad: z.string(),
    orden: z.number().default(99),
    destacadoEnInicio: z.boolean().default(false),
  }),
});

const soluciones = defineCollection({
  type: 'content',
  schema: z.object({
    titulo: z.string(),
    segmento: z.string(),
    resumen: z.string().max(220),
    problemasTipicos: z.array(z.string()),
    serviciosSugeridos: z.array(z.string()),
    entregables: z.array(z.string()),
    exclusiones: z.array(z.string()),
    orden: z.number().default(99),
  }),
});

const recursos = defineCollection({
  type: 'content',
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string().max(220),
    tipo: z.enum(['checklist', 'guia', 'calendario']),
    fechaPublicacion: z.date(),
    tiempoLectura: z.string().optional(),
  }),
});

export const collections = { servicios, soluciones, recursos };
