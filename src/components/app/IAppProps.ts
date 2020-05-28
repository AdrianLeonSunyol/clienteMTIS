import { LoginService, IService } from "../../services";
import { IUser, Medico, Paciente, Centro } from "../../models";

export interface IAppProps {
  isAuthenticated;
  isAuthenticatedFirstTime;
  errorMessage;
  user: IUser;
  servicios: { servicio: IService, tipo: string }[];
  actions: {
    loginUser(login: LoginService, email: string, password: string);
    logoutUser();
    loadUser();
  }
}