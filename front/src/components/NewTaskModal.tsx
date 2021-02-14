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
      <div className="l-modal__content c-modal-item">
        <h2 className="c-modal-item__title">新規タスク</h2>
        <div
          className="c-modal-item__close c-closebtn"
          data-testid="closeNewTaskModal"
          onClick={() => {
            dispatch(actions.closeNewTaskModal());
          }}
        >
          <img src="./image/close.svg" alt="" className="c-closebtn__image" />
        </div>
        <div className="c-modal-form c-modal-item__form">
          <input
            type="text"
            className="c-modal-form__text"
            placeholder="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="c-modal-form__textarea"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          ></textarea>
        </div>
        <div
          className="c-modal-item__button"
          data-testid="newTask"
          onClick={() => {
            dispatch(actions.createTaskAsync(new Task(title, detail)));
          }}
        >
          追加
        </div>
      </div>
    </Modal>
  );
};
export default NewTaskModal;
