import { PrepReducer } from "./PrepReducer";
import { LogicReducer } from "./LogicReducer";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
export const RootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    PrepReducer,
    LogicReducer,
  });
