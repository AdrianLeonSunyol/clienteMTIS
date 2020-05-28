import { UserOperationCallback, Centro, IUser } from "../../../../../models";

export interface ICreateMedicoProps {
    onCreateUser: UserOperationCallback;
    usuario: IUser;
    centros: Centro[];
    centrosActions: {
        loadCentros();
    };
}