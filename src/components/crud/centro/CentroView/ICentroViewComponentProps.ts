import { UserOperationCallback, Centro } from "../../../../models";

export interface ICentroViewComponentProps {
    centro: Centro;
    onRemoveCentro: UserOperationCallback;
    onEditCentro: UserOperationCallback;
}