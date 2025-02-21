// import React, { useContext, useEffect, useState } from 'react';
// import { InstituteContext } from '../context/institute_context';
// import { ClipLoader } from 'react-spinners';

// interface InstituteModalProps {
//   setIsCreateInstituteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   onInstituteCreated?: () => void;
// }

// const districts = [
//   {
//     "id": "ee6ba030-cebc-405b-b3e3-08f213cca415",
//     "name": "Zona Sul"
//   },
//   {
//     "id": "5e3e0505-2b29-462d-91fc-d9f538ee8186",
//     "name": "Zona Norte"
//   },
//   {
//     "id": "7d6b8023-2d03-4623-bc33-ebf58767c9b1",
//     "name": "Zona Leste"
//   },
//   {
//     "id": "1477c1ff-bdb4-4e38-8415-b2da7163b3f7",
//     "name": "Zona Oeste"
//   },
//   {
//     "id": "90fec991-6d11-4813-9482-343ebdca5514",
//     "name": "Centro"
//   }
// ]

// export default function Institute({ setIsCreateInstituteModalOpen, onInstituteCreated }: InstituteModalProps) {
//   const [isVisible, setIsVisible] = useState(false); // Estado para controlar a visibilidade do modal
//   const { createInstitute, uploadInstituteImage } = useContext(InstituteContext);
//   const [instituteName, setInstituteName] = useState("");
//   const [nameErr, setNameErr] = useState("");
//   const [description, setDescription] = useState("");
//   const [descErr, setDescErr] = useState("");
//   const [instituteType, setInstituteType] = useState("ESTABELECIMENTO_FIXO");
//   const [partnerType, setPartnerType] = useState("GLOBAL_PARTNER");
//   const [phone, setPhone] = useState("");
//   const [phoneErr, setPhoneErr] = useState("");
//   const [districtId, setDistrictId] = useState(districts[0].id);
//   const [address, setAddress] = useState("");
//   const [addErr, setAddErr] = useState("");
//   const [logoPhoto, setLogoPhoto] = useState<File | null>(null);
//   const [logoErr, setLogoErr] = useState("");
//   const [isCreating, setIsCreating] = useState(false);

//   useEffect(() => {
//     setIsVisible(true); // Torna o modal visível quando é montado
//   }, []);

//   // Função para aplicar a máscara de telefone
//   const formatPhone = (value: string) => {
//     const cleaned = value.replace(/\D/g, '');
//     if (cleaned.length > 11) {
//       return phone;
//     }
//     // Verifica o comprimento do número e formata conforme necessário
//     if (cleaned.length === 11) {
//       return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
//     } else if (cleaned.length === 10) {
//       return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
//     }

//     // Se o número não corresponder a nenhum dos formatos acima, retorna o valor original
//     return value;
//   };

//   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const input = e.target.value.replace(/\D/g, '');
//     const formatted = formatPhone(input);
//     setPhone(formatted);
//   };

//   const saveInstituteClick = async () => {
//     if (isCreating) return;

//     const validateFields = () => {
//       let valid = true;
//       if (!instituteName) {
//         setNameErr("Preencha o nome do instituto");
//         valid = false;
//       }

//       if (!description) {
//         setDescErr("Preencha a descrição do instituto");
//         valid = false;
//       }

//       // Verifica se o endereço deve ser obrigatório com base no instituteType
//       if (instituteType === "ESTABELECIMENTO_FIXO" && !address) {
//         setAddErr("Preencha o endereço do instituto");
//         valid = false;
//       } else {
//         setAddErr(""); // Limpa o erro se o address não for obrigatório
//       }

//       if (phone && phone.length < 10) {
//         setPhone("+XX XXXX-XXXX");
//         setPhoneErr("O numero de telefone deve ter no mínimo 10 dígitos");
//         valid = false;
//       }

//       if (!logoPhoto) {
//         setLogoErr("Selecione uma imagem para o logotipo");
//         valid = false;
//       }
//       return valid;
//     };

//     setIsCreating(true);

//     const data = {
//       name: instituteName,
//       description: description,
//       institute_type: instituteType,
//       partner_type: partnerType,
//       phone: phone,
//       address: address,
//       district_id: districtId
//     };

