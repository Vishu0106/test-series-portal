import image from './assets/public.gif'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login'
import CreateTest from './pages/CreateTest'
import TakeTest from './pages/TakeTest'
import Results from './pages/ResultsPage'
import Home from './pages/Home'
import RequireAuth from './pages/RequireAuth'
import TestsListPage from './pages/TestListPage'
import ListResults from './pages/ListResults'
import NotFoundPage from './pages/NotFoundPage'
import SignupPage from './pages/SignupPage'
import IsAdmin from './pages/IsAdmin'
import AccessDeniedPage from './pages/AccessDinedPage'
function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route element={<RequireAuth/>}>
        <Route path='/tests' element={<TestsListPage />} />
        <Route path='/results' element={<ListResults />} />
        <Route path='/take-test/:testId' element={<TakeTest  />} />
        <Route path='/results/:id' element={<Results />} />
      </Route>
      <Route element={<IsAdmin />}>
        <Route path='/createtest' element={<CreateTest />} />
      </Route>
      <Route path='/accessdinied' element={<AccessDeniedPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
