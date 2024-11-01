import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import YetkaziBeruvchiLayout from './layouts/yetkaziberuvchi/YetkaziBeruvchiLayout';

import { ChakraProvider } from '@chakra-ui/react';
import initialTheme from './theme/theme';
import { useState } from 'react';
import SignInCentered from 'views/auth';
import CEOLayout from 'layouts/ceo/CEOLayout';
import { useSelector } from 'react-redux';
import FinancesLayout from 'layouts/finances/FinancesLayout';

export default function Main() {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  const { token, user } = useSelector((state) => state.auth);
  const role = user?.jobTitle;

  const navigateTo = (role) => {
    switch (role) {
      case 'YETKAZIBERUVCHI':
        return 'yetkaziberuvchi';
      case 'CEO':
        return 'ceo';
      case 'MOLIYA':
        return 'moliya';
      default:
        return 'auth';
    }
  };
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
      case 'CEO':
        return (
          <Route
            path="ceo/*"
            element={
              token ? (
                <CEOLayout theme={currentTheme} setTheme={setCurrentTheme} />
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
        );
      case 'MOLIYA':
        return (
          <Route
            path="moliya/*"
            element={
              token ? (
                <FinancesLayout
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
            path="auth/*"
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
          element={<Navigate to={token ? navigateTo(role) : '/auth'} />}
        />
        <Route path="auth/sign-in" element={<SignInCentered />} />
      </Routes>
    </ChakraProvider>
  );
}
