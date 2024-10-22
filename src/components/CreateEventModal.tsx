import * as Dialog from '@radix-ui/react-dialog'
import { X, CurrencyDollar, Image, Pencil } from '@phosphor-icons/react'
import { Rating } from 'react-simple-star-rating'
import { useContext, useState } from 'react'
import { EventType } from '../api/repositories/event_repository'
import { EventContext } from '../context/event_context'
import { MultiValue } from 'react-select'
import { MultiSelectComponent, OptionsType } from './MultiSelect'
import { z } from 'zod'

export function CreateEventModal() {
  const [name, setName] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [address, setAddress] = useState<string>()
  const [date, setDate] = useState<Date>()
  const [priceAvg, setPriceAvg] = useState<number>()
  const [category, setCategory] = useState<string>('BALADA')
  const [age, setAge] = useState<string>('ADULT')
  const [musicType, setMusicType] = useState<string[]>()
  const [ticketUrl, setTicketUrl] = useState<string>()
  const [eventStatus, setEventStatus] = useState<string>("ACTIVE")
  const [currentDistrict, setCurrentDistrict] = useState<string>()
  
  const [selectedFeaturesOnSel, setSelectedFeaturesOnSel] = useState<MultiValue<OptionsType> | null>(null)
  const [selectedMusic, setSelectedMusic] = useState<MultiValue<OptionsType> | null>(null)
  const [selectedPackagesOnSel, setSelectedPackagesOnSel] = useState<MultiValue<OptionsType> | null>(null)

  const [selectedMusics, setSelectedMusics] = useState<string[]>([''])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([''])
  const [selectedPackages, setSelectedPackages] = useState<string[]>([''])


  const { createEvent } = useContext(EventContext)

  async function createEventRequest() {
    try {
      const eventBodySchema = z.object({
        name: z.string().min(5).max(30),
        description: z.string().min(5),
        address: z.string().max(70),
        eventDate: z.string().datetime(),
        price: z.number().min(1).max(5),
        category: z.string(),
        ageRange: z.string(),
        musicType: z.array(z.string()),
        bannerUrl: z.string().url(),
        districtId: z.string(),
        instituteId: z.string(),
        features: z.array(z.string()),
        menuLink: z.string(),
        eventPhotoLink: z.string(),
        galeryLink: z.array(z.string()),
        packageType: z.array(z.string()),
        ticketUrl: z.string(),
        eventStatus: z.string()
      })

      const eventBody = {
        name: name,
        description: description,
        address: address,
        eventDate: date,
        price: priceAvg,
        category: category,
        ageRange: age,
        musicType: selectedMusics,
        bannerUrl: 'https://via.placeholder.com/300',
        districtId: currentDistrict,
        instituteId: '2f3073ac-3633-4fc7-9cfe-c2084399bbc3',
        features: selectedFeatures,
        menuLink: 'https://www.example.com.br/menu',
        eventPhotoLink: 'https://via.placeholder.com/300',
        galeryLink: ['https://www.example.com.br/galeria'],
        packageType: selectedPackages,
        ticketUrl: ticketUrl,
        eventStatus: eventStatus
      }

      await createEvent(eventBodySchema.parse(eventBody))

      //reload page
      // window.location.reload()

      console.log('evento criado:', eventBody)
    } catch (error) {
      alert('Erro ao criar evento')

      console.log(error)
    }
  }

  // useEffect(() => {
  //   console.log('Chamando useEffect getEvent:')

  //   // setEventStatus(response?.eventStatus)
  // }, [])




  const handleChange = (selected: MultiValue<OptionsType>) => {
    setSelectedMusic(selected)

    setSelectedMusics(selected.map(option => option.value))

    console.log(selectedMusic)
  }

  const handleFeaturesSelectChange = (selected: MultiValue<OptionsType>) => {
    setSelectedFeaturesOnSel(selected)

    setSelectedFeatures(selected.map(option => option.value))

    console.log(selectedFeatures)
  }

  const handlePackageTypeSelectChange = (selected: MultiValue<OptionsType>) => {
    setSelectedPackagesOnSel(selected)

    setSelectedPackages(selected.map(option => option.value))

    console.log(selectedPackagesOnSel)
  }

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

  const features = [
    { value: 'ESTACIONAMENTO', label: 'Estacionamento' },
    { value: 'FUMODROMO', label: 'Fumodromo' },
    { value: 'VALET', label: 'Valet' },
    { value: 'AREA_ABERTA', label: 'Area aberta' },
    { value: 'WELCOME_SHOT', label: 'Welcome shot' },
    { value: 'MESAS', label: 'Mesas' },
    { value: 'OPEN_BAR', label: 'Open bar' },
    { value: 'AO_VIVO', label: 'Ao vivo' },
    { value: 'ESQUENTA', label: 'Esquenta' },
    { value: 'AFTER', label: 'After' }
  ]

  const packageTypeArray = [
    { value: 'COMBO', label: 'Combo' },
    { value: 'ANIVERSARIO', label: 'Aniversario' },
    { value: 'CAMAROTE', label: 'Camarote' }
  ]

  const ageCategories = [
    { label: '18-20', value: 'Adolescent' },
    { label: '21-25', value: 'Young Adult' },
    { label: '26-30', value: 'Adult' },
    { label: '31-40', value: 'Mature Adult' },
    { label: '40+', value: 'Senior' },
    { label: 'TODAS', value: 'All Ages' }
  ]

  const districts = [
    {
      districtName: "Zona Sul",
      districtId: "ee6ba030-cebc-405b-b3e3-08f213cca415"
    },
    {
      districtName: "Zona Norte",
      districtId: "5e3e0505-2b29-462d-91fc-d9f538ee8186"
    },
    {
      districtName: "Zona Leste",
      districtId: "7d6b8023-2d03-4623-bc33-ebf58767c9b1"
    },
    {
      districtName: "Zona Oeste",
      districtId: "1477c1ff-bdb4-4e38-8415-b2da7163b3f7"
    },
    {
      districtName: "Centro",
      districtId: "90fec991-6d11-4813-9482-343ebdca5514"
    }
  ];

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

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="w-fit px-8 py-4 text-2xl rounded-lg bg-purple flex text-center gap-2">
          <Pencil className="self-center" /> Criar ROLE
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
              onChange={e => setName(e.target.value)}
            />
          </fieldset>

          <fieldset className="mb-4 flex flex-col gap-1 text-white">
            <label className="text-base text-white" htmlFor="description">
              Descrição
            </label>
            <textarea
              className="h-24 px-2 py-2 resize-none bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
              id="description"
              onChange={e => setDescription(e.target.value)}
            />
          </fieldset>

          <fieldset className="mb-4 flex flex-col gap-1 text-white">
            <label className="text-base text-white" htmlFor="adress">
              Endereço
            </label>
            <input
              className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
              id="adress"
              onChange={e => setAddress(e.target.value)}
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
              onChange={e => {
                setDate(new Date(e.target.value))
                console.log(e.target.value, date)
              }}
            />
          </fieldset>

          <fieldset className="mb-4 flex w-full justify-between flex-row gap-8 [&>div]:w-1/3 text-white">
            <div className="flex flex-col gap-1">
              <label className="text-base text-white">Preço médio</label>
              <Rating
                onClick={e => setPriceAvg(e)}
                allowFraction={false}
                emptyIcon={<CurrencyDollar size={32} className="inline" />}
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
                onChange={e => setCategory(e.target.value)}
              >
                {categories.map((category, index) => {
                  return (
                    <option value={category.key} key={index}>
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
                {ageCategories.map((ageCategory, index) => {
                  return (
                    <option
                      value={ageCategory.value}
                      key={index}
                      onChange={() => setAge(ageCategory.value)}
                    >
                      {ageCategory.label}
                    </option>
                  )
                })}
              </select>
            </div>
          </fieldset>

          <fieldset className="mb-4 flex w-full justify-between flex-row gap-8 text-white">
            <div className="flex flex-col gap-1  w-2/3">
              <label className="text-base text-white" htmlFor="musicType">
                Tipo de música
              </label>

              {/* <select
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
              </select> */}

              <MultiSelectComponent onChange={handleChange} options={options} />
            </div>

            <div className="flex flex-col gap-1 w-1/3">
              <label className="text-base text-white" htmlFor="age">
                Status do Evento
              </label>
              <select
                name="category"
                id="category"
                className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
                onChange={e => setEventStatus(e.target.value)}
              >
                {status.map((status, index) => {
                  return (
                    <option value={status.value} key={index}>
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
              onChange={e => setTicketUrl(e.target.value)}
            />
          </fieldset>

          <fieldset className="mb-4 flex w-full justify-between flex-row gap-8 text-white">
            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-1 w-full">
                <label className="text-base text-white" htmlFor="district">
                  Distrito
                </label>
                <select
                  name="district"
                  id="district"
                  className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
                  onChange={(e) => setCurrentDistrict(e.target.value)}
                >
                  {districts.map((district, index) => {
                    return (
                      <option
                        value={districts[index].districtId}
                        key={index}
                        // onChange={() => setCurrentDistrict(1)}
                      >
                        {districts[index].districtName}
                      </option>
                    )
                  })}
                </select>
              </div>

              <div className="flex flex-col w-full gap-1">
                <label className="text-base text-white">Features</label>

                <MultiSelectComponent
                  onChange={handleFeaturesSelectChange}
                  options={features}
                />
              </div>
            </div>

            {/* <div className="flex flex-col gap-1 w-1/2">
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
            </div> */}
          </fieldset>

          <fieldset className="mb-4 flex flex-col gap-1 text-white">
            <label className="text-base text-white">Pacotes</label>

            <MultiSelectComponent
              onChange={handlePackageTypeSelectChange}
              options={packageTypeArray}
            />
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
                onClick={createEventRequest}
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
