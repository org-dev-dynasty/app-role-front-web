export function Contact() {
    return (
        <>
            <section className="bg-transparent text-white flex justify-center items-center h-[80%] w-[92%]">
                <div className="bg-[#1D1D1D] bg-opacity-40 h-[453px] w-full rounded-[50px] ">
                    <h1 className="text-5xl ml-[300px] mt-[51px]">Fale Conosco</h1>
                    <div id="container_esquerda" className="flex flex-nowrap w-min pr-[20px]">
                        <div className="flex flex-col">
                            <div className="mt-[40px]">
                                <p className="ml-[68px] mb-[7px] text-2xl">Nome:</p>
                                <input type="text" className="bg-transparent border-opacity-60 border-2 border-white rounded-[15px] placeholder-[#838383] h-[48px] w-72 pl-[14px] ml-[62px]" placeholder="Digite seu nome..."/>
                            </div>
                            <div className="mt-[23px]">
                                <p className="ml-[68px] mb-[7px] text-2xl">E-mail:</p>
                                <input type="email" className="bg-transparent border-opacity-60 border-2 border-white rounded-[15px] placeholder-[#838383] h-[48px] w-72 pl-[14px] ml-[62px]" placeholder="Digite seu e-mail..."/>
                            </div>
                        </div>
                        <div className="flex flex-col mt-[40px]">
                            <p className="ml-[68px] mb-[7px] text-2xl">Escreva sua mensagem:</p>
                            <textarea id="mensagem" className="bg-transparent w-96 border-opacity-60 border-2 border-white rounded-[15px] placeholder-[#838383] pl-[14px] pt-[10px] ml-[62px] h-[155px]" placeholder="Digite sua mensagem..."/>
                            <button className="mt-5 bg-gradient-to-r from-[#5A189A] to-[#1E0834]">Enviar</button>
                        </div>
                    </div>
                    <div id="container_direita" className="flex flex-col">
                    </div>
                </div>   
            </section>
        </>
    )
}