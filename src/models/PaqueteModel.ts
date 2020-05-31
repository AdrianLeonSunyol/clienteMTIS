import { IPackage } from "./interfaces/IPackage";
import { Estado } from "./EstadoEnum";

export class Paquete implements IPackage {
  _id: string;
  usuario_id: string;
  direccion_origen: string;
  direccion_destino: string;
  zona: string;
  peso: number;
  alto: number;
  ancho: number;
  profundo: number;
  estado: Estado;
  asignado: boolean;

  constructor(
    _id: string = "", usuario_id: string = "",
    direccion_origen: string = "",
    direccion_destino: string = "",
    zona: string = "",
    peso: number = 0, alto: number = 0,
    ancho: number = 0, profundo: number = 0,
    estado: Estado = Estado.SIN_ASIGNAR,
    asignado: boolean = false
  ) {
    this._id = _id;
    this.usuario_id = usuario_id;
    this.direccion_destino = direccion_destino;
    this.direccion_origen = direccion_origen;
    this.zona = zona;
    this.peso = peso;
    this.alto = alto;
    this.ancho = ancho;
    this.profundo = profundo;
    this.estado = estado;
    this.asignado = asignado;
  }
}