import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/Cliente/Header';
import Home from './page/Cliente/Home';
import Horario from './page/Cliente/Horario';
import Reservar from './page/Cliente/Reservar';
import IniciarSesion from './component/HomeLogin';
function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="client" element={<Home />} />
          <Route path="*" element={<div><h1 className="text-center text-5xl font-bold">404 Not Found</h1></div>} />
          <Route path="client/horario" element={<Horario/>} />
          <Route path="client/reservar" element={<Reservar/>} />
          {/* <Route path="client/micuenta" element={<IniciarSesion/>} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
