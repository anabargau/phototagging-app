import React from 'react';

function LevelChoice(props) {
  const { img, level } = props;
  return (
    <div className="level-choice">
      <img className="level-choice-img" src={img} alt="level 1" />
      <div className="level-title">Level {level}</div>
    </div>
  );
}

export default LevelChoice;
