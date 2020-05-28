import { IUser } from "./interfaces/IUser";
import { IModel } from "./interfaces";

export class Admin implements IUser, IModel {
    _id: string;
    nombre: string;
    apellido: string;
    email: string;
    dni: string;
    direccion: string;
    tipo: string;
    password?: string | undefined;

    constructor(
        _id: string = "", nombre: string = "", 
        apellido: string = "", email: string = "", 
        dni: string = "", direccion: string = "", 
        tipo: string = "", password?: string ) {
            this._id = _id;
            this.nombre = nombre;
            this.apellido = apellido;
            this.email = email;
            this.dni = dni;
            this.direccion = direccion;
            this.tipo = tipo;
            this.password = password;
        }
}