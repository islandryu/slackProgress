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
import fetchMock from "fetch-mock";

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});
const sel = (id: string) => `[data-testid="${id}"]`;

fetchMock.post("http://" + window.location.host + "/api/task", {
  status: 200,
});

describe("Task component", () => {
  beforeEach(() => {
    store.dispatch(actions.resetDataState());
  });
  it("set activeTask when begin drag", async () => {
    const task = new TaskClass("test", "test");
    await store.dispatch(actions.createTaskAsync(task));
    const ref = React.createRef();
    const TaskContext = wrapInTestContext(Task);
    const root = Enzyme.mount(
      <Provier>
        <TaskContext task={task} ref={ref} />
      </Provier>
    );
    const taskComponent = root.find(sel("task"));
    const backend: ITestBackend = (ref.current as any)
      .getManager()
      .getBackend();
    backend.simulateBeginDrag([taskComponent.prop("data-monitorid")]);
    expect(store.getState().data.activeTask).toBe(task);
  });
  it("unset activeTask when end drag", async () => {
    const task = new TaskClass("test", "test");
    store.dispatch(actions.createTaskAsync(task));
    const ref = React.createRef();
    const TaskContext = wrapInTestContext(Task);
    const root = Enzyme.mount(
      <Provier>
        <TaskContext task={task} ref={ref} />
      </Provier>
    );
    const taskComponent = root.find(sel("task"));
    const backend: ITestBackend = (ref.current as any)
      .getManager()
      .getBackend();
    backend.simulateBeginDrag([taskComponent.prop("data-monitorid")]);
    expect(store.getState().data.activeTask).toBe(task);
    backend.simulateEndDrag();
    expect(store.getState().data.activeTask).toBeUndefined();
  });
  it("dose not unset activeTask when drop", async () => {
    const task = new TaskClass("test", "test");
    store.dispatch(actions.createTaskAsync(task));
    const ref = React.createRef();
    const TaskContext = wrapInTestContext(Task);
    const root = Enzyme.mount(
      <Provier>
        <TaskContext task={task} ref={ref} />
      </Provier>
    );
    const taskComponent = root.find(sel("task"));
    const backend: ITestBackend = (ref.current as any)
      .getManager()
      .getBackend();
    backend.simulateBeginDrag([taskComponent.prop("data-monitorid")]);
    expect(store.getState().data.activeTask).toBe(task);
    backend.simulateDrop();
    expect(store.getState().data.activeTask).toBe(task);
  });
});
