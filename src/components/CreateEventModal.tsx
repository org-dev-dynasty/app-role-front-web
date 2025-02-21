// import * as Dialog from '@radix-ui/react-dialog'
// import { X, CurrencyDollar } from '@phosphor-icons/react'
// import { Rating } from 'react-simple-star-rating'
// import { useContext, useState } from 'react'
// import { EventContext } from '../context/event_context'
// import { MultiValue } from 'react-select'
// import { MultiSelectComponent, OptionsType } from './MultiSelect'
// import { z } from 'zod'
// import { ImageInputFile } from './ImageInputFile'
// import { useParams } from 'react-router-dom'

// interface FormErrors {
//   name?: string
//   description?: string
//   address?: string
//   eventDate?: string
//   price?: string
//   category?: string
//   ageRange?: string
//   musicType?: string
//   districtId?: string
//   instituteId?: string
//   features?: string
//   menuLink?: string
//   packageType?: string
//   ticketUrl?: string
//   eventStatus?: string
// }

// import {
//   ageCategories,
//   categories,
//   districts,
//   features,
//   musicTypes,
//   packageTypeArray,
//   status
// } from '../assets/options'
// import { toast } from 'react-toastify'
// import { createEventSchema } from '../zodSchemas/createEventSchema'
// import GoogleMapsAutocomplete from './GoogleMapsAutocomplete'

// interface CreateEventModalProps {
//   onEventCreated: () => void
//   isCreatingEvent: () => void
// }

// export function CreateEventModal({ onEventCreated, isCreatingEvent }: CreateEventModalProps) {
//   const { instId } = useParams()


//   const [name, setName] = useState<string>()
//   const [description, setDescription] = useState<string>()
//   const [address, setAddress] = useState<string>()
//   const [date, setDate] = useState<Date>()
//   const [priceAvg, setPriceAvg] = useState<number>(1)
//   const [category, setCategory] = useState<string>('BALADA')
//   const [age, setAge] = useState<string>('ADULT')
//   const [ticketUrl, setTicketUrl] = useState<string>()
//   const [eventStatus, setEventStatus] = useState<string>('ACTIVE')
//   const [currentDistrict, setCurrentDistrict] = useState<string>(
//     districts[0].districtId
//   )

//   const [addressNumber, setAddressNumber] = useState<string>('')

//   const [selectedMusics, setSelectedMusics] = useState<string[]>([])
//   const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
//   const [selectedPackages, setSelectedPackages] = useState<string[]>([])

//   const [eventImage, setEventImage] = useState<File>()
//   const [bannerImage, setBannerImage] = useState<File>()

//   const [errors, setErrors] = useState<FormErrors>({})

//   const { createEvent, uploadEventImage, uploadEventBanner } =
//     useContext(EventContext)

//   async function createEventRequest(e: React.MouseEvent<HTMLButtonElement>) {
//     try {
//       const eventBody = {
//         name: name,
//         description: description,
//         address: address,
//         eventDate: date,
//         price: priceAvg,
//         category: category,
//         ageRange: age,
//         musicType: selectedMusics,
//         districtId: currentDistrict,
//         instituteId: instId,
//         features: selectedFeatures,
//         packageType: selectedPackages,
//         ticketUrl: ticketUrl,
//         eventStatus: eventStatus
//       }

//       type CreateEvent = {
//         message: string
//         id: string
//       }

//       let resp: CreateEvent

//       try {
//         isCreatingEvent()
//         resp = (await createEvent(
//           createEventSchema.parse(eventBody)
//         )) as CreateEvent

//         console.log(resp, resp.id)

//         await uploadEventImageReq(resp.id, eventImage)
//         await uploadEventBannerReq(resp.id, bannerImage)

//         setErrors({})
//         toast.success('Evento criado com sucesso!', {
//           position: 'top-right',
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: 'colored'
//         })
//         onEventCreated()
//         console.log('onEventCreated ativado')
//       } catch (error) {
//         e.preventDefault()
//         if (error instanceof z.ZodError) {
//           const formErrors = error.errors.reduce((acc: FormErrors, curr) => {
//             acc[curr.path[0] as keyof FormErrors] = curr.message
//             return acc
//           }, {})
//           setErrors(formErrors)
//         }

