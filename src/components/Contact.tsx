import { Checkbox } from "primereact/checkbox";
import { useState } from "react";

        

export function Contact() {
    const [checked, setChecked] = useState(false);

    return (
        <>
        <section className="bg-transparent text-white flex justify-center items-center h-[80%] w-[92%]">
            <div className="bg-[#1D1D1D] bg-opacity-40 h-full w-full rounded-[50px] flex">
                <div id="container_esquerda" className="flex flex-col">
                    <h1 className="text-5xl ml-[250px] mt-[51px]">Fale Conosco</h1>
                    <div className="flex flex-col">
                        <div className="mt-[22px]">
                            <p className="ml-[68px] mb-[7px] text-2xl">Nome:</p>
                            <input type="" className="bg-transparent border-opacity-60 border-2 border-white rounded-[15px] placeholder-[#838383] h-[48px] w-[338px] pl-[14px] ml-[62px]" placeholder="Digite seu nome..."/>
                        </div>

                        <div className="mt-[23px]">
                            <p className="ml-[68px] mb-[7px] text-2xl">E-mail:</p>
                            <input type="" className="bg-transparent border-opacity-60 border-2 border-white rounded-[15px] placeholder-[#838383] h-[48px] w-[338px] pl-[14px] ml-[62px]" placeholder="Digite seu e-mail..."/>
                        </div>

                        <div>
                            <Checkbox className="border-white bg-transparent w-11 h-11" checked={checked} onChange={(e) => {e.checked ? setChecked(e.checked) : null}}>
                                <div className="ml-[41px] text-2xl text-white">Organizador</div>
                            </Checkbox>
                        </div>
                    </div>
                </div>
                <div id="container_direita">
                </div>
                {/* <h1 className="text-5xl ml-[250px] mt-[51px]">Fale Conosco</h1>
                <div className="flex">
                    <div className="ml-[29px] mt-[22px]">
                        <p className="ml-[68px] mb-[7px] text-2xl">Escreva sua mensagem:</p>
                        <textarea id="" rows={10} cols={10} className="bg-transparent w-[437px] border-opacity-60 border-2 border-white rounded-[15px] placeholder-[#838383] pl-[14px] pt-[10px]" placeholder="Digite sua mensagem..."/>
                    </div>
                </div>
                <div className="flex">
                    <Checkbox />
                    <button className="bg-gradient-to-r from-[#5A189A] to-[#3C096C] ml-[684px] w-[182px] h-[37px] border-1 rounded-[15px] text-2xl mt-[47px] shadow-black shadow-2xl">Enviar</button>
                </div> */}
            </div>   
        </section>
        </>
    )
}

// 1- preciso aumentar a altura do input "escreva sua mensagem" sem que empurre o input "email" para baixo
// 2- preciso criar um componente checkbox
// 3- porque quando seleciono os inputs eles estão ficando com uma linha preta