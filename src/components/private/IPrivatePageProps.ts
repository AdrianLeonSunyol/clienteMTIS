import { IUser } from "../../models";
import { IService } from "../../services";

export interface IPrivatePageProps {
    user: IUser,
    servicios: {servicio: IService, tipo: string}[]
}