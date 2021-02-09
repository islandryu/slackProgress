import { AnyAction,applyMiddleware,createStore} from "redux";
import thunkMiddleWare,{ThunkMiddleware} from "redux-thunk";
import reducer ,{dataState}from "../reducer/reducer";

const thunk: ThunkMiddleware<dataState, AnyAction> = thunkMiddleWare;
const store = createStore(reducer, applyMiddleware(thunk));

export default store;