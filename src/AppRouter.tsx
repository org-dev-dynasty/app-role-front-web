import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LandingPage } from './pages/landingPage';
// import Role from './pages/restrictedArea/Event';
// import Institute from './pages/restrictedArea/Institute';
// import Institutions from './pages/restrictedArea/Institutions';
import { LoginPage } from './pages/login';
// import ResetPasswordCode from './pages/restrictedArea/confirmCode';
// import GetEmail from './pages/restrictedArea/getEmail';
// import { FAQ } from './pages/faq';

// import { InstituteContextProvider } from './context/institute_context';
// import { EventContextProvider } from './context/event_context';
import { AuthContextProvider } from './context/auth';

import { ToastContainer } from 'react-toastify';
import { PrivateLayout } from './layouts/PrivateLayout';
import { AdminPage } from './pages/admin';
import { ProfileContextProvider } from './context/profile';
import { ForgotPasswordPage } from './pages/forgotPassword';
import { ResetPasswordPage } from './pages/resetPassword';
import { AuthLayout } from './layouts/authLayout';

export const ROUTES = {
  HOME: '/',
  ADMIN: '/admin',
  LOGIN: '/auth/login',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
} as const;

export function AppRouter() {
  return (
    <>
      <ToastContainer
        autoClose={5000}
        limit={4}
        closeOnClick
        draggable
        pauseOnHover
        theme='colored'
      />
      <AuthContextProvider>
        <ProfileContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/'>
                <Route index element={<LandingPage />} />
                {/* <Route path='faq' element={<FAQ />} /> */}
                {/* <Route path='login' element={<LoginPage />} /> */}

                {/* <Route path='institutes/:instId' element={<Institutions />} /> */}
                {/* <Route path='institute/:instId' element={<Institute />} /> */}
                {/* <Route path='role/:eventId' element={<Role />} /> */}
                {/* <Route path='getEmail' element={<GetEmail />} /> */}
                {/* <Route path='verifyCode' element={<ResetPasswordCode />} /> */}
              </Route>

              <Route path='/auth/' element={<AuthLayout />}>
                <Route path='login' element={<LoginPage />} />
                <Route
                  path='forgot-password'
                  element={<ForgotPasswordPage />}
                />
                <Route path='reset-password' element={<ResetPasswordPage />} />
              </Route>
              {/* private routes */}
              <Route path='/admin/' element={<PrivateLayout />}>
                <Route index element={<AdminPage />} />
                <Route path='institute/:id' />
                <Route path='event/:id' />
              </Route>
            </Routes>
          </BrowserRouter>
        </ProfileContextProvider>
      </AuthContextProvider>
    </>
  );
}
