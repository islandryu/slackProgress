import fetchMock from "fetch-mock";
import store from "../../store/store";
import actions from "../../action/actions";
import Task from "../../helper/task";
import { InitialValueResponse } from "../../types";

describe("action", () => {
  beforeEach(() => {
    store.dispatch(actions.resetDataState);
  });
  it("should handle createTaskAsync", async () => {
    fetchMock.post("http://" + window.location.host + "/api/task", {
      status: 200,
      body: JSON.stringify({
        id: 1,
      }),
    });
    await store.dispatch(actions.createTaskAsync(new Task("hoge", "fuga")));
    const state = store.getState();
    expect(state.data.tasks.length).toBe(1);
    expect(state.data.tasks[0].id).toBe(1);
  });
  it("should handle CreateOuputTextAsync", async () => {
    fetchMock.post("http://" + window.location.host + "/api/task", {
      status: 200,
      body: JSON.stringify({
        id: 1,
      }),
    });
    await store.dispatch(
      actions.createOutputTextAsync({ outputText: "hoge", stateId: 1 })
    );
    const state = store.getState();
    expect(state.data.outputTexts.length).toBe(1);
    expect(state.data.outputTexts[0].id).toBe(1);
    expect(state.data.outputTexts[0].text).toBe("hoge");
  });
  it("should handle setInitialValueAsync", async () => {
    const task = { title: "fuga", detail: "bar", state_id: 2, id: 2 };
    const outputText = { text: "hoge", state_id: 1, id: 1 };
    const state1 = { name: "hoo", id: 1 };
    const state2 = { name: "boo", id: 2 };
    const response: InitialValueResponse = {
      outputTexts: [outputText],
      tasks: [task],
      states: [state1, state2],
    };
    fetchMock.get("http://" + window.location.host + "/api/initialValue", {
      status: 200,
      body: JSON.stringify(response),
    });
    await store.dispatch(actions.setInitialValueAsync());
    const state = store.getState();
    expect(state.data.tasks.length).toBe(1);
    const expectedTask = new Task(task.title, task.detail, task.state_id);
    expectedTask.setId(task.id);
    expect(state.data.tasks[0]).toMatchObject({ title: task.title });
    expect(state.data.tasks[0]).toMatchObject({ id: task.id });
    expect(state.data.outputTexts.length).toBe(1);
    expect(state.data.outputTexts[0]).toMatchObject({ text: outputText.text });
    expect(state.data.states.length).toBe(2);
    expect(state.data.states[0]).toMatchObject({ name: state1.name });
    expect(state.data.states[1]).toMatchObject({ name: state2.name });
  });
});
