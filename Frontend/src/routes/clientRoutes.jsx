import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HeaderClient from '../component/Cliente/Header';
import HomeClient from '../page/Cliente/Home';
import HorarioClient from '../page/Cliente/HomeHorario';
import ReservarClient from '../page/Cliente/Reservar';

function ClientRoutes() {
  return (
    <div>
      <HeaderClient />
      <Routes>
        <Route path="/home" element={<HomeClient />} />
        <Route path="/horario" element={<HorarioClient />} />
        <Route path="/reservar" element={<ReservarClient />} />
        <Route
          path="/*"
          element={<div><h1 className="text-center text-5xl font-bold">404 Not Found</h1></div>}
        />
      </Routes>
    </div>
  );
}

export default ClientRoutes;
