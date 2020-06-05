import { Paquete } from "../../models/PaqueteModel";
import { IUser } from "../../models";

export interface IPaqueteComponentState {
  usuario: IUser;
  paquetes: Paquete[]
}