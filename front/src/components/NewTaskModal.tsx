import { Modal } from "@material-ui/core";
import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../action/actions";
import Task from "../helper/task";
import { CombinedState } from "../types";

const NewTaskModal: FC = () => {
  const dispatch = useDispatch();
  const isOpen: boolean = useSelector<CombinedState, boolean>(
    (state) => state.data.newTaskModalIsOpen
  );
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  return (
    <Modal open={isOpen}>
      <>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
        />
        <input
          type="textarea"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="詳細"
        />
        <button
          data-testid="newTask"
          onClick={() => {
            dispatch(actions.createTaskAsync(new Task(title, detail)));
          }}
        >
          作成
        </button>
        <button
          data-testid="closeNewTaskModal"
          onClick={() => {
            dispatch(actions.closeNewTaskModal());
          }}
        >
          閉じる
        </button>
      </>
    </Modal>
  );
};
export default NewTaskModal;
