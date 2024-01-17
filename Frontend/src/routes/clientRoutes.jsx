import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast, } from 'react-toastify';

import HeaderClient from '../component/Cliente/Header';
import HomeClient from '../page/Cliente/Home';
import HorarioClient from '../page/Cliente/HomeHorario';
import ReservarClient from '../page/Cliente/HomeReservar';
import VerEquipos from '../page/Cliente/HomeVerEquipo';
import Perfil from '../page/Cliente/HomePerfil';


function ClientRoutes() {
  const token = Cookies.get('token');

  useEffect(() => {
    // Verificar si el usuario tiene un token de sesión
    const token = Cookies.get('token');

    if (!token) {
      setTimeout(() => {
        return <Navigate to="/login" />;
      }, 3000);
    }
  }, []);

  return (
    <div>
      <HeaderClient />
      <Routes>
        <Route path="/home" element={<HomeClient />} />
        <Route path="/horario" element={<HorarioClient />} />
        <Route path="/reservar" element={<ReservarClient />} />
        <Route path="/ver-equipos" element={<VerEquipos />} />
        <Route path="/perfil" element={<Perfil />} />

        <Route
          path="/*"
          element={<div><h1 className="text-center text-5xl font-bold">404 Not Found</h1></div>}
        />
      </Routes>
    </div>
  );
}

export default ClientRoutes;
