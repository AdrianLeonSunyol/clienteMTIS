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
} from "../../";
import { ApiServiceFactory } from "../../../services/ApiServiceFactory";
import { Usuario } from "../../../models";
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "../../types";

function requestLoadUser() {
  return {
    type: LOAD_USER_REQUEST,
    message: "Petición de carga de usuario de sesión",
    efectiveDone: false,
    user: false
  };
}

function receiveLoadUser(servicios: service[]) {
  return {
    type: LOAD_USER_SUCCESS,
    user: true,
    message: 'Usuario cargado correctamente',
    efectiveDone: true,
    servicios: servicios
  };
}

function loadUserFailure(message: string) {
  return {
    type: LOAD_USER_FAILURE,
    efectiveDone: false,
    message: message,
    user: false
  };
}

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    efectiveDone: false,
    message: "Petición de inicio de sesión recibida"
  };
}

function requestRegister() {
  return {
    type: REGISTER_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    efectiveDone: false,
    message: "Petición de registro de usuario recibida"
  };
}

function receiveLogin(message) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    efectiveDone: true,
    message: message
  };
}

function receiveRegister(message) {
  return {
    type: REGISTER_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    efectiveDone: true,
    message: message
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    efectiveDone: false,
    message: message
  };
}

function registerError(message) {
  return {
    type: REGISTER_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    efectiveDone: false,
    message: message
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true,
    efectiveDone: false,
    message: "Petición para cerrar sesión recibida"
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
    efectiveDone: true,
    message: "Sesión cerrada correctamente!"
  };
}

type service = {
  servicio: IService,
  tipo: string
};

export function loginUser(login: LoginService, email: string, password: string) {
  return function (dispatch) {
    dispatch(requestLogin());
    return login
      .loginUser(email, password)
      .then(res => {
        if (res.status !== 200 && res.status !== 304) {
          dispatch(loginError(res.message));
        }
        else {
          localStorage.setItem('email', email);
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('tipo', res.tipo);
          localStorage.setItem('sec', res.cp_seguridad);
          dispatch(receiveLogin(res.message));
        }
      })
      .catch(error => {
        dispatch(loginError(error.message));
        console.log("Error: ", error);
      });
  }
}

export function registerUser(login: LoginService, user: Usuario) {
  return function (dispatch) {
    dispatch(requestRegister());
    return login.registroUser(user)
      .then(res => {
        if (res.status !== 200 && res.status !== 304) {
          dispatch(registerError(res.message));
        }
        else {
          localStorage.setItem('email', res.user.email);
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('tipo', res.tipo);
          localStorage.setItem('sec', res.cp_seguridad);
          dispatch(receiveRegister(res.message));
        }
      })
      .catch(error => {
        dispatch(registerError(error.message));
        console.log("Error: ", error);
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

export function loadUser() {
  var servicios: service[] = [];
  var new_service: service = {
    servicio: ApiServiceFactory.createApiService(localStorage.getItem('tipo') || ""),
    tipo: localStorage.getItem('tipo') || ""
  };
  servicios.push(new_service);
  if (localStorage.getItem('tipo') === 'admin') {
    var new_service: service = {
      servicio: ApiServiceFactory.createApiService("repartidor"),
      tipo: "repartidor"
    };
    servicios.push(new_service);
    var new_service1: service = {
      servicio: ApiServiceFactory.createApiService("transportista"),
      tipo: "transportista"
    };
    servicios.push(new_service1);
  }

  return function (dispatch) {
    dispatch(requestLoadUser());
    return servicios[0].servicio
      .getOne(localStorage.getItem('user') || "")
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




