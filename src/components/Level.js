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
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getData();
  });

  return (
    <div>
      <img alt="level" id="level-image" />
    </div>
  );
}

export default Level;
