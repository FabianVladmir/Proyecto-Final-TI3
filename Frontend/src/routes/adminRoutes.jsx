import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HeaderAdmin from '../component/Admin/Header'
import Home from '../page/Admin/Home';
import EquiposSolicitados from '../page/Admin/HomeEquiposSolicitados';
import DevolucionEquipos from '../page/Admin/HomeDevolucionDeEquipos';
import Reportes from '../page/Admin/HomeReportes';

function adminRoutes() {
  return (
    <div>
      <HeaderAdmin />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/equipos-solicitados" element={<EquiposSolicitados />} />
        <Route path="/devolucion-equipos" element={<DevolucionEquipos />} />
        <Route path="/reportes" element={<Reportes />} />

        <Route
          path="/*"
          element={<div><h1 className="text-center text-5xl font-bold">404 Not Found</h1></div>}
        />
      </Routes>
    </div>
  );
}

export default adminRoutes;
