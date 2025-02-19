import { lazy, Suspense, useEffect } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router'
import { PATHS } from './utils/constant'
import { Login } from './verification/components/Login'
import { SignUp } from './verification/components/SignUp'
import { useQuery } from '@tanstack/react-query'
import { ResetPassword } from './verification/components/ResetPassword'
import { useUserActions } from './hooks/useUserActions'
import { Toaster } from 'sonner'

const Home = lazy(() => import('./home/Home'))
const Verification = lazy(() => import('./verification/Verification'))
const DashBoard = lazy(() => import('./user/DashBoard'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Calendar = lazy(() => import('./user/Calendar'))
const UserConfig = lazy(() => import('./user/UserConfig'))
const FactorAuthentication = lazy(() => import('./verification/components/FactorAuthentication'))
const ProtectedRoutes = lazy(() => import('./components/ProtectedRoutes'))

export default function App() {
  const { user, addUser } = useUserActions()

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await fetch('http://localhost:1234/verification/protected', { credentials: 'include' })
      if (!response.ok) {
        throw new Error('No autorizado')
      }
      return response.json()
    },
    staleTime: 0,
    retry: false
  })

  const isAuth = !!user

  useEffect(() => {
    if (data && !user) addUser({ ...data })
  }, [data, addUser, user])

  return (
    < >
      <Toaster />
      <Suspense fallback={<h1>Cargando...</h1>}>
        <Routes>
          <Route
            path={PATHS.default}
            element={isAuth ? <Navigate to={PATHS.user.workerspace.dashboard} replace /> : <Home />}
          />
          <Route
            path={PATHS.verification.default}
            element={isAuth ? <Navigate to={PATHS.user.workerspace.dashboard} replace /> : <Verification />}
          >
            <Route path={PATHS.verification.signup} element={<SignUp />} />
            <Route path={PATHS.verification.login} element={<Login />} />
            <Route path={PATHS.verification.verification} element={<FactorAuthentication />} />
            <Route path={PATHS.verification.passwordReset} element={<ResetPassword />} />
          </Route>
          <Route element={<ProtectedRoutes isAuthenticated={isAuth} />}>
            <Route path={PATHS.user.workerspace.dashboard} element={<DashBoard />} />
            <Route path={PATHS.user.settings} element={<UserConfig />} />
            <Route path={PATHS.user.workerspace.calendar} element={<Calendar />} />
          </Route>
          <Route path={PATHS.all} element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}
