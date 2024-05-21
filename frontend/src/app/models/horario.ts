export interface Horario {
  id_horario: number;
  id_curso: number;
  dia: string;
  hora_inicio: string;
  hora_fin: string;
  horario_habilitado: boolean;
  estado: string;
}