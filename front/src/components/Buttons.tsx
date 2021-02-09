import { useDispatch } from "react-redux";
import actions from "../action/actions";

const Buttons = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div
        onClick={() => {
          dispatch(actions.openNewTaskModal());
        }}
        className="l-main__button c-new-task-button"
      >
        新規タスク
      </div>
    </>
  );
};

export default Buttons;
