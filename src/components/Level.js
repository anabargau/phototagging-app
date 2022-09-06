import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import app from '../firebase';
import CharactersModal from './CharactersModal';
import LeaderboardModal from './LeaderboardModal';
import LevelHeader from './LevelHeader';
import { isInside, Point } from './PolygonFunction';
import RegisterScoreModal from './RegisterScoreModal';
import WinModal from './WinModal';

function Level(props) {
  const [isFetching, setIsFetching] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [imgCoord, setImgCoord] = useState({ x: 0, y: 0 });
  const [startTime, setStartTime] = useState(new Date());
  const [score, setScore] = useState(0);
  const [activeTimer, setActiveTimer] = useState(false);
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
    let parent = event.target.parentNode;
    if (activeTimer === true) {
      setImgCoord({
        x: event.clientX - parent.offsetLeft + window.scrollX,
        y: event.clientY - parent.offsetTop + window.scrollY,
      });
      displayCharactersModal(
        event.clientX + window.scrollX,
        event.clientY + window.scrollY
      );
    }
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

  function displayCharactersModal(x, y) {
    let modal = document.getElementById('characters-modal');
    modal.style.display = 'block';
    modal.style.top = y + 15 + 'px';
    modal.style.left = x + 15 + 'px';
  }

  function calculateWinningTime(endTime) {
    let timeDiff = endTime - startTime;
    let totalSeconds = milisToSeconds(timeDiff);
    return totalSeconds;
  }

  function milisToSeconds(milis) {
    return ((milis / 1000) % 60).toFixed(3);
  }

  function showWinModal(seconds) {
    window.scrollTo(0, 0);
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
      setActiveTimer(false);
      let seconds = calculateWinningTime(endTime);
      setScore(seconds);
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
      hideCharactersModal();
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
    setScore(0);
  }

  function startLevel() {
    setActiveTimer(true);
    removeBlur();
    hideStartBtn();
  }

  function removeBlur() {
    let img = document.getElementById('level-image');
    img.style.filter = 'blur(0px)';
  }

  function hideStartBtn() {
    let btn = document.getElementById('start-btn');
    btn.style.display = 'none';
  }

  function showScoreModal(e) {
    hideWinModal();
    let modal = document.getElementById('register-score-modal');
    modal.style.display = 'flex';
    let modalText = document.getElementById('score-modal-text');
    modalText.textContent = `Score: ${score}`;
  }

  function hideScoreModal() {
    let modal = document.getElementById('register-score-modal');
    modal.style.display = 'none';
  }

  function showLeaderboardModal() {
    let modal = document.getElementById('leaderboard-modal');
    modal.style.display = 'flex';
  }

  async function submitScore() {
    let name = document.getElementById('player-name').value;
    let invalid = document.getElementById('invalid-input');
    if (name === '') {
      invalid.style.display = 'block';
    } else {
      const db = getFirestore(app);
      let docRef = doc(collection(db, 'leaderboard'));
      let newEntry = {
        name: name,
        score: parseFloat(score),
        level: level,
      };
      await setDoc(docRef, newEntry);
      hideScoreModal();
    }
    showLeaderboardModal();
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
        <div id="level-image" className="loading-message">
          Loading...
        </div>
      ) : (
        <div className="level-container" onClick={hideCharactersModal}>
          <LevelHeader
            activeTimer={activeTimer}
            hideCharactersModal={hideCharactersModal}
            characters={characters}
            score={score}
            startLevel={startLevel}
          />
          <div className="image-container">
            <img alt="level" id="level-image" onClick={handleImgClick} />
            <button id="start-btn" onClick={startLevel}>
              START
            </button>
          </div>
        </div>
      )}
      <CharactersModal
        characters={characters}
        checkIfCorrectCharacter={checkIfCorrectCharacter}
      />
      <WinModal
        hideWinModal={hideWinModal}
        playAgain={playAgain}
        showScoreModal={showScoreModal}
      />
      <RegisterScoreModal submitScore={submitScore} />
      <LeaderboardModal level={level} />
    </div>
  );
}

export default Level;
