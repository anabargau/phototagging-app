import React from 'react';
import { Link } from 'react-router-dom';

function LeaderboardModal(props) {
  const { level } = props;
  let path = `/leaderboard/level${level}`;
  return (
    <div id="leaderboard-modal">
      <div className="leaderboard-modal-text">
        Your score was successfully registered!
      </div>
      <button>
        <Link to={path} level={level}>
          Show Leaderboard
        </Link>
      </button>
    </div>
  );
}

export default LeaderboardModal;
