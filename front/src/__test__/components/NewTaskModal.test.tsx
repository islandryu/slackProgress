import React from "react";
import Provider from "./Provider";
import NewTaskModal from "../../components/NewTaskModal";
import {} from "react-dnd-test-backend";
import Enzyme from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import store from "../../store/store";
import actions from "../../action/actions";

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});
const sel = (id: string) => `[data-testid="${id}"]`;
describe("NewTaskModal", () => {
  beforeEach(() => {
    store.dispatch(actions.resetDataState());
  });
  it("create new task", () => {
    store.dispatch(actions.openNewTaskModal());
    const root = Enzyme.mount(
      <Provider>
        <NewTaskModal />
      </Provider>
    );
    const newTaskButton = root.find(sel("newTask"));
    newTaskButton.simulate("click");
    expect(store.getState().data.tasks.length).toBe(1);
  });
  it("close NewTaskModal", () => {
    store.dispatch(actions.openNewTaskModal());
    const root = Enzyme.mount(
      <Provider>
        <NewTaskModal />
      </Provider>
    );
    const closeNewTaskModalButton = root.find(sel("closeNewTaskModal"));
    closeNewTaskModalButton.simulate("click");
    expect(store.getState().data.newTaskModalIsOpen).not.toBeTruthy();
  });
});
