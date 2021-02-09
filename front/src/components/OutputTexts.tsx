import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../action/actions";
import { CombinedState, State } from "../types";
import OutputTextItem from "./OutputTextItem";

const OutputTexts: FC = () => {
  const states = useSelector<CombinedState, State[]>(
    (state) => state.data.states
  );
  const dispatch = useDispatch();
  return (
    <div className="c-sidebar c-content__side">
      {states.map((stateObj) => (
        <div className="c-output-text-box c-sidebar__box">
          <h3 className="c-output-text-box__title">未処理</h3>
          <OutputTextItem stateObj={stateObj} />
        </div>
      ))}
      <div
        className="c-new-text-button c-output-text-box__button"
        onClick={() => {
          dispatch(actions.openNewOutputTextModal());
        }}
      >
        新規テキスト
      </div>
    </div>
  );
};
export default OutputTexts;
