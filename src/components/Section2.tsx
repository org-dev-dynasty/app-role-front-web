import {CaretCircleLeft, CaretCircleRight, CheckCircle, Heart, MagnifyingGlass} from '@phosphor-icons/react'
import mock from '../assets/Mockup.png';

export const Section2 = () => {
    return (
        <div className="w-full bg-white justify-center rounded-3xl px-12 py-16">
            <h1 className="text-4xl text-center pb-12 text-">APROVEITE OS <span
                className="font-bold text-light-purple">ROLE</span>s COM QUALIDADE</h1>

            <div className="flex flex-row max-lg:hidden">
                <div className="w-1/3">
                    <div className="border-light-purple border-solid border-2 rounded-xl px-2 py-5 mb-8">
                        <div className="flex flex-row">
                            <CheckCircle size={36} className="text-light-purple mr-1"/>
                            <p className="text-3xl font-nunito text-light-purple font-medium">RECOMENDAÇÃO</p>
                        </div>
                        <p className="text-2xl font-nunito pl-10">Recomendação assertiva dos seus tipos de <span
                            className="text-light-purple">ROLE</span>s preferidos e dos mais frequentados da sua cidade!
                        </p>
                    </div>

                    <div className="px-2 py-5">
                        <div className="flex flex-row">
                            <MagnifyingGlass size={36} className="text-light-purple mr-1"/>
                            <p className="text-3xl font-nunito text-light-purple font-medium">PESQUISA</p>
                        </div>
                        <p className="text-2xl font-nunito pl-10">Pesquisa avançada com diversos filtros e parâmetros
                            para
                            facilitar sua busca pelo seu <span className="text-light-purple">ROLE</span> ideal!</p>
                    </div>
                </div>

                <div className="w-1/3">
                </div>
                <div className="w-1/3">

                    <div className="px-2 py-5">
                        <div className="flex flex-row">
                            <Heart size={36} className="text-light-purple mr-1"/>
                            <p className="text-3xl font-nunito text-light-purple font-medium">SOCIAL</p>
                        </div>
                        <p className="text-2xl font-nunito pl-10">Siga pessoas, faça amizades e descubra os usuários que
                            estarão presentes nos seus próximos <span className="text-light-purple">ROLE</span>s!</p>
                    </div>

                    <div className="px-2 py-5">
                        <div className="flex flex-row">
                            <MagnifyingGlass size={36} className="text-light-purple mr-1"/>
                            <p className="text-3xl font-nunito text-light-purple font-medium">BENEFÍCIOS</p>
                        </div>
                        <p className="text-2xl font-nunito pl-10">Confirme sua presença, mostre para seus amigos qual
                            o <span
                                className="text-light-purple">ROLE</span> da vez e ganhe benefícios!</p>
                    </div>
                </div>


            </div>

            <div className="lg:hidden ">

                <div className="flex flex-row justify-center items-center">
                    <CaretCircleLeft size={36} className="text-light-purple"/>
                    <img src={mock} alt="phone" className="mx-4 w-1/6 max-w-36 opacity-50"/>
                    <img src={mock} alt="phone-behind"
                         className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-1/8 max-w-32 opacity-30 z-0"/>
                    <img src={mock} alt="phone" className="w-1/5 max-w-48 relative z-10 translate-y-4"/>
                    <img src={mock} alt="phone" className="mx-4 w-1/6 max-w-36 opacity-50"/>
                    <CaretCircleRight size={36} className="text-light-purple"/>
                </div>

                <div className="px-2 py-5 mb-8 md:w-1/2 mt-8 mx-auto">
                <div className="flex flex-row items-center justify-center">
                        <CheckCircle size={48} className="text-light-purple mr-1"/>
                        <p className="text-3xl font-nunito text-light-purple font-medium">RECOMENDAÇÃO</p>
                    </div>
                    <p className="text-2xl font-nunito text-center">Recomendação assertiva dos seus tipos de <span
                        className="text-light-purple">ROLE</span>s preferidos e dos mais frequentados da sua cidade!
                    </p>
                </div>

            </div>

        </div>
    );
}


