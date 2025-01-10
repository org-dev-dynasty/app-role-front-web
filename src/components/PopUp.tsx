/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { XCircle } from '@phosphor-icons/react';
// import { sendMailParticpant } from '../api/api_requests';

export const Popup = ({ isOpen, onClose }: any) => {
  const [showPopup, setShowPopup] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [email, setEmail] = useState('');

  const handleEmailSend = async () => {
    if (email === '') {
      alert('Digite um e-mail válido');
    }
    // const resp = await sendMailParticpant(email);
    // if (resp) {
    //     alert('E-mail enviado com sucesso!');
    //     setEmail('');
    //     onClose();
    // }
  };

  // Atualiza o estado para mostrar ou esconder o popup
  useEffect(() => {
    if (isOpen) {
      setShowPopup(true);
      setTimeout(() => setAnimateIn(true), 10); // Breve atraso para garantir que a animação de entrada seja aplicada
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => setShowPopup(false), 300); // Tempo deve corresponder ao tempo da animação
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!showPopup) return null;

  return (
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
        animateIn ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`relative bg-gradient-to-r from-dark-purple via-purple via-70% to-light-purple rounded-lg shadow-lg p-6 max-w-sm w-full transform transition-transform duration-300 ${
          animateIn ? 'translate-y-0' : '-translate-y-10'
        }`}
      >
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-red-600 hover:text-red-900'
        >
          <XCircle size={32} />
        </button>
        <p className='text-xl font-bold my-4 text-white text-center'>
          Seja a primeira pessoa a aprimorar sua vida noturna!
        </p>
        <div className='w-full pb-4'>
          <p className='mb-[7px] text-white'>E-mail:</p>
          <input
            type='email'
            className='bg-transparent border-opacity-60 border-2 border-white text-lg rounded-[15px] placeholder-[#838383] text-white h-[48px] w-full pl-[14px]'
            placeholder='Digite seu e-mail...'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className='flex justify-center items-center'>
          <Button
            className={`bg-gradient-to-r from-[#5A189A] to-[#1E0834] w-36 h-8 rounded-3xl text-xl text-white shadow-2xl shadow-black transition-transform duration-200 hover:brightness-75`}
            label='Enviar'
            onClick={handleEmailSend}
          ></Button>
        </div>
      </div>
    </div>
  );
};
