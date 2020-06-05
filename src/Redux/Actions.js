import { WebSocket } from "../Socket";
import { push } from "connected-react-router";

export const CellClick = (src) => {
  return {
    type: "CELLCLICK",
    payload: src,
  };
};

export const UnitClick = (src) => {
  return {
    type: "UNITCLICK",
    payload: src,
  };
};

export const CreateRoom = (id) => {
  return {
    type: "CREATEROOM",
    payload: id,
  };
};

export const JoinRoom = (id, status) => {
  return {
    type: "JOINROOM",
    payload: { id, status },
  };
};

export const Ready = (state) => {
  return {
    type: "READY",
    payload: state,
  };
};

export const SyncStates = (state) => {
  return {
    type: "SYNCSTATES",
    payload: state,
  };
};

export function CreateRoomRequest() {
  return (dispatch) => {
    WebSocket.createRoom((resp) => {
      dispatch(CreateRoom(resp.roomId));
      if (resp.status === "ok") {
        dispatch(push("/Waiting"));
      }
    });
  };
}

export function JoinRoomRequest(roomId) {
  return (dispatch) => {
    WebSocket.joinRoom(roomId, (resp) => {
      dispatch(JoinRoom(roomId, resp.status));
      if (resp.status === "ok") {
        dispatch(push("/Preparation"));
      }
    });
  };
}

export function LeaveRoomRequest(roomId) {
  return (dispatch) => {
    WebSocket.leaveRoom(roomId, (resp) => {
      if (resp.status === "ok") {
        dispatch(push("/"));
      }
    });
  };
}

export function SyncReady(roomId, state) {
  return (dispatch) => {
    WebSocket.syncState(roomId, state, (resp) => {
      dispatch(push("/Game"));
    });
  };
}

export function SyncState(roomId, state, src) {
  return (dispatch, getState) => {
    dispatch(CellClick(src));
    const newState = getState();
    setTimeout(() => {
      WebSocket.syncState(roomId, newState, () => {});
    }, 100);
  };
}

export function JoinReciver() {
  return (dispatch) => {
    WebSocket.joinReciver((resp) => {
      dispatch(push("/Preparation"));
    });
  };
}

export function StateReciver() {
  return (dispatch) => {
    WebSocket.stateReciver((resp) => {
      if (resp.state.router.location.pathname === "/Preparation") {
        dispatch(Ready(resp.state));
      } else if (resp.state.LogicReducer.otherReady) {
        dispatch(SyncStates(resp.state));
      }
    });
  };
}
