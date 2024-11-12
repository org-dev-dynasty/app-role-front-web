import * as Dialog from '@radix-ui/react-dialog'
import { X, CurrencyDollar, Image, Pencil } from '@phosphor-icons/react'
import { Rating } from 'react-simple-star-rating'
import { useContext, useEffect, useRef, useState } from 'react'
import { EventType } from '../api/repositories/event_repository'
import { EventContext } from '../context/event_context'
import { MultiValue } from 'react-select'
import { MultiSelectComponent, OptionsType } from './MultiSelect'
import { z } from 'zod'
import { ImageInputFile } from './ImageInputFile'
import { useNavigate, useParams } from 'react-router-dom'

import {
  ageCategories,
  categories,
  districts,
  features,
  musicTypes,
  packageTypeArray,
  status
} from '../assets/options'

export function CreateEventModal() {
  let { instId } = useParams()

  const navigate = useNavigate()

  const [name, setName] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [address, setAddress] = useState<string>()
  const [date, setDate] = useState<Date>()
  const [priceAvg, setPriceAvg] = useState<number>(1)
  const [category, setCategory] = useState<string>('BALADA')
  const [age, setAge] = useState<string>('ADULT')
  const [musicType, setMusicType] = useState<string[]>()
  const [ticketUrl, setTicketUrl] = useState<string>()
  const [eventStatus, setEventStatus] = useState<string>('ACTIVE')
  const [currentDistrict, setCurrentDistrict] = useState<string>(
    districts[0].districtId
  )

  const [selectedMusics, setSelectedMusics] = useState<string[]>([''])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([''])
  const [selectedPackages, setSelectedPackages] = useState<string[]>([])

  const [eventImage, setEventImage] = useState<File>()
  const [bannerImage, setBannerImage] = useState<File>()

  const { createEvent, uploadEventImage, uploadEventBanner } =
    useContext(EventContext)

  async function createEventRequest() {
    try {
      const eventBodySchema = z.object({
        name: z.string().min(5).max(100),
        description: z.string().min(5),
        address: z.string().max(70),
        eventDate: z.date(),
        price: z.number().min(1).max(5),
        category: z.string(),
        ageRange: z.string(),
        musicType: z.array(z.string()),
        districtId: z.string(),
        instituteId: z.string(),
        features: z.array(z.string()),
        menuLink: z.string().optional(),
        packageType: z.array(z.string()),
        ticketUrl: z.string().optional(),
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
        districtId: currentDistrict,
        instituteId: instId,
        features: selectedFeatures,
        packageType: selectedPackages,
        ticketUrl: ticketUrl,
        eventStatus: eventStatus
      }

      type CreateEvent = {
        message: string
        id: string
      }

      const resp: CreateEvent = (await createEvent(
        eventBodySchema.parse(eventBody)
      )) as CreateEvent

      console.log(resp, resp.id)

      await uploadEventImageReq(resp.id, eventImage)
      await uploadEventBannerReq(resp.id, bannerImage)

      // navigate(`/role/${resp.id}`)

      //reload page
      // window.location.reload()

      console.log('evento criado:', eventBody)
    } catch (error) {
      alert('Erro ao criar evento')

      console.log(error)
    }
  }

  async function uploadEventImageReq(id: string, image: File | undefined) {
    if (!image || !id) return

    const formData = new FormData()
    const imgType = image.type

    formData.append('eventId', id)
    formData.append('typePhoto', imgType)
    formData.append('file', image)

    const resp = await uploadEventImage(formData)

    console.log('Imagem enviada:', resp)
  }

  async function uploadEventBannerReq(id: string, image: File | undefined) {
    if (!image || !id) return

    const formData = new FormData()
    const imgType = image.type

    formData.append('eventId', id)
    formData.append('typePhoto', imgType)
    formData.append('file', image)
    

    const resp = await uploadEventBanner(formData)
    console.log('Banner enviado:', resp)
  }

  const handleChange = (selected: MultiValue<OptionsType>) => {
    setSelectedMusics(selected.map(option => option.value))
  }

  const handleFeaturesSelectChange = (selected: MultiValue<OptionsType>) => {
    setSelectedFeatures(selected.map(option => option.value))
  }

  const handlePackageTypeSelectChange = (selected: MultiValue<OptionsType>) => {
    setSelectedPackages(selected.map(option => option.value))
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-white text-black w-16 h-16 flex justify-center items-center rounded-xl text-3xl hover:cursor-pointer hover:bg-white-purple">
          +
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed overflow-y-auto left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-grayModal p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-3xl font-medium text-white">
            Criar <span className="text-violet">ROLE</span>
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

              <MultiSelectComponent
                onChange={handleChange}
                options={musicTypes}
              />
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
                  onChange={e => setCurrentDistrict(e.target.value)}
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

          <div className="flex gap-4">
            <div className="w-full">
              <ImageInputFile
                onImageUploaded={e => setEventImage(e)}
                label="Selecione a imagem do ROLE"
              />
            </div>

            <div className="w-full">
              <ImageInputFile
                onImageUploaded={e => setBannerImage(e)}
                aspect="video"
                label="Selecione a imagem do banner"
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
