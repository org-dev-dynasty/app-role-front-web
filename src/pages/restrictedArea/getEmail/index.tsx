import { EnvelopeSimple } from "@phosphor-icons/react"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { envs } from "../../../utils/envs"
import { toast } from "react-toastify"
import { AuthContext } from "../../../context/auth_context"

export default function GetEmail() {
  const [email, setEmail] = useState<string>()
  const [userError, setUserError] = useState<string>("")
  const navigate = useNavigate()
  const { forgotPassword } = useContext(AuthContext)

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleVoltar = () => {
    navigate('/login')
  }

  const handleEntrar = async () => {
    if (!email || email === "") {
      setUserError("Preencha com o e-mail")
      return
    }
    if (email && !email.includes("@")) {
      setUserError("E-mail inválido")
      return
    }
    const response = await forgotPassword({ email: email })
    console.log(`ForgotPassword response: ${response}`)
    if (response.message !== "Uma mensagem de recuperação foi enviada para o seu e-mail") {
      toast.error(`${response}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      return
    }
    toast.success(`${response.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    localStorage.setItem('email', email)
    navigate('/verifyCode')
  }


  return (
    <div className="bg-[#2A2A2A] h-[100vh] w-full flex justify-center items-center">
      <div className="h-2/3 w-[40%] bg-[#363636] rounded-xl py-10 shadow-lg flex items-center flex-col">
        <div className="shadow-lg w-2/3 h-1/5 flex justify-center items-center rounded-lg">
          <img src={`${envs.cloudfrontUrl}/approle_logo_navbar.png`} alt="AppRole Logo" className="h-16" />
        </div>
        <div className="flex w-full h-full flex-col justify-center items-center ">
          <div className="bg-[#6A6A6A] rounded-lg h-10 w-4/5 shadow-lg flex items-center justify-between pr-5">
            <input type="text" className="rounded-lg outline-none p-5 h-full w-full bg-transparent text-white" value={email} onChange={(event) => handleEmail(event)} placeholder="E-mail" />
            <EnvelopeSimple size={30} color="white" />
          </div>
          <div className="w-4/5 px-2 mt-1">
            <p className="text-red-300 text-xs">{userError}</p>
          </div>
          <div className="w-4/5 justify-between flex flex-row">
            <button className="bg-light-purple rounded-lg text-white h-10 w-1/5 mt-4 shadow-lg hover:bg-violet duration-300" onClick={handleVoltar}>Voltar</button>
            <button className="bg-light-purple rounded-lg text-white h-10 w-1/5 mt-4 shadow-lg hover:bg-violet duration-300" onClick={handleEntrar}>Entrar</button>
          </div>
        </div>
      </div>
    </div>
  )
}