import React from 'react';

function WinModal(props) {
  const { hideWinModal, playAgain, showScoreModal } = props;
  return (
    <div id="win-modal">
      <button onClick={hideWinModal} className="close-win-modal">
        X
      </button>
      <div id="win-modal-text"></div>
      <div className="win-modal-btns">
        <button id="play-again-btn" onClick={playAgain}>
          Play Again
        </button>
        <button type="submit" id="register-score-btn" onClick={showScoreModal}>
          Register Score
        </button>
      </div>
    </div>
  );
}

export default WinModal;
