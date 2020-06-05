import { IUser } from "./interfaces/IUser";
import { IModel } from "./interfaces";
import { IPackage } from "./interfaces/IPackage";
import { Paquete } from "./PaqueteModel";

export class Usuario implements IUser, IModel {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  tipo: string;
  password?: string;
  direccion: string;
  fechaNacimiento: string;
  provincia: string;
  localidad: string;
  cp: string;
  disponible: boolean;

  constructor(
    id: string = "", nombre: string = "",
    apellidos: string = "", email: string = "",
    tipo: string = "", password?: string,
    direccion: string = "", fechaNacimiento: string = "",
    provincia: string = "", cp: string = "", localidad: string = "",
    disponible: boolean = false
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.email = email;
    this.tipo = tipo;
    this.password = password;
    this.direccion = direccion;
    this.fechaNacimiento = fechaNacimiento;
    this.provincia = provincia;
    this.cp = cp;
    this.localidad = localidad;
    this.disponible = disponible;
  }
}