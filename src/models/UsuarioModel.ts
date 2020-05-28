import { IUser } from "./interfaces/IUser";
import { IModel } from "./interfaces";

export class Usuario implements IUser, IModel {
  _id: string;
  nombre: string;
  apellido: string;
  email: string;
  tipo: string;
  password: string | undefined;
  direccion: string;
  fechaNacimiento: string;
  provincia: string;
  localidad: string;
  cp: string;

  constructor(
    _id: string = "", nombre: string = "",
    apellido: string = "", email: string = "",
    tipo: string = "",
    password?: string, centro?: string,
    direccion: string = "", fechaNacimiento: string = "",
    provincia: string = "", cp: string = "", localidad: string = ""
  ) {
    this._id = _id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.tipo = tipo;
    this.password = password;
    this.direccion = direccion;
    this.fechaNacimiento = fechaNacimiento;
    this.provincia = provincia;
    this.cp = cp;
    this.localidad = localidad;
  }
}