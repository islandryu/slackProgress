import actions from "../../action/actions";
import Task from "../../helper/task";
import reducer, { DataState } from "../../reducer/reducer";
import combinedReducer from "../../store/store";

describe("reducer", () => {
  beforeEach(() => {
    reducer(undefined, actions.resetDataState());
  });
  it("shoud handle setSelectedOutputText", () => {
    const testState: DataState = {
      tasks: [],
      activeTask: undefined,
      newTaskModalIsOpen: false,
      states: [
        {
          id: 1,
          selectedOutputTextId: undefined,
          name: "hoge",
        },
        {
          id: 2,
          selectedOutputTextId: undefined,
          name: "hoge",
        },
      ],
      outputTexts: [],
      newOutputTextModalIsOpen: false,
    };
    let newState = reducer(
      testState,
      actions.setSelectedOutputText({ outputTextId: 1, stateId: 1 })
    );
    expect(newState.states[0].selectedOutputTextId).toBe(1);
    expect(newState.states[1].selectedOutputTextId).not.toBe(1);
    newState = reducer(
      newState,
      actions.setSelectedOutputText({ outputTextId: 2, stateId: 1 })
    );
    expect(newState.states[0].selectedOutputTextId).toBe(2);
  });
});
