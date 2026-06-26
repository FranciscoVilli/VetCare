export interface Sede {
  codigo: string;
  nombre: string;
  ciudad: string;
  direccion: string;
}

export interface Mascota {
  codigo: string;
  nombre: string;
  especie: string;
  raza: string;
  fechaNacimiento: string;
  duenoCedula: string;
  sedeCodigo: string;
}

export interface Veterinario {
  cedula: string;
  nombre: string;
  telefono: string;
  especialidad: string;
  estado: 'Activo' | 'Inactivo';
  sedeCodigo: string;
}

export interface Dueno {
  cedula: string;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  ciudad: string;
  sedeCodigo: string;
}

export interface Consulta {
  codigo: string;
  fecha: string;
  hora: string;
  motivo: string;
  diagnostico: string;
  tratamiento: string;
  veterinarioCedula: string;
  mascotaCodigo: string;
  sedeCodigo: string;
}

export interface Examen {
  codigo: string;
  tipo: string;
  descripcion: string;
  resultado: string;
  fecha: string;
  observaciones: string;
  consultaCodigo: string;
}

export type NodeKey = 'quito' | 'cuenca';

export const sedes: Sede[] = [
  { codigo: 'S001', nombre: 'VetCare Quito Norte', ciudad: 'Quito', direccion: 'Av. Amazonas N45-678 y Pereira' },
  { codigo: 'S002', nombre: 'VetCare Cuenca Centro', ciudad: 'Cuenca', direccion: 'Calle Gran Colombia 12-45 y Benigno Malo' },
];

export const mascotas: Record<NodeKey, Mascota[]> = {
  quito: [
    { codigo: 'M001', nombre: 'Max', especie: 'Perro', raza: 'Labrador', fechaNacimiento: '2020-03-15', duenoCedula: 'D001', sedeCodigo: 'S001' },
    { codigo: 'M002', nombre: 'Luna', especie: 'Gato', raza: 'Persa', fechaNacimiento: '2021-07-22', duenoCedula: 'D002', sedeCodigo: 'S001' },
    { codigo: 'M003', nombre: 'Rocky', especie: 'Perro', raza: 'Pastor Alemán', fechaNacimiento: '2019-11-08', duenoCedula: 'D003', sedeCodigo: 'S001' },
    { codigo: 'M004', nombre: 'Mia', especie: 'Gato', raza: 'Siamés', fechaNacimiento: '2022-01-30', duenoCedula: 'D004', sedeCodigo: 'S001' },
    { codigo: 'M005', nombre: 'Toby', especie: 'Perro', raza: 'Beagle', fechaNacimiento: '2021-09-14', duenoCedula: 'D005', sedeCodigo: 'S001' },
  ],
  cuenca: [
    { codigo: 'M006', nombre: 'Bella', especie: 'Perro', raza: 'Golden Retriever', fechaNacimiento: '2020-05-20', duenoCedula: 'D006', sedeCodigo: 'S002' },
    { codigo: 'M007', nombre: 'Cleo', especie: 'Gato', raza: 'Maine Coon', fechaNacimiento: '2021-12-10', duenoCedula: 'D007', sedeCodigo: 'S002' },
    { codigo: 'M008', nombre: 'Bruno', especie: 'Perro', raza: 'Bulldog', fechaNacimiento: '2019-08-25', duenoCedula: 'D008', sedeCodigo: 'S002' },
    { codigo: 'M009', nombre: 'Nala', especie: 'Gato', raza: 'Bengalí', fechaNacimiento: '2022-04-17', duenoCedula: 'D009', sedeCodigo: 'S002' },
  ],
};

export const veterinarios: Record<NodeKey, Veterinario[]> = {
  quito: [
    { cedula: 'V001', nombre: 'Dr. Carlos Mejía', telefono: '0987-654-321', especialidad: 'Medicina General', estado: 'Activo', sedeCodigo: 'S001' },
    { cedula: 'V002', nombre: 'Dra. Ana Torres', telefono: '0976-543-210', especialidad: 'Cirugía', estado: 'Activo', sedeCodigo: 'S001' },
    { cedula: 'V003', nombre: 'Dr. Luis Pazmiño', telefono: '0965-432-109', especialidad: 'Dermatología', estado: 'Activo', sedeCodigo: 'S001' },
  ],
  cuenca: [
    { cedula: 'V004', nombre: 'Dra. María Vintimilla', telefono: '0954-321-098', especialidad: 'Medicina General', estado: 'Activo', sedeCodigo: 'S002' },
    { cedula: 'V005', nombre: 'Dr. Pablo Crespo', telefono: '0943-210-987', especialidad: 'Ortopedia', estado: 'Activo', sedeCodigo: 'S002' },
    { cedula: 'V006', nombre: 'Dra. Carmen Orellana', telefono: '0932-109-876', especialidad: 'Cardiología', estado: 'Inactivo', sedeCodigo: 'S002' },
  ],
};

