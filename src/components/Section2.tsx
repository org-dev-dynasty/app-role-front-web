/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import {
  CheckCircle,
  Heart,
  MagnifyingGlass,
  Medal,
} from '@phosphor-icons/react';
import { Carousel } from './Carousel';

export const Section2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getClassName = (index: any) => {
    return index === currentIndex
      ? 'border-light-purple border-solid border-2 rounded-2xl px-2 py-5 bg-white drop-shadow-purple'
      : 'border-transparent border-solid border-2 rounded-2xl px-2 py-5 bg-white hover:bg-gray-200 cursor-pointer';
  };

  const hide = (index: any) => {
    return index === currentIndex
      ? 'px-2 py-5 mb-8 md:w-1/2 mt-8 mx-auto'
      : 'hidden';
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? 4 - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === 4 - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div
      id='diferenciais'
      className='z-20 w-full bg-white justify-center rounded-3xl py-16'
    >
      <h1 className='text-4xl text-center pb-12 font-chillax font-medium px-2'>
        APROVEITE OS{' '}
        <span className='font-semibold text-light-purple'>ROLE</span>s COM
        QUALIDADE
      </h1>

      <div className='flex flex-row max-lg:hidden px-12 drop-shadow-xl'>
        <div className='flex flex-col gap-y-16 w-1/3 my-auto'>
          <div className={getClassName(0)} onClick={() => setCurrentIndex(0)}>
            <div className='flex flex-row'>
              <CheckCircle size={36} className='text-light-purple mr-1' />
              <p className='text-3xl font-chillax text-light-purple font-medium'>
                RECOMENDAÇÃO
              </p>
            </div>
            <p className='font-satoshi text-2xl pl-10 text-black'>
              Recomendação assertiva dos seus tipos de{' '}
              <span className='text-light-purple'>ROLE</span>s preferidos e dos
              mais frequentados da sua cidade!
            </p>
          </div>

          <div className={getClassName(1)} onClick={() => setCurrentIndex(1)}>
            <div className='flex flex-row'>
              <MagnifyingGlass size={36} className='text-light-purple mr-1' />
              <p className='text-3xl font-chillax text-light-purple font-medium'>
                PESQUISA
              </p>
            </div>
            <p className=' font-satoshi text-2xl pl-10 text-black'>
              Pesquisa avançada com diversos filtros e parâmetros para facilitar
              sua busca pelo seu <span className='text-light-purple'>ROLE</span>{' '}
              ideal!
            </p>
          </div>
        </div>

        <div className='w-1/3 flex justify-center items-center'>
          <Carousel
            currentIndex={currentIndex}
            nextSlide={nextSlide}
            prevSlide={prevSlide}
          />
        </div>

        <div className='flex flex-col gap-y-16 w-1/3 my-auto'>
          <div className={getClassName(2)} onClick={() => setCurrentIndex(2)}>
            <div className='flex flex-row-reverse'>
              <Heart size={36} className='text-light-purple ml-1' />
              <p className='text-3xl font-chillax text-light-purple font-medium'>
                SOCIAL
              </p>
            </div>
            <p className='font-satoshi text-2xl pr-10 text-right text-black'>
              Siga pessoas, faça amizades e descubra os usuários que estarão
              presentes nos seus próximos{' '}
              <span className='text-light-purple'>ROLE</span>s!
            </p>
          </div>

          <div className={getClassName(3)} onClick={() => setCurrentIndex(3)}>
            <div className='flex flex-row-reverse'>
              <Medal size={36} className='text-light-purple ml-1' />
              <p className='text-3xl font-chillax text-light-purple font-medium'>
                BENEFÍCIOS
              </p>
            </div>
            <p className='font-satoshi text-2xl pr-10 text-right text-black'>
              Confirme sua presença, mostre para seus amigos qual o{' '}
              <span className='text-light-purple'>ROLE</span> da vez e ganhe
              benefícios!
            </p>
          </div>
        </div>
      </div>

      <div className='lg:hidden mx-12'>
        <div className='flex flex-row justify-center items-center'>
          <Carousel
            currentIndex={currentIndex}
            nextSlide={nextSlide}
            prevSlide={prevSlide}
          />
        </div>

        <div className={hide(0)}>
          <div className='flex flex-row items-center justify-center'>
            <CheckCircle
              size={48}
              className='text-light-purple mr-1 flex-shrink-0'
            />
            <p className='text-3xl font-chillax text-light-purple font-medium'>
              RECOMENDAÇÃO
            </p>
          </div>
          <p className='text-2xl text-center font-satoshi'>
            Recomendação assertiva dos seus tipos de{' '}
            <span className='text-light-purple'>ROLE</span>s preferidos e dos
            mais frequentados da sua cidade!
          </p>
        </div>

        <div className={hide(1)}>
          <div className='flex flex-row items-center justify-center'>
            <MagnifyingGlass
              size={48}
              className='text-light-purple mr-1 flex-shrink-0'
            />
            <p className='text-3xl font-chillax text-light-purple font-medium'>
              PESQUISA
            </p>
          </div>
          <p className='text-2xl text-center font-satoshi'>
            Pesquisa avançada com diversos filtros e parâmetros para facilitar
            sua busca pelo seu <span className='text-light-purple'>ROLE</span>{' '}
            ideal!
          </p>
        </div>

        <div className={hide(2)}>
          <div className='flex flex-row items-center justify-center'>
            <Heart size={48} className='text-light-purple mr-1 flex-shrink-0' />
            <p className='text-3xl font-chillax text-light-purple font-medium'>
              SOCIAL
            </p>
          </div>
          <p className='text-2xl text-center font-satoshi'>
            Siga pessoas, faça amizades e descubra os usuários que estarão
            presentes nos seus próximos{' '}
            <span className='text-light-purple'>ROLE</span>s!
          </p>
        </div>

        <div className={hide(3)}>
          <div className='flex flex-row items-center justify-center'>
            <Medal size={48} className='text-light-purple mr-1 flex-shrink-0' />
            <p className='text-3xl font-chillax text-light-purple font-medium'>
              BENEFÍCIOS
            </p>
          </div>
          <p className='text-2xl text-center font-satoshi'>
            Confirme sua presença, mostre para seus amigos qual o{' '}
            <span className='text-light-purple'>ROLE</span> da vez e ganhe
            benefícios!
          </p>
        </div>
      </div>
    </div>
  );
};
