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

function Level(props) {
  const [isFetching, setIsFetching] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [windowCoord, setWindowCoord] = useState({ x: 0, y: 0 });
  const [imgCoord, setImgCoord] = useState({ x: 0, y: 0 });
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
      array.push({ name: k, img: obj[k][4], found: false });
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
    if (event.currentTarget !== event.target) {
      return;
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

  function checkIfCorrectCharacter() {}

  useEffect(() => {
    getData();
  }, [isFetching]);

  return (
    <div>
      {isFetching ? (
        <div id="level-image">Loading...</div>
      ) : (
        <div onClick={hideCharactersModal}>
          <div id="characters-list">
            {characters.map((elem) => (
              <div className="character" key={uniqid()}>
                <img
                  src={elem.img}
                  alt={'character'}
                  className="character-image"
                />
                <div className="character-name">{elem.name}</div>
              </div>
            ))}
          </div>
          <img alt="level" id="level-image" onClick={handleImgClick} />
        </div>
      )}
      <div id="characters-modal">
        {characters.map((character) =>
          character.found ? null : (
            <div onClick={checkIfCorrectCharacter} key={uniqid()}>
              {character.name}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Level;
