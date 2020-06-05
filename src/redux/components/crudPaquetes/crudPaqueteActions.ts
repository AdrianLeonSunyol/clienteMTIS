import {
  LOAD_PAQUETES_FAILURE,
  LOAD_PAQUETES_REQUEST,
  LOAD_PAQUETES_SUCCESS,
  CHANGE_PAQUETE_STATE_FAILURE,
  CHANGE_PAQUETE_STATE_REQUEST,
  CHANGE_PAQUETE_STATE_SUCCESS,
  LOAD_PAQUETE_FAILURE,
  LOAD_PAQUETE_REQUEST,
  LOAD_PAQUETE_SUCCESS
} from "../../types";
import { ApiService } from "../../../services";
import { Paquete } from "../../../models/PaqueteModel";

function requestLoadPaquete() {
  return {
    type: LOAD_PAQUETE_REQUEST,
    messagePaquete: 'Petcición de cargar paquete',
    ok: false,
  }
}

function receiveLoadPaquete(paquete: Paquete) {
  return {
    type: LOAD_PAQUETE_SUCCESS,
    messagePaquete: 'Paquete cargado correctamente',
    paquete: paquete,
    ok: true
  }
}

function loadPaqueteError(error: string) {
  return {
    type: LOAD_PAQUETE_FAILURE,
    messagePaquete: `Error al cargar el paquete: ${error}`,
    ok: false
  }
}

export function loadPaquete(servicio: ApiService, idPaquete: string) {
  return async function (dispatch) {
    dispatch(requestLoadPaquete())
    return servicio.getOne(idPaquete)
      .then(res => {
        if (res.status == 200)
          dispatch(receiveLoadPaquete(res.paquete));
        else {
          dispatch(loadPaqueteError(res.message));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(loadPaqueteError(err));
      });
  }
}

