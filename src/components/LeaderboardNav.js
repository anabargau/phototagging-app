import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function LeaderboardNav() {
  function getLinks() {
    let links = document.getElementsByClassName('leader-nav-link');
    let linksArr = [...links];
    return linksArr;
  }

  function toggle(event) {
    let linksArr = getLinks();
    linksArr.forEach((link) => {
      if (link === event.target) {
        link.classList.add('clicked');
      } else {
        link.classList.remove('clicked');
      }
    });
  }

  return (
    <div className="leaderboard-nav">
      <Link to="level1" className="leader-nav-link clicked" onClick={toggle}>
        Level 1
      </Link>
      <Link to="level2" className="leader-nav-link" onClick={toggle}>
        Level 2
      </Link>
      <Link to="level3" className="leader-nav-link" onClick={toggle}>
        Level 3
      </Link>
      <Link to="level4" className="leader-nav-link" onClick={toggle}>
        Level 4
      </Link>
    </div>
  );
}

export default LeaderboardNav;