//         console.log(error)
//       } finally {
//         isCreatingEvent()
//       }

//       // navigate(`/role/${resp.id}`)

//       //reload page
//       // window.location.reload()

//       console.log('evento criado:', eventBody)
//       // toast.success('Evento criado com sucesso!', {
//       //   position: 'top-right',
//       //   autoClose: 5000,
//       //   hideProgressBar: false,
//       //   closeOnClick: true,
//       //   pauseOnHover: true,
//       //   draggable: true,
//       //   progress: undefined,
//       //   theme: 'colored'
//       // })
//       // onEventCreated()
//     } catch (error) {
//       alert('Erro ao criar evento')

//       console.log(error)
//     }
//   }

//   async function uploadEventImageReq(id: string, image: File | undefined) {
//     if (!image || !id) return

//     const formData = new FormData()
//     const imgType = image.type

//     formData.append('eventId', id)
//     formData.append('typePhoto', imgType)
//     formData.append('file', image)

//     const resp = await uploadEventImage(formData)

//     console.log('Imagem enviada:', resp)
//   }

//   async function uploadEventBannerReq(id: string, image: File | undefined) {
//     if (!image || !id) return

//     const formData = new FormData()
//     const imgType = image.type

//     formData.append('eventId', id)
//     formData.append('typePhoto', imgType)
//     formData.append('file', image)

//     const resp = await uploadEventBanner(formData)
//     console.log('Banner enviado:', resp)
//   }

//   const handleChange = (selected: MultiValue<OptionsType>) => {
//     setSelectedMusics(selected.map(option => option.value))
//   }

//   const handleFeaturesSelectChange = (selected: MultiValue<OptionsType>) => {
//     setSelectedFeatures(selected.map(option => option.value))
//   }

//   const handlePackageTypeSelectChange = (selected: MultiValue<OptionsType>) => {
//     setSelectedPackages(selected.map(option => option.value))
//   }

//   function handleSetAddress(
//     address: string,
//     zip: string,
//     latitude: string,
//     longitude: string,
//     city: string,
//     neighborhood: string
//   ) {
//     setAddress(
//       `${address},${addressNumber ? `${addressNumber}` : "without_number"},${neighborhood},${city},${zip},${latitude},${longitude}`
//     )
//   }

//   return (
//     <Dialog.Root>
//       <Dialog.Trigger asChild>
//         <button className="bg-white text-black w-16 h-16 flex justify-center items-center rounded-xl text-3xl hover:cursor-pointer hover:bg-white-purple">
//           +
//         </button>
//       </Dialog.Trigger>
//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
//         <Dialog.Content className="fixed overflow-y-auto left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-grayModal p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
//           <Dialog.Title className="m-0 text-3xl font-medium text-white">
//             Criar <span className="text-violet">ROLE</span>
//           </Dialog.Title>
//           <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-stone-300">
//             Utilize os campos abaixos para criar o seu melhor ROLE!
//           </Dialog.Description>

//           <fieldset className="mb-4 flex flex-col gap-1 text-white">
//             <label className="text-base text-white" htmlFor="roleName">
//               Nome
//             </label>
//             <input
//               className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
//               id="roleName"
//               onChange={e => setName(e.target.value)}
//             />
//             {errors.name && <span className="text-red-500">{errors.name}</span>}
//           </fieldset>

//           <fieldset className="mb-4 flex flex-col gap-1 text-white">
//             <label className="text-base text-white" htmlFor="description">
//               Descrição
//             </label>
//             <textarea
//               className="h-24 px-2 py-2 resize-none bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
//               id="description"
//               onChange={e => setDescription(e.target.value)}
//             />
//             {errors.description && (
//               <span className="text-red-500">{errors.description}</span>
//             )}
//           </fieldset>

//           <fieldset className="mb-4 flex gap-1 text-white">
//             <div className="flex-col gap-1 w-full">
//               <label className="text-base text-white" htmlFor="adress">
//                 Endereço
//               </label>
//               <div>
//               <GoogleMapsAutocomplete onAddressSelect={handleSetAddress} />
//               </div>

