import {
  LOAD_PAQUETES_FAILURE,
  LOAD_PAQUETES_REQUEST,
  LOAD_PAQUETES_SUCCESS,
  LOAD_PAQUETE_FAILURE,
  LOAD_PAQUETE_REQUEST,
  LOAD_PAQUETE_SUCCESS,
  CHANGE_PAQUETE_STATE_FAILURE,
  CHANGE_PAQUETE_STATE_REQUEST,
  CHANGE_PAQUETE_STATE_SUCCESS
} from "../../types";
import { crudPaqueteState } from ".";


/**
 * Remember
 * Everything you send as a reducer it becomes in the new state
 * @param state New state
 * @param action Action applied
 */
export function crudPaqueteReducer(state: any = crudPaqueteState, action: any) {
  switch (action.type) {
    case LOAD_PAQUETE_FAILURE:
      return {
        ...state,
        messagePaquete: action.messagePaquete,
        ok: action.ok
      }
    case LOAD_PAQUETE_REQUEST:
      return {
        ...state,
        messagePaquete: action.messagePaquete,
        ok: action.ok
      }
    case LOAD_PAQUETE_SUCCESS:
      return {
        ...state,
        messagePaquete: action.messagePaquete,
        paquete: action.paquete,
        ok: action.ok
      }
    default:
      return state;
  }
}