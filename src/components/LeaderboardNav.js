import React from 'react';
import { Link } from 'react-router-dom';

function LeaderboardNav() {
  return (
    <div>
      <Link to="level1">Level 1</Link>
      <Link to="level2">Level 2</Link>
      <Link to="level3">Level 3</Link>
      <Link to="level4">Level 4</Link>
    </div>
  );
}

export default LeaderboardNav;
