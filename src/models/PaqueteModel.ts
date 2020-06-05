import { IPackage } from "./interfaces/IPackage";
import { Estado } from "./EstadoEnum";

export class Paquete implements IPackage {
  id: string;
  usuario_id: string;
  precio: number;
  peso: number;
  alto: number;
  ancho: number;
  profundo: number;
  origen: string;
  destino: string;
  provincia_origen: string;
  provincia_destino: string;
  localizacion_actual: string;
  direccion_origen: string;
  direccion_destino: string;
  zona: string;
  estado: Estado;
  asignado: boolean;
  id_repartidor: string;

  constructor(
    id: string = "", usuario_id: string = "", id_repartidor: string = "",
    direccion_origen: string = "", precio: number = 0, origen: string = "",
    direccion_destino: string = "", destino: string = "", localizacion_actual: string = "",
    zona: string = "", provincia_origen: string = "", provincia_destino: string = "",
    peso: number = 0, alto: number = 0,
    ancho: number = 0, profundo: number = 0,
    estado: Estado = Estado.SIN_ASIGNAR,
    asignado: boolean = false
  ) {
    this.id = id;
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
    this.precio = precio;
    this.origen = origen;
    this.destino = destino;
    this.provincia_destino = provincia_destino;
    this.provincia_origen = provincia_origen;
    this.localizacion_actual = localizacion_actual;
    this.id_repartidor = id_repartidor;
  }
}