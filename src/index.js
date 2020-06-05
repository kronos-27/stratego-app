import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { baseState } from "./Redux/InitLogic";
import { PrepState } from "./Redux/InitLogic";
import { RootReducer } from "./Redux/RootReducer";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { JoinReciver, StateReciver } from "./Redux/Actions";

const history = createBrowserHistory();

const InitalState = {
  PrepReducer: PrepState,
  LogicReducer: baseState,
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  RootReducer(history),
  InitalState,
  composeEnhancer(applyMiddleware(routerMiddleware(history), thunk))
);

store.dispatch(JoinReciver());
store.dispatch(StateReciver());

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById("root")
);