//     try {
//       // Verifica se a validação é bem-sucedida antes de continuar
//       if (!validateFields()) {
//         setIsCreating(false); // Libera o botão para ser clicado novamente
//         return;
//       }
//       if (logoPhoto && logoPhoto?.size > 900000) {
//         setLogoErr("Imagem muito grande");
//         setIsCreating(false);
//         return;
//       }

//       const createdInstitute = await createInstitute(data);
//       console.log("Instituto Criado:", createdInstitute);
//       const instituteId = createdInstitute?.id;

//       if (createdInstitute) {
//         if (logoPhoto?.name) {
//           console.log(logoPhoto.name);
//           const logoType = logoPhoto.type;
//           const formData = new FormData();
//           if (instituteId) {
//             formData.append("instituteId", instituteId);
//             formData.append("typePhoto", logoType);
//             formData.append("files", logoPhoto);
//             const resp = await uploadInstituteImage(formData);
//             console.log("Logo Upload Response:", resp);
//           }
//         }

//         if (onInstituteCreated) {
//           onInstituteCreated();
//         }

//         // Fecha o modal somente se a criação e o upload forem bem-sucedidos
//         setIsCreateInstituteModalOpen(false);
//       } else {
//         console.error("Erro: Instituto criado sem ID válido");
//       }
//     } catch (error: any) {
//       console.error("Erro ao criar instituto ou fazer upload das imagens:", error.message);
//     } finally {
//       setIsCreating(false);
//     }
//   };



//   return (
//     <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
//       <div className={`fixed overflow-y-auto left-1/2 top-1/2 max-h-[85vh] w-[50vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-grayModal p-[25px] shadow-lg transition-transform duration-300 transform ${isVisible ? 'scale-100' : 'scale-95'}`}>
//         <div className="m-0 text-3xl font-medium text-white">
//           Criar <span className="text-violet">INSTITUTO</span>
//         </div>
//         <div className="mb-5 mt-2.5 text-[15px] leading-normal text-stone-300">
//           Utilize os campos abaixo para criar um instituto
//         </div>

//         {/* Nome */}
//         <fieldset className="mb-4 flex flex-col gap-1 text-white">
//           <label className="text-base text-white" htmlFor="instituteName">
//             Nome
//           </label>
//           <input
//             className={`h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet ${nameErr && !instituteName ? 'border-solid border-2 border-red-500 ring-transparent focus:ring-0' : ''}`}
//             id="instituteName"
//             value={instituteName}
//             placeholder='Digite o nome do instituto'
//             onChange={(e) => setInstituteName(e.target.value)}
//           />
//         </fieldset>
//         {nameErr && !instituteName && <div className="text-red-500 text-sm mb-4">{nameErr}</div>}

//         {/* Descrição */}
//         <fieldset className="mb-4 flex flex-col gap-1 text-white">
//           <label className="text-base text-white" htmlFor="description">
//             Descrição
//           </label>
//           <textarea
//             className={`h-44 px-2 py-2 resize-none bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet ${descErr && !description ? 'border-solid border-2 border-red-500 focus:ring-0' : ''}`}
//             id="description"
//             value={description}
//             placeholder='Digite a descrição do instituto'
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </fieldset>
//         {descErr && !description && <div className="text-red-500 text-sm mb-4">{descErr}</div>}

//         <div className="flex flex-row justify-evenly ">
//           {/* Tipo de Instituto */}
//           <fieldset className="mb-4 flex w-[48%] flex-col gap-1 text-white">
//             <label className="text-base text-white" htmlFor="instituteType">
//               Tipo de Instituto
//             </label>
//             <select
//               name="instituteType"
//               id="instituteType"
//               className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
//               value={instituteType}
//               onChange={(e) => setInstituteType(e.target.value)}
//             >
//               <option value="ESTABELECIMENTO_FIXO">Estabelecimento Fixo</option>
//               <option value="AGENCIA_DE_FESTAS">Agência de Festas</option>
//             </select>
//           </fieldset>

