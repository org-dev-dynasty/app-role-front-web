import { ROUTES } from '@/AppRouter';
import {
  ForgotPasswordForm,
  ForgotPasswordFormData,
} from '@/components/forms/ForgotPassword';
import * as authActions from '@/context/auth/actions';
import { useAuth } from '@/hooks/useAuth';
import { useAuthDispatch } from '@/hooks/useAuthDispatch';
import { useNavigate } from 'react-router-dom';

export const ForgotPasswordContainer = () => {
  const navigate = useNavigate();
  const authDispatch = useAuthDispatch();
  const {
    forgotPassword: { loading, error },
  } = useAuth();

  const onSuccess = async (data: ForgotPasswordFormData) => {
    const response = await authDispatch(authActions.forgotPassword(data));

    if (response) {
      navigate(ROUTES.RESET_PASSWORD);
    }
  };

  return (
    <div className='w-full max-w-[400px]'>
      <ForgotPasswordForm
        onSuccess={onSuccess}
        loading={loading}
        error={error}
      />
    </div>
  );
};
