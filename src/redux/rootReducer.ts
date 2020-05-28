import { combineReducers } from "redux";
import  { 
    sessionReducer,
    crudMedicoReducer,
    crudCentroReducer,
    crudPacienteReducer
}  from "./components";

export const rootReducer = combineReducers({
    sessionReducer,
    crudMedicoReducer,
    crudCentroReducer,
    crudPacienteReducer
});

