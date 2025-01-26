import { lazy, Suspense } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router';
import ProtectedRoutes from './components/ProtectedRoutes';
import { PATHS } from './utils/constant';
import { Login } from './verification/components/Login';
import { SignUp } from './verification/components/SignUp';
import { useQuery } from '@tanstack/react-query';
import FactorAuthentication from './verification/components/FactorAuthentication';
import { ResetPassword } from './verification/components/ResetPassword';

export default function App() {
  const Home = lazy(() => import('./home/Home'));
  const Verification = lazy(() => import('./verification/Verification'));
  const DashBoard = lazy(() => import('./dashBoard/DashBoard'));
  const NotFound = lazy(() => import('./pages/NotFound'));

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await fetch('http://localhost:1234/users/protected', { credentials: 'include' });
      if (!response.ok) {
        throw new Error('No autorizado');
      }
      return response.json();
    },
    retry: false,
  });

  const isAuth = !!user;
  return (
    <>
      <Suspense fallback={<h1>Cargando...</h1>}>
        {isLoading && <h1>Cargando...</h1>}
        <Routes>
          <Route
            path={PATHS.default}
            element={isAuth ? <Navigate to={PATHS.dashboard} replace /> : <Home />}
          />
          <Route
            path={PATHS.verification.default}
            element={isAuth ? <Navigate to={PATHS.dashboard} replace /> : <Verification />}
          >
            <Route path={PATHS.verification.signup} element={<SignUp />} />
            <Route path={PATHS.verification.login} element={<Login />} />
            <Route path={PATHS.verification.verification} element={<FactorAuthentication />} />
            <Route path={PATHS.verification.passwordReset} element={<ResetPassword />} />
          </Route>
          <Route element={<ProtectedRoutes isAuthenticated={isAuth} />}>
            <Route path={PATHS.dashboard} element={<DashBoard />} />
          </Route>
          <Route path={PATHS.all} element={<NotFound />} />
        </Routes>
      </Suspense></>
  );
}
