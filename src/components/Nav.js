import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className="nav">
      <Link to="/">Home</Link>
      <Link to="leaderboard/level1">Leaderboard</Link>
    </div>
  );
}

export default Nav;
