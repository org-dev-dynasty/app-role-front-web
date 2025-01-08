import { LoginContainer } from '@/containers/auth/LoginContainer';

import 'react-toastify/dist/ReactToastify.css';

// import { IMAGES } from '@/constants/image';
// import { SignInForm } from '@/components/forms/SignIn';

export const LoginPage = () => {
  return (
    <div className='bg-background w-full h-screen flex justify-center items-center'>
      <LoginContainer />
      {/* <div className='w-full max-w-[400px] bg-[#363636] rounded-xl px-8 py-8 shadow-lg flex items-center flex-col'>
        <div className='w-full flex justify-center'>
          <img src={IMAGES.logo} alt='AppRole Logo' className='h-16' />
        </div>
        <div className='w-full'>
          <SignInForm />
        </div>
      </div> */}
    </div>
  );
};
