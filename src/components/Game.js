import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Level from './Level';

function Game() {
  return (
    <div>
      <Routes>
        <Route path="level1" element={<Level level={1} />} />
        <Route path="level2" element={<Level level={2} />} />
        <Route path="level3" element={<Level level={3} />} />
        <Route path="level4" element={<Level level={4} />} />
      </Routes>
    </div>
  );
}

export default Game;
