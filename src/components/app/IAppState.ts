import { LoginService, IService } from "../../services";
import { IUser, UserFactory } from "../../models";

export interface IAppState {
    login: LoginService;
    user: IUser;
}