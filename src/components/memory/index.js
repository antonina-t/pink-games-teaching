import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import StatusBar from "../StatusBar";
import MemoryCard from "./MemoryCard";
import * as utils from "../../utils";
import * as helpers from "./helpers";
import ResultModal from "../ResultModal";

function Memory() {
  // [<current state>, <function to update state>] = useState(<initial state>)
  const [game, setGame] = useState({
    cards: helpers.generateCards(),
  });
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [win, setWin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [wrongPair, setWrongPair] = useState(null);
  const [noClicksAllowed, setNoClicksAllowed] = useState(false);

  const timeoutIds = useRef([]);

  // useEffect(<effect function>, <dependency array> - optional)
  // <dependency array>:
  // * undefined: effect function will be run on every render
  // * []: effect will run only on the first render
  // * [value1, value2]: effect will run when any of the values change
  // effect function returns a cleanup function (optional)
  //   that runs next time the effect function is run OR when the component
  //   unmounts (disappears from the DOM)
  useEffect(() => {
    if (startTime !== 0 && !win) {
      const intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [startTime, win]);

  // When win becomes true, show the modal.
  useEffect(() => {
    if (win) {
      setShowModal(true);
    }
  }, [win]);

  // Schedules the flip back of the wrong pair of cards one second from now.
  useEffect(() => {
    if (!wrongPair) return;
    setNoClicksAllowed(true);
    const timeoutId = setTimeout(() => {
      setGame((oldGame) => {
        let newCards = helpers.flipCard(oldGame.cards, wrongPair[0]);
        newCards = helpers.flipCard(newCards, wrongPair[1]);
        return {
          ...oldGame,
          cards: newCards,
        };
      });
      setNoClicksAllowed(false);
    }, 1000);
    timeoutIds.current.push(timeoutId);
  }, [wrongPair]);

  // Clears all wrong pair timeouts - happens when we leave the component.
  useEffect(() => {
    return () => {
      timeoutIds.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  // Is called whenever a card is clicked. Sets the new game state
  // and starts the timer (sets the start time), if it wasn't already started.
  function onCardClicked(clickedCard) {
    if (noClicksAllowed) return;
    setGame((oldGame) =>
      helpers.calculateNewGame(
        oldGame,
        clickedCard,
        () => setWin(true),
        setWrongPair
      )
    );
    setStartTime((oldStartTime) =>
      oldStartTime === 0 ? Date.now() : oldStartTime
    );
  }

  // Runs when the restart button is clicked, resets the state with the new cards.
  function onRestart() {
    setGame({
      cards: helpers.generateCards(),
    });
    setStartTime(0);
    setElapsedTime(0);
    setWin(false);
    timeoutIds.current.forEach((id) => clearTimeout(id));
    timeoutIds.current = [];
  }

  return (
    <div className="game-container">
      <StatusBar
        status={"Time: " + utils.prettifyTime(elapsedTime)}
        onRestart={onRestart}
      ></StatusBar>
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
      <ResultModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        header={"Congratulations, you won!"}
        body={"Your time was " + utils.prettifyTime(elapsedTime) + "."}
        fetchLeaderboard={helpers.fetchLeaderboard}
        saveScore={(name) => helpers.saveScore(name, elapsedTime)}
      ></ResultModal>
    </div>
  );
}

export default Memory;
