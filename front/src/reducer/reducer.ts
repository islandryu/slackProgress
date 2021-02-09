import Task from "../helper/task";
import { isType } from "typescript-fsa";
import { Action } from "redux";
import actions from "../action/actions";
import { cloneArray } from "../helper/helper";
import { OutputText, State } from "../types";

export type DataState = {
  tasks: Task[];
  activeTask: Task | undefined;
  newTaskModalIsOpen: boolean;
  newOutputTextModalIsOpen: boolean;
  states: State[];
  outputTexts: OutputText[];
};

const initialState: DataState = {
  tasks: [],
  activeTask: undefined,
  newTaskModalIsOpen: false,
  newOutputTextModalIsOpen: false,
  states: [],
  outputTexts: [],
};

const reducer = (
  state: DataState = initialState,
  action: Action
): DataState => {
  if (isType(action, actions.setInitialValueAsync.async.done)) {
    const newTasks: Task[] = [];
    action.payload.result.tasks.map((resTask) => {
      const task = new Task(resTask.title, resTask.detail, resTask.state_id);
      task.setId(resTask.id);
      newTasks.push(task);
    });
    const newOutputTexts: OutputText[] = [];
    action.payload.result.outputTexts.map((resOutputText) => {
      const outputText: OutputText = {
        text: resOutputText.text,
        stateId: resOutputText.state_id,
        id: resOutputText.id,
      };
      newOutputTexts.push(outputText);
    });
    const newStates: State[] = [];
    action.payload.result.states.map((resState) => {
      const stateObj: State = {
        id: resState.id,
        name: resState.name,
        selectedOutputTextId: undefined,
      };
      newStates.push(stateObj);
    });
    return {
      ...state,
      tasks: newTasks,
      outputTexts: newOutputTexts,
      states: newStates,
    };
  } else if (isType(action, actions.createTaskAsync.async.done)) {
    action.payload.params.setId(action.payload.result.id);
    const clonedTasks = cloneArray(state.tasks);
    clonedTasks.push(action.payload.params);
    return { ...state, tasks: clonedTasks };
  } else if (isType(action, actions.createTaskAsync.async.failed)) {
    return { ...state, tasks: state.tasks };
  } else if (isType(action, actions.updateTaskStateAsync.async.done)) {
    action.payload.params.task.state = action.payload.params.newState;
    return {
      ...state,
      tasks: state.tasks,
    };
  } else if (isType(action, actions.setActiveTask)) {
    return {
      ...state,
      activeTask: action.payload,
    };
  } else if (isType(action, actions.resetActiveTask)) {
    return {
      ...state,
      activeTask: undefined,
    };
  } else if (isType(action, actions.openNewTaskModal)) {
    return {
      ...state,
      newTaskModalIsOpen: true,
    };
  } else if (isType(action, actions.closeNewTaskModal)) {
    return {
      ...state,
      newTaskModalIsOpen: false,
    };
  } else if (isType(action, actions.openNewOutputTextModal)) {
    return {
      ...state,
      newOutputTextModalIsOpen: true,
    };
  } else if (isType(action, actions.closeNewOutputTextModal)) {
    return {
      ...state,
      newOutputTextModalIsOpen: false,
    };
  } else if (isType(action, actions.createOutputTextAsync.async.done)) {
    state.outputTexts.push({
      text: action.payload.params.outputText,
      stateId: action.payload.params.stateId,
      id: action.payload.result.id,
    });
    return {
      ...state,
      newTaskModalIsOpen: false,
    };
  } else if (isType(action, actions.getStateAsync.async.done)) {
    action.payload.result.map((stateRes) => {
      const stateObj: State = {
        name: stateRes.name,
        id: stateRes.id,
        selectedOutputTextId: undefined,
      };
      state.states.push(stateObj);
    });
    return {
      ...state,
      states: state.states,
    };
  } else if (isType(action, actions.setSelectedOutputText)) {
    const newStates = state.states.map((stateObj) => {
      if (stateObj.id === action.payload.stateId) {
        stateObj.selectedOutputTextId = action.payload.outputTextId;
      }
      return stateObj;
    });
    return {
      ...state,
      states: newStates,
    };
  } else if (isType(action, actions.resetDataState)) {
    state.tasks = [];
    state.activeTask = undefined;
    state.outputTexts = [];
    state.states = [];
    state.newOutputTextModalIsOpen = false;
    state.newTaskModalIsOpen = false;
    return state;
  }
  return state;
};

export default reducer;