//               {/* <input
//               className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
//               id="adress"
//               onChange={e => setAddress(e.target.value)}
//             />
//             {errors.address && (
//               <span className="text-red-500">{errors.address}</span>
//             )} */}
//             </div>

//             <div className="flex-col gap-1">
//               <label className="text-base text-white" htmlFor="date">
//                 Número
//               </label>

//               <input
//                 className='h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet'
//                 onChange={e => setAddressNumber(e.target.value)}
//                 type="text"
//               />
//             </div>
//           </fieldset>

//           <fieldset className="mb-4 flex flex-col gap-1 text-white">
//             <label className="text-base text-white" htmlFor="date">
//               Data
//             </label>
//             <input
//               className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet "
//               id="date"
//               type="datetime-local"
//               onChange={e => {
//                 setDate(new Date(e.target.value))
//                 console.log(e.target.value, date)
//               }}
//             />

//             {errors.eventDate && (
//               <span className="text-red-500">{errors.eventDate}</span>
//             )}
//           </fieldset>

//           <fieldset className="mb-4 flex w-full justify-between flex-row gap-8 [&>div]:w-1/3 text-white">
//             <div className="flex flex-col gap-1">
//               <label className="text-base text-white">Preço médio</label>
//               <Rating
//                 onClick={e => setPriceAvg(e)}
//                 allowFraction={false}
//                 emptyIcon={<CurrencyDollar size={32} className="inline" />}
//                 fillIcon={
//                   <CurrencyDollar size={32} className="inline fill-violet" />
//                 }
//               />
//             </div>

//             <div className="flex flex-col gap-1">
//               <label className="text-base text-white" htmlFor="age">
//                 Categoria
//               </label>
//               <select
//                 name="category"
//                 id="category"
//                 className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
//                 onChange={e => setCategory(e.target.value)}
//               >
//                 {categories.map((category, index) => {
//                   return (
//                     <option value={category.key} key={index}>
//                       {category.value}
//                     </option>
//                   )
//                 })}
//               </select>
//               {errors.category && (
//                 <span className="text-red-500">{errors.category}</span>
//               )}
//             </div>

//             <div className="flex flex-col gap-1">
//               <label className="text-base text-white" htmlFor="age">
//                 Idade
//               </label>
//               <select
//                 name="age"
//                 id="age"
//                 className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
//               >
//                 {ageCategories.map((ageCategory, index) => {
//                   return (
//                     <option
//                       value={ageCategory.value}
//                       key={index}
//                       onChange={() => setAge(ageCategory.value)}
//                     >
//                       {ageCategory.label}
//                     </option>
//                   )
//                 })}
//               </select>
//               {errors.ageRange && (
//                 <span className="text-red-500">{errors.category}</span>
//               )}
//             </div>
//           </fieldset>

//           <fieldset className="mb-4 flex w-full justify-between flex-row gap-8 text-white">
//             <div className="flex flex-col gap-1  w-2/3">
//               <label className="text-base text-white" htmlFor="musicType">
//                 Tipo de música
//               </label>

//               {/* <select
//                 name="musicType"
//                 id="musicType"
//                 className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
//               >
//                 {options.map((types, index) => {
//                   return (
//                     <option value={index} key={index}>
//                       {options[index].label}
//                     </option>
//                   )
//                 })}
//               </select> */}

//               <MultiSelectComponent
//                 onChange={handleChange}
//                 options={musicTypes}
//               />

//               {errors.musicType && (
//                 <span className="text-red-500">{errors.musicType}</span>
//               )}
//             </div>

//             <div className="flex flex-col gap-1 w-1/3">
//               <label className="text-base text-white" htmlFor="age">
//                 Status do Evento
//               </label>
//               <select
//                 name="category"
//                 id="category"
//                 className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
//                 onChange={e => setEventStatus(e.target.value)}
//               >
//                 {status.map((status, index) => {
//                   return (
//                     <option value={status.value} key={index}>
//                       {status.label}
//                     </option>
//                   )
//                 })}
//               </select>

