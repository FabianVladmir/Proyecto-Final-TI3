import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import HomeRoutes from './routes/homeRoutes';
import ClientRoutes from './routes/clientRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<HomeRoutes />} />
        <Route path="/client/*" element={<ClientRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
