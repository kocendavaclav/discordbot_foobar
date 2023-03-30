import "../styles/styles.css";
import React from "react";
function GameCard(props) {
  return (
    <div className="gameCard">
      <img
        className="gameCardImg"
        src={props.src}
        alt={props.gameTitle}
        height="120px"
        width="auto"
      />
      <div className="gameCardOverlay">
        <text>{props.gameTitle}</text>
        <button className="followGameButton" onClick={props.click}>
          Follow
        </button>
      </div>
    </div>
  );
}
export default GameCard;
