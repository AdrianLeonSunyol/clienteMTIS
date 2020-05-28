import { IUser, Medico, Usuario, Centro, IModel } from "../../models";
import { IService, LoginService } from "../../services";

export interface IAdminPageProps {
  //props from father component
  user: IUser;
  paciente_service: IService;
  medico_service: IService;
  centro_service: IService;

  //redux propx
  medicos: Medico[];
  pacientes: Usuario[];
  centros: Centro[];
  message_medico: string;
  message_paciente: string;
  message_centro: string;
  medicosActions: {
    loadMedicos();
    createMedico(user: IModel);
    deleteMedico(id: string);
    deleteAllMedicos();
  };
  pacientesActions: {
    loadPacientes();
    createPaciente(user: IModel);
    deletePaciente(id: string);
    deleteAllPacientes();
  };
  centrosActions: {
    loadCentros();
    createCentro(user: IModel);
    deleteCentro(id: string);
    deleteAllCentros();
  };
}