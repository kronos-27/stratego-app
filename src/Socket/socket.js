import io from "socket.io-client";

let socket;

export class webSocket {
  constructor() {
    socket = io("webprogramozas.inf.elte.hu:3030");
  }

  createRoom(handler) {
    socket.emit("create-room", (resp) => {
      handler(resp);
    });
  }

  joinRoom(roomId, handler) {
    socket.emit("join-room", roomId, (resp) => {
      handler(resp);
    });
  }

  leaveRoom(roomId, handler) {
    socket.emit("leave-room", roomId, (resp) => {
      handler(resp);
    });
  }

  syncAction(roomId, action, handler) {
    socket.emit("sync-action", roomId, action, true, (resp) => {
      handler(resp);
    });
  }

  syncState(roomId, state, handler) {
    socket.emit("sync-state", roomId, state, true, (resp) => {
      handler(resp);
    });
  }

  stateReciver(handler) {
    const listener = (receivedMessage) => {
      handler(receivedMessage);
      console.log(receivedMessage)
    };
    socket.on("state-changed", listener);
  }

  joinReciver(handler) {
    const listener = (receivedMessage) => {
      handler(receivedMessage);
    };
    socket.on("player-joined", listener);
  }
}
