import {CaretCircleLeft, CaretCircleRight, CheckCircle, Folders, ChartBar, Megaphone} from "@phosphor-icons/react";
import mock from "../assets/Mockup.png";
import mock2 from "../assets/Mockup2.png";

export const Section4 = () => {
    return (
        <div className="w-full bg-white justify-center rounded-3xl py-16">
            <h1 className="text-4xl text-center pb-12">PARA VOCÊ <span
                className="font-bold text-light-purple">ORGANIZADOR</span></h1>

            <div className="flex flex-row max-lg:hidden xl:pl-24 max-xl:pl-12">
                <div className="xl:w-5/12 flex flex-col gap-y-20 max-xl:w-1/2">
                    <div className="px-2 py-5">
                        <div className="flex">
                            <Folders size={36} className="text-light-purple mr-1"/>
                            <p className="text-3xl font-nunito text-light-purple font-medium">ORGANIZAÇÃO</p>
                        </div>
                        <p className="text-2xl font-nunito">Tenha todos os seus estabelecimentos em um único
                            lugar para que você possa controlar e organizar todos os <span
                                className="text-light-purple">
                                ROLE</span>s de forma fácil e prática!
                        </p>
                    </div>

                    <div className="px-2 py-5 ">
                        <div className="flex">
                            <ChartBar size={36} className="text-light-purple mr-1"/>
                            <p className="text-3xl font-nunito text-light-purple font-medium">ANÁLISE</p>
                        </div>
                        <p className="text-2xl font-nunito">Utilize ferramentas para conhecer melhor o seu público
                            e seus interesses, adaptando suas ofertas e aumentando a satisfação das pessoas!
                        </p>
                    </div>

                    <div className="px-2 py-5 ">
                        <div className="flex">
                            <Megaphone size={36} className="text-light-purple mr-1"/>
                            <p className="text-3xl font-nunito text-light-purple font-medium">PUBLICIDADE</p>
                        </div>
                        <p className="text-2xl font-nunito">Crie, configure e promova seus ROLEs assertivamente para
                            todos os usuários do aplicativo!
                        </p>
                    </div>
                </div>
                <div className="w-2/12"/>
                <div className="xl:w-5/12 max-xl:w-1/2 relative flex justify-end items-center">
                    <div className="relative w-full flex justify-center items-center">
                        <img src={mock2} alt="Phone Mockup"
                             className="absolute  transform -translate-x-1/2 w-full max-w-[320px] z-0"/>
                        <img src={mock} alt="Phone Mockup" className=" w-full max-w-[320px] ml-24 z-10"/>
                    </div>
                </div>
            </div>

            <div className="lg:hidden flex flex-col gap-y-12 justify-center items-center">
                <div className="px-8 py-5 text-center">
                    <div className="flex text-center justify-center items-center">
                        <Folders size={36} className="text-light-purple mr-1"/>
                        <p className="text-3xl font-nunito text-light-purple font-medium">ORGANIZAÇÃO</p>
                    </div>
                    <p className="text-2xl font-nunito">Tenha todos os seus estabelecimentos em um único
                        lugar para que você possa controlar e organizar todos os <span
                            className="text-light-purple">
                            ROLE</span>s de forma fácil e prática!
                    </p>
                </div>

                <div className="px-8 py-5 text-center">
                    <div className="flex text-center justify-center items-center">
                        <ChartBar size={36} className="text-light-purple mr-1"/>
                        <p className="text-3xl font-nunito text-light-purple font-medium">ANÁLISE</p>
                    </div>
                    <p className="text-2xl font-nunito">Utilize ferramentas para conhecer melhor o seu público
                        e seus interesses, adaptando suas ofertas e aumentando a satisfação das pessoas!
                    </p>
                </div>

                <div className="px-8 py-5 text-center">
                    <div className="flex text-center justify-center items-center">
                        <Megaphone size={36} className="text-light-purple mr-1"/>
                        <p className="text-3xl font-nunito text-light-purple font-medium">PUBLICIDADE</p>
                    </div>
                    <p className="text-2xl font-nunito font-">Crie, configure e promova seus ROLEs assertivamente para
                        todos os usuários do aplicativo!
                    </p>
                </div>

                <div className="relative w-full flex justify-center items-center sm:gap-x-[25vw] max-sm:gap-x-[10vw]">
                    <img src={mock} alt="Phone Mockup" className=" w-full max-w-[160px]"/>
                    <img src={mock2} alt="Phone Mockup"
                         className="w-full max-w-[160px]"/>
                </div>
            </div>
        </div>
    )
}