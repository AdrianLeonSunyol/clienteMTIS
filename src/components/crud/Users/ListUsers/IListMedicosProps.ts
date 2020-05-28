import { IUser, UserOperationCallback } from "../../../../models";

export interface IListMedicosProps {
    usuarios: any;
    onRemoveUser: UserOperationCallback;
    onEditUser: UserOperationCallback;
}