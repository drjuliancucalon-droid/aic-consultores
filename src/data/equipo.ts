// Equipo profesional de AIC Consultores.
// Datos verificados contra el portafolio profesional de la firma.

export type MiembroEquipo = {
  id: string;
  nombre: string;
  rol: string;
  area: 'contable-tributario' | 'sgsst' | 'psicosocial' | 'medicina-laboral' | 'medicina-general';
  matricula?: string;
  enfoque: string;
  modalidad?: string;
  contacto?: { correo?: string; telefono?: string };
  placeholder?: boolean;
};

export const equipo: MiembroEquipo[] = [
  {
    id: 'fernando-cucalon',
    nombre: 'Fernando Cucalón',
    rol: 'Contador Público Titulado',
    area: 'contable-tributario',
    enfoque:
      'Outsourcing contable, elaboración de estados financieros bajo NIIF, depuración y conciliación de cuentas, implementación de software contable en la nube (Siigo, Delta) y asesoría en manejo de inventarios.',
    contacto: { correo: 'fecusan1961@gmail.com', telefono: '3155799713' },
  },
  {
    id: 'liliana-jurado',
    nombre: 'Liliana Jurado',
    rol: 'Contadora Pública Titulada',
    area: 'contable-tributario',
    enfoque:
      'Liquidación de impuestos nacionales y territoriales (IVA, Retención en la Fuente, ICA, Declaración de Renta), planeación tributaria, atención a requerimientos ante la DIAN, información exógena y actualización del RUT.',
    contacto: { correo: 'martha02jurado@gmail.com', telefono: '3216944658' },
  },
  {
    id: 'anddry-burbano',
    nombre: 'Anddry Burbano',
    rol: 'Contador Público Titulado',
    area: 'contable-tributario',
    enfoque:
      'Revisoría fiscal y auditoría, evaluación de control interno, dictamen de estados financieros, certificados de ingresos y retenciones, y trámites de resolución de facturación.',
    contacto: { correo: 'burbanoanddry@gmail.com', telefono: '3227768948' },
  },
  {
    id: 'ana-deiba-jurado',
    nombre: 'Ana Deiba Jurado',
    rol: 'Psicóloga Laboral — Especialista en SG-SST',
    area: 'psicosocial',
    enfoque:
      'Aplicación de batería de riesgo psicosocial, pruebas de selección de personal con prueba DICS (Dominancia, Influencia, Estabilidad y Cumplimiento), implementación del Sistema de Gestión de Seguridad y Salud en el Trabajo y prevención de enfermedades laborales.',
    contacto: { correo: 'anadeibajurado@hotmail.com', telefono: '3154872155' },
  },
  {
    id: 'julian-cucalon',
    nombre: 'Julián Cucalón',
    rol: 'Médico Laboral',
    area: 'medicina-laboral',
    matricula: 'RM 14497-12-2019',
    enfoque:
      'Exámenes médicos ocupacionales (ingreso, periódicos, egreso, post-incapacidad), conceptos de aptitud laboral, remisiones médicas y asesoría en la implementación de SG-SST bajo la Resolución 0312 de 2019 y el Decreto 1072 de 2015.',
    modalidad: 'Atención extramural (in situ en la empresa o punto acordado)',
    contacto: { correo: 'jqk3@hotmail.com', telefono: '318223979' },
  },
  {
    id: 'john-cucalon',
    nombre: 'John Cucalón',
    rol: 'Médico General',
    area: 'medicina-general',
    enfoque:
      'Valoraciones médicas ocupacionales de apoyo, exámenes de ingreso y periódicos, y acompañamiento en jornadas de salud laboral para empresas.',
    contacto: { correo: 'johncu_2@hotmail.com', telefono: '3104906200' },
  },
];
