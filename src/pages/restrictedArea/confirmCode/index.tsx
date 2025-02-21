// import { Check, Eye, EyeSlash, X } from "@phosphor-icons/react"
// import React, { useContext, useEffect, useRef, useState } from "react"
// import { AuthContext } from "../../../context/auth"
// import { useNavigate } from "react-router-dom"

// export default function ResetPasswordCode() {
//   const inputRefs = useRef<Array<HTMLInputElement | null>>([])
//   const [otp, setOtp] = useState(['', '', '', '', '', ''])
//   const [activeOTPIndex, setActiveOTPIndex] = useState(0)
//   const [isVerified, setIsVerified] = useState<boolean | null>(null)
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false)
//   const [passwordErr, setPasswordErr] = useState('')
//   const [confirmPasswordErr, setConfirmPasswordErr] = useState('')
//   const { confirmCode, confirmForgotPassword, resendCode } = useContext(AuthContext)
//   const email = localStorage.getItem('email')
//   const navigate = useNavigate()

//   const handleOnChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     const { value } = e.target;
//     if (/^\d*$/.test(value)) {
//       const newOTP = [...otp];
//       newOTP[index] = value.substring(value.length - 1);
//       setOtp(newOTP);

//       if (value) {
//         if (index < otp.length - 1) {
//           setActiveOTPIndex(index + 1);
//         }
//       } else if (index > 0) {
//         setActiveOTPIndex(index - 1);
//       }
//     }
//   };

//   const handleOnKeyDown = (
//     e: React.KeyboardEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       setActiveOTPIndex(index - 1);
//     }
//   };

//   const handleValidPasswords = async () => {
//     if (password.length < 8) {
//       setPasswordErr("A senha deve ter no mínimo 8 caracteres");
//     }
//     if (confirmPassword.length < 8) {
//       setConfirmPasswordErr("A senha deve ter no mínimo 8 caracteres");
//     }
//     if (password !== confirmPassword) {
//       setConfirmPasswordErr("As senhas não coincidem");
//       setPasswordErr("As senhas não coincidem");
//     }
//     if (email && password) {
//       const response = await confirmForgotPassword({ email: email, newPassword: password })
//       console.log(`ConfirmForgotPassword response: ${response}`)
//       if (response.message === "Redefinição de senha realizada com sucesso!") {
//         navigate('/login')
//       }
//     }
//   }

//   const handleVoltar = () => {
//     window.history.back();
//   }

//   const handleResendCode = async () => {
//     if (email) {
//       const response = await resendCode({ email: email })
//       console.log(`ResendCode response: ${response}`)
//     }
//   }

//   const handleVerifyCode = async () => {
//     const code = otp.join('');
//     if (email && code) {
//       const resp = await confirmCode({ code: code, email: email })
//       console.log(`ConfirmCode response: ${resp}`)
//       if (resp.message === "Código validado com sucesso!") {
//         setIsVerified(true)
//       } else {
//         setIsVerified(false)
//       }
//     }
//   }

//   useEffect(() => {
//     inputRefs.current[activeOTPIndex]?.focus();
//   }, [activeOTPIndex]);

//   useEffect(() => {
//     document.title = "Verify Code";
//   }, []);

