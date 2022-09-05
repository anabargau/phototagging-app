import React from 'react';
import uniqid from 'uniqid';
import Timer from './Timer';

function LevelHeader(props) {
  const { activeTimer, hideCharactersModal, characters, score } = props;
  return (
    <div className="level-header">
      <div id="characters-list" onClick={hideCharactersModal}>
        {characters.map((character) => (
          <div
            className={character.found ? 'character found' : 'character'}
            key={uniqid()}
          >
            <img
              src={character.img}
              alt={'character'}
              className="character-image"
            />
            <div className="character-name">{character.name}</div>
          </div>
        ))}
      </div>
      {activeTimer ? (
        <Timer />
      ) : score === 0 ? (
        <div className="level-timer">0.000 s</div>
      ) : (
        <div className="level-timer">{score + ' s'}</div>
      )}
    </div>
  );
}

export default LevelHeader;
