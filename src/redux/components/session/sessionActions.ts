import { LoginService, IService } from "../../../services";
//import Auth0Lock from "auth0-lock";
import { 
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOAD_USER_FAILURE,
    LOAD_USER_REQUEST, 
    LOAD_USER_SUCCESS
    //LOGOUT_FAILURE,
    //LOCK_ERROR,
    //LOCK_SUCCESS,
    //SHOW_LOCK
 } from "../../";
import { ApiServiceFactory } from "../../../services/ApiServiceFactory";

 /*function showLock() {
    return {
      type: SHOW_LOCK
    }
  }
  
  function lockSuccess(profile) {
    return {
      type: LOCK_SUCCESS,
      profile
    }
  }
  
  function lockError(err) {
    return {
      type: LOCK_ERROR,
      err
    }
  }*/

function requestLoadUser() {
  return {
    type: LOAD_USER_REQUEST,
    message: "Petición de carga de usuario de sesión",
    user: false
  }
}

function receiveLoadUser(servicios: service[]) {
  return {
    type: LOAD_USER_SUCCESS,
    user: true,
    message: 'Usuario cargado correctamente',
    servicios: servicios
  }
}

function loadUserFailure(message: string) {
  return {
    type: LOAD_USER_FAILURE,
    message: message,
    user: false
  }
}

function requestLogin() {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        message: "Petición de inicio de sesión recibida"
    };
}

function receiveLogin(message) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        message: message
        //id_token: user.token,
        //tipo: user.tipo
    };
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message: message
    };
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true,
        message: "Petición para cerrar sesión recibida"
    };
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false,
        message: "Sesión cerrada correctamente!"
    };
}

type service = {
  servicio: IService,
  tipo: string
};

export function loginUser(login: LoginService, email: string, password: string) {
        return function(dispatch) {
            dispatch(requestLogin());
            return login
            .loginUser(email, password)
            .then(res => {
              //console.log(res);
              if (res.status !== 200 && res.status !== 304) {
                dispatch(loginError(res.message));
              }
              else {
                localStorage.setItem('email', email);
                localStorage.setItem('token', res.token);
                localStorage.setItem('user', res.user);
                localStorage.setItem('tipo', res.tipo);
                
                dispatch(receiveLogin(res.message));
              }
            })
            .catch(error => {
                dispatch(loginError(error.message));
                console.log("Error: ", error);
                //throw error;
            });
        }       
}

export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout());
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('tipo');
        localStorage.removeItem('user_data');
        dispatch(receiveLogout());
    }
}

export function loadUser () {
  var servicios: service[] = [];              
  var new_service: service = {
    servicio: ApiServiceFactory.createApiService(localStorage.getItem('tipo') || ""),
    tipo: localStorage.getItem('tipo') || ""
  };

  servicios.push(new_service);

  /**
   * En cuanto crezcamos tendremos que crear un servicio por cada endpoint de la api
   */
  if (localStorage.getItem('tipo') === 'admin') {
    var new_service: service = {
      servicio: ApiServiceFactory.createApiService("medico"),
      tipo: "medico"
    }
    servicios.push(new_service);
    var new_service1: service = {
      servicio: ApiServiceFactory.createApiService("paciente"),
      tipo: "paciente"
    }
    servicios.push(new_service1);

    var new_service2: service = {
      servicio: ApiServiceFactory.createApiService("centro"),
      tipo: "centro"
    }
    servicios.push(new_service2);
  }

  return function(dispatch) {
    dispatch(requestLoadUser());
    return servicios[0].servicio
    .getOne(localStorage.getItem('user')||"")
    .then(res => {
      if (res.status !== 200 && res.status !== 304 && res.status !== undefined) {
        dispatch(loadUserFailure(res.message));
      }
      else {
        localStorage.setItem('user_data', JSON.stringify(res));
        dispatch(receiveLoadUser(servicios));
      }
    })
    .catch(error => {
        dispatch(loadUserFailure(error));
        console.log("Error: ", error);
    });
  }
}


