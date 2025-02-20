// import React, { useContext, useEffect, useState } from 'react';
// import { InstituteContext } from '../context/institute_context';
// import { toast } from 'react-toastify';

// interface InstituteModalProps {
//   setIsUpdateInstituteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   institute: InstituteProps;
// }

// export interface InstituteProps {
//   address?: string | undefined;
//   description: string;
//   district_id?: string | undefined;
//   events_id?: string[] | undefined;
//   institute_id: string;
//   institute_type: string;
//   logo_photo?: string | undefined;
//   name: string;
//   partner_type?: string | undefined;
//   phone?: string | undefined;
//   price?: number | undefined;
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


// export default function UpdateInstituteModal({ setIsUpdateInstituteModalOpen, institute }: InstituteModalProps) {
//   const [initialData, setInitialData] = useState<InstituteProps>(institute);
//   const [instituteName, setInstituteName] = useState(institute.name || "");
//   const [nameError, setNameError] = useState("");
//   const [description, setDescription] = useState(institute.description || "");
//   const [descError, setDescError] = useState("");
//   const [instituteType, setInstituteType] = useState(institute.institute_type || "ESTABELECIMENTO_FIXO");
//   const [partnerType, setPartnerType] = useState(institute.partner_type || "GLOBAL_PARTNER");
//   const [districtId, setDistrictId] = useState(institute.district_id || "");
//   const [phone, setPhone] = useState(institute.phone || "");
//   const [phoneError, setPhoneError] = useState("");
//   const [address, setAddress] = useState(institute.address || "");
//   const [addressError, setAddressError] = useState("");
//   const [logoPhoto, setLogoPhoto] = useState<File | null>();
//   const [isConfirmOpen, setIsConfirmOpen] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setInitialData(institute);
//     setIsVisible(true); // Ativa a visibilidade do modal
//   }, [institute]);

//   const getModifiedFields = () => {
//     const modifiedFields: Partial<InstituteProps> = {};
//     modifiedFields.institute_id = institute.institute_id;
//     if (instituteName !== initialData.name) modifiedFields.name = instituteName;
//     if (description !== initialData.description) modifiedFields.description = description;
//     if (instituteType !== initialData.institute_type) modifiedFields.institute_type = instituteType;
//     if (partnerType !== initialData.partner_type) modifiedFields.partner_type = partnerType;
//     if (phone !== initialData.phone) modifiedFields.phone = phone;
//     if (address !== initialData.address) modifiedFields.address = address;
//     if (districtId !== initialData.district_id) modifiedFields.district_id = districtId;
//     return modifiedFields;
//   };

//   const validateFields = () => {
//     let isValid = true;
//     if (instituteName === "") {
//       setNameError("O nome do instituto é obrigatório.");
//       isValid = false;
//     } else {
//       setNameError("");
//     }
//     if (description === "") {
//       setDescError("A descrição do instituto é obrigatória.");
//       isValid = false;
//     } else {
//       setDescError("");
//     }
//     if (phone !== "" && phone.length < 14) {
//       setPhoneError("O telefone deve ter pelo menos 10 dígitos.");
//       isValid = false;
//     } else {
//       setPhoneError("");
//     }
//     if (address === "" && instituteType === "ESTABELECIMENTO_FIXO") {
//       setAddressError("O endereço do instituto é obrigatório.");
//       isValid = false;
//     } else {
//       setAddressError("");
//     }
//     return isValid;
//   }

//   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setInstituteName(e.target.value);
//   const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);
//   const handleInstituteTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setInstituteType(e.target.value);
//   const handlePartnerTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setPartnerType(e.target.value);
//   const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value);
//   // const handleLogoPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   if (e.target.files) setLogoPhotoIncoming(e.target.files[0]);
//   // };


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

//   const formarFormData = () => {
//     if (logoPhoto?.name) {
//       console.log(logoPhoto.name);
//       const logoType = logoPhoto.type;
//       const formData = new FormData();
//       formData.append("name", instituteName);
//       formData.append("typePhoto", logoType);
//       formData.append("files", logoPhoto);
//       return formData;
//     }
//   }


//   const handleUpdateClick = () => {
//     if (!validateFields()) return;
//     setIsConfirmOpen(true);
//   };

//   return (
//     <div className="inset-0 z-40">
//       {isConfirmOpen && (
//         <ConfirmUpdate
//           setIsConfirmOpen={setIsConfirmOpen}
//           setIsUpdateInstituteModalOpen={setIsUpdateInstituteModalOpen}
//           instituteId={institute.institute_id}
//           newInstituteData={getModifiedFields()}
//           formData={formarFormData()}
//         />
//       )}
//       <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm ${isVisible ? "transition-opacity duration-300" : "opacity-0"}`} onClick={() => setIsUpdateInstituteModalOpen(false)} />
//       <div className={`fixed overflow-y-auto left-1/2 top-1/2 max-h-[85vh] w-[50vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-grayModal p-[25px] shadow-md focus:outline-none transition-transform duration-300 transform ${isVisible ? "scale-100" : "scale-95"}`}>
//         <div className="m-0 text-3xl font-medium text-white">
//           Atualizar Instituto: <span className="text-violet">{initialData.name}</span>
//         </div>
//         <div className="mb-5 mt-2.5 text-[15px] leading-normal text-stone-300">
//           Utilize os campos abaixo para atualizar as informações do instituto.
//         </div>

//         {/* Nome */}
//         <fieldset className="mb-4 flex flex-col gap-1 text-white">
//           <label className="text-base" htmlFor="instituteName">Nome</label>
//           <input
//             className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
//             id="instituteName"
//             value={instituteName}
//             onChange={handleNameChange}
//           />
//           {nameError && <p className="text-red-600 text-sm">{nameError}</p>}
//         </fieldset>

