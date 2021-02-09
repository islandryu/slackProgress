import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
} from "redux";
import thunkMiddleWare, { ThunkMiddleware } from "redux-thunk";
import reducer from "../reducer/reducer";
import authReducer from "../reducer/authReducer";
import { CombinedState } from "../types";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";

export const history = createBrowserHistory();

const thunk: ThunkMiddleware<CombinedState, AnyAction> = thunkMiddleWare;
export const combinedReducer = combineReducers({
  router: connectRouter(history),
  data: reducer,
  auth: authReducer,
});
const store = createStore(
  combinedReducer,
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
);

export default store;
