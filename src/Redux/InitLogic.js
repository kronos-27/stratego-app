import { baseBoard } from "./InitPrep";
import { UnitTable } from "./InitPrep";
export const baseState = {
  board: baseBoard,
  srcSelect: true,
  currentPlayer: 1,
  src: null,
  dst: null,
  validDst: [],
  player1Grave: [],
  player2Grave: [],
  winner: 0,
  roomId: null,
  playerId: null,
  otherReady: false,
};

export const PrepState = {
  srcSelect: true,
  src: null,
  dst: null,
  board: baseBoard,
  units: UnitTable,
  ready: false,
  playerId: null,
};