//               {errors.eventStatus && (
//                 <span className="text-red-500">{errors.eventStatus}</span>
//               )}
//             </div>
//           </fieldset>

//           <fieldset className="mb-4 flex flex-col gap-1 text-white">
//             <label className="text-base text-white" htmlFor="ticketLink">
//               Link para ingressos
//             </label>
//             <input
//               className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
//               id="ticketLink"
//               placeholder="https://www.example.com.br/ingressos/"
//               onChange={e => setTicketUrl(e.target.value)}
//             />
//             {errors.ticketUrl && (
//               <span className="text-red-500">{errors.ticketUrl}</span>
//             )}
//           </fieldset>

//           <fieldset className="mb-4 flex w-full justify-between flex-row gap-8 text-white">
//             <div className="flex gap-4 w-full">
//               <div className="flex flex-col gap-1 w-full">
//                 <label className="text-base text-white" htmlFor="district">
//                   Distrito
//                 </label>
//                 <select
//                   name="district"
//                   id="district"
//                   className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
//                   onChange={e => setCurrentDistrict(e.target.value)}
//                 >
//                   {districts.map((_district, index) => {
//                     return (
//                       <option
//                         value={districts[index].districtId}
//                         key={index}
//                         // onChange={() => setCurrentDistrict(1)}
//                       >
//                         {districts[index].districtName}
//                       </option>
//                     )
//                   })}
//                 </select>

//                 {errors.districtId && (
//                   <span className="text-red-500">{errors.districtId}</span>
//                 )}
//               </div>

//               <div className="flex flex-col w-full gap-1">
//                 <label className="text-base text-white">Features</label>

//                 <MultiSelectComponent
//                   onChange={handleFeaturesSelectChange}
//                   options={features}
//                 />
//                 {errors.features && (
//                   <span className="text-red-500">{errors.features}</span>
//                 )}
//               </div>
//             </div>

//             {/* <div className="flex flex-col gap-1 w-1/2">
//               <label className="text-base text-white" htmlFor="age">
//                 Bairro
//               </label>
//               <select
//                 name="category"
//                 id="category"
//                 className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
//               >
//                 {Distritos[currentDistrict].neighborhoods.map(
//                   (neighborhood, index) => {
//                     return (
//                       <option value={index} key={index}>
//                         {Distritos[currentDistrict].neighborhoods[index]}
//                       </option>
//                     )
//                   }
//                 )}
//               </select>
//             </div> */}
//           </fieldset>

//           <fieldset className="mb-4 flex flex-col gap-1 text-white">
//             <label className="text-base text-white">Pacotes</label>

//             <MultiSelectComponent
//               onChange={handlePackageTypeSelectChange}
//               options={packageTypeArray}
//             />

//             {errors.packageType && (
//               <span className="text-red-500">{errors.packageType}</span>
//             )}
//           </fieldset>

//           <div className="flex gap-4">
//             <div className="w-full">
//               <ImageInputFile
//                 onImageUploaded={e => setEventImage(e)}
//                 label="Selecione a imagem do ROLE"
//               />
//             </div>

//             <div className="w-full">
//               <ImageInputFile
//                 onImageUploaded={e => setBannerImage(e)}
//                 aspect="video"
//                 label="Selecione a imagem do banner"
//               />
//             </div>
//           </div>

//           <div className="mt-2 flex justify-end">
//             <Dialog.Close asChild>
//               <button
//                 onClick={e => createEventRequest(e)}
//                 className="inline-flex h-[35px] items-center justify-center rounded bg-violet px-4 font-medium leading-none text-white  hover:bg-violet focus:shadow-[0_0_0_2px] focus:shadow-purple focus:outline-none"
//               >
//                 Salvar Role
//               </button>
//             </Dialog.Close>
//           </div>
//           <Dialog.Close asChild>
//             <button
//               className="absolute right-4 top-4 inline-flex appearance-none items-center justify-center rounded-full text-violet focus:shadow-[0_0_0_2px] focus:shadow-violet focus:outline-none"
//               aria-label="Close"
//             >
//               <X size={32} weight="bold" />
//             </button>
//           </Dialog.Close>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   )
// }