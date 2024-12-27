import { lazy, Suspense } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import ProtectedRoutes from './components/ProtectedRoutes'
import { PATHS } from './utils/constant'

export default function App() {
  const Home = lazy(() => import('./home/Home'))
  const Verification = lazy(() => import('./verification/Verification'))
  const DashBoard = lazy(() => import('./dashBoard/DashBoard'))
  const NotFound = lazy(() => import('./pages/NotFound'))
  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <Routes>
        <Route path={PATHS.default} element={<Home />} />
        <Route path={PATHS.verification} element={<Verification />} />
        <Route element={<ProtectedRoutes canActive={false} />}>
          <Route path={PATHS.dashboard} element={<DashBoard />} />
        </Route>
        <Route path={PATHS.all} element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}