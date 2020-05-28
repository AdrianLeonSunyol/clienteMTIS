import { IUser } from "./interfaces/IUser";
import { IModel } from "./interfaces";

export class Usuario implements IUser, IModel {
  _id: string;
  nombre: string;
  apellido: string;
  email: string;
  dni: string;
  tipo: string;
  password: string | undefined;
  direccion: string;
  //image: String;

  constructor(
    _id: string = "", nombre: string = "",
    apellido: string = "", email: string = "",
    dni: string = "", tipo: string = "",
    password?: string, centro?: string,
    direccion: string = "") {
    this._id = _id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.dni = dni;
    this.tipo = tipo;
    this.password = password;
    this.direccion = direccion;
  }
}