//   return (
//     <div className="h-[100vh] flex justify-center items-center w-full bg-[#1c1c1c]">
//       <div className="absolute h-2/3 w-1/2 flex p-6 py-18 flex-col justify-center items-center bg-[#444] overflow-y-scroll rounded-lg">
//         <div className="flex flex-col w-full justify-center items-center">
//           <div className="flex w-full justify-center">
//             <h1 className="text-white text-2xl mt-20 flex">Coloque o código de confirmação {isVerified !== null && (isVerified ? <Check className="ml-4" size={32} color="green" /> : <X className="ml-4" size={32} />)}</h1>
//           </div>
//           <div className="flex mb-4 mt-8 justify-center items-center space-x-4">
//             {otp.map((digit, index) => (
//               <React.Fragment key={index}>
//                 <input
//                   ref={(el) => (inputRefs.current[index] = el)}
//                   type="text"
//                   inputMode="numeric"
//                   maxLength={1}
//                   className="w-8 h-10 sm:w-10 sm:h-12 lg:w-14 lg:h-14 border-2 rounded bg-transparent outline-none text-center font-semibold text-lg sm:text-xl lg:text-2xl spin-button-none border-white focus:border-gray-400 focus:text-gray-400 text-white transition"
//                   onChange={(e) => handleOnChange(e, index)}
//                   onKeyDown={(e) => handleOnKeyDown(e, index)}
//                   value={digit}
//                 />
//               </React.Fragment>
//             ))}
//           </div>
//           <div className="flex w-full mt-4 justify-evenly">
//             <button className="bg-[#f1f1f1] text-black px-4 py-2 rounded-lg hover:bg-[#525252] shadow-sm shadow-white duration-300 hover:text-white" onClick={handleResendCode}>Reenviar</button>
//             <button className="bg-[#f1f1f1] text-black px-4 py-2 rounded-lg hover:bg-[#525252] shadow-sm shadow-white duration-300 hover:text-white" onClick={handleVerifyCode}>Confirmar</button>
//           </div>
//           <h1 className="text-white text-xl mt-12">Coloque a nova senha</h1>
//           <div className="w-2/3 px-4 bg-transparent border-2 flex items-center rounded-lg mt-4 h-14 border-white outline-none text-white text-start font-semibold text-lg sm:text-xl lg:text-2xl spin-button-none focus:border-gray-400 focus:text-gray-400">
//             <input type={isPasswordVisible ? `text` : `password`} onChange={(e) => { setPassword(e.target.value); setPasswordErr('') }} className="bg-transparent outline-none h-full w-[90%]" />
//             {isPasswordVisible ? <Eye size={32} className="hover:cursor-pointer" onClick={() => setIsPasswordVisible(false)} /> : <EyeSlash size={32} className="hover:cursor-pointer" onClick={() => setIsPasswordVisible(true)} />}
//           </div>
//           {passwordErr && <p className="text-red-500 text-md mt-2">{passwordErr}</p>}
//           <h1 className="text-white text-xl mt-8">Confirme a nova senha</h1>
//           <div className="w-2/3 px-4 bg-transparent border-2 flex items-center rounded-lg mt-4 h-14 border-white outline-none text-white text-start font-semibold text-lg sm:text-xl lg:text-2xl spin-button-none focus:border-gray-400 focus:text-gray-400">
//             <input type={isPasswordVisible ? `text` : `password`} onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordErr('') }} className="bg-transparent outline-none h-full w-[90%]" />
//             {isPasswordVisible ? <Eye size={32} className="hover:cursor-pointer" onClick={() => setIsPasswordVisible(false)} /> : <EyeSlash size={32} className="hover:cursor-pointer" onClick={() => setIsPasswordVisible(true)} />}
//           </div>
//           {confirmPasswordErr && <p className="text-red-500 text-md mt-2">{confirmPasswordErr}</p>}
//           <div className="flex w-[80%] justify-evenly">
//             <button onClick={handleVoltar} className="bg-[#ff5050] text-black px-4 py-2 w-28 rounded-lg hover:bg-[#c25858] shadow-sm shadow-white duration-300 hover:text-white mt-8 mb-8">Voltar</button>
//             {!isVerified ? <button onClick={handleValidPasswords} className="bg-[#616161] text-black px-4 py-2 w-28 rounded-lg shadow-sm shadow-white duration-300 mt-8 mb-8">Confirmar</button> :
//               <button onClick={handleValidPasswords} className="bg-[#f1f1f1] text-black px-4 py-2 w-28 rounded-lg hover:bg-[#525252] shadow-sm shadow-white duration-300 hover:text-white mt-8 mb-8">Confirmar</button>}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }