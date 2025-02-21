// import { useContext, useEffect, useState } from 'react'
// import * as Dialog from '@radix-ui/react-dialog'
// import { Image, X } from '@phosphor-icons/react'
// import { useParams } from 'react-router-dom'
// import { EventType } from '../api/repositories/event_repository'
// import { EventContext } from '../context/event_context'

// export default function EditEventImagesModal() {
//   const { getEventById, deleteEventImage, deleteEventBanner } =
//     useContext(EventContext)

//   const [response, setResponse] = useState<EventType>()

//   const { eventId } = useParams()

//   async function getEventByIdRequest() {
//     try {
//       const res: EventType = (await getEventById(`${eventId}`)) as EventType

//       await setResponse(res)

//       console.log(res.bannerUrl)

//       if (res.eventPhotoLink) {
//         setIsImageUploaded(true)
//       }

//       if (res.bannerUrl) {
//         setIsBannerUploaded(true)
//       }
//     } catch (error) {
//       console.log('Erro ao buscar evento por id: ', error)
//     }
//   }

//   useEffect(() => {
//     getEventByIdRequest()
//   }, [])

//   const [isImageUploaded, setIsImageUploaded] = useState(false)
//   const [isBannerUploaded, setIsBannerUploaded] = useState(false)

//   async function handleRemoveImage() {
//     if (isImageUploaded) {
//       if (!eventId) return

      
//       try {
//         await deleteEventImage(eventId) 
//       } catch (error) {
//         console.log('Erro ao deletar imagem: ', error)
//         return
//       }

//       setIsImageUploaded(false)
//     }
//   }

//   async function handleRemoveBanner() {
//     if (isBannerUploaded) {
//       if (!eventId) return

//       try {
//         await deleteEventBanner(eventId)
//       } catch (error) {
//         console.log('Erro ao deletar banner: ', error)
//         return
//       }
//       setIsBannerUploaded(false)
//     }
//   }

//   return (
//     <Dialog.Root>
//       <Dialog.Trigger asChild>
//         <button className="w-fit px-8 py-4 text-2xl rounded-lg bg-purple hover:bg-light-purple transition flex items-center text-center gap-2">
//           <Image size={32} /> Editar imagens do ROLE
//         </button>
//       </Dialog.Trigger>
//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
//         <Dialog.Content className="flex p-12 justify-center items-center flex-col fixed overflow-y-auto left-1/2 top-1/2 max-h-[85vh] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-grayModal shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
//           <Dialog.Title className="m-0 text-3xl font-medium text-white mb-4">
//             Editar imagens do ROLE
//           </Dialog.Title>
//           <Dialog.Description className="my-2.5 text-2xl leading-normal text-stone-300 text-center">
//           </Dialog.Description>

//           <div className="flex gap-4">
//             <div className="w-full flex flex-col gap-2">
//               {/* <ImageInputFile
//                 onImageUploaded={e => setEventImage(e)}
//                 label="Selecione a imagem do ROLE"
//               /> */}

//               <div className="border-dashed border rounded-md">
//                 <img
//                   className="pointer-events-none inset-0 w-full max-h-60 max-w-60 object-contain rounded-md"
//                   src={response?.eventPhotoLink}
//                   alt=""
//                 />
//               </div>

//               <button
//                 className={`px-4 py-2 ${
//                   isImageUploaded ? 'bg-red-500' : 'bg-green-500'
//                 } rounded-md text-white`}
//                 onClick={handleRemoveImage}
//               >
//                 {isImageUploaded ? 'Remover imagem' : 'Adicionar Imagem'}
//               </button>
//             </div>

//             <div className="w-full flex flex-col gap-2">
//               <div className="border-dashed border rounded-md">
//                 <img
//                   className="pointer-events-none inset-0 max-h-60 w-60 h-full aspect-video object-contain rounded-md"
//                   src={response?.bannerUrl}
//                   alt=""
//                 />
//               </div>

//               <button
//                 className={`px-4 py-2 ${
//                   isBannerUploaded ? 'bg-red-500' : 'bg-green-500'
//                 } rounded-md text-white`}
//                 onClick={handleRemoveBanner}
//               >
//                 {isImageUploaded ? 'Remover imagem' : 'Adicionar Imagem'}
//               </button>
//             </div>
//           </div>

//           <Dialog.Close asChild>
//             <button className="inline-flex h-[35px] mt-8 items-center justify-center rounded bg-violet px-4 font-medium leading-none text-white  hover:bg-violet focus:shadow-[0_0_0_2px] focus:shadow-purple focus:outline-none">
//               Salvar
//             </button>
//           </Dialog.Close>

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
