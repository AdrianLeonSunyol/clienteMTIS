import { Centro, UserOperationCallback } from "../../../../models";

export interface IListCentroProps {
    centros: Centro[];
    onRemoveCentro: UserOperationCallback;
    onEditCentro: UserOperationCallback;
    
}