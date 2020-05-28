import { Centro } from "../../../../../models";
import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

export interface ICreateMedicoState {
    user: any;
    centros: Centro[];
    options: IDropdownOption[];
    centro: IDropdownOption;
}