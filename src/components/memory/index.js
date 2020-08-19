import React, { useState } from "react";
import "./index.css";
import StatusBar from "./StatusBar";
import MemoryCard from "./MemoryCard";

const colors = [
  "pink",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "purple",
];

function generateCards() {
  const cards = [];
  for (let i = 0; i < colors.length; i++) {
    cards.push({
      key: i * 2,
      color: colors[i],
      isFlipped: false,
    });
    cards.push({
      key: i * 2 + 1,
      color: colors[i],
      isFlipped: false,
    });
  }
  return cards.sort(() => Math.random() - 0.5);
}

function Memory() {
  // [<current state>, <function to update state>] = useState(<initial state>)
  const [game, setGame] = useState({
    cards: generateCards(),
    firstCard: undefined,
    secondCard: undefined,
  });
  /*
  const [cards, setCards] = useState(generateCards());
  is the same as:
  const stateArray = useState(generateCards());
  const cards = stateArray[0];
  const setCards = stateArray[1];
  */

  /*
  Runs every time a card is clicked, flips this card (updates state)
  */
  /*
  function onCardClicked(clickedCard) {
    setCards((oldCards) => {
      return oldCards.map((card) => {
        if (card.key === clickedCard.key) {
          return { ...card, isFlipped: !card.isFlipped };
        }
        return card;
      });
    });
  }
  */

  /*
  Runs when the restart button is clicked, resets the state wth the new cards
  */
  function onRestart() {
    setGame({
      cards: generateCards(),
      firstCard: undefined,
      secondCard: undefined,
    });
  }

  return (
    <div className="game-container">
      <StatusBar status="Time: 0s" onRestart={onRestart}></StatusBar>
      <div className="memory-grid">
        {game.cards.map((card) => (
          <MemoryCard
            key={card.key}
            color={card.color}
            isFlipped={card.isFlipped}
            onClick={() => onCardClicked(card)}
          />
        ))}
      </div>
    </div>
  );
}

export default Memory;
