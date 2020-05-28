import { UserOperationCallback, Centro } from "../../../../models";

export interface ICreateCentroProps {
    centro: Centro;
    onCreateCentro: UserOperationCallback;
}