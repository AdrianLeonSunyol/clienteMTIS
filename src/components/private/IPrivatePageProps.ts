import { IUser, PaqueteOperationCallback } from "../../models";
import { IService } from "../../services";
import { Paquete } from "../../models/PaqueteModel";

export interface IPrivatePageProps {
  user: IUser;
  paquetes: Paquete[];
  servicios: { servicio: IService, tipo: string }[];
}