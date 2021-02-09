import Task from "../helper/task"
import { isType } from "typescript-fsa";
import {Action} from "redux";
import actions from "../action/actions"

export type dataState = {
   tasks:Task[],
   activeTask:Task|undefined,
   newTaskModalIsOpen:boolean
}

const initialState:dataState = {
    tasks:[],
    activeTask:undefined,
    newTaskModalIsOpen:false
}

const reducer = (
    state:dataState = initialState,
    action:Action
):dataState => {
    if(isType(action,actions.createTask)){
        state.tasks.push(action.payload);
        return {...state,tasks:state.tasks}
    }else if(isType(action,actions.updateTask)){
        const newTasks =state.tasks.map(task =>{
            if(state.activeTask===undefined){
                return task;
            }
            if(task.id === state.activeTask.id){
                task.state = action.payload
                return task;
            }else{
                return task;
            }
        });
        return {
            ...state,
            tasks:newTasks
        }
    }else if(isType(action,actions.setActiveTask)){
        return{
            ...state,
            activeTask:action.payload
        }
    }else if(isType(action,actions.resetActiveTask)){
        return{
            ...state,
            activeTask:undefined
        }
    }else if(isType(action,actions.openNewTaskModal)){
        return{
            ...state,
            newTaskModalIsOpen:true
        }
    }else if(isType(action,actions.closeNewTaskModal)){
        return{
            ...state,
            newTaskModalIsOpen:false
        }
    }else if(isType(action,actions.resetDataState)){
        state.tasks = [];
        state.activeTask = undefined;
        return state;
    }
    return state
}

export default reducer;
