import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Waiting = () => {
  const roomId = useSelector((state) => state.LogicReducer.roomId);
  return (
    <div className="container">
      <h1>Lobby ID</h1>
      <h1 className="lobbyId">{roomId}</h1>
      <Link to="/">
        <button className="baseBtn">Back</button>
      </Link>
    </div>
  );
};
