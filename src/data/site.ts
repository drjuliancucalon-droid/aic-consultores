// Configuración central del sitio.
// Los valores marcados "PLACEHOLDER" deben reemplazarse antes de publicar.

export const site = {
  nombreCorto: 'Asesoría Integral',
  nombreLargo: 'Asesoría Integral Contadores y Consultores',
  eslogan:
    'Ayudamos a pequeñas empresas a ordenar sus finanzas, cumplir sus obligaciones y proteger a su equipo mediante un acompañamiento profesional coordinado.',
  ciudad: 'Popayán',
  departamento: 'Cauca',
  pais: 'Colombia',
  // PLACEHOLDER — dirección física si atienden público en un punto fijo. Si la operación
  // es 100% extramural/remota, se puede dejar solo ciudad y departamento.
  direccion: '',
  correoContacto: import.meta.env.PUBLIC_CONTACT_EMAIL || 'dr.juliancucalon@gmail.com',
  whatsappNumero: import.meta.env.PUBLIC_WHATSAPP_NUMBER || '573182213979',
  whatsappMensaje:
    import.meta.env.PUBLIC_WHATSAPP_MENSAJE || 'Hola, quiero agendar un diagnóstico inicial gratuito.',
  agendaUrl: import.meta.env.PUBLIC_AGENDA_URL || 'https://cal.com/aic-consultores/diagnostico-inicial',
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT || '/api/contacto',
  // PLACEHOLDER — se completa cuando el equipo defina redes activas.
  redes: {
    linkedin: '',
    instagram: '',
  },
} as const;

export const whatsappHref = () =>
  `https://wa.me/${site.whatsappNumero}?text=${encodeURIComponent(site.whatsappMensaje)}`;

export type NavItem = { label: string; href: string; children?: NavItem[] };

export const navPrincipal: NavItem[] = [
  { label: 'Inicio', href: '/' },
  {
    label: 'Soluciones',
    href: '/soluciones/',
    children: [
      { label: 'Construcción', href: '/soluciones/construccion/' },
      { label: 'Comercio y servicios', href: '/soluciones/comercio-servicios/' },
      { label: 'Independientes', href: '/soluciones/independientes/' },
    ],
  },
  { label: 'Servicios', href: '/servicios/' },
  { label: 'Equipo', href: '/equipo/' },
  { label: 'Recursos', href: '/recursos/' },
  { label: 'Contacto', href: '/contacto/' },
];

// Los "tres pilares" que resumen la propuesta de valor en el inicio.
export const pilares = [
  {
    id: 'orden-financiero',
    titulo: 'Orden financiero',
    resumen:
      'Contabilidad, impuestos y nómina al día, con información clara para tomar decisiones.',
    icono: 'chart',
    href: '/servicios/#contabilidad-financiera',
  },
  {
    id: 'sst-en-marcha',
    titulo: 'SST en marcha',
    resumen:
      'Sistema de Gestión de Seguridad y Salud en el Trabajo implementado y sostenible, no solo un documento archivado.',
    icono: 'shield',
    href: '/servicios/#nomina-sgsst',
  },
  {
    id: 'entorno-saludable',
    titulo: 'Entorno laboral saludable',
    resumen:
      'Identificación y gestión del riesgo psicosocial, dentro del marco normativo vigente.',
    icono: 'heart',
    href: '/servicios/#nomina-sgsst',
  },
] as const;

export const procesoTrabajo = [
  {
    numero: '01',
    titulo: 'Diagnóstico',
    descripcion: 'Una conversación de 30 minutos para entender su empresa, su sector y sus prioridades reales.',
  },
  {
    numero: '02',
    titulo: 'Propuesta',
    descripcion: 'Alcance y cronograma claros por escrito, coordinados entre las disciplinas que necesite.',
  },
  {
    numero: '03',
    titulo: 'Implementación',
    descripcion: 'Trabajo conjunto con revisión humana en cada entrega, sin plantillas genéricas.',
  },
  {
    numero: '04',
    titulo: 'Seguimiento',
    descripcion: 'Acompañamiento continuo para sostener lo implementado, no solo cumplir en el papel.',
  },
] as const;

export const faqInicio = [
  {
    pregunta: '¿Trabajan con empresas de cualquier tamaño?',
    respuesta:
      'Nos enfocamos en pequeñas y medianas empresas, principalmente del sector construcción (8 a 50 trabajadores) y comercio o servicios (1 a 10 trabajadores). También atendemos independientes, instituciones educativas privadas e IPS pequeñas. Si su empresa tiene otro tamaño, cuéntenos en el diagnóstico inicial y le decimos con franqueza si podemos ayudarle.',
  },
  {
    pregunta: '¿Qué diferencia a AIC Consultores de contratar cada servicio por separado?',
    respuesta:
      'Coordinamos contabilidad, SG-SST y gestión del riesgo psicosocial bajo un mismo acompañamiento, para que la información fluya entre disciplinas en vez de quedar en compartimentos separados. Ningún profesional trabaja de forma aislada del resto del equipo.',
  },
  {
    pregunta: '¿El diagnóstico inicial tiene costo?',
    respuesta:
      'El diagnóstico inicial de 30 minutos no tiene costo y no genera ninguna obligación. Sirve para entender su situación y, si hay una oportunidad real de ayudar, presentarle una propuesta formal con alcance y valores definidos.',
  },
  {
    pregunta: '¿Puedo enviarles historias clínicas o resultados de exámenes por el formulario del sitio?',
    respuesta:
      'No. El formulario de contacto es solo para información general de la empresa. Nunca envíe por este medio historias clínicas, diagnósticos, resultados de baterías de riesgo psicosocial u otra información sensible. Esa información se gestiona únicamente por los canales confidenciales que el profesional a cargo le indique directamente.',
  },
  {
    pregunta: '¿La información del sitio reemplaza un concepto profesional individual?',
    respuesta:
      'No. Los contenidos de este sitio son orientativos y educativos. No sustituyen el concepto de un contador, médico, psicólogo o abogado sobre el caso particular de su empresa.',
  },
] as const;
