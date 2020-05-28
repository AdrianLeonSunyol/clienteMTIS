import { Paciente, Centro, Medico, IUser } from "../../models";

export interface IAdminPageState {
    centros: Centro[];
    pacientes: Paciente[];
    medicos: Medico[];
    usuario: IUser;
    centro: Centro;
    loadCentros: Boolean;
}