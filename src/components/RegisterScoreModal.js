import React from 'react';

function RegisterScoreModal(props) {
  const { submitScore } = props;
  return (
    <div id="register-score-modal">
      <label htmlFor="player-name">
        Name:
        <input type="text" id="player-name" required></input>
      </label>
      <div id="invalid-input">*please enter a valid name</div>
      <div id="score-modal-text"></div>
      <button className="submit-score-btn" onClick={submitScore}>
        Submit
      </button>
    </div>
  );
}

export default RegisterScoreModal;
