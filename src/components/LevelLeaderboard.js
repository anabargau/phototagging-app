import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
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
      const q = query(colRef, where('level', '==', level), orderBy('score'));
      const snapshot = await getDocs(q);
      let docs = snapshot.docs;
      console.log(docs);
      let array = [];
      docs.forEach((doc) => {
        let data = doc.data();
        console.log(data.score);
        array.push({
          name: data.name,
          score: data.score,
        });
      });
      console.log(array);
      setResults(array);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, [level]);

  return (
    <div className="leaderboard-container">
      {results.length === 0 ? (
        <div className="no-entries">No entries yet</div>
      ) : (
        <table className="leaderboard-list">
          <thead>
            <tr>
              <th>Position</th>
              <th>Name</th>
              <th>Time(seconds)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => {
              return (
                <tr className="leaderboard-entry" key={uniqid()}>
                  <td className="entry-index">{index + 1}</td>
                  <td className="entry-name">{result.name} </td>
                  <td className="entry-score">{result.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LevelLeaderboard;
