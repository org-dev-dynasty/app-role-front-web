import { CaretLeft, CurrencyDollar } from '@phosphor-icons/react'
import { Rating } from 'react-simple-star-rating'
import { EventInfoUnit } from '../../../components/EventInfoUnit'
import { EditEventModal } from '../../../components/EditEventModal'
import { EventContext } from '../../../context/event_context'
import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import {
  ageCategories,
  categories, 
  districts,
  features,
  musicTypes,
  status
} from '../../../assets/options'
import DeleteEventModal from '../../../components/DeleteEventModal'
import { AddImageToGalleryModal } from '../../../components/AddImageToGalleryModal'
import { InteractableImage } from '../../../components/InteractableImage'
import { DeleteGalleryButton } from '../../../components/DeleteGalleryButton'
import EditEventImagesModal from '../../../components/EditEventImagesModal'

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
  const [eventStatus, setEventStatus] = useState<string>()

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
      setEventStatus(response.eventStatus)
    }
  }

  useEffect(() => {
    console.log('Chamando useEffect getEvent:')
    console.log(eventId)
    getEventByIdRequest()
  }, [])

  return (
    <div className="bg-[#151515] w-screen text-white">
      <div className="flex flex-col max-w-[1600px] pt-20 min-[1900px]:pt-0 mx-auto bg-[#151515]">
        <div className="flex p-4 mt-6 w-full">
          <div className="w-80 h-80">
            <img
              className="object-cover rounded-3xl aspect-square"
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
                    <CurrencyDollar size={32} className="inline fill-violet" />
                  }
                  readonly
                  className="relative top-1"
                />
              </div>
            </div>
            <h2 className="text-2xl text-[#b3b3b3] max-w-4xl">
              {eventDescription}
            </h2>

            <div className="flex text-nowrap flex-col gap-2 text-[#ffffff]">
              <h1 className="text-2xl">Data do evento</h1>
              <div className="flex gap-4 items-center">
                <span className="text-2xl text-neutral-300">
                  {new Date(eventDate).toLocaleDateString() ?? 'Não informado'}
                </span>
                <span className="text-xl text-neutral-300">
                  Inicio as {dayjs(new Date(eventDate)).format('HH:mm')}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <EditEventModal />
              <DeleteEventModal />
              <EditEventImagesModal />
            </div>

            <Link
              to={`/Institute/${eventInstituteId}`}
              className="absolute top-6 left-2 w-fit px-8 py-4 text-2xl rounded-lg text-violet flex items-center text-center gap-2"
            >
              <CaretLeft /> Voltar
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 justify-center items-center my-12 text-2xl bg-neutral-900 rounded-2xl p-10">
          <EventInfoUnit value="address" label="Endereço">
            {eventAddress}
          </EventInfoUnit>

          <EventInfoUnit value="district" label="Distrito">
            {districts.find(d => d.districtId === eventDistrict)?.districtName}
          </EventInfoUnit>

          <EventInfoUnit value="ageRange" label="Idade permitida">
            {ageCategories.find(a => a.value === eventAge)?.label ??
              'Todas as idades'}
          </EventInfoUnit>

          <EventInfoUnit value="musicType" label="Tipo de música">
            {musicTypes
              .filter(evt => eventMusicType.includes(evt.value)) // Filtra os objetos com os valores selecionados
              .map(feature => feature.label)
              .join(', ')}
          </EventInfoUnit>

          <EventInfoUnit value="features" label="Características">
            {features
              .filter(feature => eventFeatures.includes(feature.value)) // Filtra os objetos com os valores selecionados
              .map(feature => feature.label)
              .join(', ')}
          </EventInfoUnit>

          <EventInfoUnit value="ticketUrl" label="Link para ingressos">
            <span className='text-xs'>{eventTicketUrl}</span>
          </EventInfoUnit>

          <EventInfoUnit value="category" label="Categoria">
            {categories.find(e => e.key === eventCategory)?.value}
          </EventInfoUnit>

          <EventInfoUnit value="eventStatus" label="Status do evento">
            {status.find(s => s.value === eventStatus)?.label}
          </EventInfoUnit>
        </div>

        <div className="mb-20">
          <div className="flex gap-4 items-center">
            <h1 className="text-4xl">Galeria</h1>
            <AddImageToGalleryModal />
            <DeleteGalleryButton />
          </div>

          <div className="grid grid-cols-5 gap-8 mt-8">
            {eventGaleryLink?.length === 0 && (
              <div className="col-span-5 text-center text-2xl">
                Nenhuma imagem na galeria
              </div>
            )}

            {eventGaleryLink?.map((image, index) => (
              <InteractableImage key={index} alt="Teste" src={image} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
