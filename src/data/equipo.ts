// No se inventan credenciales, experiencia ni testimonios. Los perfiles sin
// información confirmada quedan marcados como PLACEHOLDER para completarse
// con los datos reales de cada profesional antes de publicar.

export type MiembroEquipo = {
  id: string;
  nombre: string;
  rol: string;
  area: 'contable-tributario' | 'sgsst' | 'psicosocial' | 'tecnologia';
  matricula?: string;
  enfoque: string;
  modalidad?: string;
  contacto?: { correo?: string; telefono?: string };
  placeholder?: boolean;
};

export const equipo: MiembroEquipo[] = [
  {
    id: 'medico-laboral-sst',
    nombre: 'Julián Andrés Cucalón Jurado',
    rol: 'Médico laboral y especialista en SG-SST',
    area: 'sgsst',
    matricula: 'RM 14497-12-2019',
    enfoque:
      'Evaluaciones médicas ocupacionales (ingreso, periódicas, egreso, post-incapacidad), conceptos de aptitud, remisiones médicas e implementación de Sistemas de Gestión de Seguridad y Salud en el Trabajo bajo el marco de la Resolución 1843 de 2025, la Resolución 0312 de 2019 y el Decreto 1072 de 2015.',
    modalidad: 'Atención extramural (in situ en la empresa o punto acordado)',
    contacto: { correo: 'dr.juliancucalon@gmail.com', telefono: '3182213979' },
  },
  {
    id: 'contador-tributario',
    nombre: 'Nombre por definir',
    rol: 'Contador(a) público(a) — outsourcing contable y tributario',
    area: 'contable-tributario',
    matricula: undefined,
    enfoque: 'Perfil profesional pendiente de definir.',
    placeholder: true,
  },
  {
    id: 'psicologa-organizacional',
    nombre: 'Nombre por definir',
    rol: 'Psicólogo(a) organizacional — riesgo psicosocial',
    area: 'psicosocial',
    matricula: undefined,
    enfoque: 'Perfil profesional pendiente de definir.',
    placeholder: true,
  },
  {
    id: 'responsable-tecnologico',
    nombre: 'Nombre por definir',
    rol: 'Responsable de automatización administrativa',
    area: 'tecnologia',
    enfoque: 'Perfil profesional pendiente de definir.',
    placeholder: true,
  },
];
