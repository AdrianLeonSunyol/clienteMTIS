import { LoginService, IService } from "../../services";
import { IUser, UserFactory, Usuario } from "../../models";

export interface IAppState {
  login: LoginService;
  user: IUser;
}