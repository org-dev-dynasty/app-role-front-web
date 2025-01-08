import { SignInForm } from '@/components/forms/SignIn';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const LoginContainer = () => {
  const onSuccess = () => {};

  const {
    user: { logged },
  } = useAuth();

  if (logged) return <Navigate to='/institute' />;

  return (
    <div className='w-full max-w-[400px]'>
      <SignInForm onSuccess={onSuccess} />
    </div>
  );
};
