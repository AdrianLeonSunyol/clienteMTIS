import {
  createStore,
  applyMiddleware,
  //compose
} from "redux";
import reduxInmutableStateInvariant from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { rootReducer } from ".";


export function configureStore(initialState: any = {}) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        thunk,
        reduxInmutableStateInvariant()
      )
    )
  );
}

//You only have to do this once
/**
 * This will warn us if we
 * accidentally mutate Redux state
 */