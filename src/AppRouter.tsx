import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LandingPage } from './pages/landingPage';
import { LoginPage } from './pages/login';

import { ToastContainer } from 'react-toastify';
import { PrivateLayout } from './layouts/PrivateLayout';
import { AdminPage } from './pages/admin';
import { ForgotPasswordPage } from './pages/forgotPassword';
import { ResetPasswordPage } from './pages/resetPassword';

import { AuthLayout } from './layouts/AuthLayout';

export const ROUTES = {
  HOME: '/',
  ADMIN: '/admin',
  LOGIN: '/auth/login',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
} as const;
import { Support } from './pages/support';
import { AuthContextProvider } from './context/auth';
import { ProfileContextProvider } from './context/profile';
import { InstituteContextProvider } from './context/institute';
import { EventContextProvider } from './context/event';
import { FAQ } from './pages/faq';

export function AppRouter() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<LandingPage />} />
            <Route path='faq' element={<FAQ />} />
            <Route Component={Support} path='support' element={<Support />} />
          </Route>

          <Route path='/auth/' element={<AuthLayout />}>
            <Route path='login' element={<LoginPage />} />
            <Route path='forgot-password' element={<ForgotPasswordPage />} />
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
    </Providers>
  );
}

export const Providers = ({ children }: { children: React.ReactNode }) => {
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
          <EventContextProvider>
            <InstituteContextProvider>{children}</InstituteContextProvider>
          </EventContextProvider>
        </ProfileContextProvider>
      </AuthContextProvider>
    </>
  );
};
