import { 
    READ_PACIENTES_SUCCESS,
    CREATE_PACIENTE_SUCCESS,
    DELETE_ALL_PACIENTE_SUCCESS,
    UPDATE_PACIENTE_SUCCESS,
    READ_PACIENTE_SUCCESS,
    PACIENTE_ERROR,
    DELETE_PACIENTE_SUCCESS
} from "../../types";
import { crudPacienteState } from "./";


/**
 * Remember
 * Everything you send as a reducer it becomes in the new state
 * @param state New state
 * @param action Action applied
 */
export function crudPacienteReducer(state: any = crudPacienteState, action: any) {
    switch(action.type) {
        case READ_PACIENTES_SUCCESS: 
            return {
                pacientes: action.pacientes,
                message: action.message
            }
        case CREATE_PACIENTE_SUCCESS:
            return {
                pacientes: [
                    ...state.pacientes,
                    {
                        ...action.CENTRO
                    }
                ],
                message: action.message
            }
        case DELETE_ALL_PACIENTE_SUCCESS:
            return {
                pacientes: [],
                message: action.message
            }
        case DELETE_PACIENTE_SUCCESS:
            return {
                pacientes: state.pacientes.filter(paciente => paciente._id !== action.id),
                message: action.message
            }
        case PACIENTE_ERROR:
            return {
                pacientes: { ...state.pacientes },
                message: action.message
            }
        default:
            return state;
    }
}