export const LogicReducer = (state = [], action) => {
  switch (action.type) {
    case "CELLCLICK":
      const newState = { ...state };
      if (
        !newState.otherReady ||
        newState.currentPlayer !== newState.playerId
      ) {
        return newState;
      } else {
        const boardArray = Array.from(newState.board);
        if (newState.srcSelect) {
          if (
            action.payload.symbol &&
            newState.currentPlayer === action.payload.player &&
            action.payload.symbol !== "B" &&
            action.payload.symbol !== "F"
          ) {
            newState.src = action.payload;
            newState.srcSelect = false;
            if (newState.src.symbol === 2) {
              for (let i = 1; i <= 6; i++) {
                if (
                  boardArray[newState.src.id + i * 6]
                    ? boardArray[newState.src.id + i * 6].player !==
                      newState.currentPlayer
                    : false &&
                      Math.floor(newState.src.id % 6) ===
                        Math.floor((newState.src.id + i * 6) % 6)
                )
                  newState.validDst.push(newState.src.id + i * 6);
                if (
                  boardArray[newState.src.id - 6]
                    ? boardArray[newState.src.id - 6].player !==
                      newState.currentPlayer
                    : false &&
                      Math.floor(newState.src.id % 6) ===
                        Math.floor((newState.src.id - i * 6) % 6)
                )
                  newState.validDst.push(newState.src.id - i * 6);
                if (
                  (boardArray[newState.src.id + i * 1]
                    ? boardArray[newState.src.id + i * 1].player !==
                      newState.currentPlayer
                    : false) &&
                  Math.floor(newState.src.id / 6) ===
                    Math.floor((newState.src.id + i * 1) / 6)
                ) {
                  newState.validDst.push(newState.src.id + i * 1);
                }
                if (
                  (boardArray[newState.src.id - i * 1]
                    ? boardArray[newState.src.id - i * 1].player !==
                      newState.currentPlayer
                    : false) &&
                  Math.floor(newState.src.id / 6) ===
                    Math.floor((newState.src.id - i * 1) / 6)
                ) {
                  newState.validDst.push(newState.src.id - i * 1);
                }
              }
            } else {
              if (
                boardArray[newState.src.id + 6]
                  ? boardArray[newState.src.id + 6].player !==
                    newState.currentPlayer
                  : false &&
                    Math.floor(newState.src.id % 6) ===
                      Math.floor((newState.src.id + 1) % 6)
              )
                newState.validDst.push(newState.src.id + 6);
              if (
                boardArray[newState.src.id - 6]
                  ? boardArray[newState.src.id - 6].player !==
                    newState.currentPlayer
                  : false &&
                    Math.floor(newState.src.id % 6) ===
                      Math.floor((newState.src.id + 1) % 6)
              )
                newState.validDst.push(newState.src.id - 6);
              if (
                (boardArray[newState.src.id + 1]
                  ? boardArray[newState.src.id + 1].player !==
                    newState.currentPlayer
                  : false) &&
                Math.floor(newState.src.id / 6) ===
                  Math.floor((newState.src.id + 1) / 6)
              ) {
                newState.validDst.push(newState.src.id + 1);
              }
              if (
                (boardArray[newState.src.id - 1]
                  ? boardArray[newState.src.id - 1].player !==
                    newState.currentPlayer
                  : false) &&
                Math.floor(newState.src.id / 6) ===
                  Math.floor((newState.src.id - 1) / 6)
              ) {
                newState.validDst.push(newState.src.id - 1);
              }
            }
          }
        } else {
          if (newState.src.id === action.payload.id) {
            newState.src = null;
            newState.validDst = null;
            newState.srcSelect = true;
          } else {
            newState.dst = action.payload;
            const isAttack = action.payload.symbol ? true : false;
            if (newState.validDst.includes(newState.dst.id)) {
              boardArray.map((cell) => {
                if (cell.id === newState.dst.id) {
                  if (isAttack) {
                    if (Number.isInteger(cell.symbol)) {
                      if (newState.src.symbol === 1 && cell.symbol === 10) {
                        if (cell.player === 1) {
                          newState.player1Grave.push(cell.symbol);
                        } else {
                          newState.player2Grave.push(cell.symbol);
                        }
                        cell.symbol = newState.src.symbol;
                        cell.player = newState.src.player;
                      } else if (
                        newState.src.symbol === 10 &&
                        cell.symbol === 1
                      ) {
                        if (newState.src.player === 1) {
                          newState.player1Grave.push(newState.src.symbol);
                        } else {
                          newState.player2Grave.push(newState.src.symbol);
                        }
                        newState.src.symbol = null;
                        newState.src.player = null;
                      } else if (newState.src.symbol > cell.symbol) {
                        if (cell.player === 1) {
                          newState.player1Grave.push(cell.symbol);
                        } else {
                          newState.player2Grave.push(cell.symbol);
                        }
                        cell.symbol = newState.src.symbol;
                        cell.player = newState.src.player;
                        //TODO ADD CELL SYMBOL TO GRAVEYARD
                      } else if (newState.src.symbol < cell.symbol) {
                        if (newState.src.player === 1) {
                          newState.player1Grave.push(newState.src.symbol);
                        } else {
                          newState.player2Grave.push(newState.src.symbol);
                        }
                        newState.src.symbol = null;
                        newState.src.player = null;
                      } else {
                        if (newState.currentPlayer === 1) {
                          newState.player2Grave.push(cell.symbol);
                          newState.player1Grave.push(newState.src.symbol);
                        } else {
                          newState.player1Grave.push(cell.symbol);
                          newState.player2Grave.push(newState.src.symbol);
                        }
                        newState.src.symbol = null;
                        newState.src.player = null;
                        cell.symbol = null;
                        cell.player = null;
                      }
                    } else if (
                      newState.src.symbol === 3 &&
                      cell.symbol === "B"
                    ) {
                      cell.symbol = newState.src.symbol;
                      cell.player = newState.src.player;
                    } else if (cell.symbol === "F") {
                      cell.symbol = newState.src.symbol;
                      cell.player = newState.src.player;
                      newState.winner = newState.src.player;
                    }
                  } else {
                    cell.symbol = newState.src.symbol;
                    cell.player = newState.src.player;
                  }
                }
                if (cell.id === newState.src.id) {
                  cell.symbol = null;
                  cell.player = null;
                }
                return cell;
              });
              newState.dst = null;
              newState.src = null;
              newState.currentPlayer === 1
                ? (newState.currentPlayer = 2)
                : (newState.currentPlayer = 1);
              newState.validDst = [];
              newState.srcSelect = true;
            }
          }
        }
        return newState;
      }
    case "CREATEROOM":
      const creationState = { ...state };
      creationState.roomId = action.payload;
      creationState.playerId = 1;
      return creationState;
    case "JOINROOM":
      const joiningState = { ...state };
      if (action.payload.status === "ok") {
        joiningState.roomId = action.payload.id;
        joiningState.playerId = 2;
      } else {
        joiningState.roomId = null;
      }
      return joiningState;
    case "READY":
      const readyState = { ...state };
      for (let i = 0; i < readyState.board.length; i++) {
        if (readyState.board[i].symbol === null) {
          readyState.board[i] = action.payload.LogicReducer.board[i];
        }
      }
      readyState.otherReady = true;
      return readyState;
    case "SYNCSTATES":
      const syncState = { ...state };
      syncState.board = action.payload.LogicReducer.board;
      syncState.currentPlayer = action.payload.LogicReducer.currentPlayer;
      syncState.winner = action.payload.LogicReducer.winner;
      return syncState;
    default:
      return state;
  }
};
