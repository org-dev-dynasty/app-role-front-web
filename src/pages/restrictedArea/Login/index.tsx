import { SetStateAction, useState } from "react";
import { envs } from "../../../utils/envs";
import { EyeSlash, Eye, User } from "@phosphor-icons/react";



export default function Login() {
  const [username, setUsername] = useState<string>()
  const [userError, setUserError] = useState<string>("")
  const [password, setPassword] = useState<string>()
  const [passwordError, setPasswordError] = useState<string>("")

  const handleUsername = (e: { target: { value: SetStateAction<string> } }) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e: { target: { value: SetStateAction<string> } }) => {
    setPassword(e.target.value)
  }

  const [isVisible, setIsVisible] = useState(false)

  const handleEntrar = () => {
    if (!username) {
      setUserError("Usuário não pode ser vazio")
    } else {
      setUserError("")
    }

    if (!password) {
      setPasswordError("Senha não pode ser vazia")
    } else {
      setPasswordError("")
    }
  }

  return (
    <div className="bg-[#2A2A2A] h-[100vh] w-full flex justify-center items-center">
      <div className="h-2/3 w-1/2 bg-[#6A6A6A] rounded-xl py-10 shadow-lg flex items-center flex-col">
        <div className="shadow-lg w-2/3 h-1/5 flex justify-center items-center rounded-lg">
          <img src={`${envs.cloudfrontUrl}/approle_logo_navbar.png`} alt="AppRole Logo" className="h-16" />
        </div>
        <div className="flex w-full h-full flex-col justify-center items-center ">
          <div className="bg-white rounded-lg h-10 w-4/5 shadow-lg flex items-center justify-between pr-5">
            <input type="text" className="rounded-lg outline-none p-5 h-full w-full" value={username} onChange={(event) => handleUsername(event)} placeholder="Usuário" />
            <User size={30} />
          </div>
          <div className="w-4/5 px-2 mt-1">
            <p className="text-red-300 text-xs">{userError}</p>
          </div>
          {isVisible ?
            <div className="bg-white mt-4 rounded-lg h-10 w-4/5 shadow-lg flex justify-between items-center pr-5">
              <input type="text" className="rounded-lg outline-none p-5 h-full w-full" value={password} onChange={(event) => handlePassword(event)} placeholder="Senha" />
              <EyeSlash size={30} className="hover:cursor-pointer" onClick={() => setIsVisible(!isVisible)} />
            </div> :
            <div className="bg-white mt-4 rounded-lg h-10 w-4/5 shadow-lg flex justify-between pr-5 items-center">
              <input type="password" className="rounded-lg outline-none p-5 h-full w-full" value={password} onChange={(event) => handlePassword(event)} placeholder="Senha" />
              <Eye size={30} className="hover:cursor-pointer" onClick={() => setIsVisible(!isVisible)} />
            </div>}
          <div className="w-4/5 px-2 justify-between flex mt-1"><p className="text-red-300 text-xs">{passwordError}</p><p className="text-white text-xs hover:underline hover:cursor-pointer">Esqueci minha senha</p></div>
          <button className="bg-purple rounded-lg text-white h-10 w-4/5 mt-4 shadow-lg hover:bg-light-purple duration-300" onClick={handleEntrar}>Entrar</button>
        </div>
      </div>
    </div>
  )
}