import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../action/actions";
import { CombinedState, OutputText, State } from "../types";

const OutputTextItem: FC<{ stateObj: State }> = ({ stateObj }) => {
  const dispatch = useDispatch();
  const outputTexts = useSelector<CombinedState, OutputText[]>((state) =>
    state.data.outputTexts.filter(
      (outputText) => outputText.stateId === stateObj.id
    )
  );

  return (
    <div className="c-output-text-box__box">
      {outputTexts.map((outputText) => (
        <>
          <label className="c-output-text-box__text">
            {outputText.text}
            <input
              type="radio"
              name="hyouka"
              value="good"
              checked={stateObj.selectedOutputTextId === outputText.id}
              onChange={() =>
                dispatch(
                  actions.setSelectedOutputText({
                    stateId: stateObj.id,
                    outputTextId: outputText.id,
                  })
                )
              }
            />
          </label>
        </>
      ))}
    </div>
  );
};

export default OutputTextItem;
