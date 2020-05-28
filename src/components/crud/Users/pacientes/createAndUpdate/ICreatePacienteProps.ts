import { UserOperationCallback, IUser, Centro } from "../../../../../models";

export interface ICreatePaceinteProps {
    onCreatePaciente: UserOperationCallback;
    usuario: IUser;
    centros: Centro[];
    centrosActions: {
        loadCentros();
    };
}