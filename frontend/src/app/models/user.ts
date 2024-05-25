// Definir la interfaz de usuario. Los campos con el simbolo de interrogación son opcionales.
export interface User {
    id_usuario: number;
    id_detalle_persona: number;
    correo_institucional: string;
    clave: string;
    fecha_creacion: string;
    ultima_conexion: string;
    estado: string;
    token?: string;
}