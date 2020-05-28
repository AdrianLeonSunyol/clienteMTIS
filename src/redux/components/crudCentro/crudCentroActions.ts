import { 
    READ_CENTROS_SUCCESS,
    CREATE_CENTRO_SUCCESS,
    DELETE_ALL_CENTRO_SUCCESS,
    UPDATE_CENTRO_SUCCESS,
    READ_CENTRO_SUCCESS,
    CENTRO_ERROR,
    DELETE_CENTRO_SUCCESS
} from "../../types";
import { Medico, Centro, Paciente, IUser } from "../../../models";
import { IService, ApiService } from "../../../services";
import { ApiServiceFactory } from "../../../services/ApiServiceFactory";

const servicio: IService = ApiServiceFactory.createApiService("centro");

function receiveLoadData (centros: Centro[]) {
    return {
        type: READ_CENTROS_SUCCESS,
        message: 'Petición de cargar centros solicitada',
        centros: centros
    }
}

function receiveCreateCentro(centro: Centro, message: string) {
    return {
        type: CREATE_CENTRO_SUCCESS,
        message: message,
        centro: centro
    }
}



function receiveDeleteCentro(id: string, message: string) {
    return {
        type: DELETE_CENTRO_SUCCESS,
        message: message,
        id: id
    }
}



function receiveUpdateCentro(centro: Centro, message: string) {
    return {
        type: UPDATE_CENTRO_SUCCESS,
        message: message,
        centro: centro
    }
}

function receiveDelete () {
    return {
        type: DELETE_ALL_CENTRO_SUCCESS,
        message: 'Centros eliminados correctamente'
    }
}

function error (message: string) {
    return {
        type: CENTRO_ERROR,
        message: message
    }
}

export function loadCentros () {
    return function(dispatch) {
        return servicio.get()
        .then(res => {
            dispatch(receiveLoadData(res));
        })
        .catch (err => {
            console.log(err);
            dispatch(error(err.message));
        })
    }
}

export function createCentro(centro: Centro) {
    return function(dispatch) {
        return servicio.post(centro)
        .then(res => {
            if (res.status !== 200 && res.status !== 304) {
                dispatch(error(res.message));
            } 
            else {
               dispatch(receiveCreateCentro(centro, res.message)); 
            }
        })
        .catch(err => {
            dispatch(error(err.message));
            console.log(err);
        })
    }
}

export function deleteCentro(id: string) {
    return function(dispatch) {
        return servicio.delete(id)
        .then(res => {
            if (res.status !== 200 && res.status !== 304)
                dispatch(error(res.message));
            else 
                dispatch(receiveDeleteCentro(id, res.message));
        })
        .catch(err => {
            dispatch(error(err.message));
            console.log(err);
        });
    }
}

export function deleteAllCentros() {
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