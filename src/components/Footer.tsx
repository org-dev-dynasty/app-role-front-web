import { envs } from "../utils/envs"
import { BackgroundBubbles } from "./BackgroundBubbles"

import pdf from '../assets/politica_de_privacidade.pdf'

export function Footer({ isNavbarOpened, openPopUp, isPopUpOpened }: { isNavbarOpened: boolean, openPopUp: () => void, isPopUpOpened: boolean }) {
    return (
        <>
            <div className="flex flex-col items-center relative justify-center p-4 text-white font-chillax pb-5">
                <div className="absolute bottom-0 left-0 w-full h-full flex items-center overflow-hidden">
                    <BackgroundBubbles isNavbarOpened={isNavbarOpened} isPopUpOpened={isPopUpOpened} />
                </div>
                <div className="w-full mb-10 text-center px-4 lg:w-[60%] z-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl drop-shadow-purple-mid">
                        Suas <span className="font-semibold">Melhores Histórias Começam</span> Dando Um <span className="text-[#9C4EDC] font-semibold">ROLE</span>!
                    </h1>
                </div>
                <div className="pt-8 md:pt-10 lg:pt-16 text-center z-10">
                    <p className="text-2xl md:text-3xl lg:text-4xl font-satoshi">Não fique de fora dessa!</p>
                </div>
                <div className="pt-8 md:pt-10 lg:pt-11">
                    <button onClick={openPopUp} className="w-48 h-12 md:w-56 md:h-14 lg:w-64 lg:h-16 
                        bg-gradient-to-r from-dark-purple via-purple via-70% to-light-purple 
                        rounded-[30px] md:rounded-[35px] lg:rounded-[41px] 
                        text-white cursor-pointer transform 
                        hover:scale-110 ease-in-out duration-300 
                        text-xl md:text-2xl lg:text-[32px] font-medium">
                        Participe
                    </button>
                </div>
                <div className="pt-10 lg:pt-16">
                    <img src={`${envs.cloudfrontUrl}/approle_logo_navbar.png`} alt="AppRole Logo" className="w-20 md:w-24 lg:w-32" />
                </div>
                <p className="font-nunito font-medium text-lg md:text-xl lg:text-xl pt-4">
                    © ROLE, Todos os direitos reservados.
                </p>
                <p className="font-nunito font-medium text-lg md:text-xl lg:text-xl pt-2 md:pt-4 lg:pt-5">
                    Para nos contatar envie um email para <a href="mailto:contato@roleapp.com.br" className="text-[#9C4EDC] drop-shadow-purple-mid hover:underline font-semibold">
                        contato@roleapp.com.br 
                    </a>
                </p>
                 {/* LINK DE POLITICA DE PRIVACIDADE  */}
                <p className="font-nunito font-medium text-lg md:text-xl lg:text-xl pt-2 md:pt-4 lg:pt-5">
                    <a href={pdf} 
                        className="text-[#9C4EDC] drop-shadow-purple-mid hover:underline font-semibold"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Política de Privacidade
                    </a>
                </p>
                <p className="font-nunito font-medium text-lg md:text-xl lg:text-xl pt-2 md:pt-4 lg:pt-5">
                    Desenvolvido por DevDynasty
                </p>
            </div>
        </>
    )
}
