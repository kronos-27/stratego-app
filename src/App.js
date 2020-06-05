import React from "react";
import "./App.css";
import { Main } from "./Pages/Main/Main";
import { Waiting } from "./Pages/Waiting/Waiting";
import { Switch, Route } from "react-router-dom";
import { Game } from "./Pages/Game/Game";
import { Preparation } from "./Pages/Preparation/Preparation";
import { ConnectedRouter } from "connected-react-router";

function App({ history }) {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/Waiting" exact>
            <Waiting></Waiting>
          </Route>
          <Route path="/Preparation" exact>
            <Preparation></Preparation>
          </Route>
          <Route path="/Game" exact>
            <Game></Game>
          </Route>
          <Route path="/">
            <Main></Main>
          </Route>
        </Switch>
      </ConnectedRouter>
    </div>
  );
}

export default App;
