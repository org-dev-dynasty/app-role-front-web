import { CurrencyDollar } from '@phosphor-icons/react'
import { Rating } from 'react-simple-star-rating'
import { EventInfoUnit } from '../../../components/EventInfoUnit'
import { EditEventModal } from '../../../components/EditEventModal'
import { EventContext } from '../../../context/event_context'
import { useContext, useEffect, useState } from 'react'
import { EventType } from '../../../api/repositories/event_repository'

export default function Role() {
  const { getEventById } = useContext(EventContext)

  const [response, setResponse] = useState<EventType>()

  async function getEventByIdRequest() {
    try {
      const res: EventType = (await getEventById(
        '7c95b0a2-e207-4a07-90f5-c95f9d1ffd16'
      )) as EventType
      console.log('Resposta do getEventByIdRequest: ', res)

      if (res) {
        setResponse(res)
      }

      
    } catch (error) {
      alert('Erro ao buscar evento: ')
    }
  }

  function populateEventInfo() {}

  useEffect(() => {
    console.log('Chamando useEffect getEvent:')
    getEventByIdRequest()
  }, [])

  function formatDate(date: Date) {
    if (!date) return 'Data não informada'
    // Extraindo os componentes da data
    const day = String(date.getDate()).padStart(2, '0') // dia com dois dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0') // mês com dois dígitos (0-11)
    const year = date.getFullYear() // ano completo

    // Retornando a data no formato dd:mm:yyyy
    return `${day}:${month}:${year}`
  }

  return (
    <div className="bg-[#151515] w-screen h-screen text-white">
      <div className="flex flex-col max-w-[1600px] mx-auto bg-[#151515] h-screen">
        <div className="flex p-4 mt-6 w-full">
          <img
            className="max-w-xs rounded-3xl"
            src={response?.eventPhotoLink || 'https://via.placeholder.com/300'}
            alt="event img"
          />
          <div className="flex flex-col ml-8 gap-4 w-full">
            <div className="flex justify-between max-w-4xl w-full items-center">
              <div className="flex items-center gap-4 w-full">
                <h1 className="text-6xl font-light">{response?.name}</h1>

                <Rating
                  allowFraction={false}
                  emptyIcon={<CurrencyDollar size={32} className="inline" />}
                  initialValue={response?.rating ?? 0}
                  fillIcon={
                    <CurrencyDollar
                      size={32}
                      className="inline fill-green-700"
                    />
                  }
                  readonly
                  className="relative top-1"
                />
              </div>
            </div>
            <h2 className="text-2xl text-[#b3b3b3] max-w-2xl">
              {response?.description}
            </h2>

            <div className="flex text-nowrap flex-col gap-2 text-[#ffffff]">
              <span className="text-2xl">{response?.eventDate.toString() ?? "Not provided"}</span>
              <span className="text-xl">Inicio as 22:00 {'GMT -03:00'}</span>
            </div>

            <EditEventModal />
          </div>
        </div>

        <div className="justify-center items-center mt-12 text-2xl flex bg-purple/10 rounded-2xl p-10">
          <div className="flex flex-col gap-4">
            <EventInfoUnit value="address" label="Endereço">
              {response?.address ?? "Not provided"}
            </EventInfoUnit>

            <EventInfoUnit value="district" label="Distrito">
              {response?.districtId ?? "Not provided"}
            </EventInfoUnit>

            <EventInfoUnit value="neighbourhood" label="Bairro">
              Vila Nova Conceição
            </EventInfoUnit>
          </div>

          <div className="flex flex-col gap-4">
            <EventInfoUnit value="musicType" label="Tipo de música">
              {response?.musicType ?? "Not provided"}
            </EventInfoUnit>

            <EventInfoUnit value="ageRange" label="Idade permitida">
              {response?.ageRange ?? "Not provided"} 
            </EventInfoUnit>

            <EventInfoUnit value="musicType" label="Tipo de música">
              {response?.musicType.join(', ') ?? "Not provided"}
            </EventInfoUnit>
          </div>

          <div className="flex flex-col gap-4">
            <EventInfoUnit value="features" label="Características">
              {response?.features == undefined || []
                ? 'Não informado'
                : response?.features.join(', ')}
            </EventInfoUnit>

            <EventInfoUnit value="ticketUrl" label="Link para ingressos">
              {response?.ticketUrl ?? "Not provided"}
            </EventInfoUnit>

            <EventInfoUnit value="instituteId" label="ID do instituto">
              {response?.instituteId ?? 'ID não informado'}
            </EventInfoUnit>
          </div>

          <div className="flex flex-col gap-4">
            <EventInfoUnit value="features" label="Características">
              Música ao vivo, Rodizío
            </EventInfoUnit>

            <EventInfoUnit value="ageRange" label="Idade permitida">
              18+
            </EventInfoUnit>

            <EventInfoUnit value="eventStatus" label="Status do evento">
              🟢 Ativo
            </EventInfoUnit>
          </div>
        </div>
      </div>
    </div>
  )
}
