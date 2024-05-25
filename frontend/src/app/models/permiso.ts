export interface Permiso {
  id_permiso: number;
  id_estudiante: number;
  id_profesor: number;
  id_coordinador: number;
  motivo: string;
  documento_adjunto: string;
  descripcion: string;
  fecha_solicitud: string;
  fecha_respuesta: string;
  estado: string;
  estado_aceptacion: boolean;
}