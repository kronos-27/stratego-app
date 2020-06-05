export const PrepReducer = (state = [], action) => {
  //const boardArray = Array.from(newState.board);
  switch (action.type) {
    case "UNITCLICK":
      const newState = { ...state };
      const boardArray = Array.from(newState.board);
      const unitArray = Array.from(newState.units);
      if (action.payload.symbol !== null) {
        newState.src = action.payload;
      } else if (newState.src !== null) {
        if (action.payload.source === "Storage") {
          unitArray.map((cell) => {
            if (cell.id === action.payload.id) {
              cell.symbol = newState.src.symbol;
            }
            return cell;
          });
        }
        if (action.payload.source === "Table") {
          boardArray.map((cell) => {
            if (cell.id === action.payload.id) {
              cell.symbol = newState.src.symbol;
              cell.player = newState.playerId;
            }
            return cell;
          });
        }
        if (newState.src.source === "Storage") {
          unitArray.map((cell) => {
            if (cell.id === newState.src.id) {
              cell.symbol = null;
            }
            return cell;
          });
        }
        if (newState.src.source === "Table") {
          boardArray.map((cell) => {
            if (cell.id === newState.src.id) {
              cell.symbol = null;
              cell.player = null;
            }
            return cell;
          });
        }
        newState.src = null;
      }
      const readyArray = newState.units.filter(
        (element) => element.symbol === null
      );
      if (readyArray.length === 12) {
        newState.ready = true;
      } else {
        newState.ready = false;
      }
      return newState;
    case "CREATEROOM":
      const creationState = { ...state };
      creationState.playerId = 1;
      return creationState;
    case "JOINROOM":
      const joiningState = { ...state };
      if (action.payload.status === "ok") {
        joiningState.playerId = 2;
      }
      return joiningState;
    default:
      return state;
  }
};
