/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import { envs } from '../utils/envs';

const json = [
  {
    id: 1,
    name: 'Crie Memórias',
    image: `${envs.cloudfrontUrl}/section3_girls.jpeg`,
  },
  {
    id: 2,
    name: 'O seu ROLE Ideal!',
    image: `${envs.cloudfrontUrl}/section3_holding_phone.jpg`,
  },
  {
    id: 3,
    name: 'Experiências Únicas',
    image: `${envs.cloudfrontUrl}/section3_party_fire.jpg`,
  },
  {
    id: 4,
    name: 'Viva os ROLEs com Qualidade!',
    image: `${envs.cloudfrontUrl}/section3_girl_in_pandora.jpeg`,
  },
];

export const Section3 = () => {
  const sectionToScroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionToScrollElement = sectionToScroll.current;
    let isScrolling: any;

    const smoothScroll = () => {
      if (sectionToScrollElement) {
        sectionToScrollElement.scrollLeft += 1;

        if (
          sectionToScrollElement.scrollLeft >=
          sectionToScrollElement.scrollWidth / 2
        ) {
          sectionToScrollElement.scrollLeft = 0;
        }
      }

      isScrolling = requestAnimationFrame(smoothScroll);
    };

    smoothScroll();

    return () => {
      cancelAnimationFrame(isScrolling);
    };
  }, []);

  const extendedJson = [...json, ...json]; // Duplica os itens do carrossel

  return (
    <div className='flex flex-col justify-center font-chillax'>
      <div className='flex justify-center items-center py-24'>
        <p className='text-5xl text-white text-center drop-shadow-purple-mid px-2 max-sm:text-4xl font-medium'>
          <span className='font-semibold text-white'>Encontre</span> Eventos,{' '}
          <span className='font-semibold text-white'>Conheça</span> Pessoas e{' '}
          <span className='font-semibold text-white'>Crie</span> Histórias
        </p>
      </div>

      <div
        ref={sectionToScroll}
        id='section3'
        className='section3 flex overflow-x-hidden whitespace-nowrap'
      >
        {extendedJson.map((item, index) => (
          <div
            key={index}
            className='inline-block mx-4 flex-shrink-0 w-1/3 max-sm:w-5/6 max-md:w-2/3 max-lg:w-1/2 relative'
          >
            <img
              alt={item.name}
              src={item.image}
              className='w-full h-full object-cover rounded-3xl'
            />
            <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 backdrop-blur rounded-3xl bg-[rgba(29,29,29,0.4)] w-11/12 flex items-center justify-center'>
              <p className='text-lg sm:text-xl md:text-2xl text-white inline text-center py-2 xl:py-6 px-6 font-satoshi'>
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-center items-center py-24 font-chillax'>
        <p className='text-5xl text-white text-center drop-shadow-purple-mid px-2 max-sm:text-4xl font-semibold'>
          O{' '}
          <span className='font-semibold text-violet drop-shadow-purple-strong'>
            ROLE
          </span>{' '}
          vai revolucionar a sua vida noturna!
        </p>
      </div>
    </div>
  );
};
