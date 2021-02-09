import { Modal } from "@material-ui/core";
import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../action/actions";
import Task from "../helper/task";
import { CombinedState, State } from "../types";

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
        <input
          type="text"
          value={outputText}
          onChange={(e) => setOutputText(e.target.value)}
          placeholder="タイトル"
        />
        <select
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
        <button
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
          作成
        </button>
        <button
          data-testid="closeNewTaskModal"
          onClick={() => {
            dispatch(actions.closeNewOutputTextModal());
          }}
        >
          閉じる
        </button>
      </>
    </Modal>
  );
};
export default NewOutputTextModal;
