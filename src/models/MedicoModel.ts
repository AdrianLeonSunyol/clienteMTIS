import { IUser } from "./interfaces/IUser";
import { IModel } from "./interfaces";

export class Medico implements IUser, IModel {
    _id: string;
    nombre: string;
    apellido: string;
    email: string;
    tipo: string;
    centro: string | undefined;
    password: string | undefined;

    constructor(
        _id: string = "", nombre: string = "", 
        apellido: string = "", email: string = "", 
        tipo: string = "", centro?: string, password?: string) {
            this._id = _id;
            this.nombre = nombre;
            this.apellido = apellido;
            this.email = email;
            this.tipo = tipo;
            this.centro = centro;
            this.password = password;
        }
}