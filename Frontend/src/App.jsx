import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';


import HomeRoutes from './routes/homeRoutes';
import ClientRoutes from './routes/clientRoutes';
import AdminRoutes from './routes/adminRoutes';
import HomeLoginAdmin from './page/Admin/HomeLoginAdmin';

import { UserProvider } from './context/UserContext';



const PrivateRoute = ({ element, redirectTo }) => {
  const isLoggedIn = !!localStorage.getItem('token'); //  const isLoggedIn = !!Cookies.get('token');
  return isLoggedIn ? element : <Navigate to={redirectTo} />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar el estado de inicio de sesión aquí (puedes utilizar Cookies.get('token') u otras formas)
    const token = localStorage.getItem('token'); //    const token = Cookies.get('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'logoutEvent') {
        // Realizar acciones adicionales cuando se detecta el cierre de sesión en otra pestaña
        // Por ejemplo, puedes redirigir al usuario a la página de inicio de sesión
        //window.location.href = '/login';
        window.location.reload();

      }
    };
    // Agregar el evento de escucha
    window.addEventListener('storage', handleStorageChange);

    return () => {
      // Remover el evento de escucha al desmontar el componente
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);


  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<HomeRoutes />} />
          <Route
            path="client/*"
            element={
              <PrivateRoute element={<ClientRoutes />} redirectTo="/login" />
            }
          />
          <Route path="admin/*" element={<AdminRoutes />} />
          <Route path="/admin/login" element={<HomeLoginAdmin />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
