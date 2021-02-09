import { RouterState } from "connected-react-router";
import { AuthState } from "./reducer/authReducer";
import { DataState } from "./reducer/reducer";

export type LoginParam = {
  email: string;
  password: string;
};

export type LoginResponse = {
  userName: string;
};

export type SignupParam = {
  name: string;
  email: string;
  password: string;
};

export type SignupResponse = {
  userName: string;
};

export type CheckAuthenticatedResponse = {
  userName: string;
};

export type CreateTaskResponse = {
  id: number;
};

export type CombinedState = {
  router: RouterState;
  data: DataState;
  auth: AuthState;
};

export type State = {
  id: number;
  selectedOutputTextId: number | undefined;
  name: string;
};

export type OutputText = {
  text: string;
  stateId: number;
  id: number;
};

export type InitialValueResponse = {
  outputTexts: {
    text: string;
    state_id: number;
    id: number;
  }[];
  tasks: {
    title: string;
    detail: string;
    state_id: number;
    id: number;
  }[];
  states: {
    name: string;
    id: number;
  }[];
};
