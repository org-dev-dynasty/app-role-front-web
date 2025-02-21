import { ROUTES } from '@/AppRouter';
import { SignInForm, SignInFormData } from '@/components/forms/SignIn';
import * as authActions from '@/context/auth/actions';
import { useAuth } from '@/hooks/useAuth';
import { useAuthDispatch } from '@/hooks/useAuthDispatch';
import { Navigate } from 'react-router-dom';

export const LoginContainer = () => {
  const authDispatch = useAuthDispatch();
  const {
    user: { logged },
    signIn: { error, loading },
  } = useAuth();

  const onSuccess = (data: SignInFormData) => {
    authDispatch(
      authActions.singIn({
        identifier: data.email,
        password: data.password,
      })
    );
  };

  if (logged) return <Navigate to={ROUTES.ADMIN} />;

  return (
    <div className='w-full max-w-[400px]'>
      <SignInForm onSuccess={onSuccess} error={error} loading={loading} />
    </div>
  );
};
