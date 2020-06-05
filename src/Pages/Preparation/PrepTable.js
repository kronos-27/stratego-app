import React from "react";
//import { Board } from "../Game/Board";

import { useSelector } from "react-redux";
import { UnitClick } from "../../Redux/Actions";
import { useDispatch } from "react-redux";

export const PrepTable = () => {
  const dispatch = useDispatch();
  function handleClick(_id, _symbol) {
    const src = {
      id: _id,
      symbol: _symbol,
      source: "Table",
    };
    dispatch(UnitClick(src));
  }
  const playerId = useSelector((state) => state.LogicReducer.playerId);
  const baseBoard = useSelector((state) => state.PrepReducer.board);
  const selectedCell = useSelector((state) =>
    state.PrepReducer.src ? state.PrepReducer.src : 1
  );
  const board = [];
  let sum = 0;
  for (let i = 0; i < 6; i++) {
    const CellRows = [];
    for (let j = 0; j < 6; j++) {
      sum += baseBoard[i * 6 + j].id;
      CellRows.push(
        <button
          className={
            " Cell2 " +
            (selectedCell.id === baseBoard[i * 6 + j].id &&
            selectedCell.source === "Table"
              ? " Selected "
              : "") +
            (playerId === 1
              ? baseBoard[i * 6 + j].id < 24
                ? " disabled "
                : ""
              : baseBoard[i * 6 + j].id > 11
              ? " disabled "
              : "")
          }
          key={baseBoard[i * 6 + j].id}
          onClick={() =>
            handleClick(baseBoard[i * 6 + j].id, baseBoard[i * 6 + j].symbol)
          }
        >
          {baseBoard[i * 6 + j].player === playerId
            ? baseBoard[i * 6 + j].symbol
            : ""}
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
  return <div>{board}</div>;
};
