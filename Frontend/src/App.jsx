import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Home from './page/Home';
import Horario from './page/Horario';
import Reservar from './page/Reservar';
import IniciarSesion from './component/HomeLogin';
function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<div><h1 className="text-center text-5xl font-bold">404 Not Found</h1></div>} />
          <Route path="horario" element={<Horario/>} />
          <Route path="reservar" element={<Reservar/>} />
          <Route path="iniciarsesion" element={<IniciarSesion/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
