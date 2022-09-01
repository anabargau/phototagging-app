import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LeaderboardNav from './LeaderboardNav';
import LevelLeaderboard from './LevelLeaderboard';

function Leaderboard() {
  return (
    <div>
      <LeaderboardNav />
      <Routes>
        <Route path="level1" index element={<LevelLeaderboard level={1} />} />
        <Route path="level2" element={<LevelLeaderboard level={2} />} />
        <Route path="level3" element={<LevelLeaderboard level={3} />} />
        <Route path="level4" element={<LevelLeaderboard level={4} />} />
      </Routes>
    </div>
  );
}

export default Leaderboard;
