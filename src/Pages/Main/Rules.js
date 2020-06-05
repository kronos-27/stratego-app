import React from "react";
import Logo from "./Logo.png";

export const Rules = () => {
  return (
    <div className="container">
      <div className="title">
        <img src={Logo} alt="" />
        <div className="logo">Stra tego</div>
      </div>

      <div className="rules">
        <h1>Rules</h1>
        <p>
          In this game two player race to take away eachothers flag. The game
          board is made up of 6 rows and 6 columns and each player has 12 Units
          in their armies, normally you can't see the other player's Units
          unless they are directly involved in battle with one of yours. When
          two Units battle eachother the weaker one is defeated and if they
          share the same power level then both are defeated. Every unit can only
          take one step up, down, left or right except for the flag and bombs
          which can't move. There are some special Units as well, these are the
          the 1 a.k.a. the Spy who can defeat the opponent's 10 without being
          defeated, the 2 a.k.a. the Scout who can move any number of steps and
          the 3 a.k.a. the Bomb defuser the only Unit who can defeat a Bomb that
          defeats everything else. themselfes.
        </p>
      </div>
    </div>
  );
};
