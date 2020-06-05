import React from "react";
import { Board } from "./Board";
//import { Graveyard } from "./Graveyard";
import { useSelector, useDispatch } from "react-redux";
import { LeaveRoomRequest } from "../../Redux/Actions";

export const Game = () => {
  const dispatch = useDispatch();
  const currentPlayer = useSelector(
    (state) => state.LogicReducer.currentPlayer
  );
  const winner = useSelector((state) => state.LogicReducer.winner);
  const roomId = useSelector((state) => state.LogicReducer.roomId);
  if (winner === 1) {
    return (
      <div className="container">
        <h1 className="lobbyId">Blue Wins</h1>
        <button
          className="baseBtn"
          onClick={() => dispatch(LeaveRoomRequest(roomId))}
        >
          Leave Game
        </button>
      </div>
    );
  } else if (winner === 2) {
    return (
      <div className="container">
        <h1 className="lobbyId">Red Wins</h1>
        <button
          className="baseBtn"
          onClick={() => dispatch(LeaveRoomRequest(roomId))}
        >
          Leave Game
        </button>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="Main">
          <div className="game">
            <div className="game-board">
              <Board />
            </div>
          </div>
          <div className="container2 pushdown left">
            <h2>Current Player: </h2>
            <button className={"Cell2 player" + currentPlayer}>
              {currentPlayer}
            </button>
          </div>
        </div>
      </div>
    );
  }
};
