import Provier from "./Provider";
import React from "react";
import Task from "../../components/Task";
import { wrapInTestContext } from "react-dnd-test-utils";
import TaskClass from "../../helper/task";
import store from "../../store/store";
import actions from "../../action/actions";
import Enzyme from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import { ITestBackend } from "react-dnd-test-backend";

Enzyme.configure({
    adapter:new EnzymeAdapter(),
});
const sel = (id:string) => `[data-testid="${id}"]`;
describe('Task component', () => {
    
    beforeEach(()=>{
        store.dispatch(actions.resetDataState());
    })
    it('set activeTask when begin drag', () => {
        const task = new TaskClass("test","test");
        store.dispatch(actions.createTask(task));
        const ref = React.createRef();
        const TaskContext = wrapInTestContext(Task)
        const root = Enzyme.mount(<Provier><TaskContext task={task} ref={ref}/></Provier>) 
        const taskComponent = root.find(sel("task"));
        const backend:ITestBackend = (ref.current as any).getManager().getBackend();
        backend.simulateBeginDrag([taskComponent.prop("data-monitorid")]);
        expect(store.getState().activeTask).toBe(task);
    });
    it('unset activeTask when end drag',()=>{
        const task = new TaskClass("test","test");
        store.dispatch(actions.createTask(task));
        const ref = React.createRef();
        const TaskContext = wrapInTestContext(Task)
        const root = Enzyme.mount(<Provier><TaskContext task={task} ref={ref}/></Provier>) 
        const taskComponent = root.find(sel("task"));
        const backend:ITestBackend = (ref.current as any).getManager().getBackend();
        backend.simulateBeginDrag([taskComponent.prop("data-monitorid")]);
        expect(store.getState().activeTask).toBe(task);
        backend.simulateEndDrag();
        expect(store.getState().activeTask).toBeUndefined();
    });
    it('dose not unset activeTask when drop',()=>{
        const task = new TaskClass("test","test");
        store.dispatch(actions.createTask(task));
        const ref = React.createRef();
        const TaskContext = wrapInTestContext(Task)
        const root = Enzyme.mount(<Provier><TaskContext task={task} ref={ref}/></Provier>) 
        const taskComponent = root.find(sel("task"));
        const backend:ITestBackend = (ref.current as any).getManager().getBackend();
        backend.simulateBeginDrag([taskComponent.prop("data-monitorid")]);
        expect(store.getState().activeTask).toBe(task);
        backend.simulateDrop();
        expect(store.getState().activeTask).toBe(task);
    });
});