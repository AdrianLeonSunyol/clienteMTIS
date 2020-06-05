import { IUser } from "./interfaces/IUser";
import { IModel } from "./interfaces";
import { IPackage } from "./interfaces/IPackage";
import { Paquete } from "./PaqueteModel";

export class Admin implements IUser, IModel {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  direccion: string;
  tipo: string;
  password?: string;
  localidad: string;
  provincia: string;
  fechaNacimiento: string;
  cp: string;
  disponible: boolean;

  constructor(
    id: string = "", nombre: string = "",
    apellidos: string = "", email: string = "", direccion: string = "",
    tipo: string = "", password?: string,
    localidad: string = "", provincia: string = "",
    fechaNacimineto: string = "", cp: string = "",
    disponible: boolean = false
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.email = email;
    this.direccion = direccion;
    this.tipo = tipo;
    this.password = password;
    this.localidad = localidad;
    this.provincia = provincia;
    this.fechaNacimiento = fechaNacimineto;
    this.cp = cp;
    this.disponible = disponible;
  }
}