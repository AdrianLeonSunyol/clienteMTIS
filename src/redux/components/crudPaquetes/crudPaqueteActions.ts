import {
  LOAD_PAQUETES_FAILURE,
  LOAD_PAQUETES_REQUEST,
  LOAD_PAQUETES_SUCCESS,
  CHANGE_PAQUETE_STATE_FAILURE,
  CHANGE_PAQUETE_STATE_REQUEST,
  CHANGE_PAQUETE_STATE_SUCCESS,
  LOAD_PAQUETE_FAILURE,
  LOAD_PAQUETE_REQUEST,
  LOAD_PAQUETE_SUCCESS,
  PRESUPUESTO_REQUEST,
  PRESUPUESTO_SUCCESS,
  PRESUPUESTO_FAILURE,
  PAGAR_REQUEST,
  PAGAR_FAILURE,
  PAGAR_SUCCESS
} from "../../types";
import { ApiService, IService } from "../../../services";
import { Paquete } from "../../../models/PaqueteModel";
import { IPackage } from "../../../models/interfaces/IPackage";
import { PaqueteService } from "../../../services/PaqueteService.service";
import { ITarjeta } from "../../../components/paquetes/CreatePaquete";

function requestLoadPaquete() {
  return {
    type: LOAD_PAQUETE_REQUEST,
    messagePaquete: 'Petcición de cargar paquete',
    ok: false,
  }
}

function requestPresupuesto() {
  return {
    type: PRESUPUESTO_REQUEST,
    messagePaquete: 'Petición de cargar presupuesto',
    ok: false
  };
}

function requestPago() {
  return {
    type: PAGAR_REQUEST,
    messagePaquete: 'Petición de pagar presupuesto',
    ok: false,
    pagado: false,
  };
}

function receiveLoadPaquete(paquete: Paquete) {
  return {
    type: LOAD_PAQUETE_SUCCESS,
    messagePaquete: 'Paquete cargado correctamente',
    paquete: paquete,
    ok: true
  }
}

function receiveGeneratePresupuest(presupuesto: number) {
  return {
    type: PRESUPUESTO_SUCCESS,
    messagePaquete: 'Presupuesto generado correctamente',
    presupuesto: presupuesto,
    ok: true
  };
}

function receivePagarPresupuesto(identificador: number) {
  return {
    type: PAGAR_SUCCESS,
    messagePaquete: 'Pago realizado correctamente',
    ok: true,
    pagado: true,
    identificador: identificador
  };
}

function loadPaqueteError(error: string) {
  return {
    type: LOAD_PAQUETE_FAILURE,
    messagePaquete: `Error al cargar el paquete: ${error}`,
    ok: false
  }
}

function loadPresupuestoError(error: string) {
  return {
    type: PRESUPUESTO_FAILURE,
    messagePaquete: `Error al generar el presupuesto: ${error}`,
    ok: false,
  }
}

function loadPagoError(error: string) {
  return {
    type: PAGAR_FAILURE,
    messagePaquete: `Error al pagar el presupuesto: ${error}`,
    ok: false,
    pagado: false,
  };
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

interface PresupuestoResponse {
  status: number;
  message: string;
  presupuesto: number;
}

interface PagoResponse {
  status: number;
  message: string;
  identificador: number;
}

export function generatePresupuesto(servicio: PaqueteService, paquete: IPackage) {
  return async function (dispatch) {
    dispatch(requestPresupuesto());
    return servicio.getPresupuesto(paquete)
      .then((res: PresupuestoResponse) => {
        if (res.status === 200) {
          dispatch(receiveGeneratePresupuest(res.presupuesto));
        } else {
          dispatch(loadPresupuestoError(res.message));
        }
      })
      .catch(err => {
        dispatch(loadPresupuestoError(err));
      });
  }
}

export function pagarPresupuesto(servicio: PaqueteService, presupuesto: number, tarjeta: ITarjeta) {
  return async function (dispatch) {
    dispatch(requestPago());
    return servicio.pagoPresupuesto(presupuesto, tarjeta)
      .then((res: PagoResponse) => {
        if (res.status === 200) {
          dispatch(receivePagarPresupuesto(res.identificador));
        } else {
          dispatch(loadPagoError(res.message));
        }
      })
      .catch(err => {
        dispatch(loadPagoError(err));
      });
  }
}
