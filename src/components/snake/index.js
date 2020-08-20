import React, { useState } from "react";
import "./index.css";
import * as helpers from "./helpers.js";

const width = 20;
const height = 12;

function Snake() {
  const [game, setGame] = useState();

  const cells = [];
  for (let i = 0; i < width * height; i++) {
    cells.push(<div key={i} className="snake-cell"></div>);
  }

  return (
    <div className="game-container">
      <div className="snake-grid">{cells}</div>
    </div>
  );
}

export default Snake;
