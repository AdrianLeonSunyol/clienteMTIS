import {

} from "../../types";
import { crudPaqueteState } from ".";


/**
 * Remember
 * Everything you send as a reducer it becomes in the new state
 * @param state New state
 * @param action Action applied
 */
export function crudPaqueteReducer(state: any = crudPaqueteState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}