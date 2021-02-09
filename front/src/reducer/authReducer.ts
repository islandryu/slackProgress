import { Action } from "redux";
import { isType } from "typescript-fsa";
import authActions from "../action/authAction";

export type AuthState = {
  isLogin: boolean;
  userName: string;
  failLogin: boolean;
  failSignup: boolean;
};

const initialState: AuthState = {
  isLogin: false,
  userName: "",
  failLogin: false,
  failSignup: false,
};

const authReducer = (
  state: AuthState = initialState,
  action: Action
): AuthState => {
  if (isType(action, authActions.loginAsync.async.done)) {
    return {
      ...state,
      isLogin: true,
      userName: action.payload.result.userName,
      failLogin: false,
    };
  } else if (isType(action, authActions.loginAsync.async.failed)) {
    return { ...state, isLogin: false, failLogin: true };
  } else if (isType(action, authActions.signupAsync.async.done)) {
    return {
      ...state,
      isLogin: true,
      userName: action.payload.params.name,
      failLogin: false,
    };
  } else if (isType(action, authActions.signupAsync.async.failed)) {
    return { ...state, isLogin: false, failSignup: true };
  } else if (isType(action, authActions.checkAuthenticated.async.done)) {
    return {
      ...state,
      isLogin: true,
      failSignup: false,
      failLogin: false,
      userName: action.payload.result.userName,
    };
  } else if (isType(action, authActions.checkAuthenticated.async.failed)) {
    return { ...state, isLogin: false, failSignup: false, failLogin: false };
  } else if (isType(action, authActions.resetAuthState)) {
    return {
      isLogin: false,
      userName: "",
      failLogin: false,
      failSignup: false,
    };
  }

  return state;
};

export default authReducer;
