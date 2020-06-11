import { Paquete } from "../../models/PaqueteModel";
import { Usuario, PaqueteOperationCallback } from "../../models";
import { IService, ApiService } from "../../services";

export interface IPaqueteComponentProps {
  usuario: Usuario;
  paquetes: Paquete[];
  servicios: { servicio: IService, tipo: string }[];
  paquete;
  messagePaquete
  paqueteActions: {
    updatePaquete(service: IService, idPaquete: string, accion: string);
    loadPaquete(service: ApiService, idPaquete: string);
  }
  ok: any;
}