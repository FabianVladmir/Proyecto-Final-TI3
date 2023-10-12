import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Home from './page/Home'
import Horario from './page/Horario'


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<div><h1 className="text-center text-5xl font-bold">404 Not Found</h1></div>} />
          <Route path="horario" element={<Horario/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
