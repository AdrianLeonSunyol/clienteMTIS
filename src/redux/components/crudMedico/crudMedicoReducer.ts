import { 
    READ_MEDICOS_SUCCESS,
    CREATE_MEDICO_SUCCESS,
    DELETE_ALL_MEDICO_SUCCESS,
    UPDATE_MEDICO_SUCCESS,
    READ_MEDICO_SUCCESS,
    MEDICO_ERROR,
    DELETE_MEDICO_SUCCESS
} from "../../types";
import { crudMedicoState } from "./";


/**
 * Remember
 * Everything you send as a reducer it becomes in the new state
 * @param state New state
 * @param action Action applied
 */

export function crudMedicoReducer(state: any = crudMedicoState, action: any) {
    switch(action.type) {
        case READ_MEDICOS_SUCCESS: 
            return {
                medicos: action.medicos,
                message: action.message
            }
        case CREATE_MEDICO_SUCCESS:
            return {
                medicos: [
                    ...state.medicos,
                    {
                        ...action.medico
                    }
                ],
                message: action.message
            }
        case DELETE_ALL_MEDICO_SUCCESS:
            return {
                medicos: [],
                message: action.message
            }
        case DELETE_MEDICO_SUCCESS:
            return {
                medicos: state.medicos.filter(medico => medico._id !== action.id),
                message: action.message
            }
        case MEDICO_ERROR:
            return {
                medicos: { ...state.medicos },
                message: action.message
            }
        default:
            return state;
    }
}