import { LoginContainer } from '@/containers/auth/LoginContainer';

import 'react-toastify/dist/ReactToastify.css';

// import { IMAGES } from '@/constants/image';
// import { SignInForm } from '@/components/forms/SignIn';

export const LoginPage = () => {
  return (
    <div className='bg-background w-full h-screen flex justify-center items-center'>
      <LoginContainer />
    </div>
  );
};
