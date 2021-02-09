import React, { FC } from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { useDispatch } from "react-redux";
import actions from "../action/actions";
import TaskClass from "../helper/task";

export type taskType = {
  task: TaskClass;
};
const Task: FC<taskType> = ({ task }) => {
  const dispatch = useDispatch();
  const [{ monitorId }, drag] = useDrag({
    item: { type: "task" },
    collect: (monitor: DragSourceMonitor) => ({
      monitorId: monitor.getHandlerId() as string,
    }),
    begin: () => {
      dispatch(actions.setActiveTask(task));
    },
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        dispatch(actions.resetActiveTask());
      }
    },
  });
  return (
    <div
      className="c-board__card c-card"
      ref={drag}
      data-testid="task"
      data-monitorid={monitorId}
    >
      <h3 className="c-card__title">{task.title}</h3>
      <p className="c-card__detail">{task.detail}</p>
    </div>
  );
};

export default Task;
