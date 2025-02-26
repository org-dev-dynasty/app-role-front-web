import { Folders, ChartBar, Megaphone } from '@phosphor-icons/react';
import { InteractableImage } from './InteractableImage.tsx';
import { envs } from '../utils/envs.ts';

const mock = `${envs.cloudfrontUrl}/Perfil-Org-ESCURO1-portrait.png`;
const mock2 = `${envs.cloudfrontUrl}/Perfil-Org-ESCURO2-portrait.png`;

export const Section4 = () => {
  return (
    <div
      id='organizador'
      className='w-full bg-white justify-center rounded-3xl py-16 font-chillax'
    >
      <h1 className='text-4xl text-center pb-12 font-chillax font-medium'>
        PARA VOCÊ{' '}
        <span className='font-semibold text-light-purple'>ORGANIZADOR</span>
      </h1>

      <div className='flex flex-row max-lg:hidden xl:pl-24 max-xl:pl-12'>
        <div className='xl:w-5/12 flex flex-col gap-y-20 max-xl:w-1/2'>
          <div className='px-2 py-5'>
            <div className='flex'>
              <Folders size={36} className='text-light-purple mr-1' />
              <p className='text-3xl font-chillax text-light-purple font-medium'>
                ORGANIZAÇÃO
              </p>
            </div>
            <p className='text-2xl font-satoshi text-black'>
              Tenha todos os seus estabelecimentos em um único lugar para que
              você possa controlar e organizar todos os{' '}
              <span className='text-light-purple'>ROLE</span>s de forma fácil e
              prática!
            </p>
          </div>

          <div className='px-2 py-5 '>
            <div className='flex'>
              <ChartBar size={36} className='text-light-purple mr-1' />
              <p className='text-3xl font-chillax text-light-purple font-medium'>
                ANÁLISE
              </p>
            </div>
            <p className='text-2xl font-satoshi text-black'>
              Utilize ferramentas para conhecer melhor o seu público e seus
              interesses, adaptando suas ofertas e aumentando a satisfação das
              pessoas!
            </p>
          </div>

          <div className='px-2 py-5 '>
            <div className='flex'>
              <Megaphone size={36} className='text-light-purple mr-1' />
              <p className='text-3xl font-chillax text-light-purple font-medium'>
                PUBLICIDADE
              </p>
            </div>
            <p className='text-2xl pr-4 font-satoshi text-black'>
              Crie, configure e promova seus{' '}
              <span className='text-light-purple'>ROLE</span>s assertivamente
              para todos os usuários do aplicativo!
            </p>
          </div>
        </div>
        <div className='w-2/12' />
        <div className='xl:w-5/12 max-xl:w-1/2 relative flex justify-end items-center'>
          <div className='relative w-full flex justify-center items-center'>
            <InteractableImage
              src={mock2}
              alt='Phone Mockup'
              className='absolute left:1/2 transform -translate-x-1/2 w-full max-w-[320px] z-0'
            />
            <InteractableImage
              src={mock}
              alt='Phone Mockup'
              className=' w-full max-w-[320px] ml-24 z-10'
            />
          </div>
        </div>
      </div>

      <div className='lg:hidden flex flex-col gap-y-12 justify-center items-center'>
        <div className='px-8 py-5 text-center'>
          <div className='flex text-center justify-center items-center'>
            <Folders size={36} className='text-light-purple mr-1' />
            <p className='text-3xl font-chillax text-light-purple font-medium'>
              ORGANIZAÇÃO
            </p>
          </div>
          <p className='text-2xl font-satoshi text-black'>
            Tenha todos os seus estabelecimentos em um único lugar para que você
            possa controlar e organizar todos os{' '}
            <span className='text-light-purple'>ROLE</span>s de forma fácil e
            prática!
          </p>
        </div>

        <div className='px-8 py-5 text-center'>
          <div className='flex text-center justify-center items-center'>
            <ChartBar size={36} className='text-light-purple mr-1' />
            <p className='text-3xl font-chillax text-light-purple font-medium'>
              ANÁLISE
            </p>
          </div>
          <p className='text-2xl font-satoshi text-black'>
            Utilize ferramentas para conhecer melhor o seu público e seus
            interesses, adaptando suas ofertas e aumentando a satisfação das
            pessoas!
          </p>
        </div>

        <div className='px-8 py-5 text-center'>
          <div className='flex text-center justify-center items-center'>
            <Megaphone size={36} className='text-light-purple mr-1' />
            <p className='text-3xl font-chillax text-light-purple font-medium'>
              PUBLICIDADE
            </p>
          </div>
          <p className='text-2xl font-satoshi text-black'>
            Crie, configure e promova seus
            <span className='text-light-purple pl-2'>ROLE</span>s assertivamente
            para todos os usuários do aplicativo!
          </p>
        </div>

        <div className='relative w-full flex justify-center sm:gap-x-[25vw] max-sm:gap-x-[10vw]'>
          <InteractableImage
            src={mock}
            alt='Phone Mockup'
            className=' w-full max-w-[250px]'
          />
          <InteractableImage
            src={mock2}
            alt='Phone Mockup'
            className='w-full max-w-[250px]'
          />
        </div>
      </div>
    </div>
  );
};
