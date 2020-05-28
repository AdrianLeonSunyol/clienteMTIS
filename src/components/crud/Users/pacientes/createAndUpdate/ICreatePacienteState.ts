import { Centro } from "../../../../../models";
import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

export interface ICreatePacienteState {
    user: any;
    centros: Centro[];
    options: IDropdownOption[];
    selected_option: IDropdownOption;
}