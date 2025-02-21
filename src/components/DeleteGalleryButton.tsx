// import * as Dialog from '@radix-ui/react-dialog'
// import { X } from '@phosphor-icons/react'
// import { useParams } from 'react-router-dom'
// import { useContext } from 'react'
// import { EventContext } from '../context/event_context'

// export function DeleteGalleryButton() {
//   const { eventId } = useParams()
//   const { deleteEventGallery } = useContext(EventContext)

//   async function deleteGallery() {
//     if (!eventId) return

//     const resp = await deleteEventGallery(eventId)

//     document.location.reload()

//     console.log(resp)
//   }

//   return (
//     <Dialog.Root>
//       <Dialog.Trigger asChild>
//         <button className="w-fit px-8 py-4 text-2xl rounded-lg bg-transparent border-red-500 border-2 hover:bg-red-400 transition flex text-center gap-2">
//           Deletar Galeria
//         </button>
//       </Dialog.Trigger>
//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
//         <Dialog.Content className="flex p-12 justify-center items-center flex-col fixed overflow-y-auto left-1/2 top-1/2 max-h-[85vh] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-grayModal shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
//           <Dialog.Title className="m-0 text-3xl font-medium text-red-500">
//             Deletar Galeria
//           </Dialog.Title>
//           <Dialog.Description className="my-2.5 text-2xl leading-normal text-stone-300 text-center">
//             Tem certeza que deseja deletar a galeria deste <span className='text-violet'>ROLE</span>?
//           </Dialog.Description>



//           <Dialog.Close asChild>
//             <button
//               onClick={deleteGallery}
//               className="inline-flex h-[35px] items-center justify-center rounded bg-violet px-4 mt-4 font-medium leading-none text-white  hover:bg-violet focus:shadow-[0_0_0_2px] focus:shadow-purple focus:outline-none"
//             >
//               Confirmar
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
