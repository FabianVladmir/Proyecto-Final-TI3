import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';


import HomeRoutes from './routes/homeRoutes';
import ClientRoutes from './routes/clientRoutes';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/*" element={<HomeRoutes />} />
          <Route path="/client/*" element={<ClientRoutes />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
