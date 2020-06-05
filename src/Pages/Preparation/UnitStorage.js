import React from "react";
import { useSelector } from "react-redux";
import { UnitClick } from "../../Redux/Actions";
import { useDispatch } from "react-redux";

export const UnitStorage = () => {
  const dispatch = useDispatch();
  function handleClick(_id, _symbol) {
    const src = {
      id: _id,
      symbol: _symbol,
      source: "Storage",
    };
    dispatch(UnitClick(src));
  }
  const playerId = useSelector((state) => state.LogicReducer.playerId);
  const unitTable = useSelector((state) => state.PrepReducer.units);
  const selectedCell = useSelector((state) =>
    state.PrepReducer.src && state.PrepReducer.src.source === "Storage"
      ? state.PrepReducer.src.id
      : null
  );

  const board = [];
  let sum = 0;
  for (let i = 0; i < 6; i++) {
    const CellRows = [];
    for (let j = 0; j < 2; j++) {
      sum += unitTable[i * 2 + j].id;
      CellRows.push(
        <button
          className={
            "Cell2 player" +
            playerId +
            (selectedCell === unitTable[i * 2 + j].id ? " Selected" : "")
          }
          key={unitTable[i * 2 + j].id}
          onClick={() =>
            handleClick(unitTable[i * 2 + j].id, unitTable[i * 2 + j].symbol)
          }
        >
          {unitTable[i * 2 + j].symbol}
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
