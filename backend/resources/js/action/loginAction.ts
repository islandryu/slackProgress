import actionCreatorFactory from "typescript-fsa";
import asyncFactory from "typescript-fsa-redux-thunk";
import { AuthState } from "../reducer/authReducer"
import { LoginParam,SignupParam } from "../types";

const actionCreator = actionCreatorFactory();

const createAsync = asyncFactory<AuthState>(actionCreator);


const host:string = window.location.host;
const baseUrl = `http://${host}/api/`;

export const loginAsync = createAsync<LoginParam,unknown,unknown>(
    'LOGIN_ASYNC',
    async (params,dispatch) => {
        await fetch(`${baseUrl}login`,{
            method:"POST",

        });
    }
);

export const signupAsync = createAsync<SignupParam,unknown,unknown>(
    'SIGNUP_ASYNC',
    async (params,dispatch) => {
        await fetch(`${baseUrl}user`);
    }
);
