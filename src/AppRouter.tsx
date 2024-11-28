import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/landingPage'
import Role from './pages/restrictedArea/Event'
import Institute from './pages/restrictedArea/Institute'
import Institutions from './pages/restrictedArea/Institutions'
import { InstituteContextProvider } from './context/institute_context'
import { EventContextProvider } from './context/event_context'
import { AuthContextProvider } from './context/auth_context'
import Login from './pages/restrictedArea/Login'
import ResetPasswordCode from './pages/restrictedArea/confirmCode'
import GetEmail from './pages/restrictedArea/getEmail'
import { ToastContainer } from 'react-toastify'

export function AppRouter() {
  return (
    <AuthContextProvider>
      <EventContextProvider>
        <InstituteContextProvider>
          <BrowserRouter>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              limit={4}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            <Routes>
              <Route Component={LandingPage} path="/" element={<LandingPage />} />
              <Route Component={Login} path='/login' element={<Login />} />
              <Route Component={Institutions} path="/Institutes" element={<Institutions />} />
              <Route Component={Institute} path="/Institute/:instId" element={<Institute />} />
              <Route path="role">
                <Route path=":eventId" element={<Role />} />
              </Route>
              <Route Component={GetEmail} path='/getEmail' element={<GetEmail />} />
              <Route Component={ResetPasswordCode} path='/verifyCode' element={<ResetPasswordCode />} />
            </Routes>
          </BrowserRouter>
        </InstituteContextProvider>
      </EventContextProvider>
    </AuthContextProvider>
  )
}