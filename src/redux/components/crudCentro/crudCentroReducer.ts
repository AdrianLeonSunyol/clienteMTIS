import { 
    READ_CENTROS_SUCCESS,
    CREATE_CENTRO_SUCCESS,
    DELETE_ALL_CENTRO_SUCCESS,
    UPDATE_CENTRO_SUCCESS,
    READ_CENTRO_SUCCESS,
    CENTRO_ERROR,
    DELETE_CENTRO_SUCCESS
} from "../../types";
import { crudCentroState } from "./";


/**
 * Remember
 * Everything you send as a reducer it becomes in the new state
 * @param state New state
 * @param action Action applied
 */
export function crudCentroReducer(state: any = crudCentroState, action: any) {
    switch(action.type) {
        case READ_CENTROS_SUCCESS: 
            return {
                centros: action.centros,
                message: action.message
            }
        case CREATE_CENTRO_SUCCESS:
            return {
                centros: [
                    ...state.centros,
                    {
                        ...action.centro
                    }
                ],
                message: action.message
            }
        case DELETE_CENTRO_SUCCESS:
            return {
                centros: state.centros.filter(centro => centro._id !== action.id),
                message: action.message
            }
        case DELETE_ALL_CENTRO_SUCCESS:
            return {
                centros: [],
                message: action.message
            }
        case CENTRO_ERROR:
            return {
                centros: {
                    ...state.centros
                },
                message: action.message
            }
        default:
            return state;
    }
}