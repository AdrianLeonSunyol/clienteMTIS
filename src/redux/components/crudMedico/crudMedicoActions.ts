import { 
    READ_MEDICOS_SUCCESS,
    CREATE_MEDICO_SUCCESS,
    DELETE_ALL_MEDICO_SUCCESS,
    DELETE_MEDICO_SUCCESS,
    UPDATE_MEDICO_SUCCESS,
    READ_MEDICO_SUCCESS,
    MEDICO_ERROR
} from "../../types";
import { Medico, Centro, Paciente, IUser } from "../../../models";
import { IService } from "../../../services";
import { ApiServiceFactory } from "../../../services/ApiServiceFactory";

const servicio: IService = ApiServiceFactory.createApiService("medico");


function receiveLoadData (medicos: Medico[]) {
    return {
        type: READ_MEDICOS_SUCCESS,
        message: 'Petición de cargar medicos solicitada',
        medicos: medicos
    }
}

function receiveCreateMedico(user: Medico, message: string) {
    return {
        type: CREATE_MEDICO_SUCCESS,
        message: message,
        user: user
    }
}



function receiveDeleteMedico(id: string, message: string) {
    return {
        type: DELETE_MEDICO_SUCCESS,
        message: message,
        id: id
    }
}



function receiveUpdateMedico(user: Medico, message: string) {
    return {
        type: UPDATE_MEDICO_SUCCESS,
        message: message,
        user: user
    }
}

function receiveDelete () {
    return {
        type: DELETE_ALL_MEDICO_SUCCESS,
        message: 'Medicos borrados correctamente'
    }
}

function error (message: string) {
    return {
        type: MEDICO_ERROR,
        message: message
    }
}

export function loadMedicos () {
    return function(dispatch) {
        return servicio.get()
        .then(res => {
            var medicos: Medico[] = res;
            dispatch(receiveLoadData(medicos));
        })
        .catch (err => {
            console.log(err);
            dispatch(error(err.message));
        })
    }
}

export function createMedico(user: Medico) {
    return function(dispatch) {
        return servicio.post(user)
        .then(res => {
            if (res.status !== 200 && res.status !== 304) {
                dispatch(error(res.message));
            } 
            else {
               dispatch(receiveCreateMedico(user, res.message)); 
            }
        })
        .catch(err => {
            dispatch(error(err.message));
            console.log(err);
        })
    }
}

export function deleteMedico(id: string) {
    return function(dispatch) {
        return servicio.delete(id)
        .then(res => {
            if (res.status !== 200 && res.status !== 304)
                dispatch(error(res.message));
            else 
                dispatch(receiveDeleteMedico(id, res.message));
        })
        .catch(err => {
            dispatch(error(err.message));
            console.log(err);
        });
    }
}

export function deleteAllMedicos() {
    return function(dispatch) {
        return servicio.deleteAll()
        .then(res => {
            if (res.status !== 200 && res.status !== 304) 
                dispatch(error(res.message));
            else
                dispatch(receiveDelete());
        })
        .catch(err => {
            dispatch(error(err.message));
            console.log(err);
        });
    }
}