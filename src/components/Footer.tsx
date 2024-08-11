export function Footer({ openPopUp }: {openPopUp: () => void}) {
    return (
        <>
            <div className="flex flex-col items-center justify-center p-4 text-white">
                <div className="w-full mb-10 text-center px-4 lg:w-[60%]">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-chillax drop-shadow-purple-mid">
                        Suas <span className="font-semibold">Melhores Histórias Começam</span> Dando Um <span className="text-[#9C4EDC] font-semibold">ROLE</span>!
                    </h1>
                </div>
                <div className="pt-8 md:pt-10 lg:pt-16 text-center">
                    <p className="text-2xl md:text-3xl lg:text-4xl font-nunito">Não fique de fora dessa!</p>
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
                    <img src={"https://d1jwplf6mvpxl3.cloudfront.net/approle_logo_navbar.png"} alt="AppRole Logo" className="w-20 md:w-24 lg:w-32" />
                </div>
                <p className="font-nunito font-medium text-lg md:text-xl lg:text-xl pt-4">
                    © ROLE, Todos os direitos reservados.
                </p>
                <p className="font-nunito font-medium text-lg md:text-xl lg:text-xl pt-2 md:pt-4 lg:pt-5">
                    Desenvolvido por DevDynasty
                </p>
            </div>
        </>
    )
}
