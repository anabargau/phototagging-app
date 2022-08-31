import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import app from '../firebase';
import { isInside, Point } from './PolygonFunction';

function Level(props) {
  const [isFetching, setIsFetching] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [imgCoord, setImgCoord] = useState({ x: 0, y: 0 });
  const [startTime, setStartTime] = useState(new Date());
  const { level } = props;

  async function getData() {
    const db = getFirestore(app);
    const colRef = collection(db, 'game');
    const snapshot = await getDocs(colRef);
    try {
      let docs = snapshot.docs;
      docs.forEach((doc) => {
        let data = doc.data();
        if (data.level === level) {
          let levelImage = document.getElementById('level-image');
          levelImage.src = data.img;
          let charactersData = data.characters;
          let array = getCharactersArray(charactersData);
          setIsFetching(false);
          setCharacters(array);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  function getCharactersArray(obj) {
    let array = [];
    for (let k in obj) {
      let polygon = [
        new Point(obj[k][0].x, obj[k][0].y),
        new Point(obj[k][1].x, obj[k][1].y),
        new Point(obj[k][2].x, obj[k][2].y),
        new Point(obj[k][3].x, obj[k][3].y),
      ];
      array.push({
        name: k,
        img: obj[k][4],
        found: false,
        polygon: polygon,
      });
    }
    return array;
  }

  function handleImgClick(event) {
    setImgCoord({
      x: event.clientX - event.target.offsetLeft,
      y: event.clientY - event.target.offsetTop,
    });
    displayCharactersModal(event.clientX, event.clientY);
  }

  function hideCharactersModal(event) {
    if (event) {
      if (event.currentTarget !== event.target) {
        return;
      }
    }
    let modal = document.getElementById('characters-modal');
    modal.style.display = 'none';
  }

  function displayCharactersModal(x, y, event) {
    let modal = document.getElementById('characters-modal');
    modal.style.display = 'block';
    modal.style.top = y + 15 + 'px';
    modal.style.left = x + 15 + 'px';
  }

  function calculateWinningTime(endTime) {
    let timeDiff = endTime - startTime;
    return Math.round(timeDiff / 1000);
  }

  function showWinModal(seconds) {
    let modal = document.getElementById('win-modal');
    let modalText = document.getElementById('win-modal-text');
    modalText.textContent = `Congrats! You finished this level in ${seconds} seconds!`;
    modal.style.display = 'flex';
  }

  function checkIfFinished() {
    let found = 0;
    characters.forEach((character) => {
      if (character.found === true) {
        found += 1;
      }
    });
    if (found === characters.length) {
      let endTime = new Date();
      let seconds = calculateWinningTime(endTime);
      showWinModal(seconds);
    }
  }

  function checkIfCorrectCharacter(character) {
    let index = characters.indexOf(character);
    let polygon = character.polygon;
    let point = new Point(imgCoord.x, imgCoord.y);
    if (isInside(polygon, polygon.length, point)) {
      setCharacters((prevState) => {
        prevState[index].found = true;
        return [...prevState];
      });
    }
  }

  function hideWinModal() {
    let modal = document.getElementById('win-modal');
    modal.style.display = 'none';
  }

  function playAgain() {
    setStartTime(new Date());
    hideCharactersModal();
    hideWinModal();
    setIsFetching(true);
  }

  useEffect(() => {
    getData();
  }, [isFetching]);

  useEffect(() => {
    if (characters.length !== 0) {
      checkIfFinished();
    }
  }, [characters]);

  return (
    <div>
      {isFetching ? (
        <div id="level-image">Loading...</div>
      ) : (
        <div onClick={hideCharactersModal}>
          <div id="characters-list" onClick={hideCharactersModal}>
            {characters.map((character) => (
              <div className="character" key={uniqid()}>
                <img
                  src={character.img}
                  alt={'character'}
                  className="character-image"
                />
                <div className="character-name">{character.name}</div>
              </div>
            ))}
          </div>
          <img alt="level" id="level-image" onClick={handleImgClick} />
        </div>
      )}
      <div id="characters-modal">
        {characters.map((character) =>
          character.found ? null : (
            <button
              onClick={() => checkIfCorrectCharacter(character)}
              key={uniqid()}
            >
              {character.name}
            </button>
          )
        )}
      </div>
      <div id="win-modal">
        <button onClick={hideWinModal}>X</button>
        <div id="win-modal-text"></div>
        <button id="play-again-btn" onClick={playAgain}>
          Play Again
        </button>
        <button id="register-score-btn">Register Score</button>
      </div>
    </div>
  );
}

export default Level;
