export interface IUser {
    _id: string;
    nombre: string;
    apellido: string;
    email: string;
    tipo: string;
    password?: string | undefined;
}