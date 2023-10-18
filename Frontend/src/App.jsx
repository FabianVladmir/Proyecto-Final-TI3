import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ClientRoutes from './routes/clientRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/client/*" element={<ClientRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
