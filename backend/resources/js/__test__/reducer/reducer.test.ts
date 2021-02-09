import actions from "../../action/actions";
import Task from "../../helper/task";
import reducer from "../../reducer/reducer";

describe('reducer', () => {
    beforeEach(()=>{
        reducer(undefined,actions.resetDataState());
    });
    it('should handle createTask', () => {
        const task = new Task("test1","test1");
        const newState = reducer(undefined,actions.createTask(task))
        expect(newState.tasks.length).toBe(1);
        expect(newState.tasks[0]).toBe(task);
    });
    it('should handle updateTask', () => {
        const task = new Task("test2","test2");
        let newState = reducer(undefined,actions.createTask(task))
        expect(newState.tasks.length).toBe(1);
        newState = reducer(newState,actions.updateTask(1));
        expect(newState.tasks[0].state).toBe(1);
    });
});