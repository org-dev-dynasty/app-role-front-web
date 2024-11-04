import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/landingPage'
import Role from './pages/restrictedArea/Event'
import Institute from './pages/restrictedArea/Institute'
import Institutions from './pages/restrictedArea/Institutions'
import { InstituteContextProvider } from './context/institute_context'
import { EventContextProvider } from './context/event_context'
import { AuthContextProvider } from './context/auth_context'
import Login from './pages/restrictedArea/Login'
import ResetPasswordCode from './pages/restrictedArea/confirmCode'

export function AppRouter() {
  return (
    <AuthContextProvider>
      <EventContextProvider>
        <InstituteContextProvider>
          <BrowserRouter>
            <Routes>
              <Route Component={Login} path='/login' element={<Login />} />
              <Route Component={LandingPage} path="/" element={<LandingPage />} />
              <Route Component={Institutions} path="/Institutes" element={<Institutions />} />
              <Route Component={Institute} path="/Institute/:instId" element={<Institute />} />
              <Route path="role">
                <Route path=":eventId" element={<Role />} />
              </Route>
              <Route Component={ResetPasswordCode} path='/verifyCode' element={<ResetPasswordCode />} />
            </Routes>
          </BrowserRouter>
        </InstituteContextProvider>
      </EventContextProvider>
    </AuthContextProvider>
  )
}