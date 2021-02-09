import React, { FC } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import actions from "../action/actions";
import TaskType from "../helper/task";
import TaskClass from "../helper/task";
import { CombinedState } from "../types";
import Task from "./Task";

type boardType = {
  stateNum: number;
  title: string;
};
const Board: FC<boardType> = ({ stateNum, title }) => {
  const dispatch = useDispatch();
  const activeTask = useSelector<CombinedState, TaskType | undefined>(
    (state) => state.data.activeTask
  );
  const [, drop] = useDrop({
    accept: "task",
    drop: (item) => {
      if (activeTask !== undefined) {
        dispatch(
          actions.updateTaskStateAsync({ task: activeTask, newState: stateNum })
        );
      }
    },
  });
  const tasks: TaskClass[] = useSelector<CombinedState, TaskClass[]>(
    (state) => {
      return state.data.tasks.filter((task) => task.state === stateNum);
    }
  );
  return (
    <div className="c-board c-boards__board" ref={drop}>
      <h2 className="c-board__title">{title}</h2>
      <div className="c-board__content" data-testid="boardContent">
        {tasks.map((task, index) => (
          <Task key={"task" + index} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Board;
