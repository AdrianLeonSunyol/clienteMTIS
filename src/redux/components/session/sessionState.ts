export const sessionState = {
  isFetching: false, //process started
  isAuthenticated: localStorage.getItem('email') ? true : false, //authentication
  message: "", //message of user
  efectiveDone: false,
  user: localStorage.getItem('user_data') ? true : false, //data of user
  servicios: [{ servicio: null, tipo: "" }] //services that user can use
}