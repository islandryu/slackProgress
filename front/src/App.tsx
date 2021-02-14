import { FC } from "react";
import { Route, Router } from "react-router-dom";
import Home from "./page/Home";
import ManageTask from "./page/ManageTask";
import { history } from "./store/store";

const App: FC = () => {
  return (
    <>
      <Router history={history}>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/manageTask" render={() => <ManageTask />} />
      </Router>
    </>
  );
};
export default App;
