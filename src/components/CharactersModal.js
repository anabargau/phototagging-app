import React from 'react';
import uniqid from 'uniqid';

function CharactersModal(props) {
  const { characters, checkIfCorrectCharacter } = props;
  return (
    <div id="characters-modal">
      {characters.map((character) =>
        character.found ? null : (
          <button
            onClick={() => checkIfCorrectCharacter(character)}
            key={uniqid()}
          >
            {character.name}
            <img className="character-btn-img" src={character.img} />
          </button>
        )
      )}
    </div>
  );
}

export default CharactersModal;
