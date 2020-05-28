import {

} from "../../types";
import { Usuario } from "../../../models";
import { IService } from "../../../services";
import { ApiServiceFactory } from "../../../services/ApiServiceFactory";

const servicio: IService = ApiServiceFactory.createApiService("paciente");

//function receiveLoadData(pacientes: Usuario[]) {
//  return {
//    type: READ_PACIENTES_SUCCESS,
//    message: 'Petición de cargar pacientes solicitada',
//    pacientes: pacientes
//  }
//}
//
//
//
//export function loadPacientes() {
//  return function (dispatch) {
//    return servicio.get()
//      .then(res => {
//        var pacientes: Usuario[] = res;
//        dispatch(receiveLoadData(pacientes));
//      })
//      .catch(err => {
//        console.log(err);
//        dispatch(error(err.message));
//      });
//  }
//}

