import actionCreatorFactory from "typescript-fsa";
import Task from "../helper/task";

const actionCreator = actionCreatorFactory();

export const createTask = actionCreator<Task>('CREATE_TASK')


export const updateTask = actionCreator<number>('UPDATE_TASK');
export const setActiveTask = actionCreator<Task>('SET_ACTIVE_TASK');
export const resetActiveTask = actionCreator('RESET_ACTIVE_TASK');
export const closeNewTaskModal = actionCreator('CLOSE_NEW_TASK_MODAL');
export const openNewTaskModal = actionCreator('OPEN_NEW_TASK_MODAL');

export const resetDataState = actionCreator('RESET_DATA_STATE');

const actions = {
    createTask,
    updateTask,
    setActiveTask,
    resetActiveTask,
    closeNewTaskModal,
    openNewTaskModal,
    resetDataState
}

export default actions;
