import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Home from './page/Home';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
          </Route>

          <Route path="*" element={<div><h1 className="text-center text-5xl font-bold">404 Not Found</h1></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
