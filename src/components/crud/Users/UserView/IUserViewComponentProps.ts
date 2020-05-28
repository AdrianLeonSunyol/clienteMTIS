import { UserOperationCallback, IUser } from "../../../../models";

export interface IUserViewComponentProps {
    user: IUser;
    onRemoveUser: UserOperationCallback;
    onEditUser: UserOperationCallback;
}