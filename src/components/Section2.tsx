import React, { useState } from 'react';
import { CheckCircle, Heart, MagnifyingGlass, Medal } from '@phosphor-icons/react';
import { Carousel } from './Carousel';

export const Section2 = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const getClassName = (index) => {
        return index === currentIndex
            ? "border-light-purple border-solid border-2 rounded-xl px-2 py-5 mb-8"
            : "border-white border-solid border-2 rounded-xl px-2 py-5 mb-8 hover:bg-gray-200 cursor-pointer";
    };

    const hide = (index) => {
        return index === currentIndex
            ? "px-2 py-5 mb-8 md:w-1/2 mt-8 mx-auto"
            : "hidden";
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
        <div id='beneficios' className="w-full bg-white justify-center rounded-3xl px-12 py-16">
            <h1 className="text-4xl text-center pb-12 text-">APROVEITE OS <span
                className="font-bold text-light-purple">ROLE</span>s COM QUALIDADE</h1>

            <div className="flex flex-row max-lg:hidden">
                <div className="w-1/3">
                    <div className={getClassName(0)} onClick={() => setCurrentIndex(0)}>
                        <div className="flex flex-row">
                            <CheckCircle size={36} className="text-light-purple mr-1" />
                            <p className="text-3xl font-nunito text-light-purple font-medium">RECOMENDAÇÃO</p>
                        </div>
                        <p className="text-2xl font-nunito pl-10">Recomendação assertiva dos seus tipos de <span className="text-light-purple">ROLE</span>s preferidos e dos mais frequentados da sua cidade!</p>
                    </div>

                    <div className={getClassName(1)} onClick={() => setCurrentIndex(1)}>
                        <div className="flex flex-row">
                            <MagnifyingGlass size={36} className="text-light-purple mr-1" />
                            <p className="text-3xl font-nunito text-light-purple font-medium">PESQUISA</p>
                        </div>
                        <p className="text-2xl font-nunito pl-10">Pesquisa avançada com diversos filtros e parâmetros para facilitar sua busca pelo seu <span className="text-light-purple">ROLE</span> ideal!</p>
                    </div>
                </div>

                <div className="w-1/3 flex justify-center items-center">
                    <Carousel currentIndex={currentIndex} nextSlide={nextSlide} prevSlide={prevSlide}/>
                </div>

                <div className="w-1/3">
                    <div className={getClassName(2)} onClick={() => setCurrentIndex(2)}>
                        <div className="flex flex-row">
                            <Heart size={36} className="text-light-purple mr-1" />
                            <p className="text-3xl font-nunito text-light-purple font-medium">SOCIAL</p>
                        </div>
                        <p className="text-2xl font-nunito pl-10">Siga pessoas, faça amizades e descubra os usuários que estarão presentes nos seus próximos <span className="text-light-purple">ROLE</span>s!</p>
                    </div>

                    <div className={getClassName(3)} onClick={() => setCurrentIndex(3)}>
                        <div className="flex flex-row">
                            <Medal size={36} className="text-light-purple mr-1" />
                            <p className="text-3xl font-nunito text-light-purple font-medium">BENEFÍCIOS</p>
                        </div>
                        <p className="text-2xl font-nunito pl-10">Confirme sua presença, mostre para seus amigos qual o <span className="text-light-purple">ROLE</span> da vez e ganhe benefícios!</p>
                    </div>
                </div>
            </div>

            <div className="lg:hidden ">
                <div className="flex flex-row justify-center items-center">
                    <Carousel currentIndex={currentIndex} nextSlide={nextSlide} prevSlide={prevSlide}/>

                </div>

                <div className={hide(0)}>
                    <div className="flex flex-row items-center justify-center">
                        <CheckCircle size={48} className="text-light-purple mr-1"/>
                        <p className="text-3xl font-nunito text-light-purple font-medium">RECOMENDAÇÃO</p>
                    </div>
                    <p className="text-2xl font-nunito text-center">Recomendação assertiva dos seus tipos de <span
                        className="text-light-purple">ROLE</span>s preferidos e dos mais frequentados da sua cidade!</p>
                </div>

                <div className={hide(1)}>
                    <div className="flex flex-row items-center justify-center">
                        <MagnifyingGlass size={48} className="text-light-purple mr-1"/>
                        <p className="text-3xl font-nunito text-light-purple font-medium">PESQUISA</p>
                    </div>
                    <p className="text-2xl font-nunito text-center">Pesquisa avançada com diversos filtros e parâmetros
                        para
                        facilitar sua busca pelo seu <span className="text-light-purple">ROLE</span> ideal!</p>
                </div>

                <div className={hide(2)}>
                    <div className="flex flex-row items-center justify-center">
                        <Heart size={48} className="text-light-purple mr-1"/>
                        <p className="text-3xl font-nunito text-light-purple font-medium">SOCIAL</p>
                    </div>
                    <p className="text-2xl font-nunito text-center">Siga pessoas, faça amizades e descubra os usuários que
                        estarão presentes nos seus próximos <span className="text-light-purple">ROLE</span>s!</p>
                </div>

                <div className={hide(3)}>
                    <div className="flex flex-row items-center justify-center">
                        <Medal size={48} className="text-light-purple mr-1"/>
                        <p className="text-3xl font-nunito text-light-purple font-medium">BENEFÍCIOS</p>
                    </div>
                    <p className="text-2xl font-nunito text-center">Confirme sua presença, mostre para seus amigos qual
                        o <span className="text-light-purple">ROLE</span> da vez e ganhe benefícios!</p>
                </div>

            </div>
        </div>
    );
};
