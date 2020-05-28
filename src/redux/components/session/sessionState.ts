export const sessionState = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('email') ? true : false,
    message: "",
    user: localStorage.getItem('user_data') ? true : false,
    servicios: [{servicio: null, tipo: ""}]
}