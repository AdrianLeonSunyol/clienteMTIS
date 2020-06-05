import { LoginService, IService } from "../../services";
import { IUser, UserFactory, Usuario } from "../../models";
import { Paquete } from "../../models/PaqueteModel";

export interface IAppState {
  login: LoginService;
  user: IUser;
  paquete: Paquete;
  paquetes: Paquete[];
  servicios: { servicio: IService, tipo: string }[];
}