//         {/* Descrição */}
//         <fieldset className="mb-4 flex flex-col gap-1 text-white">
//           <label className="text-base" htmlFor="description">Descrição</label>
//           <textarea
//             className="h-44 px-2 py-2 resize-none bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
//             id="description"
//             value={description}
//             onChange={handleDescriptionChange}
//           />
//           {descError && <p className="text-red-600 text-sm">{descError}</p>}
//         </fieldset>

//         {/* Tipos */}
//         <div className="flex flex-row justify-evenly ">
//           <fieldset className="mb-4 w-[48%] flex flex-col gap-1 text-white">
//             <label className="text-base" htmlFor="instituteType">Tipo de Instituto</label>
//             <select
//               name="instituteType"
//               id="instituteType"
//               className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
//               value={instituteType}
//               onChange={handleInstituteTypeChange}
//             >
//               <option value="ESTABELECIMENTO_FIXO">Estabelecimento Fixo</option>
//               <option value="AGENCIA_DE_FESTAS">Agência de Festas</option>
//             </select>
//           </fieldset>

//           <fieldset className="mb-4 w-[48%] flex flex-col gap-1 text-white">
//             <label className="text-base" htmlFor="partnerType">Tipo de Parceiro</label>
//             <select
//               name="partnerType"
//               id="partnerType"
//               className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
//               value={partnerType}
//               onChange={handlePartnerTypeChange}
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
//                 className={`h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet `}
//                 id="address"
//                 value={address}
//                 onChange={handleAddressChange}
//                 placeholder="Digite o endereço do instituto"
//               />
//               {addressError && <p className="text-red-600 text-sm">{addressError}</p>}
//             </fieldset>
//           </div>
//         </div>

//         {/* Telefone */}
//         <fieldset className="mb-4 flex flex-col gap-1 text-white">
//           <label className="text-base" htmlFor="phone">Telefone (opcional)</label>
//           <input
//             className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
//             id="phone"
//             value={phone}
//             onChange={handlePhoneChange}
//             placeholder="(XX) XXXX-XXXX"
//             pattern="\(\d{2}\)\s\d{4,5}-\d{4}"
//             inputMode="numeric"
//             type="tel"
//           />
//           {phoneError && <p className="text-red-600 text-sm">{phoneError}</p>}
//         </fieldset>

//         {/*Upload da Logo*/}
//         <fieldset className="mb-4 flex flex-col gap-1 text-white">
//           <label className="text-base" htmlFor="logoPhoto">Logo do Instituto (opcional)</label>
//           <input
//             className="bg-grayInputModal p-2 outline-none rounded-md focus:ring-2 ring-violet"
//             id="logoPhoto"
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               const file = e.target.files?.[0] || null;
//               setLogoPhoto(file);
//             }}
//           />
//         </fieldset>

//         {/* Botões */}
//         <div className="flex justify-end gap-4 mt-5">
//           <button className="h-10 px-8 rounded-lg border border-red-600 bg-red-600 text-white" onClick={() => setIsUpdateInstituteModalOpen(false)}>
//             Cancelar
//           </button>
//           <button className="h-10 px-8 rounded-lg border border-violet bg-violet text-white" onClick={handleUpdateClick}>
//             Atualizar
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// interface ConfirmUpdateProps {
//   setIsConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   setIsUpdateInstituteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   instituteId: string;
//   newInstituteData: Partial<InstituteProps>;
//   formData?: FormData;
// }

// function ConfirmUpdate({ setIsConfirmOpen, setIsUpdateInstituteModalOpen, newInstituteData, formData }: ConfirmUpdateProps) {
//   const { updateInstituteById, uploadInstituteImage } = useContext(InstituteContext);

//   const handleConfirmClick = async () => {
//     // Update the institute with the new data
//     console.log(newInstituteData);
//     if (formData === undefined) {
//       const resp = await updateInstituteById(newInstituteData);
//       console.log("Update Response:", resp);
//       if (resp.status === 400) {
//         console.log("Erro ao atualizar instituto");
//         setIsUpdateInstituteModalOpen(false);
//         return
//       }
//       toast.success("Instituto atualizado com sucesso!", {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined
//       });
//       setIsUpdateInstituteModalOpen(false);
//       setIsConfirmOpen(false);
//       return;
//     }
//     const resposta = await uploadInstituteImage(formData);
//     console.log("Logo Upload Response:", resposta);
//     const resp = await updateInstituteById(newInstituteData);
//     console.log("Update Response:", resp);
//     if (resp.status === 400) {
//       console.log("Erro ao atualizar instituto");
//       setIsUpdateInstituteModalOpen(false);
//       return
//     }
//     toast.success("Instituto atualizado com sucesso!", {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined
//     });
//     setIsUpdateInstituteModalOpen(false);
//     setIsConfirmOpen(false);
//   };

//   const handleCancelClick = () => {
//     setIsConfirmOpen(false);
//   };

//   return (
//     <div className="fixed h-full w-full backdrop-blur-md bg-black/50 flex z-50 justify-center items-center">
//       <div className="rounded-lg bg-grayModal p-6 w-1/3 text-center">
//         <p className="text-white mb-4">Você tem certeza que deseja atualizar este instituto?</p>
//         <div className="flex justify-center gap-4">
//           <button className="px-4 py-2 rounded-lg bg-gray-600 text-white" onClick={handleCancelClick}>
//             Cancelar
//           </button>
//           <button className="px-4 py-2 rounded-lg bg-violet text-white" onClick={handleConfirmClick}>
//             Confirmar
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

