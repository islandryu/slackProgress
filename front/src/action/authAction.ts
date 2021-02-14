import { push } from "connected-react-router";
import actionCreatorFactory from "typescript-fsa";
import asyncFactory from "typescript-fsa-redux-thunk";
import {
  CombinedState,
  LoginParam,
  LoginResponse,
  SignupParam,
  CheckAuthenticatedResponse,
} from "../types";
import { asyncErrorNotification, getHeaders } from "../helper/helper";
import actions from "./actions";

const actionCreator = actionCreatorFactory();

const createAsync = asyncFactory<CombinedState>(actionCreator);

const host: string = window.location.host;
const baseUrl = `http://${host}/api/`;

export const loginAsync = createAsync<LoginParam, LoginResponse, unknown>(
  "LOGIN_ASYNC",
  async (params, dispatch) => {
    const headers = getHeaders();
    let res = await fetch(`${baseUrl}login`, {
      method: "POST",
      headers,
      body: JSON.stringify(params),
      credentials: "include",
    });
    if (!res.ok) {
      throw Error;
    }
    await dispatch(actions.setInitialValueAsync());
    let loginRes = await res.json();
    dispatch(push("/manageTask"));
    return loginRes;
  }
);

export const signupAsync = createAsync<SignupParam, unknown, unknown>(
  "SIGNUP_ASYNC",
  async (params, dispatch) => {
    const headers = getHeaders();
    let res = await fetch(`${baseUrl}signup`, {
      method: "POST",
      headers,
      body: JSON.stringify(params),
      credentials: "include",
    });
    if (!res.ok) {
      throw Error;
    }
    await dispatch(actions.setInitialValueAsync());
    dispatch(push("/manageTask"));
  }
);

export const checkAuthenticated = createAsync<
  unknown,
  CheckAuthenticatedResponse,
  unknown
>("CHECK_AUTHENTICATED", async (params, dispatch) => {
  const headers = getHeaders();
  let res = await fetch(`${baseUrl}isAuthenticated`, {
    method: "GET",
    headers,
    credentials: "include",
  });
  if (!res.ok) {
    asyncErrorNotification(res.status);
    throw Error;
  }
  const checkAuthenticatedResponse = res.json();
  await dispatch(actions.setInitialValueAsync());
  dispatch(push("/manageTask"));
  return checkAuthenticatedResponse;
});

const resetAuthState = actionCreator("RESET_AUTH_STATE");

const authActions = {
  loginAsync,
  signupAsync,
  checkAuthenticated,
  resetAuthState,
};

export default authActions;
