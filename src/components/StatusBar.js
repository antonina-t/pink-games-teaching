import React from "react";
import Button from "react-bootstrap/Button";
import "./StatusBar.css";

function StatusBar({ status, onRestart, onShowLeaderboard }) {
  return (
    <div className="status-bar">
      <p className="status">{status}</p>
      <Button variant="light" className="button" onClick={onShowLeaderboard}>
        Leaderboard
      </Button>
      <Button variant="light" className="button" onClick={onRestart}>
        Restart
      </Button>
    </div>
  );
}

export default StatusBar;
