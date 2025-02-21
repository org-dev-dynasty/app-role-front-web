// import React, { useContext, useEffect, useState } from 'react'
// import * as Dialog from '@radix-ui/react-dialog'
// import { X } from '@phosphor-icons/react'
// import { useParams } from 'react-router-dom'
// import { EventType } from '../api/repositories/event_repository'
// import { EventContext } from '../context/event_context'

// export default function DeleteEventModal() {
//   const { getEventById, deleteEventById } = useContext(EventContext)

//   const [eventName, setEventName] = useState<string>()

//   const [canDeleteEvent, setCanDeleteEvent] = useState(false)

//   const { eventId } = useParams()

//   async function getEventByIdRequest() {
//     try {
//       const res: EventType = (await getEventById(`${eventId}`)) as EventType

//       setEventName(res.name)
//     } catch (error) {
//       console.log('Erro ao buscar evento por id: ', error)
//     }
//   }

//   async function deleteEvent(e: React.MouseEvent<HTMLButtonElement>) {
//     if(!canDeleteEvent) {
//       e.preventDefault()
//       return
//     }

//     try {
//       await deleteEventById(`${eventId}`)

//       // navigate('/institutes')

//       console.log('Evento deletado com sucesso')
//     } catch (error) {
//       console.log('Erro ao deletar evento: ', error)
//     }
//   }

//   function checkEventName(e: React.ChangeEvent<HTMLInputElement>) {
//     if (e.target.value === eventName?.trimEnd().replace(/[^a-zA-Z0-9 ]/g, '')) {

//       setCanDeleteEvent(true)

//       return;
//     }

//     setCanDeleteEvent(false)
//   }

//   useEffect(() => {
//     getEventByIdRequest()
//   }, [])

//   return (
//     <Dialog.Root>
//       <Dialog.Trigger asChild>
//         <button className="w-fit px-8 py-4 text-2xl rounded-lg bg-transparent border-red-500 border-2 hover:bg-red-400 transition flex text-center gap-2">
//           Deletar ROLE
//         </button>
//       </Dialog.Trigger>
//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
//         <Dialog.Content className="flex p-12 justify-center items-center flex-col fixed overflow-y-auto left-1/2 top-1/2 max-h-[85vh] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-grayModal shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
//           <Dialog.Title className="m-0 text-3xl font-medium text-red-500">
//             Deletar <span className="text-red-600">ROLE</span>
//           </Dialog.Title>
//           <Dialog.Description className="my-2.5 text-2xl leading-normal text-stone-300 text-center">
//             Tem certeza que deseja deletar este ROLE?
//           </Dialog.Description>

//           <div className='mb-8 flex justify-center items-center flex-col gap-2'>
//             <h1 className={`my-2 text-2xl select-none text-center transition font-bold ${canDeleteEvent ? "text-green-500" : "text-red-500"}`}>{eventName?.replace(/[^a-zA-Z0-9 ]/g, '')}</h1>

//             <input className="outline-none bg-grayInputModal px-4 py-2 rounded-sm text-white" onChange={checkEventName} type="text" />

//             <p className='text-white'>Digite o nome do evento para confirmar sua exclusão</p>
//           </div>

//           <Dialog.Close asChild>
//             <button 
//             onClick={deleteEvent}
//             className="inline-flex h-[35px] items-center justify-center rounded bg-violet px-4 font-medium leading-none text-white  hover:bg-violet focus:shadow-[0_0_0_2px] focus:shadow-purple focus:outline-none">
//               Deletar ROLE
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
