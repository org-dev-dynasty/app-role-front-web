import { ROUTES } from '@/AppRouter';
import {
  ConfirmForgotPasswordForm,
  ConfirmForgotPasswordFormData,
} from '@/components/forms/ConfirmForgotPassword';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { IMAGES } from '@/constants/image';
import * as authActions from '@/context/auth/actions';
import { useAuth } from '@/hooks/useAuth';
import { useAuthDispatch } from '@/hooks/useAuthDispatch';
import { useNavigate } from 'react-router-dom';

export const ResetPasswordContainer = () => {
  const navigate = useNavigate();
  const authDispatch = useAuthDispatch();

  const {
    forgotPassword: { currentEmail },
    confirmForgotPassword: { loading, error },
  } = useAuth();

  const onSuccess = async (data: ConfirmForgotPasswordFormData) => {
    const response = await authDispatch(
      authActions.confirmForgotPassword({
        code: data.code,
        newPassword: data.password,
      })
    );

    if (response.success) {
      navigate(ROUTES.LOGIN);
    }
  };

  const handleBack = () => {
    navigate(ROUTES.FORGOT_PASSWORD);
  };

  return (
    <div className='w-full max-w-[400px]'>
      {currentEmail ? (
        <ConfirmForgotPasswordForm
          onSuccess={onSuccess}
          loading={loading}
          error={error}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>
              <div className='flex flex-col gap-y-4'>
                <div className='w-full flex justify-center h-16'>
                  <img
                    src={IMAGES.logo}
                    alt='AppRole Logo'
                    className='w-full h-full object-contain'
                  />
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className='text-center'>Não há e-mail registrado</h2>
          </CardContent>
          <CardFooter>
            <Button className='w-full' onClick={handleBack}>
              voltar
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
