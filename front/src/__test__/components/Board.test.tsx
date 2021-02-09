import React from "react";
import Enzyme from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import Provider from "./Provider";
import store from "../../store/store";
import actions from "../../action/actions";
import Task from "../../helper/task";
import Board from "../../components/Board";
import { DndProvider } from "react-dnd";
import { TestBackend } from "react-dnd-test-backend";
import fetchMock from "fetch-mock";

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});

const sel = (id: string) => `[data-testid="${id}"]`;
describe("Board", () => {
  beforeEach(() => {
    store.dispatch(actions.resetDataState);
  });
  it("display Task", async () => {
    fetchMock.post("http://" + window.location.host + "/api/task", {
      status: 200,
      body: JSON.stringify({
        id: 1,
      }),
    });
    const root = Enzyme.mount(
      <Provider>
        <DndProvider backend={TestBackend}>
          <Board stateNum={1} title={""} />
        </DndProvider>
      </Provider>
    );
    await store.dispatch(actions.createTaskAsync(new Task("hoge", "fuga")));
    const taskComponent = root.find(sel("task"));
    root.update();
    expect(taskComponent).toHaveLength(1);
  });
});
