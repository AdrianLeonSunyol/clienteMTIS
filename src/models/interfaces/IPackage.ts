import { Estado } from "../EstadoEnum";

export interface IPackage {
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
}