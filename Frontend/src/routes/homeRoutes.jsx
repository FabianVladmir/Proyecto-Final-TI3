import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HeaderHome from '../component/Home/Header';
import Home from '../page/Home/Home';

function HomeRoutes() {
  return (
    <div>
      <HeaderHome />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="*"
          element={<div><h1 className="text-center text-5xl font-bold">404 Not Found</h1></div>}
        />
      </Routes>
    </div>
  );
}

export default HomeRoutes;
