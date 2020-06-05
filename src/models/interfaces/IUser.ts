import { IPackage } from "./IPackage";

export interface IUser {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  tipo: string;
  password?: string;
  direccion: string;
  localidad: string;
  provincia: string;
  fechaNacimiento: string;
  cp: string;
  disponible: boolean;
}