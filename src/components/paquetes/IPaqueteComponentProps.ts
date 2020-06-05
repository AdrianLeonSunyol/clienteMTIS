import { Paquete } from "../../models/PaqueteModel";
import { Usuario, PaqueteOperationCallback } from "../../models";

export interface IPaqueteComponentProps {
  usuario: Usuario;
  paquetes: Paquete[];
}