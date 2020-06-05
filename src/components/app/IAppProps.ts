import { LoginService, IService, ApiService } from "../../services";
import { IUser, Usuario } from "../../models";
import { Paquete } from "../../models/PaqueteModel";
import { IPackage } from "../../models/interfaces/IPackage";

export interface IAppProps {
  isAuthenticated;
  isAuthenticatedFirstTime;
  message;
  efectiveDone;
  user;
  paquetes: IPackage[];
  servicios: { servicio: IService, tipo: string }[];
  actions: {
    loginUser(login: LoginService, email: string, password: string);
    registerUser(login: LoginService, user: Usuario);
    logoutUser();
    loadUser();
  }
}
