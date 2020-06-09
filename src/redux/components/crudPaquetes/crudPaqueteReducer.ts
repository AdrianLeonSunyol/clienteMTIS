import {
  LOAD_PAQUETES_FAILURE,
  LOAD_PAQUETES_REQUEST,
  LOAD_PAQUETES_SUCCESS,
  LOAD_PAQUETE_FAILURE,
  LOAD_PAQUETE_REQUEST,
  LOAD_PAQUETE_SUCCESS,
  CHANGE_PAQUETE_STATE_FAILURE,
  CHANGE_PAQUETE_STATE_REQUEST,
  CHANGE_PAQUETE_STATE_SUCCESS,
  PRESUPUESTO_REQUEST,
  PRESUPUESTO_SUCCESS,
  PRESUPUESTO_FAILURE,
  PAGAR_REQUEST,
  PAGAR_FAILURE,
  PAGAR_SUCCESS
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
    case CHANGE_PAQUETE_STATE_REQUEST:
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
    case CHANGE_PAQUETE_STATE_SUCCESS:
      return {
        ...state,
        messagePaquete: action.messagePaquete,
        ok: action.ok
      }
    case PRESUPUESTO_REQUEST:
      return {
        ...state,
        messagePaquete: action.messagePaquete,
        ok: action.ok
      }
    case PRESUPUESTO_SUCCESS:
      return {
        ...state,
        messagePaquete: action.messagePaquete,
        ok: action.ok,
        presupuesto: action.presupuesto
      }
    case PRESUPUESTO_FAILURE:
      return {
        ...state,
        messagePaquete: action.messagePaquete,
        ok: action.ok
      }
    case PAGAR_REQUEST:
      return {
        ...state,
        messagePaquete: action.messagePaquete,
        ok: action.ok,
        pagado: action.pagado,
      }
    case PAGAR_SUCCESS:
      return {
        ...state,
        messagePaquete: action.messagePaquete,
        ok: action.ok,
        pagado: action.pagado,
        identificador: action.identificador
      }
    case PAGAR_FAILURE:
      return {
        ...state,
        messagePaquete: action.messagePaquete,
        ok: action.ok,
        pagado: action.pagado
      }
    case CHANGE_PAQUETE_STATE_FAILURE:
      return {
        ...state,
        messagePaquete: action.messagePaquete,
        ok: action.ok
      }
    default:
      return state;
  }
}