export const duenos: Record<NodeKey, Dueno[]> = {
  quito: [
    { cedula: 'D001', nombre: 'Roberto', apellido: 'Andrade', telefono: '099-123-4567', correo: 'roberto.andrade@email.com', ciudad: 'Quito', sedeCodigo: 'S001' },
    { cedula: 'D002', nombre: 'Patricia', apellido: 'Salazar', telefono: '098-234-5678', correo: 'patricia.salazar@email.com', ciudad: 'Quito', sedeCodigo: 'S001' },
    { cedula: 'D003', nombre: 'Fernando', apellido: 'Hidalgo', telefono: '097-345-6789', correo: 'f.hidalgo@email.com', ciudad: 'Sangolquí', sedeCodigo: 'S001' },
    { cedula: 'D004', nombre: 'Gabriela', apellido: 'Mora', telefono: '096-456-7890', correo: 'gmora@email.com', ciudad: 'Quito', sedeCodigo: 'S001' },
    { cedula: 'D005', nombre: 'Andrés', apellido: 'Vega', telefono: '095-567-8901', correo: 'andres.vega@email.com', ciudad: 'Quito', sedeCodigo: 'S001' },
  ],
  cuenca: [
    { cedula: 'D006', nombre: 'Isabel', apellido: 'Moscoso', telefono: '094-678-9012', correo: 'i.moscoso@email.com', ciudad: 'Cuenca', sedeCodigo: 'S002' },
    { cedula: 'D007', nombre: 'Rodrigo', apellido: 'Astudillo', telefono: '093-789-0123', correo: 'r.astudillo@email.com', ciudad: 'Azogues', sedeCodigo: 'S002' },
    { cedula: 'D008', nombre: 'Verónica', apellido: 'Lojano', telefono: '092-890-1234', correo: 'vlojano@email.com', ciudad: 'Cuenca', sedeCodigo: 'S002' },
    { cedula: 'D009', nombre: 'David', apellido: 'Pulla', telefono: '091-901-2345', correo: 'd.pulla@email.com', ciudad: 'Cuenca', sedeCodigo: 'S002' },
  ],
};

export const consultas: Record<NodeKey, Consulta[]> = {
  quito: [
    { codigo: 'C001', fecha: '2026-06-10', hora: '09:00', motivo: 'Vacunación anual', diagnostico: 'Mascota sana', tratamiento: 'Vacuna polivalente', veterinarioCedula: 'V001', mascotaCodigo: 'M001', sedeCodigo: 'S001' },
    { codigo: 'C002', fecha: '2026-06-12', hora: '10:30', motivo: 'Herida en pata', diagnostico: 'Laceración leve', tratamiento: 'Limpieza y antibióticos', veterinarioCedula: 'V002', mascotaCodigo: 'M003', sedeCodigo: 'S001' },
    { codigo: 'C003', fecha: '2026-06-15', hora: '14:00', motivo: 'Control de peso', diagnostico: 'Sobrepeso leve', tratamiento: 'Dieta especial', veterinarioCedula: 'V001', mascotaCodigo: 'M002', sedeCodigo: 'S001' },
    { codigo: 'C004', fecha: '2026-06-18', hora: '11:00', motivo: 'Desparasitación', diagnostico: 'Parásitos internos', tratamiento: 'Antiparasitarios', veterinarioCedula: 'V003', mascotaCodigo: 'M005', sedeCodigo: 'S001' },
  ],
  cuenca: [
    { codigo: 'C005', fecha: '2026-06-11', hora: '08:30', motivo: 'Revisión general', diagnostico: 'Estado óptimo', tratamiento: 'Ninguno', veterinarioCedula: 'V004', mascotaCodigo: 'M006', sedeCodigo: 'S002' },
    { codigo: 'C006', fecha: '2026-06-14', hora: '15:00', motivo: 'Cojera', diagnostico: 'Esguince leve', tratamiento: 'Reposo y antiinflamatorios', veterinarioCedula: 'V005', mascotaCodigo: 'M008', sedeCodigo: 'S002' },
    { codigo: 'C007', fecha: '2026-06-20', hora: '09:30', motivo: 'Dermatitis', diagnostico: 'Alergia alimentaria', tratamiento: 'Cambio de dieta + crema tópica', veterinarioCedula: 'V004', mascotaCodigo: 'M007', sedeCodigo: 'S002' },
  ],
};

export const examenes: Examen[] = [
  { codigo: 'E001', tipo: 'Hematología', descripcion: 'Hemograma completo', resultado: 'Normal', fecha: '2026-06-10', observaciones: 'Todos los valores dentro del rango normal', consultaCodigo: 'C001' },
  { codigo: 'E002', tipo: 'Radiografía', descripcion: 'Rx de pata delantera izquierda', resultado: 'Fractura hairline', fecha: '2026-06-12', observaciones: 'Requiere seguimiento en 2 semanas', consultaCodigo: 'C002' },
  { codigo: 'E003', tipo: 'Ecografía', descripcion: 'Ecografía abdominal', resultado: 'Sin alteraciones', fecha: '2026-06-15', observaciones: 'Órganos abdominales normales', consultaCodigo: 'C003' },
  { codigo: 'E004', tipo: 'Coprológico', descripcion: 'Análisis de materia fecal', resultado: 'Positivo para áscaris', fecha: '2026-06-18', observaciones: 'Iniciar tratamiento antiparasitario', consultaCodigo: 'C004' },
];
