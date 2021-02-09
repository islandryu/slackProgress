import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "../components/Board";
import NewTaskModal from "../components/NewTaskModal";
import Buttons from "../components/Buttons";
import { FC } from "react";
import NewOutputTextModal from "../components/NewOutputTextModal";
import OutputTexts from "../components/OutputTexts";
import { useSelector } from "react-redux";
import { CombinedState, State } from "../types";

const ManageTask: FC = () => {
  const states = useSelector<CombinedState, State[]>(
    (state) => state.data.states
  );
  return (
    <DndProvider backend={HTML5Backend}>
      <h1 className="c-pagetitle l-main__tilte">タスク管理画面</h1>
      <div className="c-content">
        <OutputTexts />
        <div className="c-content__center">
          <span className="c-content__description">
            ※ドラッグ＆ドロップで移動できます。
          </span>
          <div className="c-boards c-content__board">
            {states.map((stateObj) => (
              <Board stateNum={stateObj.id} title={stateObj.name}></Board>
            ))}
          </div>
          <Buttons />
        </div>
      </div>
      <NewTaskModal />
      <NewOutputTextModal />
    </DndProvider>
  );
};
export default ManageTask;
