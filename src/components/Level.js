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
import React, { useEffect } from 'react';
import app from '../firebase';

function Level(props) {
  const { level } = props;

  let characters;
  let img;

  async function getData() {
    const db = getFirestore(app);
    const colRef = collection(db, 'game');
    const snapshot = await getDocs(colRef);
    try {
      let docs = snapshot.docs;
      docs.forEach((doc) => {
        let data = doc.data();
        if (data.level === level) {
          console.log([data.img, data.characters]);
          return [data.img, data.characters];
          //let levelImage = document.getElementById('level-image');
          //levelImage.src = img;
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getCharactersAndImg() {
    let data = await getData();
    console.log(data);
    try {
      img = data[0];
      characters = data[1];
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getCharactersAndImg();
  });

  return (
    <div>
      {img ? (
        <img src={img} alt="level" id="level-image" />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Level;
