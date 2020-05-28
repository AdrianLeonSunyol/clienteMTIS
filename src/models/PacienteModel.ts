import { IUser } from "./interfaces/IUser";
import { IModel } from "./interfaces";

export class Paciente implements IUser, IModel {
    _id: string;
    nombre: string;
    apellido: string;
    email: string;
    dni: string;
    tipo: string;
    password: string | undefined;
    centro: string | undefined;
    //image: String;

    constructor(
        _id: string = "", nombre: string = "", 
        apellido: string = "", email: string = "", 
        dni: string = "", tipo: string = "",
        password?: string, centro?: string) {
            this._id = _id;
            this.nombre = nombre;
            this.apellido = apellido;
            this.email = email;
            this.dni = dni;
            this.tipo = tipo;
            this.password = password;
            this.centro = centro;
        }
}