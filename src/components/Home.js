import React from 'react';
import { Link } from 'react-router-dom';
import Level1 from '../img/level1.jpg';
import Level2 from '../img/level2.jpg';
import Level3 from '../img/level3.jpg';
import Level4 from '../img/level4.jpg';
import LevelChoice from './LevelChoice';

function Home() {
  return (
    <div>
      <div className="levels-container">
        <Link to="game/level1">
          <LevelChoice img={Level1} level={1} />
        </Link>
        <Link to="game/level2">
          <LevelChoice img={Level2} level={2} />
        </Link>
        <Link to="game/level3">
          <LevelChoice img={Level3} level={3} />
        </Link>
        <Link to="game/level4">
          <LevelChoice img={Level4} level={4} />
        </Link>
      </div>
    </div>
  );
}

export default Home;
