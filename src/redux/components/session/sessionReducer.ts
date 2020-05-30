
import { sessionState } from "./";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from "../../types";

/**
 * Remember
 * Everything you send as a reducer it becomes in the new state
 * @param state New state
 * @param action Action applied
 */
export function sessionReducer(state = sessionState, action: any) {
  switch (action.type) {
    case LOAD_USER_FAILURE:
      return {
        ...state,
        message: action.message,
        user: action.user,
        efectiveDone: action.efectiveDone,
        servicios: []
      }
    case LOAD_USER_REQUEST:
      return {
        ...state,
        message: action.message,
        user: action.user,
        efectiveDone: action.efectiveDone,
        servicios: []
      }
    case LOAD_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        message: action.message,
        efectiveDone: action.efectiveDone,
        servicios: action.servicios
      }
    };
    //sessions
    case LOGIN_REQUEST:
      return {
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        efectiveDone: action.efectiveDone,
        message: action.message
      };
    case REGISTER_REQUEST:
      return {
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        efectiveDone: action.efectiveDone,
        message: action.message
      };
    case LOGIN_SUCCESS:
      return {
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        efectiveDone: action.efectiveDone,
        message: action.message
      };
    case REGISTER_SUCCESS:
      return {
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        efectiveDone: action.efectiveDone,
        message: action.message
      };
    case LOGIN_FAILURE:
      return {
        isFetching: false,
        isAuthenticated: false,
        efectiveDone: action.efectiveDone,
        message: action.message
      };
    case REGISTER_FAILURE:
      return {
        isFetching: false,
        isAuthenticated: false,
        efectiveDone: action.efectiveDone,
        message: action.message
      };
    case LOGOUT_REQUEST:
      return {
        isFetching: false,
        isAuthenticated: false,
        message: action.message,
        efectiveDone: action.efectiveDone,
        servicios: []
      };
    case LOGOUT_SUCCESS:
      return {
        isFetching: true,
        isAuthenticated: false,
        message: action.message,
        efectiveDone: action.efectiveDone,
        servicios: []
      };
    default:
      return state;
    /**
     * If the reducer receives an action 
     * that it doesn't care about, 
     * it should return the unchanged state
     * 
     * Remember: Each reducer
     * handles a "slice" of state. 
     * (a portion of the entire Redux Store)
     */
  }
}


