import { Usuario, Centro, Medico, IUser } from "../../models";

export interface IAdminPageState {
  centros: Centro[];
  pacientes: Usuario[];
  medicos: Medico[];
  usuario: IUser;
  centro: Centro;
  loadCentros: Boolean;
}