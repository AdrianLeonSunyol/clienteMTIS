import { 
    READ_PACIENTES_SUCCESS,
    CREATE_PACIENTE_SUCCESS,
    DELETE_ALL_PACIENTE_SUCCESS,
    UPDATE_PACIENTE_SUCCESS,
    READ_PACIENTE_SUCCESS,
    PACIENTE_ERROR,
    DELETE_PACIENTE_SUCCESS
} from "../../types";
import { Paciente } from "../../../models";
import { IService } from "../../../services";
import { ApiServiceFactory } from "../../../services/ApiServiceFactory";

const servicio: IService = ApiServiceFactory.createApiService("paciente");


function receiveLoadData (pacientes: Paciente[]) {
    return {
        type: READ_PACIENTES_SUCCESS,
        message: 'Petición de cargar pacientes solicitada',
        pacientes: pacientes
    }
}

function receiveCreatePaciente(user: Paciente, message: string) {
    return {
        type: CREATE_PACIENTE_SUCCESS,
        message: message,
        user: user
    }
}



function receiveDeletePaciente(id: string, message: string) {
    return {
        type: DELETE_PACIENTE_SUCCESS,
        message: message,
        id: id
    }
}



function receiveUpdatePaciente(user: Paciente, message: string) {
    return {
        type: UPDATE_PACIENTE_SUCCESS,
        message: message,
        user: user
    }
}

function receiveDelete () {
    return {
        type: DELETE_ALL_PACIENTE_SUCCESS,
        message: 'Pacientes borrados correctamente'
    }
}

function error (message: string) {
    return {
        type: PACIENTE_ERROR,
        message: message
    }
}

export function loadPacientes () {
    return function(dispatch) {
        return servicio.get()
        .then(res => {
            var pacientes: Paciente[] = res;
            dispatch(receiveLoadData(pacientes));
        })
        .catch (err => {
            console.log(err);
            dispatch(error(err.message));
        });
    }
}


export function createPaciente(paciente: Paciente) {
    return function(dispatch) {
        return servicio.post(paciente)
        .then(res => {
            if (res.status !== 200 && res.status !== 304) {
                dispatch(error(res.message));
            } 
            else {
               dispatch(receiveCreatePaciente(paciente, res.message)); 
            }
        })
        .catch(err => {
            dispatch(error(err.message));
            console.log(err);
        });
    }
}

export function deletePaciente(id: string) {
    return function(dispatch) {
        return servicio.delete(id)
        .then(res => {
            if (res.status !== 200 && res.status !== 304)
                dispatch(error(res.message));
            else 
                dispatch(receiveDeletePaciente(id, res.message));
        })
        .catch(err => {
            dispatch(error(err.message));
            console.log(err);
        });
    }
}

export function deleteAllPacientes() {
    return function(dispatch) {
        return servicio.deleteAll()
        .then(res => {
            if (res.status !== 200 && res.status !== 304)
                dispatch(error(res.message));
            else
                dispatch(receiveDelete());
        })
        .catch(err => {
            console.log(err);
            dispatch(error(err.message));
        });
    }
}