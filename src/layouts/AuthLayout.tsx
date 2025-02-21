import { ROUTES } from '@/AppRouter';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  const {
    user: { logged },
  } = useAuth();
  if (logged) return <Navigate to={ROUTES.ADMIN} />;
  return <Outlet />;
};
