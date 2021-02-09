import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./store/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from './components/Board';
import NewTaskModal from './components/NewTaskModal';
import Buttons from './components/Buttons';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className="l-main">
          <h1 className="c-pagetitle l-main__title">タスク管理画面</h1>
          <div className="c-boards l-main__boards">
            <Board stateNum={0} title={"未処理"}></Board>
            <Board stateNum={1} title={"処理中"}></Board>
            <Board stateNum={2} title={"処理済み"}></Board>
          </div>
            <NewTaskModal></NewTaskModal>
            <Buttons></Buttons>
        </div>
      </DndProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
