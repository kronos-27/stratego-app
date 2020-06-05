import React from "react";
import { Link } from "react-router-dom";
import { PrepTable } from "./PrepTable";
import { UnitStorage } from "./UnitStorage";
import { useSelector, useDispatch } from "react-redux";
import { SyncReady } from "../../Redux/Actions";

export const Preparation = () => {
  const dispatch = useDispatch();
  const isReady = useSelector((state) => state.PrepReducer.ready);
  const roomId = useSelector((state) => state.LogicReducer.roomId);
  const state = useSelector((state) => (state !== null ? state : null));
  return (
    <div className="flex-container">
      <div className="Tables">
        <PrepTable></PrepTable>
      </div>
      <div className="Tables">
        <UnitStorage></UnitStorage>
      </div>
      <div className="Reminder">
        <h1>Reminder</h1>
        <ul>
          <li>
            <b>1</b> : can defeat the opponent's 10
          </li>
          <li>
            <b>2</b> : can move any number of steps
          </li>
          <li>
            <b>3</b> : can defeat a Bomb
          </li>
          <li>
            <b>Bomb</b> : can defeat any non 3 unit{" "}
          </li>
          <li>
            <b>Flag</b> : the game's objective
          </li>
        </ul>

        <button
          //disabled={!isReady}
          onClick={() => {
            dispatch(SyncReady(roomId, state));
          }}
          className={"baseBtn tbtn rdBtn " + (!isReady ? " disabled" : "")}
        >
          Ready
        </button>

        <Link to="/">
          <button className="baseBtn tbtn">Back</button>
        </Link>
      </div>
    </div>
  );
};
