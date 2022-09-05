import React from 'react';

function WinModal(props) {
  const { startTime, endTime, playAgain } = props;
  let seconds = calculateWinningTime();

  function calculateWinningTime() {
    let timeDiff = endTime - startTime;
    return Math.round(timeDiff / 1000);
  }

  function hideWinModal() {
    let modal = document.getElementById('win-modal');
    modal.style.display = 'none';
  }

  return (
    <div id="win-modal">
      <button onClick={hideWinModal} className="close-win-modal">
        X
      </button>
      <div id="win-modal-text">
        Congrats! You finished the level in {seconds} seconds!
      </div>
      <div class="win-modal btns">
        <button id="play-again-btn" onClick={playAgain}>
          Play Again
        </button>
        <button id="register-score-btn">Register Score</button>
      </div>
    </div>
  );
}

export default WinModal;
