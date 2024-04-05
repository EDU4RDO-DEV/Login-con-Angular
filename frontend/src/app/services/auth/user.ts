// Definir la interfaz de usuario. Los campos con el simbolo de interrogación son opcionales.
export interface User {
    id: number;
    name?: string;
    lastName?: string;
    email: string;
    message?: string;
}