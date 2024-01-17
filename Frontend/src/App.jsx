import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';


import HomeRoutes from './routes/homeRoutes';
import ClientRoutes from './routes/clientRoutes';
import AdminRoutes from './routes/adminRoutes';
import HomeLoginAdmin from './page/Admin/HomeLoginAdmin';

const PrivateRoute = ({ element, redirectTo }) => {
  const isLoggedIn = !!Cookies.get('token');

  return isLoggedIn ? element : <Navigate to={redirectTo} />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar el estado de inicio de sesión aquí (puedes utilizar Cookies.get('token') u otras formas)
    const token = Cookies.get('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<HomeRoutes />} />
        <Route
          path="client/*"
          element={<PrivateRoute element={<ClientRoutes />} redirectTo="/login" />}
        />
        <Route path="admin/*" element={<AdminRoutes />} />
        <Route path="/admin/login" element={<HomeLoginAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
