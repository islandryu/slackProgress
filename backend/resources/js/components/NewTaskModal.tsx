import { Modal } from "@material-ui/core";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../action/actions";
import Task from "../helper/task";
import { dataState } from "../reducer/reducer";

const NewTaskModal:FC = () => {
    const dispatch = useDispatch();
    const isOpen:boolean = useSelector<dataState,boolean>(state=>state.newTaskModalIsOpen);
    return(
        <Modal
            open={isOpen}
            >
                <>
                <button
                    data-testid="newTask"
                    onClick={()=>{dispatch(actions.createTask(new Task("test","test")))}}
                >作成</button>
                <button
                    data-testid="closeNewTaskModal"
                    onClick={()=>{dispatch(actions.closeNewTaskModal())}}
                >閉じる</button>
                </>
        </Modal>
    )
}
export default NewTaskModal;
