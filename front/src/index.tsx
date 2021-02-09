import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider, ReactReduxContext } from "react-redux";
import store, { history } from "./store/store";
import "./sass/index.scss";
import { ConnectedRouter } from "connected-react-router";
import App from "./App";
import authActions from "./action/authAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

store.dispatch(authActions.checkAuthenticated());
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} context={ReactReduxContext}>
      <ConnectedRouter history={history} context={ReactReduxContext}>
        <ReactNotification />
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
