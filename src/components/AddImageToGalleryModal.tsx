// import * as Dialog from '@radix-ui/react-dialog'
// import { X } from '@phosphor-icons/react'
// import { ImageInputFile } from './ImageInputFile'
// import { useParams } from 'react-router-dom'
// import { useContext, useState } from 'react'
// import { EventContext } from '../context/event_context'

// export function AddImageToGalleryModal() {
//   const { eventId } = useParams()
//   const { uploadImageToEventGallery } = useContext(EventContext)

//   const [image, setImage] = useState<File>()

//   async function handleImagePost() {
//     if (!image || !eventId) return

//     const formData = new FormData()
//     const imgType = image.type

//     formData.append('eventId', eventId)
//     formData.append('typePhoto', imgType)
//     formData.append('eventPhoto', image)

//     const resp = await uploadImageToEventGallery(formData)

//     console.log(resp)

//     document.location.reload()
//   }

//   return (
//     <Dialog.Root>
//       <Dialog.Trigger asChild>
//         <button className="bg-purple text-neutral-300 flex justify-center items-center rounded-md px-4 py-4 text-2xl hover:cursor-pointer hover:bg-violet">
//           Adicionar Imagem
//         </button>
//       </Dialog.Trigger>
//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
//         <Dialog.Content className="fixed overflow-y-auto left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-grayModal p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
//           <Dialog.Title className="m-0 text-3xl font-medium text-white">
//             Adicionar imagem
//           </Dialog.Title>
//           <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-stone-300">
//             Insira a imagem a ser adicionada a galeria do <span className="text-violet">ROLE</span>.
//           </Dialog.Description>

//           <div>
//             <ImageInputFile
//               label="Imagem da galeria"
//               aspect="video"
//               onImageUploaded={e => setImage(e)}
//             />
//           </div>

//           <div className="mt-2 flex justify-end">
//             <Dialog.Close asChild>
//               <button
//                 onClick={handleImagePost}
//                 className="inline-flex h-[35px] items-center justify-center rounded bg-violet px-4 font-medium leading-none text-white  hover:bg-violet focus:shadow-[0_0_0_2px] focus:shadow-purple focus:outline-none"
//               >
//                 Enviar Imagem
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
