import { IUser, PaqueteOperationCallback } from "../../models";
import { IService } from "../../services";
import { Paquete } from "../../models/PaqueteModel";

export interface IPrivatePageProps {
  user: IUser;
  servicios: { servicio: IService, tipo: string }[];
  paquetes;
  actions: {
    loadUser();
  }
}
