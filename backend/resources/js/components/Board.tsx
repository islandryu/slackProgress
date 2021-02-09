import { FC } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import actions from "../action/actions";
import TaskClass from "../helper/task";
import { dataState } from "../reducer/reducer";
import Task from "./Task";

type boardType ={
    stateNum:number
    title:string
}
const Board:FC<boardType> = ({stateNum,title}) => {
    const dispatch = useDispatch();
    const [{},drop] = useDrop({
        accept: 'task',
        drop:(item)=>dispatch(actions.updateTask(stateNum))
    });
    const tasks:TaskClass[] = useSelector<dataState,TaskClass[]>((state)=>{
        return state.tasks.filter(task=>task.state===stateNum);
    })
    return (
        <div className="c-board c-boards__board" ref={drop}>
            <h2 className="c-board__title">{title}</h2>
            <div className="c-board__content">
                {tasks.map(task=>(
                    <Task
                    task={task}
                    ></Task>
                ))}
            </div>
        </div>
    )
}

export default Board;