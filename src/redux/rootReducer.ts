import { combineReducers } from "redux";
import {
  sessionReducer,
  crudPaqueteReducer
} from "./components";

export const rootReducer = combineReducers({
  sessionReducer,
  crudPaqueteReducer
});

