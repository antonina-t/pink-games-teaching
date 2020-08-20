import React, { useState } from "react";
import "./index.css";
import * as helpers from "./helpers.js";

const width = 20;
const height = 12;

function Snake() {
  const [game, setGame] = useState(helper.generateGame());

  const cells = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // same as {x: x, y: y}
      const cell = { x, y };
      let className = "";
      if (helpers.isEqual(cell, game.snake.head)) {
        className = "head";
      } else if () {
        className = "food";
      } else if () {
        className = "tail";
      }

      cells.push(<div key={x + "-" + y} className="snake-cell"></div>);
    }
  }

  return (
    <div className="game-container">
      <div className="snake-grid">{cells}</div>
    </div>
  );
}

export default Snake;
