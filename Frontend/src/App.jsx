import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';


import HomeRoutes from './routes/homeRoutes';
import ClientRoutes from './routes/clientRoutes';
import AdminRoutes from './routes/adminRoutes';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/*" element={<HomeRoutes />} />
          <Route path="client/*" element={<ClientRoutes />} />
          <Route path="admin/*" element={<AdminRoutes />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
