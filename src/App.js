import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import YetkaziBeruvchiLayout from './layouts/yetkaziberuvchi/YetkaziBeruvchiLayout';

import { ChakraProvider } from '@chakra-ui/react';
import initialTheme from './theme/theme';
import { useState } from 'react';

export default function Main() {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = userInfo ? userInfo.data.token : null;
  const role = userInfo.data.employee.jobTitle;

  const router = (role) => {
    switch (role) {
      case 'YETKAZIBERUVCHI':
        return (
          <Route
            path="yetkaziberuvchi/*"
            element={
              token ? (
                <YetkaziBeruvchiLayout
                  theme={currentTheme}
                  setTheme={setCurrentTheme}
                />
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
        );
      case 'ADMIN':
        return (
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
        );

      default:
        return (
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
        );
    }
  };

  return (
    <ChakraProvider theme={currentTheme}>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        {router(role)}
        <Route
          path="/*"
          element={<Navigate to={token ? '/admin' : '/auth'} />}
        />
      </Routes>
    </ChakraProvider>
  );
}
