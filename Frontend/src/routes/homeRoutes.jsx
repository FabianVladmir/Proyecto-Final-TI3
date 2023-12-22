import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HeaderHome from '../component/Home/Header';
import Home from '../page/Home/Home';
import Login from '../page/Home/HomeLogin';
import Register from '../page/Home/HomeRegister';
import Reset from '../page/Home/HomeReset';
import Horario from '../page/Home/HomeVerHorario';
function HomeRoutes() {
  return (
    <div>
      <HeaderHome />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="ver-horario" element={<Horario />} />
        <Route path="login" element={<Login />} />
        <Route path="registrar" element={<Register />} />
        <Route path="reiniciar" element={<Reset />} />
        <Route
          path="*"
          element={<div><h1 className="text-center text-5xl font-bold">404 Not Found</h1></div>}
        />
      </Routes>
    </div>
  );
}

export default HomeRoutes;
