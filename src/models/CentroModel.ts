import { Usuario } from "./UsuarioModel";
import { Medico } from "./MedicoModel";
import { IModel } from "./interfaces";

export class Centro implements IModel {
  _id: string;
  nombre: string;
  pacientes: Usuario[];
  medicos: Medico[];

  constructor(
    _id: string = "", nombre: string = "",
    pacientes: Usuario[] = [{
      _id: "",
      nombre: "",
      apellido: "",
      email: "",
      tipo: "",
      dni: "",
      password: "",
      direccion: "",
    }], medicos: Medico[] = [{
      _id: "",
      nombre: "",
      apellido: "",
      email: "",
      tipo: "",
      centro: "",
      password: "",
      direccion: ""
    }]
  ) {
    this._id = _id;
    this.nombre = nombre;
    this.pacientes = pacientes;
    this.medicos = medicos;
  }
}