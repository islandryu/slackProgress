import actionCreatorFactory from "typescript-fsa";
import Task from "../helper/task";
import asyncFactory from "typescript-fsa-redux-thunk";
import {
  CombinedState,
  CreateTaskResponse,
  InitialValueResponse,
} from "../types";
import { getHeaders } from "../helper/helper";

const actionCreator = actionCreatorFactory();

const createAsync = asyncFactory<CombinedState>(actionCreator);

const host: string = window.location.host;
const baseUrl = `http://${host}/api/`;

const setInitialValueAsync = createAsync<
  unknown,
  InitialValueResponse,
  unknown
>("SET_INITIAL_VALUE_ASYNC", async (params, dispatch) => {
  const headers = getHeaders();
  let res = await fetch(`${baseUrl}initialValue`, {
    method: "GET",
    headers,
  });
  if (!res.ok) {
    throw Error;
  }
  const initialValueResponse = res.json();
  return initialValueResponse;
});

const createTaskAsync = createAsync<Task, CreateTaskResponse, unknown>(
  "CREATE_TASK_ASYNC",
  async (params, dispatch) => {
    const headers = getHeaders();
    let res = await fetch(`${baseUrl}task`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        title: params.title,
        detail: params.detail,
        state_id: params.state,
      }),
      credentials: "include",
    });
    if (!res.ok) {
      throw Error;
    }
    const createTaskResponse = res.json();
    return createTaskResponse;
  }
);

const updateTaskStateAsync = createAsync<
  { task: Task; newState: number },
  unknown,
  unknown
>("UPDATE_TASK_STATE_ASYNC", async (params, dispatch) => {
  const headers = getHeaders();
  let res = await fetch(`${baseUrl}task/${params.task.id}/state`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      state: params.newState,
    }),
    credentials: "include",
  });
  if (!res.ok) {
    throw Error;
  }
});
export const setActiveTask = actionCreator<Task>("SET_ACTIVE_TASK");
export const resetActiveTask = actionCreator("RESET_ACTIVE_TASK");
export const closeNewTaskModal = actionCreator("CLOSE_NEW_TASK_MODAL");
export const openNewTaskModal = actionCreator("OPEN_NEW_TASK_MODAL");
export const closeNewOutputTextModal = actionCreator(
  "CLOSE_NEW_OUTPUT_TEXT_MODAL"
);
export const openNewOutputTextModal = actionCreator(
  "OPEN_NEW_OUTPUT_TEXT_MODAL"
);

export const createOutputTextAsync = createAsync<
  { outputText: string; stateId: number },
  { id: number },
  unknown
>("CREATE_OUTPUT_TEXT", async (params, dispatch) => {
  const headers = getHeaders();
  let res = await fetch(`${baseUrl}outputText`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      text: params.outputText,
      state_id: params.stateId,
    }),
  });
  const createOutputTextRes = await res.json();
  return createOutputTextRes;
});

export const getStateAsync = createAsync<
  unknown,
  { id: number; name: string }[],
  unknown
>("GET_STATE_ASYNC", async (params, dispatch) => {
  const headers = getHeaders();
  let res = await fetch(`${baseUrl}state`, {
    method: "GET",
    headers,
  });
  const stateRes = await res.json();
  return stateRes;
});

export const setSelectedOutputText = actionCreator<{
  stateId: number;
  outputTextId: number;
}>("SET_SELECTED_OUTPUT_TEXT");

export const resetDataState = actionCreator("RESET_DATA_STATE");

const actions = {
  setInitialValueAsync,
  createTaskAsync,
  updateTaskStateAsync,
  setActiveTask,
  resetActiveTask,
  closeNewTaskModal,
  openNewTaskModal,
  closeNewOutputTextModal,
  openNewOutputTextModal,
  createOutputTextAsync,
  getStateAsync,
  setSelectedOutputText,
  resetDataState,
};

export default actions;
