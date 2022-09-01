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
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import app from '../firebase';

function LevelLeaderboard(props) {
  const { level } = props;
  const [results, setResults] = useState([]);

  async function getData() {
    try {
      const db = getFirestore(app);
      const colRef = collection(db, 'leaderboard');
      const q = query(colRef, where('level', '==', level));
      const snapshot = await getDocs(q);
      let docs = snapshot.docs;
      let array = [];
      docs.forEach((doc) => {
        let data = doc.data();
        array.push({ name: data.name, score: data.score });
      });
      setResults(array);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getData();
  });

  return (
    <div>
      {results.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>Level {level}</div>
          {results.map((result, index) => {
            return (
              <div key={uniqid()}>
                {index}
                {result.name} {result.score}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LevelLeaderboard;
