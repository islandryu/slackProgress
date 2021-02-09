import React, { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { DndProvider } from "react-dnd";
import store from "../../store/store";
import ReactDnDTestBackend from "react-dnd-test-backend";

const Provider: FC = ({ children }) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};
export default Provider;
