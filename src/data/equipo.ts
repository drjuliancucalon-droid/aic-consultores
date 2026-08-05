// No se inventan credenciales, experiencia ni testimonios más allá de lo
// confirmado en el portafolio profesional real de la empresa.

export type MiembroEquipo = {
  id: string;
  nombre: string;
  rol: string;
  area: 'contable' | 'sgsst' | 'psicosocial' | 'medicina-general';
  matricula?: string;
  enfoque: string;
  modalidad?: string;
  contacto?: { correo?: string; telefono?: string };
  foto: string;
};

export const equipo: MiembroEquipo[] = [
  {
    id: 'julian-cucalon',
    nombre: 'Julián Andrés Cucalón Jurado',
    rol: 'Médico laboral y especialista en SG-SST',
    area: 'sgsst',
    matricula: 'RM 14497-12-2019',
    enfoque:
      'Evaluaciones médicas ocupacionales (ingreso, periódicas, egreso, post-incapacidad), conceptos de aptitud, remisiones médicas e implementación de Sistemas de Gestión de Seguridad y Salud en el Trabajo bajo el marco de la Resolución 1843 de 2025, la Resolución 0312 de 2019 y el Decreto 1072 de 2015.',
    modalidad: 'Atención extramural (in situ en la empresa o punto acordado)',
    contacto: { correo: 'dr.juliancucalon@gmail.com', telefono: '3182213979' },
    foto: '/images/equipo/julian-cucalon.png',
  },
  {
    id: 'john-cucalon',
    nombre: 'John Cucalón',
    rol: 'Médico General',
    area: 'medicina-general',
    enfoque:
      'Consulta médica general y certificados de aptitud general, dentro del marco de habilitación de servicios de salud (Resolución 3100 de 2019).',
    contacto: { correo: 'johncu_2@hotmail.com', telefono: '3104906200' },
    foto: '/images/equipo/john-cucalon.png',
  },
  {
    id: 'ana-deiba-jurado',
    nombre: 'Ana Deiba Jurado',
    rol: 'Psicóloga Laboral / SG-SST',
    area: 'psicosocial',
    enfoque:
      'Aplicación e interpretación de la batería de riesgo psicosocial (Resolución 2646 de 2008 y Resolución 2764 de 2022), diseño de planes de intervención y acompañamiento en SG-SST.',
    contacto: { correo: 'anadeibajurado@hotmail.com', telefono: '3154872155' },
    foto: '/images/equipo/ana-deiba-jurado.png',
  },
  {
    id: 'fernando-cucalon',
    nombre: 'Fernando Cucalón',
    rol: 'Contador Público Titulado',
    area: 'contable',
    enfoque: 'Contabilidad general y financiera, gestión tributaria y trámites ante entidades de control.',
    contacto: { correo: 'fecusan1961@gmail.com', telefono: '3155799713' },
    foto: '/images/equipo/fernando-cucalon.png',
  },
  {
    id: 'liliana-jurado',
    nombre: 'Liliana Jurado',
    rol: 'Contadora Pública Titulada',
    area: 'contable',
    enfoque: 'Contabilidad general y financiera, gestión tributaria y trámites ante entidades de control.',
    contacto: { correo: 'martha02jurado@gmail.com', telefono: '3216944658' },
    foto: '/images/equipo/liliana-jurado.png',
  },
  {
    id: 'anddry-burbano',
    nombre: 'Anddry Burbano',
    rol: 'Contadora Pública Titulada',
    area: 'contable',
    enfoque: 'Contabilidad general y financiera, gestión tributaria y trámites ante entidades de control.',
    contacto: { correo: 'burbanoanddry@gmail.com', telefono: '3227768948' },
    foto: '/images/equipo/anddry-burbano.png',
  },
];
