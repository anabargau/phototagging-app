import React from 'react';
import { NavLink } from 'react-router-dom';

function LeaderboardNav() {
  return (
    <div className="leaderboard-nav">
      <NavLink to="level1" className="leaderboard-nav-link">
        Level 1
      </NavLink>
      <NavLink to="level2" className="leader-nav-link">
        Level 2
      </NavLink>
      <NavLink to="level3" className="leader-nav-link">
        Level 3
      </NavLink>
      <NavLink to="level4" className="leader-nav-link">
        Level 4
      </NavLink>
    </div>
  );
}

export default LeaderboardNav;
