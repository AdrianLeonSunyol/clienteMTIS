import { IUser } from "./interfaces/IUser";
import { IModel } from "./interfaces";
import { IPackage } from "./interfaces/IPackage";
import { Paquete } from "./PaqueteModel";

export class Admin implements IUser, IModel {
  _id: string;
  nombre: string;
  apellido: string;
  email: string;
  dni: string;
  direccion: string;
  tipo: string;
  password?: string;
  localidad: string;
  provincia: string;
  fechaNacimiento: string;
  cp: string;
  paquetes: IPackage[];

  constructor(
    _id: string = "", nombre: string = "",
    apellido: string = "", email: string = "",
    dni: string = "", direccion: string = "",
    tipo: string = "", password?: string,
    localidad: string = "", provincia: string = "",
    fechaNacimineto: string = "", cp: string = "",
    paquetes: IPackage[] = []
  ) {
    this._id = _id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.dni = dni;
    this.direccion = direccion;
    this.tipo = tipo;
    this.password = password;
    this.localidad = localidad;
    this.provincia = provincia;
    this.fechaNacimiento = fechaNacimineto;
    this.cp = cp;
    this.paquetes = paquetes;
  }
}