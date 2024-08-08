import React, {useState} from 'react';
import {Button} from "primereact/button";
import {XCircle} from "@phosphor-icons/react";

export const Popup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
        if (emailError) {
            setEmailError('');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div
                className="relative bg-gradient-to-r from-dark-purple via-purple via-70% to-light-purple rounded-lg shadow-lg p-6 max-w-sm w-full">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-900"
                >
                    <XCircle size={32} />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-white">Popup Title</h2>
                <p className="mb-4 text-white">Seja a primeira pessoa a aprimorar sua vida noturna!</p>
                <div className="w-full pb-4">
                    <p className="mb-[7px] text-white">E-mail:</p>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="bg-transparent border-opacity-60 border-2 border-white text-lg rounded-[15px] placeholder-[#838383] text-white h-[48px] w-full pl-[14px]"
                        placeholder="Digite seu e-mail..."
                    />
                </div>

                <div className="flex justify-center items-center">
                    <Button
                        className={`bg-gradient-to-r from-[#5A189A] to-[#1E0834] w-36 h-8 rounded-3xl text-xl text-white shadow-2xl shadow-black transition-transform duration-200 hover:brightness-75`}
                        label='Enviar'
                    >
                    </Button>
                </div>

            </div>
        </div>
    );
};

