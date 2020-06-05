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
import { PresupuestoPago, IPagoRequest, IPagoResponse, IPresupuestoResponse } from "../../../services/PagoPresupuesto.service";
import { ITarjeta } from "../../../components/paquetes/CreatePaquete";
import { Estado } from "../../../models/EstadoEnum";

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
    messagePaquete: error,
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
      .then((res: IPackage) => {
        if (parseInt(res.id) == 0) {
          dispatch(loadPagoError("El id introducido no se corresponde con ningún paquete"));
        } else
          dispatch(receiveLoadPaquete(res));
      })
      .catch(err => {
        console.log(err);
        dispatch(loadPaqueteError(err.message));
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

export function generatePresupuesto(servicio: PresupuestoPago, paquete: IPackage) {
  return async function (dispatch) {
    dispatch(requestPresupuesto());
    return servicio.getPresupuesto(paquete)
      .then((res: IPresupuestoResponse) => {
        if (res.status === 200) {
          var paquetes: Paquete[] = JSON.parse(localStorage.getItem('paquetes') || "") || [];
          paquete.id = res.id_paquete;
          paquete.precio = parseInt(res.presupuesto);
          paquete.estado = Estado.PENDIENTE_PAGO;
          paquetes.push(paquete);
          localStorage.removeItem('paquetes');
          localStorage.setItem('paquetes', JSON.stringify(paquetes));
          dispatch(receiveGeneratePresupuest(parseInt(res.presupuesto)));
        } else {
          dispatch(loadPresupuestoError(res.message));
        }
      })
      .catch(err => {
        dispatch(loadPresupuestoError(err.message));
      });
  }
}

export function pagarPresupuesto(servicio: PresupuestoPago, pago: IPagoRequest) {
  return async function (dispatch) {
    dispatch(requestPago());
    return servicio.pagoPresupuesto(pago)
      .then((res: PagoResponse) => {
        dispatch(receivePagarPresupuesto(res.identificador));
      })
      .catch(err => {
        dispatch(loadPagoError(err.message));
      });
  }
}
