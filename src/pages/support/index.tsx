import { envs } from "../../utils/envs";

export function Support() {
  return <>
    <button
        className="absolute top-5 left-5 rounded-[30px] text-white cursor-pointer transform w-28 h-12 hover:scale-110 ease-in-out duration-300 text-xl font-medium"
        onClick={() => window.history.back()}
      >
        Voltar
    </button>
    <div className="bg-gradient-to-r from-dark-purple via-purple via-70% to-light-purple flex flex-col items-center justify-center min-h-screen">

      <img src={`${envs.cloudfrontUrl}/approle_logo_navbar.png`} alt="AppRole Logo" className="h-16 mb-6" />
      <h1 className="text-4xl font-bold text-center text-white mb-6">Contate o Suporte</h1>
      <p className="text-white text-center">Possui alguma dúvida específica na utilização do app?</p>

      {/* card de Contate o email suporte@roleapp.com.br e venha fazer parte do ROLE */}
      <div className="bg-white rounded-lg w-full max-w-[800px] p-5 mt-5">
        <p className="text-black text-center">Envie um email para 
          
          {/* suporte@roleapp.com.br QUE SEJA UM LINK QUE REDIRECIONE PARA O EMAIL PADRAO DA PESSOA QUE TIVER CLICANDO */}
          <a href="mailto:suporte@roleapp.com.br" className="ml-2 text-purple mr-2 hover:underline">suporte@roleapp.com.br</a>
          
          e venha fazer parte do ROLE!</p>
      </div>
      
    </div>
  
  </>
}