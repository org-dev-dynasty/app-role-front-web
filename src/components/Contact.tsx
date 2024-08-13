/* eslint-disable @typescript-eslint/no-explicit-any */
import { Phone, Envelope } from '@phosphor-icons/react';
import { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { sendMail } from '../api/api_requests';

export function Contact() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [checked, setChecked] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false); 
    const toast = useRef<any>(null);

    const handleButtonClick = () => {
        setChecked(!checked);
    };

    const validateEmail = (email: string) => {
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        return emailPattern.test(email);
    };

    const handleSubmit = async () => {
        if (!validateEmail(email)) {
            showError('Por favor, insira um endereço de e-mail válido.');
        } else {
            setEmailError('');
            try {
                const success = await sendMail(email, name, message);
                if (success) {
                    clearCheckBox();
                    clearForm();
                    showSuccess('Formulário enviado com sucesso.');
                } else {
                    showError('Erro ao enviar o formulário. Tente novamente mais tarde.');
                }
            } catch (error : any) {
                showError(error.message);
            }
        }
    };

    const clearCheckBox = () => {
        setChecked(false);
    };

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
        if (emailError) {
            setEmailError('');
        }
    };

    const clearForm = () => {
        setEmail('');
        setName('');
        setMessage('');
    };

    const showError = (message: any) => {
        if (toast.current) {
            toast.current.show({ summary: 'Erro', detail: message, life: 3000,  className: 'bg-transparent text-red-500 border-2 border-white border-opacity-60 p-2 rounded-xl' });
        }
    };

    const showSuccess = (message: any) => {
        toast.current.show({ summary: 'Sucesso', detail: message, life: 3000, className: 'bg-transparent text-green-400 border-2 border-white border-opacity-60 p-2 rounded-xl' });
    };

    const handleButtonAnimation = () => {
        setIsButtonClicked(true);
        setTimeout(() => {
            setIsButtonClicked(false);
        }, 200);
    };

    return (
        <>
            <Toast ref={toast} position="top-center" className="toast-center mt-10 bg-[#1D1D1D] bg-opacity-40 rounded-xl"
            pt={{
                summary: {
                    className: 'font-extrabold'
                },
                detail:{
                    className: 'text-white'
                }

            }}/>
            <div className="bg-[#1D1D1D] bg-opacity-40 rounded-[50px] flex flex-nowrap justify-center items-center w-[92%] py-10 shadow-2xl shadow-dark-purple font-nunito">
                <div className="flex flex-col w-full  max-xl:hidden ">
                    <div className="flex">
                        <div id="container_esquerda" className="flex flex-col w-8/12 border-r-white border-r-2">
                            <h1 className="text-5xl text-center font-chillax font-medium">Fale Conosco</h1>
                            <div className="flex flex-col mt-[40px] justify-center items-center">
                                <div className='flex'>
                                    <div className="flex flex-col">
                                        <div>
                                            <p className="ml-[68px] mb-[7px] text-2xl font-satoshi">Nome:</p>
                                            <input
                                                type="text"
                                                className="bg-transparent font-satoshi border-opacity-60 border-2 border-white rounded-[15px] placeholder-[#838383] h-[48px] max-w-74 pl-[14px] ml-[62px]"
                                                placeholder="Digite seu nome..."
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="mt-[23px]">
                                            <p className="ml-[68px] mb-[7px] text-2xl font-satoshi">E-mail:</p>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={handleEmailChange}
                                                className="bg-transparent font-satoshi border-opacity-60 border-2 border-white rounded-[15px] placeholder-[#838383] h-[48px] max-w-74 pl-[14px] ml-[62px]"
                                                placeholder="Digite seu e-mail..."
                                            />
                                            {emailError && <p className="text-red-500 ml-[68px]">{emailError}</p>}
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex flex-col">
                                            <p className="ml-[68px] mb-[7px] text-2xl font-satoshi">Escreva sua mensagem:</p>
                                            <textarea
                                                id="mensagem"
                                                className="bg-transparent font-satoshi w-96 border-opacity-60 border-2 border-white rounded-[15px] placeholder-[#838383] pl-[14px] pt-[10px] ml-[62px] h-[155px]"
                                                placeholder="Digite sua mensagem..."
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex pt-11 items-center'>
                                    <div className="flex items-center">
                                        <button
                                            className={`w-[32px] h-[32px] rounded-[10px] ml-[68px] flex items-center justify-center transform duration-300 border-2 ${checked ? "bg-light-purple border-light-purple" : "bg-transparent border-white"
                                                }`}
                                            onClick={handleButtonClick}
                                        >
                                            <i className={`${checked ? "pi pi-check text-white transform duration-300" : "text-transparent"}`}></i>
                                        </button>
                                        <p className="text-2xl ml-4 font-satoshi">Organizador</p>
                                    </div>
                                    <div className='ml-40'>
                                        <Button
                                            className={`bg-gradient-to-r from-[#5A189A] to-[#1E0834] w-44 h-9 border-1 rounded-3xl justify-center text-2xl font-bold shadow-2xl shadow-black ml-32 transition-transform duration-200 hover:brightness-75 ${isButtonClicked ? 'transform scale-110' : ''}`}
                                            onClick={() => { handleSubmit(); handleButtonAnimation(); }}
                                            label='Enviar'
                                        >
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="container_direita" className="w-4/12">
                            <h1 className="text-5xl text-center font-chillax font-medium">Contato</h1>
                            <div className='pt-16 px-20 flex flex-col items-center'>
                                <div>
                                    <div className='flex gap-3 items-center'>
                                        <Phone size={38} />
                                        <p className='text-2xl font-satoshi'>(11) 99403-6227</p>
                                    </div>
                                    <div className='flex gap-3 items-center mt-8'>
                                        <Envelope size={38} />
                                        <p className='text-2xl font-satoshi'>contato@roleapp.com.br</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='xl:hidden flex flex-col max-md:hidden'>
                    <div id="container_esquerda" className="flex flex-col  border-b-white border-b-2 justify-center items-center">
                        <h1 className="text-5xl text-center font-chillax">Fale Conosco</h1>
                        <div className="flex flex-col mt-[40px] justify-center items-center">
                            <div className='flex'>
                                <div className="flex flex-col">
                                    <div>
                                        <p className="mb-[7px] text-2xl font-satoshi">Nome:</p>
                                        <input
                                            type="text"
                                            className="bg-transparent font-satoshi border-opacity-60 border-2 border-white rounded-[15px] placeholder-[#838383] h-[48px] max-w-74 pl-[14px]"
                                            placeholder="Digite seu nome..."
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mt-[23px]">
                                        <p className="mb-[7px] text-2xl font-satoshi">E-mail:</p>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={handleEmailChange}
                                            className="bg-transparent font-satoshi border-opacity-60 border-2 border-white rounded-[15px] placeholder-[#838383] h-[48px] max-w-74 pl-[14px] "
                                            placeholder="Digite seu e-mail..."
                                        />
                                        {emailError && <p className="text-red-500 ml-[68px]">{emailError}</p>}
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex flex-col">
                                        <p className="ml-[68px] mb-[7px] text-2xl font-satoshi">Escreva sua mensagem:</p>
                                        <textarea
                                            id="mensagem"
                                            className="bg-transparent font-satoshi w-96 border-opacity-60 border-2 border-white rounded-[15px] placeholder-[#838383] pl-[14px] pt-[10px] ml-[62px] h-[155px]"
                                            placeholder="Digite sua mensagem..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex pt-11 items-center pb-10'>
                                <div className="flex items-center">
                                    <button
                                        className={`w-[32px] h-[32px] rounded-[10px] flex items-center justify-center ${checked ? "bg-[#5A189A]" : "bg-transparent border-2 border-white"
                                            }`}
                                        onClick={handleButtonClick}
                                    >
                                        {checked && <i className="pi pi-check text-white"></i>}
                                    </button>
                                    <p className="text-2xl ml-4 font-satoshi">Organizador</p>
                                </div>
                                <div className='ml-40'>
                                    <Button
                                        className={`bg-gradient-to-r from-[#5A189A] to-[#1E0834] w-44 h-9 border-1 rounded-3xl justify-center text-2xl font-bold shadow-2xl shadow-black ml-32 transition-transform duration-200 ${isButtonClicked ? 'transform scale-110' : ''}`}
                                        onClick={() => { handleSubmit(); handleButtonAnimation(); }}
                                        label='Enviar'
                                    >
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="container_direita" className="justify-center items-center pt-10">
                        <h1 className="text-5xl text-center font-chillax">Contato</h1>
                        <div className='pt-16 px-20 flex flex-col items-center'>
                            <div>
                                <div className='flex gap-3 items-center'>
                                    <Phone size={38} />
                                    <p className='text-2xl font-satoshi'>(11) 99403-6227</p>
                                </div>
                                <div className='flex gap-3 items-center mt-8'>
                                    <Envelope size={38} />
                                    <p className='text-2xl font-satoshi'>contato@roleapp.com.br</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='md:hidden flex flex-col w-full px-8'>
                    <div id="container_esquerda" className="flex flex-col border-b-white border-b-2 justify-center items-center w-full ">
                        <h1 className="text-5xl text-center font-chillax">Fale Conosco</h1>
                        <div className="flex flex-col mt-[40px] justify-center items-center w-full">
                                <div className="flex flex-col w-full">
                                        <p className="mb-[7px] text-2xl font-satoshi">Nome:</p>
                                        <input
                                            type="text"
                                            className="bg-transparent font-satoshi border-opacity-60 border-2 border-white rounded-[15px] placeholder-[#838383] h-[48px] w-full pl-[14px]"
                                            placeholder="Digite seu nome..."
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                
                                    <div className="mt-6 w-full">
                                        <p className="mb-[7px] text-2xl font-satoshi">E-mail:</p>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={handleEmailChange}
                                            className="bg-transparent font-satoshi border-opacity-60 border-2 border-white rounded-[15px] placeholder-[#838383] h-[48px] w-full pl-[14px] "
                                            placeholder="Digite seu e-mail..."
                                        />
                                        {emailError && <p className="text-red-500 ml-[68px]">{emailError}</p>}
                                    </div>
                                </div>
                                <div className="flex w-full">
                                    <div className="flex flex-col w-full mt-6">
                                        <p className=" mb-[7px] text-2xl font-satoshi">Escreva sua mensagem:</p>
                                        <textarea
                                            id="mensagem"
                                            className="bg-transparent font-satoshi border-opacity-60 border-2 border-white rounded-[15px] placeholder-[#838383] pt-[10px] p-3 h-[155px] w-full"
                                            placeholder="Digite sua mensagem..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                    </div>
                                </div>
                            <div className='flex pt-11 justify-between pb-10 w-full'>
                                <div className="flex items-center pr-3">
                                    <button
                                        className={`w-[32px] h-[32px] rounded-[10px]  flex justify-center ${checked ? "bg-[#5A189A]" : "bg-transparent border-2 border-white"
                                            }`}
                                        onClick={handleButtonClick}
                                    >
                                        {checked && <i className="pi pi-check text-white"></i>}
                                    </button>
                                    <p className="text-xl pl-3 font-satoshi">Organizador</p>
                                </div>
                                    <Button
                                        className={`bg-gradient-to-r from-[#5A189A] to-[#1E0834] w-44 h-9 border-1 rounded-3xl justify-center text-2xl font-bold shadow-2xl shadow-black  transition-transform duration-200 ${isButtonClicked ? 'transform scale-110' : ''}`}
                                        onClick={() => { handleSubmit(); handleButtonAnimation(); }}
                                        label='Enviar'
                                    >
                                    </Button>
                            </div>
                        </div>
                    </div>
                    <div id="container_direita" className="justify-center items-center pt-10">
                        <h1 className="text-5xl text-center font-chillax">Contato</h1>
                        <div className='pt-16 flex flex-col items-start'>
                            <div>
                                <div className='flex gap-3 items-center'>
                                    <Phone size={38} />
                                    <p className='text-xl font-satoshi'>(11) 99403-6227</p>
                                </div>
                                <div className='flex gap-3 mt-8 items-center'>
                                    <Envelope size={38}/>
                                    <p className='text-xl font-satoshi'>contato@roleapp.com.br</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
