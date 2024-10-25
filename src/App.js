import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import { ChakraProvider } from '@chakra-ui/react';
import initialTheme from './theme/theme';
import { useState } from 'react';

export default function Main() {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = userInfo ? userInfo.data.token : null;

  return (
    <ChakraProvider theme={currentTheme}>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route
          path="admin/*"
          element={
            token ? (
              <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/*"
          element={<Navigate to={token ? '/admin' : '/auth'} />}
        />
      </Routes>
    </ChakraProvider>
  );
}
