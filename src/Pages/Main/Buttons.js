import React from "react";
import { useDispatch } from "react-redux";
import { CreateRoomRequest, JoinRoomRequest } from "../../Redux/Actions";

export const Buttons = () => {
  const dispatch = useDispatch();
  let input;
  return (
    <div className="flex-container">
      <button className="baseBtn" onClick={() => dispatch(CreateRoomRequest())}>
        Start New Game
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(JoinRoomRequest(input.value));
          input.value = "";
        }}
      >
        <input
          className="baseBtn"
          placeholder="Lobby ID"
          type="text"
          ref={(node) => (input = node)}
        />
      </form>
    </div>
  );
};
