import { Paquete } from "../../../models/PaqueteModel";

export const sessionState = {
  isFetching: false, //process started
  isAuthenticated: localStorage.getItem('email') ? true : false, //authentication
  message: "", //message of user
  efectiveDone: false,
  user: {}, //data of user
  servicios: [{ servicio: null, tipo: "" }], //services that user can use
  paquetes: []
}