import { Estado } from "../EstadoEnum";

export interface IPackage {
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
}