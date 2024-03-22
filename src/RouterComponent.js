// RouterComponent.js
import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Masive from './Masive';     // Make sure the path is correct
import HistoryPage from './HistoryPage'; // Make sure the path is correct
import MonumentePage from './MonumentePage';         // Make sure the path is correct
import Navigation from './Navigation';


const RouterComponent = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/App" element={<MonumentePage />} />
        <Route path="/About" element={<Masive />} />
        <Route path="/Contact" element={<HistoryPage />} />
        <Route path="*" element={<Navigate to="/App" />} />
      </Routes>
    </Router>
  );
};

export default RouterComponent;
