import { Modal } from "@material-ui/core";
import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../action/actions";
import { CombinedState, State } from "../types";
import closeBtn from "../images/close.svg";

const NewOutputTextModal: FC = () => {
  const dispatch = useDispatch();
  const isOpen: boolean = useSelector<CombinedState, boolean>(
    (state) => state.data.newOutputTextModalIsOpen
  );
  const states: State[] = useSelector<CombinedState, State[]>(
    (state) => state.data.states
  );
  const [outputText, setOutputText] = useState<string>("");
  const [selectedStateId, setSelectedStateId] = useState<number>(
    states[0]?.id ? states[0].id : 1
  );
  return (
    <Modal open={isOpen}>
      <>
        <div className="l-modal__content c-modal-item">
          <h2 className="c-modal-item__title">新規テキスト</h2>
          <div
            className="c-modal-item__close c-closebtn"
            data-testid="closeNewTaskModal"
            onClick={() => {
              dispatch(actions.closeNewOutputTextModal());
            }}
          >
            <img src={closeBtn} alt="" className="c-closebtn__image" />
          </div>
          <div className="c-modal-form c-modal-item__form">
            <input
              type="text"
              className="c-modal-form__text"
              value={outputText}
              onChange={(e) => setOutputText(e.target.value)}
              placeholder="タイトル"
            />
            <select
              className="c-modal-form__select"
              value={selectedStateId}
              onChange={(e) => setSelectedStateId(Number(e.target.value))}
            >
              {states.map((state) => (
                <option
                  key={state.id}
                  value={state.id}
                  selected={state.id === selectedStateId}
                >
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div
            className="c-modal-item__button"
            data-testid="newTask"
            onClick={() => {
              dispatch(
                actions.createOutputTextAsync({
                  outputText,
                  stateId: selectedStateId,
                })
              );
            }}
          >
            追加
          </div>
        </div>
      </>
    </Modal>
  );
};
export default NewOutputTextModal;
