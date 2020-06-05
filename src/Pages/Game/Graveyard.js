import React from "react";
import { useSelector } from "react-redux";

export const Graveyard = ({ player }) => {
  const unitTable = useSelector((state) =>
    state.LogicReducer.player1Grave ? state.LogicReducer.player1Grave : []
  );
  const board = [];
  let sum = 0;
  let key = 0;
  for (let i = 0; i < 6; i++) {
    const CellRows = [];
    for (let j = 0; j < 2; j++) {
      sum += key;
      CellRows.push(
        <button className={"Cell2 player" + player} key={key++}>
          {unitTable[0]}
        </button>
      );
    }
    board.push(
      <div key={sum} className="board-row">
        {CellRows}
      </div>
    );
    sum = 0;
  }
  return (
    <div>
      <h2>Player {player}'s Graveyard</h2>
      <div>{board}</div>
    </div>
  );
};
