import authActions from "../../action/authAction";
import fetchMock from "fetch-mock";
import store from "../../store/store";
import { InitialValueResponse } from "../../types";
import Task from "../../helper/task";
import actions from "../../action/actions";

describe("authAction", () => {
  beforeEach(() => {
    store.dispatch(authActions.resetAuthState);
    store.dispatch(actions.resetDataState);
  });
  it("should handle loginAsync", async () => {
    fetchMock.post("http://" + window.location.host + "/api/login", {
      status: 200,
      body: JSON.stringify({
        userName: "hoge",
      }),
    });
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
    await store.dispatch(
      authActions.loginAsync({
        email: "hoge@gmail.com",
        password: "hogehoge",
      })
    );
    const state = store.getState();
    expect(state.auth.isLogin).toBeTruthy();
    expect(state.auth.userName).toBe("hoge");
    expect(state.data.tasks.length).toBe(1);
  });
  it("should handle when failed login", async () => {
    fetchMock.post(
      "http://" + window.location.host + "/api/login",
      {
        status: 500,
        body: JSON.stringify({
          userName: "hoge",
        }),
      },
      { overwriteRoutes: true }
    );
    await store
      .dispatch(
        authActions.loginAsync({
          email: "hoge@gmail.com",
          password: "hogehoge",
        })
      )
      .catch(() => {
        const state = store.getState();
        expect(state.auth.isLogin).not.toBeTruthy();
        expect(state.auth.failLogin).toBeTruthy();
      });
  });

  it("should handle signupAsync", async () => {
    fetchMock.post("http://" + window.location.host + "/api/signup", {
      status: 200,
      body: JSON.stringify([]),
    });
    await store.dispatch(
      authActions.signupAsync({
        email: "hoge@gmail.com",
        password: "hogehoge",
        name: "hoge",
      })
    );
    const state = store.getState();
    expect(state.auth.isLogin).toBeTruthy();
    expect(state.auth.userName).toBe("hoge");
  });

  it("should handle when signup failed", async () => {
    fetchMock.post(
      "http://" + window.location.host + "/api/signup",
      {
        status: 400,
        body: JSON.stringify({
          userName: "hoge",
        }),
      },
      { overwriteRoutes: true }
    );
    await store
      .dispatch(
        authActions.signupAsync({
          email: "hoge@gmail.com",
          password: "hogehoge",
          name: "hoge",
        })
      )
      .catch(() => {
        const state = store.getState();
        expect(state.auth.isLogin).not.toBeTruthy();
        expect(state.auth.failSignup).toBeTruthy();
      });
  });

  it("should handle checkAuthenticated", async () => {
    const task = { title: "fuga", detail: "bar", state_id: 2, id: 2 };
    const outputText = { text: "hoge", state_id: 1, id: 1 };
    const state1 = { name: "hoo", id: 1 };
    const state2 = { name: "boo", id: 2 };
    const response: InitialValueResponse = {
      outputTexts: [outputText],
      tasks: [task],
      states: [state1, state2],
    };
    fetchMock.get(
      "http://" + window.location.host + "/api/initialValue",
      {
        status: 200,
        body: JSON.stringify(response),
      },
      { overwriteRoutes: true }
    );
    fetchMock.get("http://" + window.location.host + "/api/isAuthenticated", {
      status: 200,
      body: JSON.stringify({
        userName: "hoge",
      }),
    });
    await store.dispatch(authActions.checkAuthenticated());
    const state = store.getState();
    expect(state.auth.userName).toBe("hoge");
    expect(state.data.tasks.length).toBe(1);
  });
  it("should handle when no authenticated", async () => {
    fetchMock.get(
      "http://" + window.location.host + "/api/isAuthenticated",
      {
        status: 400,
        body: JSON.stringify({
          userName: "hoge",
        }),
      },
      { overwriteRoutes: true }
    );
    await store.dispatch(authActions.checkAuthenticated()).catch(() => {
      const state = store.getState();
      expect(state.auth.isLogin).not.toBeTruthy();
    });
  });
});
