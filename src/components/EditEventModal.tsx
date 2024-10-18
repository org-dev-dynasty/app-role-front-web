import * as Dialog from '@radix-ui/react-dialog'
import { X, CurrencyDollar, Image, Pencil } from '@phosphor-icons/react'
import { Rating } from 'react-simple-star-rating'
import React, { useContext, useEffect, useState } from 'react'
import { EventType } from '../api/repositories/event_repository'
import { EventContext } from '../context/event_context'
import { redirect } from 'react-router-dom'

export function EditEventModal() {
  const [name, setName] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [address, setAddress] = useState<string>()
  const [date, setDate] = useState<Date>()
  const [priceAvg, setPriceAvg] = useState<number>()
  const [category, setCategory] = useState<string>()
  const [age, setAge] = useState<string>()
  const [musicType, setMusicType] = useState<string[]>()
  const [eventStatus, setEventStatus] = useState<string>()

  const { getEventById, editEventById } = useContext(EventContext)

  const [response, setResponse] = useState<EventType>()

  async function getEventByIdRequest() {
    try {
      const res: EventType = (await getEventById(
        '76595bea-336c-4ee1-af87-75adf05e7b9a'
      )) as EventType
      console.log('Resposta do getEventByIdRequest: ', res)

      if (res) {
        setResponse(res)
      }

      setName(response?.name)
      setDescription(response?.description)
      setAddress(response?.address)
      setDate(response?.eventDate)
      setPriceAvg(response?.price)
      setCategory(response?.category)
      setAge(response?.ageRange)
      setMusicType(response?.musicType)
    } catch (error) {
      alert('Erro ao buscar evento: ')
    }
  }

  async function updateEventByIdRequest() {
    await console.log('A')

    try {
      if (
        !name ||
        !description ||
        !address ||
        !date ||
        !priceAvg ||
        !category ||
        !age ||
        !musicType
      ) {
        console.log('faltou')
        console.log(
          name,
          description,
          address,
          date,
          priceAvg,
          category,
          age,
          musicType
        )
        return
      }

      const updatedEvent: EventType = {
        name: name,
        description: description,
        address: address,
        eventDate: new Date(),
        price: 3,
        category: category,
        ageRange: age,
        musicType: musicType,
        bannerUrl: 'https://via.placeholder.com/300',
        districtId: '1',
        instituteId: '1',
        features: ['feature1', 'feature2'],
        menuLink: 'https://www.example.com.br/menu',
        eventPhotoLink: 'https://via.placeholder.com/300',
        galeryLink: 'https://www.example.com.br/galeria',
        packageType: 'PACKAGE',
        ticketUrl: 'https://www.example.com.br/ingressos',
        rating: 4.5,
        reviews: 100,
        eventId: '7c95b0a2-e207-4a07-90f5-c95f9d1ffd16'
      }

      await editEventById(updatedEvent)

      console.log('evento atualizado:', updatedEvent)
    } catch (error) {
      alert('Erro ao editar evento: ')
    }
  }

  function updateEvent() {
    updateEventByIdRequest()
  }

  useEffect(() => {
    console.log('Chamando useEffect getEvent:')
    getEventByIdRequest()

    // setEventStatus(response?.eventStatus)
  }, [])

  const [currentDistrict, setCurrentDistrict] = useState<number>(0)

  function mudou(e: React.ChangeEvent<HTMLSelectElement>) {
    setCurrentDistrict(parseInt(e.target.value))

    console.log(Distritos[currentDistrict].neighborhoods)
  }

  const Distritos = [
    {
      name: 'Zona Sul',
      neighborhoods: [
        'Jabaquara',
        'Vila Mariana',
        'Moema',
        'Itaim Bibi',
        'Campo Belo',
        'Brooklin',
        'Vila Olímpia',
        'Santo Amaro',
        'Socorro',
        'Campo Grande',
        'Cidade Dutra',
        'Interlagos',
        'Capela do Socorro',
        'Jardim Ângela',
        'Parelheiros',
        'Grajaú',
        'Capão Redondo',
        'Campo Limpo',
        'Vila Andrade',
        'Morumbi',
        'Jardins',
        'Paraisópolis'
      ]
    },

    {
      name: 'Zona Norte',
      neighborhoods: [
        'Casa Verde',
        'Limão',
        'Santana',
        'Tucuruvi',
        'Mandaqui',
        'Vila Guilherme',
        'Vila Maria',
        'Vila Medeiros',
        'Jaçanã',
        'Tremembé',
        'Horto Florestal',
        'Freguesia do Ó',
        'Pirituba',
        'Brasilândia',
        'Perus',
        'Anhanguera',
        'Jaraguá',
        'Cachoeirinha'
      ]
    },

    {
      name: 'Zona Leste',
      neighborhoods: [
        'Tatuapé',
        'Vila Carrão',
        'Vila Formosa',
        'Penha',
        'Vila Matilde',
        'Itaquera',
        'São Mateus',
        'Vila Prudente',
        'São Lucas',
        'Sapopemba',
        'Cidade Tiradentes',
        'Parque do Carmo',
        'São Miguel Paulista',
        'Ermelino Matarazzo',
        'Vila Jacuí',
        'Iguatemi',
        'Jardim Helena',
        'Cangaíba',
        'Artur Alvim',
        'Guaianases',
        'Lajeado'
      ]
    },

    {
      name: 'Zona Oeste',
      neighborhoods: [
        'Pinheiros',
        'Vila Madalena',
        'Butantã',
        'Perdizes',
        'Barra Funda',
        'Lapa',
        'Vila Leopoldina',
        'Jaguaré',
        'Rio Pequeno',
        'Raposo Tavares',
        'Jardim Bonfiglioli',
        'Cidade Universitária',
        'Sumaré',
        'Pacaembu',
        'Alto de Pinheiros'
      ]
    },

    {
      name: 'Centro',
      neighborhoods: [
        'Sé',
        'República',
        'Bela Vista',
        'Liberdade',
        'Consolação',
        'Santa Cecília',
        'Brás',
        'Bom Retiro',
        'Cambuci',
        'Glicério',
        'Higienópolis'
      ]
    }
  ]

  const options = [
    { value: 'FUNK', label: 'Funk' },
    { value: 'SERTANEJO', label: 'Sertanejo' },
    { value: 'TRAP', label: 'Trap' },
    { value: 'ELETRONICA', label: 'Eletrônica' },
    { value: 'PAGODE', label: 'Pagode' },
    { value: 'ROCK', label: 'Rock' },
    { value: 'RAP', label: 'Rap' },
    { value: 'REGGAE', label: 'Reggae' },
    { value: 'FORRO', label: 'Forró' },
    { value: 'MPB', label: 'MPB' }
  ]

  const categories = [
    { key: 'BALADA', value: 'Balada' },
    { key: 'UNIVERSITARIO', value: 'Universitário' },
    { key: 'BAR', value: 'Bar' },
    { key: 'BAR_BALADA', value: 'Bar Balada' },
    { key: 'SHOW', value: 'Show' },
    { key: 'FESTIVAL', value: 'Festival' },
    { key: 'FESTA', value: 'Festa' }
  ]

  const status = [
    { value: 'ACTIVE', label: '🟢 Ativo' },
    { value: 'INACTIVE', label: '🔴 Inativo' }
  ]

  const [selectedOption, setSelectedOption] = useState(null)

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="w-fit px-8 py-4 text-2xl rounded-lg bg-purple flex text-center gap-2">
          <Pencil className="self-center" /> Editar ROLE
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed overflow-y-auto left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-grayModal p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-3xl font-medium text-white">
            Editar <span className="text-violet">ROLE</span>
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-stone-300">
            Utilize os campos abaixos para criar o seu melhor ROLE!
          </Dialog.Description>

          <fieldset className="mb-4 flex flex-col gap-1 text-white">
            <label className="text-base text-white" htmlFor="roleName">
              Nome
            </label>
            <input
              className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
              id="roleName"
              defaultValue={response?.name}
            />
          </fieldset>

          <fieldset className="mb-4 flex flex-col gap-1 text-white">
            <label className="text-base text-white" htmlFor="description">
              Descrição
            </label>
            <textarea
              className="h-24 px-2 py-2 resize-none bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
              id="description"
              defaultValue={response?.description}
            />
          </fieldset>

          <fieldset className="mb-4 flex flex-col gap-1 text-white">
            <label className="text-base text-white" htmlFor="adress">
              Endereço
            </label>
            <input
              className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
              id="adress"
              defaultValue={response?.address}
            />
          </fieldset>

          <fieldset className="mb-4 flex flex-col gap-1 text-white">
            <label className="text-base text-white" htmlFor="date">
              Data
            </label>
            <input
              className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet "
              id="date"
              type="datetime-local"
            />
          </fieldset>

          <fieldset className="mb-4 flex w-full justify-between flex-row gap-8 [&>div]:w-1/3 text-white">
            <div className="flex flex-col gap-1">
              <label className="text-base text-white">Preço médio</label>
              <Rating
                allowFraction={false}
                emptyIcon={<CurrencyDollar size={32} className="inline" />}
                initialValue={3}
                fillIcon={
                  <CurrencyDollar size={32} className="inline fill-green-700" />
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-base text-white" htmlFor="age">
                Categoria
              </label>
              <select
                name="category"
                id="category"
                className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
                defaultValue={response?.category}
              >
                {categories.map((category, index) => {
                  return (
                    <option
                      value={category.key}
                      key={index}
                      onChange={() => setCategory(category.key)}
                    >
                      {category.value}
                    </option>
                  )
                })}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-base text-white" htmlFor="age">
                Idade
              </label>
              <select
                name="age"
                id="age"
                className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
              >
                <option className="outline-none" value="all">
                  Todas as idades
                </option>
                <option className="outline-none" value="legalAge">
                  18+
                </option>
              </select>
            </div>
          </fieldset>

          <fieldset className="mb-4 flex w-full justify-between flex-row gap-8 text-white">
            <div className="flex flex-col gap-1  w-2/3">
              <label className="text-base text-white" htmlFor="musicType">
                Tipo de música
              </label>

              <select
                name="musicType"
                id="musicType"
                className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
              >
                {options.map((types, index) => {
                  return (
                    <option value={index} key={index}>
                      {options[index].label}
                    </option>
                  )
                })}
              </select>
            </div>

            <div className="flex flex-col gap-1 w-1/3">
              <label className="text-base text-white" htmlFor="age">
                Status do Evento
              </label>
              <select
                name="category"
                id="category"
                className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
              >
                {status.map((status, index) => {
                  return (
                    <option
                      value={status.value}
                      key={index}
                      onChange={() => setEventStatus(status.value)}
                    >
                      {status.label}
                    </option>
                  )
                })}
              </select>
            </div>
          </fieldset>

          <fieldset className="mb-4 flex flex-col gap-1 text-white">
            <label className="text-base text-white" htmlFor="ticketLink">
              Link para ingressos
            </label>
            <input
              className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
              id="ticketLink"
              placeholder="https://www.example.com.br/ingressos/"
            />
          </fieldset>

          <fieldset className="mb-4 flex w-full justify-between flex-row gap-8 text-white">
            <div className="flex flex-col gap-1  w-1/2">
              <label className="text-base text-white" htmlFor="district">
                Distrito
              </label>
              <select
                name="district"
                id="district"
                className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
                onChange={mudou}
              >
                {Distritos.map((types, index) => {
                  return (
                    <option
                      value={index}
                      defaultValue={currentDistrict}
                      key={index}
                    >
                      {Distritos[index].name}
                    </option>
                  )
                })}
              </select>
            </div>

            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-base text-white" htmlFor="age">
                Bairro
              </label>
              <select
                name="category"
                id="category"
                className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
              >
                {Distritos[currentDistrict].neighborhoods.map(
                  (neighborhood, index) => {
                    return (
                      <option value={index} key={index}>
                        {Distritos[currentDistrict].neighborhoods[index]}
                      </option>
                    )
                  }
                )}
              </select>
            </div>
          </fieldset>

          <div className="mb-4 flex text-white justify-around gap-2">
            <div className="flex flex-col w-1/3">
              <label
                className="border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center "
                htmlFor="bannerImage"
              >
                <Image size={32} className="mx-auto" />
                Imagem do banner
              </label>
              <input
                className="h-10 invisible bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
                id="bannerImage"
                type="file"
              />
            </div>

            <div className="flex flex-col w-1/3">
              <label
                className="border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center"
                htmlFor="eventImage"
              >
                <Image size={32} className="mx-auto" />
                Imagem do banner
              </label>
              <input
                className="h-10 invisible bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
                id="eventImage"
                type="file"
              />
            </div>
          </div>

          <div className="mt-2 flex justify-end">
            <Dialog.Close asChild>
              <button
                onClick={updateEventByIdRequest}
                className="inline-flex h-[35px] items-center justify-center rounded bg-violet px-4 font-medium leading-none text-white  hover:bg-violet focus:shadow-[0_0_0_2px] focus:shadow-purple focus:outline-none"
              >
                Salvar Role
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 inline-flex appearance-none items-center justify-center rounded-full text-violet focus:shadow-[0_0_0_2px] focus:shadow-violet focus:outline-none"
              aria-label="Close"
            >
              <X size={32} weight="bold" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
