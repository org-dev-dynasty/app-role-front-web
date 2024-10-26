import { CurrencyDollar, Eye } from '@phosphor-icons/react'
import { Rating } from 'react-simple-star-rating'
import { EventInfoUnit } from '../../../components/EventInfoUnit'
import { EditEventModal } from '../../../components/EditEventModal'
import { EventContext } from '../../../context/event_context'
import { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { CreateEventModal } from '../../../components/CreateEventModal'
import { features } from '../../../assets/options'

export default function Role() {
  let { eventId } = useParams()

  const { getEventById } = useContext(EventContext)

  const [eventName, setEventName] = useState<string>()
  const [eventAge, setEventAge] = useState<string>()
  const [eventDescription, setEventDescription] = useState<string>()
  const [eventDate, setEventDate] = useState<Date>(new Date())
  const [eventAddress, setEventAddress] = useState<string>()
  const [eventPrice, setEventPrice] = useState<number>()
  const [eventDistrict, setEventDistrict] = useState<string>()
  const [eventInstituteId, setEventInstituteId] = useState<string>()
  const [eventFeatures, setEventFeatures] = useState<string[]>([])
  const [eventMusicType, setEventMusicType] = useState<string[]>([])
  const [eventMenuLink, setEventMenuLink] = useState<string>()
  const [eventPhotoLink, setEventPhotoLink] = useState<string>()
  const [eventGaleryLink, setEventGaleryLink] = useState<string[]>()
  const [eventPackageType, setEventPackageType] = useState<string[]>()
  const [eventCategory, setEventCategory] = useState<string>()
  const [eventTicketUrl, setEventTicketUrl] = useState<string>()
  const [eventRating, setEventRating] = useState<number>()

  async function getEventByIdRequest() {
    // try {
    //   const res = await getEventById(`${eventId}`)
    //   console.log('Resposta do getEventByIdRequest: ', res)

    //   if(res) {
    //     Navigate({to: "/404"})
    //   }

    //   console.log(res)

    //   if (res) {
    //     setResponse(res as EventType)
    //   }
    // } catch (error) {}

    const response = await getEventById(`${eventId}`)

    if (response) {
      setEventName(response.name)
      setEventDescription(response.description)
      setEventDate(response.eventDate)
      setEventAddress(response.address)
      setEventPrice(response.price)
      setEventDistrict(response.districtId)
      setEventCategory(response.category)
      setEventInstituteId(response.instituteId)
      setEventFeatures(response.features)
      setEventMusicType(response.musicType)
      setEventMenuLink(response.menuLink)
      setEventPhotoLink(response.eventPhotoLink)
      setEventGaleryLink(response.galeryLink)
      setEventPackageType(response.packageType)
      setEventAge(response.ageRange)
      setEventTicketUrl(response.ticketUrl)
    }
  }

  useEffect(() => {
    console.log('Chamando useEffect getEvent:')
    console.log(eventId)
    getEventByIdRequest()
  }, [])

  return (
    <div className="bg-[#151515] w-screen h-screen text-white">
      <div className="flex flex-col max-w-[1600px] mx-auto bg-[#151515]">
        <div className="flex p-4 mt-6 w-full">
          <div className="w-80 h-80">
            <img
              className="object-cover rounded-3xl"
              src={eventPhotoLink || 'https://via.placeholder.com/300'}
              alt="event img"
            />
          </div>

          <div className="flex flex-col ml-8 gap-4 w-full">
            <div className="flex justify-between max-w-4xl w-full items-center">
              <div className="flex items-center gap-4 w-full">
                <h1 className="text-6xl font-light">{eventName}</h1>

                <Rating
                  allowFraction={false}
                  emptyIcon={<CurrencyDollar size={32} className="inline" />}
                  initialValue={eventPrice}
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
              {eventDescription}
            </h2>

            <div className="flex text-nowrap flex-col gap-2 text-[#ffffff]">
              <span className="text-2xl">
                {new Date(eventDate).toLocaleDateString() ?? 'Não informado'}
              </span>
              <span className="text-xl">
                Inicio as {dayjs(new Date(eventDate)).format('HH:mm:ss')}
              </span>
            </div>

            <EditEventModal />
            <CreateEventModal />
            <Link to={`/Institute/${eventInstituteId}`} className="w-fit px-8 py-4 text-2xl rounded-lg bg-purple flex text-center gap-2">
              <Eye className='self-center'/> Ver instituto
            </Link>
          </div>
        </div>

        <div className="justify-center items-center my-12 text-2xl flex bg-purple/10 rounded-2xl p-10">
          <div className="flex flex-col gap-4">
            <EventInfoUnit value="address" label="Endereço">
              {eventAddress}
            </EventInfoUnit>

            <EventInfoUnit value="district" label="Distrito">
              {eventDistrict}
            </EventInfoUnit>

            <EventInfoUnit value="neighbourhood" label="Bairro">
              Vila Nova Conceição
            </EventInfoUnit>
          </div>

          <div className="flex flex-col gap-4">
            <EventInfoUnit value="musicType" label="Tipo de música">
              {eventMusicType}
            </EventInfoUnit>

            <EventInfoUnit value="ageRange" label="Idade permitida">
              {eventAge}
            </EventInfoUnit>

            <EventInfoUnit value="musicType" label="Tipo de música">
              {eventMusicType
                .map(
                  word =>
                    word.toLowerCase().charAt(0).toUpperCase() +
                    word.slice(1).toLowerCase()
                )
                .join(', ')}
            </EventInfoUnit>
          </div>

          <div className="flex flex-col gap-4">
            <EventInfoUnit value="features" label="Características">
              {features
                .filter(feature => eventFeatures.includes(feature.value)) // Filtra os objetos com os valores selecionados
                .map(feature => feature.label)
                .join(', ')}
            </EventInfoUnit>

            <EventInfoUnit value="ticketUrl" label="Link para ingressos">
              {eventTicketUrl}
            </EventInfoUnit>

            <EventInfoUnit value="instituteId" label="ID do instituto">
              {eventInstituteId}
            </EventInfoUnit>
          </div>

          <div className="flex flex-col gap-4">
            <EventInfoUnit value="features" label="Categoria">
              {eventCategory}
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
