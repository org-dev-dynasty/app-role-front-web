import { ForgotPasswordContainer } from '@/containers/auth/ForgotPasswordContainer';

import 'react-toastify/dist/ReactToastify.css';

export const ForgotPasswordPage = () => {
  return (
    <div className='bg-background w-full h-screen flex justify-center items-center'>
      <ForgotPasswordContainer />
    </div>
  );
};
