import { lazy, Suspense } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import ProtectedRoutes from './components/ProtectedRoutes'
import { PATHS } from './utils/constant'
import { Login } from './verification/components/Login'
import { SignUp } from './verification/components/SignUp'

export default function App() {
  const Home = lazy(() => import('./home/Home'))
  const Verification = lazy(() => import('./verification/Verification'))
  const DashBoard = lazy(() => import('./dashBoard/DashBoard'))
  const NotFound = lazy(() => import('./pages/NotFound'))
  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <Routes>
        <Route path={PATHS.default} element={<Home />} />
        <Route path={PATHS.verification.default} element={<Verification />} >
          <Route path={PATHS.verification.signup} element={<SignUp />} />
          <Route path={PATHS.verification.login} element={<Login />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path={PATHS.dashboard} element={<DashBoard />} />
        </Route>
        <Route path={PATHS.all} element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}