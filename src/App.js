import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Game from './components/Game';
import Home from './components/Home';
import Leaderboard from './components/Leaderboard';
import Nav from './components/Nav';
import Title from './components/Title';

function App() {
  return (
    <Router>
      <Title />
      <Nav />
      <Routes>
        <Route path="/*" index element={<Home />} />
        <Route path="leaderboard/*" element={<Leaderboard />} />
        <Route path="game/*" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
