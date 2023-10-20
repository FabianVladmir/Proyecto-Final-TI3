import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HeaderAdmin from '../component/Admin/Header'


function adminRoutes() {
  return (
    <div>
      <HeaderAdmin />
      <Routes>

        <Route
          path="/*"
          element={<div><h1 className="text-center text-5xl font-bold">404 Not Found</h1></div>}
        />
      </Routes>
    </div>
  );
}

export default adminRoutes;
