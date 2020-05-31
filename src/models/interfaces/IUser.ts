import { IPackage } from "./IPackage";

export interface IUser {
  _id: string;
  nombre: string;
  apellido: string;
  email: string;
  tipo: string;
  password?: string;
  direccion: string;
  localidad: string;
  provincia: string;
  fechaNacimiento: string;
  cp: string;
  paquetes: IPackage[];
}