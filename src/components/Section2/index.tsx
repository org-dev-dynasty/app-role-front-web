import {CheckCircle, Heart, MagnifyingGlass} from '@phosphor-icons/react'
export const Section2 = () => {
    return (
        <div className="w-full bg-white justify-center rounded-3xl px-12 py-16">
            <h1 className="text-5xl text-center pb-12">APROVEITE OS <span
                className="font-bold text-light-purple">ROLE</span>s COM QUALIDADE</h1>

            <div>
                <div className="w-1/3 border-light-purple border-solid border-2 rounded-xl px-2 py-5 mb-8">
                    <div className="flex flex-row">
                        <CheckCircle size={36} className="text-light-purple mr-1"/>
                        <p className="text-3xl font-nunito text-light-purple font-medium">RECOMENDAÇÃO</p>
                    </div>
                    <p className="text-2xl font-nunito pl-10">Recomendação assertiva dos seus tipos de <span
                        className="text-light-purple">ROLE</span>s preferidos e dos mais frequentados da sua cidade!</p>
                </div>

                <div className="w-1/3 px-2 py-5">
                    <div className="flex flex-row">
                        <MagnifyingGlass size={36} className="text-light-purple mr-1"/>
                        <p className="text-3xl font-nunito text-light-purple font-medium">PESQUISA</p>
                    </div>
                    <p className="text-2xl font-nunito pl-10">Pesquisa avançada com diversos filtros e parâmetros para
                        facilitar sua busca pelo seu <span className="text-light-purple">ROLE</span> ideal!</p>
                </div>

                <div></div>

                <div className="w-1/3 px-2 py-5">
                    <div className="flex flex-row">
                        <Heart size={36} className="text-light-purple mr-1"/>
                        <p className="text-3xl font-nunito text-light-purple font-medium">SOCIAL</p>
                    </div>
                    <p className="text-2xl font-nunito pl-10">Siga pessoas, faça amizades e descubra os usuários que
                        estarão presentes no seus próximos <span className="text-light-purple">ROLE</span>s!</p>
                </div>

                <div className="w-1/3 px-2 py-5">
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
    );
}