//           {/* Tipo de Parceiro */}
//           <fieldset className="mb-4 flex w-[48%] flex-col gap-1 text-white">
//             <label className="text-base text-white" htmlFor="partnerType">
//               Tipo de Parceiro
//             </label>
//             <select
//               name="partnerType"
//               id="partnerType"
//               className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
//               value={partnerType}
//               onChange={(e) => setPartnerType(e.target.value)}
//             >
//               <option value="GLOBAL_PARTNER">Parceiro Global</option>
//               <option value="PROMOTER_PARTNER">Promotor</option>
//               <option value="NO_PARTNER">Sem Parceiro</option>
//             </select>
//           </fieldset>
//         </div>

//         <div className='flex w-full gap-4'>
//           {/* Distrito */}
//           <fieldset className="mb-4 flex flex-col gap-1 text-white">
//             <label className="text-base text-white" htmlFor="district">
//               Distrito
//             </label>
//             <select
//               name="district"
//               id="district"
//               className="h-10 bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
//               value={districtId}
//               onChange={(e) => setDistrictId(e.target.value)}
//             >
//               {districts.map((district) => (
//                 <option key={district.id} value={district.id}>
//                   {district.name}
//                 </option>
//               ))}
//             </select>
//           </fieldset>
//           <div className='flex flex-col w-full'>
//             {/* Endereço */}
//             <fieldset className="mb-4 flex flex-col gap-1 text-white">
//               <label className="text-base text-white" htmlFor="address">
//                 Endereço{instituteType === "AGENCIA_DE_FESTAS" ? " (opcional)" : ""}
//               </label>
//               <input
//                 className={`h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet ${addErr && !address ? 'border-solid border-2 border-red-500 focus:ring-0' : ''}`}
//                 id="address"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 placeholder="Digite o endereço do instituto"
//               />
//             </fieldset>
//             {addErr && !address && <div className="text-red-500 text-sm mb-4">{addErr}</div>}
//           </div>
//         </div>

//         {/* Telefone */}
//         <fieldset className="mb-4 flex flex-col gap-1 text-white">
//           <label className="text-base text-white" htmlFor="phone">
//             Telefone(opcional)
//           </label>
//           <input
//             className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
//             id="phone"
//             value={phone}
//             onChange={handlePhoneChange}
//             placeholder="+XX XXXX-XXXX"
//             inputMode="numeric"
//             type="tel"
//           />
//         </fieldset>
//         {phoneErr && <div className="text-red-500 text-sm mb-4">{phoneErr}</div>}

//         {/* Upload da Logo */}
//         <fieldset className="mb-4 flex flex-col gap-1 text-white">
//           <label className="text-base text-white" htmlFor="logoPhoto">
//             Foto do Logotipo
//           </label>
//           <input
//             className="bg-grayInputModal p-2 outline-none rounded-md focus:ring-2 ring-violet"
//             id="logoPhoto"
//             type="file"
//             accept='image/*'
//             onChange={(e) => {
//               const file = e.target.files?.[0] || null;
//               setLogoPhoto(file);
//               setLogoErr("");
//             }}
//           />
//         </fieldset>
//         {logoErr && <div className="text-red-500 text-sm mb-4">{logoErr}</div>}

//         {/* Exibição da imagem selecionada */}
//         <div className="flex flex-wrap gap-2">
//           {logoPhoto && (
//             <img
//               src={URL.createObjectURL(logoPhoto)}
//               alt="Imagem logo"
//               className="w-24 h-24 mb-4 object-cover rounded-md"
//             />
//           )}
//         </div>

//         <div className="flex flex-row justify-end gap-4">
//           <button
//             className="mt-5 inline-flex h-12 items-center justify-center rounded-md bg-red-600 px-6 font-medium text-white"
//             onClick={() => setIsCreateInstituteModalOpen(false)}
//           >
//             Cancelar
//           </button>
//           <button
//             className="mt-5 inline-flex h-12 items-center justify-center rounded-md bg-violet px-6 font-medium text-white"
//             onClick={saveInstituteClick}
//             disabled={isCreating}
//           >
//             {isCreating ? <ClipLoader color="white" size={20} /> : "Salvar Instituto"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
