import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SyncState } from "../../Redux/Actions";

export const Board = () => {
  const dispatch = useDispatch();

  function handleClick(_id, _symbol, _player, roomId, state) {
    const src = {
      id: _id,
      symbol: _symbol,
      player: _player,
    };
    dispatch(SyncState(roomId, state, src));
  }
  const state = useSelector((state) => (state !== null ? state : null));
  const playerId = useSelector((state) => state.LogicReducer.playerId);
  const roomId = useSelector((state) => state.LogicReducer.roomId);
  const baseBoard = useSelector((state) => state.LogicReducer.board);
  const selectedCell = useSelector((state) =>
    state.LogicReducer.src ? state.LogicReducer.src.id : null
  );
  const Valid = useSelector((state) =>
    state.LogicReducer.validDst ? state.LogicReducer.validDst : []
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
            "Cell" +
            (selectedCell === baseBoard[i * 6 + j].id ? " Selected" : "") +
            (baseBoard[i * 6 + j].player === 1
              ? " player1"
              : baseBoard[i * 6 + j].player === 2
              ? " player2"
              : "") +
            (Valid.includes(baseBoard[i * 6 + j].id) ? " Valid" : "")
          }
          key={baseBoard[i * 6 + j].id}
          onClick={() =>
            handleClick(
              baseBoard[i * 6 + j].id,
              baseBoard[i * 6 + j].symbol,
              baseBoard[i * 6 + j].player,
              roomId,
              state
            )
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
  return (
    <div>
      <div>{board}</div>
    </div>
  );
};
